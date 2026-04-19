/**
 * Progressive-enhancement utilities for native {@link HTMLSelectElement} controls.
 *
 * This module keeps the native `<select>` as the source of truth for value, disabled state,
 * `size`, and `multiple`, while mirroring that state into a custom DOM structure that is
 * easier to style and extend.
 *
 * Standard HTML behavior comes from the real `<select>` element. Widget-specific behavior uses
 * `data-*` attributes such as `data-searchable` and `data-dropdown-height-px`, which keeps the
 * public API aligned with the platform instead of creating a parallel configuration system.
 */
const DEFAULT_CONFIG = {
    searchable: false,
    dropdownHeightPx: 500,
    height: '32px',
    width: '100%'
};

// Widen literal defaults into their runtime primitive types.
// Example: false -> boolean, 500 -> number, '32px' -> string.
// This lets DEFAULT_CONFIG define both defaults and the shape of SelectConfig
// without locking every property to a single literal value.
type Widen<T> = T extends boolean ? boolean : T extends string ? string : T extends number ? number : T;

type SelectConfig = {
    [K in keyof typeof DEFAULT_CONFIG]: Widen<(typeof DEFAULT_CONFIG)[K]>
};

type ConfigKey = keyof SelectConfig;
type RootNode = ParentNode;

type WorseSelectOptions = {
    observe?: boolean;
};

const configKeys = Object.keys(DEFAULT_CONFIG) as ConfigKey[];

// Bidirectional lookup tables between native <option> elements and their rendered
// custom counterparts. WeakMap keeps this bookkeeping GC-friendly when options or
// whole selects are removed from the document.
const optionToDiv = new WeakMap<HTMLOptionElement, HTMLDivElement>();
const divToOption = new WeakMap<HTMLDivElement, HTMLOptionElement>();

// One WorseSelect instance per native <select>.
// This protects against double-mounting when worseSelect() is called repeatedly.
const instances = new WeakMap<HTMLSelectElement, WorseSelect>();

let worseSelectIdCounter = 0;

/**
 * Internal controller for a single enhanced `<select>` element.
 *
 * This class is intentionally not exported. Consumers should use {@link worseSelect} instead of
 * instantiating or managing instances directly.
 */
class WorseSelect {
    selectElement: HTMLSelectElement;
    config: SelectConfig;
    root: RootNode;
    instanceId: string;

    worseSelectElement?: HTMLDivElement;
    headerElement?: HTMLButtonElement;
    optionsWrapperElement?: HTMLDivElement;
    optionsScrollerElement?: HTMLDivElement;
    searchInputElement?: HTMLInputElement;
    statusElement?: HTMLDivElement;
    optionObserver?: MutationObserver;

    // Event listener references are stored so destroy() can reliably unregister them.
    // This matters for open-source reuse where components may mount/unmount frequently.
    onSelectChange?: EventListener;
    onOptionsClick?: EventListener;
    onHeaderClick?: EventListener;
    onHeaderKeyDown?: EventListener;
    onOptionsKeyDown?: EventListener;
    onDocumentPointerDown?: EventListener;
    onSearchInput?: EventListener;
    onSearchKeyDown?: EventListener;

    // open controls dropdown visibility in single-select mode.
    // searchTerm is intentionally held on the instance so filtering survives internal rerenders.
    open = false;
    searchTerm = '';
    lastSearchStatusMessage = '';
    activeOption?: HTMLOptionElement;

    constructor(
        selectElement: HTMLSelectElement,
        config: Partial<SelectConfig> = {},
        root: RootNode = document
    ) {
        this.selectElement = selectElement;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.root = root;
        this.instanceId = `worse-select-${++worseSelectIdCounter}`;
    }

    mount() {
        // Mount is idempotent so consumers can safely call it without guarding.
        if (this.worseSelectElement) return;

        ensureStyles();

        this.worseSelectElement = createWorseSelect(this);
        this.headerElement = this.worseSelectElement.querySelector('.worse-select-header') as HTMLButtonElement | undefined;
        this.optionsWrapperElement = this.worseSelectElement.querySelector('.worse-select-options') as HTMLDivElement | undefined;
        this.optionsScrollerElement = this.worseSelectElement.querySelector('.worse-select-options-scroller') as HTMLDivElement | undefined;
        this.searchInputElement = this.worseSelectElement.querySelector('.worse-select-search-input') as HTMLInputElement | undefined;
        this.statusElement = this.worseSelectElement.querySelector('.worse-select-status') as HTMLDivElement | undefined;

        bindSelectEvents(this);
        handleOptionChanges(this);
        renderSelect(this);
    }

    destroy() {
        this.optionObserver?.disconnect();
        this.optionObserver = undefined;

        if (this.onSelectChange) {
            this.selectElement.removeEventListener('change', this.onSelectChange);
            this.onSelectChange = undefined;
        }

        if (this.onOptionsClick && this.optionsWrapperElement) {
            this.optionsWrapperElement.removeEventListener('click', this.onOptionsClick);
            this.onOptionsClick = undefined;
        }

        if (this.onHeaderClick && this.headerElement) {
            this.headerElement.removeEventListener('click', this.onHeaderClick);
            this.onHeaderClick = undefined;
        }

        if (this.onHeaderKeyDown && this.headerElement) {
            this.headerElement.removeEventListener('keydown', this.onHeaderKeyDown);
            this.onHeaderKeyDown = undefined;
        }

        if (this.onOptionsKeyDown && this.optionsScrollerElement) {
            this.optionsScrollerElement.removeEventListener('keydown', this.onOptionsKeyDown);
            this.onOptionsKeyDown = undefined;
        }

        if (this.onDocumentPointerDown) {
            document.removeEventListener('pointerdown', this.onDocumentPointerDown);
            this.onDocumentPointerDown = undefined;
        }

        if (this.onSearchInput && this.searchInputElement) {
            this.searchInputElement.removeEventListener('input', this.onSearchInput);
            this.onSearchInput = undefined;
        }

        if (this.onSearchKeyDown && this.searchInputElement) {
            this.searchInputElement.removeEventListener('keydown', this.onSearchKeyDown);
            this.onSearchKeyDown = undefined;
        }

        // Drop all option links before removing DOM so future mounts start cleanly.
        Array.from(this.selectElement.options).forEach(unlinkOption);

        this.worseSelectElement?.remove();
        this.selectElement.style.display = '';

        this.worseSelectElement = undefined;
        this.headerElement = undefined;
        this.optionsWrapperElement = undefined;
        this.optionsScrollerElement = undefined;
        this.searchInputElement = undefined;
        this.statusElement = undefined;
        this.open = false;
        this.searchTerm = '';
        this.lastSearchStatusMessage = '';
        this.activeOption = undefined;
    }
}

/**
 * Enhances every native `<select>` element inside the provided root.
 *
 * The function is safe to call multiple times. Each `<select>` is mounted at most once, which
 * makes it suitable for progressive enhancement after initial page load or after partial DOM
 * updates.
 *
 * If `options.observe` is `true`, the root is also watched for newly added `<select>` elements
 * and those are enhanced automatically.
 *
 * The returned cleanup function disconnects any root observer created for this call and destroys
 * mounted worse-select instances found under the provided root.
 *
 * @param root - The DOM subtree to scan for `<select>` elements.
 * @param options - Optional behavior flags such as DOM observation.
 */
export function worseSelect(
    root: RootNode = document,
    options: WorseSelectOptions = {}
): () => void {
    mountSelectsInRoot(root);

    let rootObserver: MutationObserver | undefined;

    if (options.observe) {
        rootObserver = new MutationObserver(mutationList => {
            for (const mutation of mutationList) {
                if (mutation.type !== 'childList') continue;

                mutation.addedNodes.forEach(addedNode => {
                    if (!(addedNode instanceof Element)) return;

                    if (addedNode instanceof HTMLSelectElement) {
                        mountSelectElement(addedNode, root);
                        return;
                    }

                    const nestedSelectElements = addedNode.querySelectorAll<HTMLSelectElement>('select');
                    nestedSelectElements.forEach(selectElement => {
                        mountSelectElement(selectElement, root);
                    });
                });
            }
        });

        rootObserver.observe(root, {
            childList: true,
            subtree: true
        });
    }

    return () => {
        rootObserver?.disconnect();

        const selectElements = getSelectElementsInRoot(root);
        selectElements.forEach(selectElement => {
            const worseSelectInstance = instances.get(selectElement);
            if (!worseSelectInstance) return;

            worseSelectInstance.destroy();
            instances.delete(selectElement);
        });
    };
}

function getSelectElementsInRoot(root: RootNode) {
    return Array.from(root.querySelectorAll<HTMLSelectElement>('select'));
}

function mountSelectsInRoot(root: RootNode) {
    const selectElements = getSelectElementsInRoot(root);
    selectElements.forEach(selectElement => {
        mountSelectElement(selectElement, root);
    });
}

function mountSelectElement(selectElement: HTMLSelectElement, root: RootNode) {
    const existingWorseSelectInstance = instances.get(selectElement);
    if (existingWorseSelectInstance) return;

    const worseSelectInstance = new WorseSelect(selectElement, getConfig(selectElement), root);
    worseSelectInstance.mount();
    instances.set(selectElement, worseSelectInstance);
}

function ensureStyles() {
    if (document.querySelector('[data-worse-select-styles="true"]')) return;

    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-worse-select-styles', 'true');
    styleElement.textContent = `
        .worse-select-container {
            --ws-border-color: #767676;
            --ws-border-radius: 2px;
            --ws-bg: #fff;
            --ws-text-color: inherit;
            --ws-disabled-bg: #f0f0f0;
            --ws-disabled-text-color: #6d6d6d;
            --ws-hover-bg: #e8f0fe;
            --ws-active-bg: #eef4ff;
            --ws-active-outline: #2563eb;
            --ws-selected-bg: #d2e3fc;
            --ws-selected-text-color: #174ea6;
            --ws-focus-outline: #2563eb;
            --ws-search-border-color: #b7b7b7;
            --ws-divider-color: #d0d0d0;
            --ws-highlight-bg: #fff3a3;
            --ws-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);

            position: relative;
            display: inline-block;
            min-width: 0;
            font: inherit;
            vertical-align: middle;
            color: var(--ws-text-color);
        }

        .worse-select-container.listbox {
            width: 100%;
        }

        .worse-select-header {
            box-sizing: border-box;
            width: ${DEFAULT_CONFIG.width};
            height: ${DEFAULT_CONFIG.height};
            padding: 0 28px 0 8px;
            border: 1px solid var(--ws-border-color);
            border-radius: var(--ws-border-radius);
            background-color: var(--ws-bg);
            background-repeat: no-repeat;
            background-position: right 8px center;
            background-size: 10px 10px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            color: var(--ws-text-color);
            font: inherit;
            line-height: normal;
            text-align: left;
            cursor: pointer;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .worse-select-container.listbox .worse-select-header {
            display: none;
        }

        .worse-select-header-label {
            display: block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .worse-select-container.open .worse-select-header {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 7.5L6 4.5L9 7.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        }

        .worse-select-container.disabled .worse-select-header {
            background-color: var(--ws-disabled-bg);
            color: var(--ws-disabled-text-color);
            cursor: not-allowed;
        }

        .worse-select-header:focus-visible,
        .worse-select-options-scroller:focus-visible,
        .worse-select-search-input:focus-visible {
            outline: 2px solid var(--ws-focus-outline);
            outline-offset: 1px;
        }

        .worse-select-options {
            box-sizing: border-box;
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            right: 0;
            z-index: 1000;
            display: none;
            border: 1px solid var(--ws-border-color);
            border-radius: var(--ws-border-radius);
            background: var(--ws-bg);
            box-shadow: var(--ws-shadow);
            padding: 2px;
        }

        .worse-select-container.open .worse-select-options {
            display: block;
        }

        .worse-select-container.listbox .worse-select-options {
            position: relative;
            top: 0;
            left: 0;
            right: auto;
            display: block;
            box-shadow: none;
        }

        .worse-select-search {
            padding: 4px;
            border-bottom: 1px solid var(--ws-divider-color);
            margin-bottom: 2px;
        }

        .worse-select-search-input {
            box-sizing: border-box;
            width: 100%;
            height: 32px;
            padding: 0 8px;
            border: 1px solid var(--ws-search-border-color);
            border-radius: var(--ws-border-radius);
            font: inherit;
            color: var(--ws-text-color);
            background: var(--ws-bg);
        }

        .worse-select-options-scroller {
            max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
            overflow-y: auto;
        }

        .worse-select-option {
            padding: 4px 8px;
            border-radius: var(--ws-border-radius);
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--ws-text-color);
        }

        .worse-select-option:hover {
            background: var(--ws-hover-bg);
        }

        .worse-select-option.active {
            background: var(--ws-active-bg);
            outline: 1px solid var(--ws-active-outline);
            outline-offset: -1px;
        }

        .worse-select-option.selected {
            background: var(--ws-selected-bg);
            color: var(--ws-selected-text-color);
        }

        .worse-select-option.selected.active {
            outline: 1px solid var(--ws-active-outline);
            outline-offset: -1px;
        }

        .worse-select-option.disabled {
            color: var(--ws-disabled-text-color);
            cursor: not-allowed;
        }

        .worse-select-option.disabled:hover {
            background: transparent;
        }

        .worse-select-option.hidden {
            display: none;
        }

        .worse-select-option mark {
            background: var(--ws-highlight-bg);
            color: inherit;
            padding: 0;
        }

        .worse-select-visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;

    document.head.appendChild(styleElement);
}

function toKebabCase(value: string) {
    return value.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);
}

function parseConfigValue<K extends ConfigKey>(key: K, attr: string): SelectConfig[K] {
    const defaultValue = DEFAULT_CONFIG[key];

    if (typeof defaultValue === 'boolean') {
        return (attr === 'true') as SelectConfig[K];
    }

    if (typeof defaultValue === 'number') {
        return Number(attr) as SelectConfig[K];
    }

    return attr as SelectConfig[K];
}

function getConfig(selectElement: Element): SelectConfig {
    const config: SelectConfig = { ...DEFAULT_CONFIG };

    for (let i = 0; i < configKeys.length; i++) {
        const key = configKeys[i];
        const dataAttributeName = `data-${toKebabCase(key)}`;
        const attr = selectElement.getAttribute(dataAttributeName);

        if (attr === null) continue;

        (config as Record<ConfigKey, string | boolean | number>)[key] = parseConfigValue(key, attr);
    }

    return config;
}

function buildStyleAttribute(styleParts: string[]) {
    return styleParts.length > 0
        ? ` style="${styleParts.join(' ')}"`
        : '';
}

function buildWorseSelectHeaderStyleAttribute(worseSelectInstance: WorseSelect) {
    const headerStyleParts: string[] = [];

    if (worseSelectInstance.config.width !== DEFAULT_CONFIG.width) {
        headerStyleParts.push(`width: ${worseSelectInstance.config.width};`);
    }

    if (worseSelectInstance.config.height !== DEFAULT_CONFIG.height) {
        headerStyleParts.push(`height: ${worseSelectInstance.config.height};`);
    }

    return buildStyleAttribute(headerStyleParts);
}

function shouldUseListboxMode(worseSelectInstance: WorseSelect) {
    return worseSelectInstance.selectElement.size > 1;
}

function isMultipleSelect(worseSelectInstance: WorseSelect) {
    return worseSelectInstance.selectElement.multiple;
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightOptionLabel(label: string, searchTerm: string) {
    const escapedLabel = escapeHtml(label);
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
        return escapedLabel;
    }

    const matcher = new RegExp(`(${escapeRegExp(trimmedSearchTerm)})`, 'ig');
    return escapedLabel.replace(matcher, '<mark>$1</mark>');
}

function getOptionElementId(worseSelectInstance: WorseSelect, optionIndex: number) {
    return `${worseSelectInstance.instanceId}-option-${optionIndex}`;
}

function linkOption(selectOption: HTMLOptionElement, worseOptionElement: HTMLDivElement) {
    optionToDiv.set(selectOption, worseOptionElement);
    divToOption.set(worseOptionElement, selectOption);
}

function unlinkOption(selectOption: HTMLOptionElement) {
    const worseOptionElement = optionToDiv.get(selectOption);
    if (!worseOptionElement) return;

    optionToDiv.delete(selectOption);
    divToOption.delete(worseOptionElement);
}

function getWorseOptionClasses(selectOption: HTMLOptionElement) {
    const classes = ['worse-select-option'];

    if (selectOption.disabled) {
        classes.push('disabled');
    }

    if (selectOption.selected) {
        classes.push('selected');
    }

    return classes.join(' ');
}

function createWorseOptionHtml(
    worseSelectInstance: WorseSelect,
    selectOption: HTMLOptionElement,
    optionIndex: number,
    searchTerm = ''
) {
    const worseOptionClasses = getWorseOptionClasses(selectOption);
    const optionLabel = selectOption.textContent ?? '';
    const optionLabelHtml = highlightOptionLabel(optionLabel, searchTerm);

    return `
    <div
        id="${getOptionElementId(worseSelectInstance, optionIndex)}"
        class="${worseOptionClasses}"
        data-value="${escapeHtml(selectOption.value)}"
        data-label="${escapeHtml(optionLabel)}"
        role="option"
        aria-selected="${selectOption.selected ? 'true' : 'false'}"
        aria-disabled="${selectOption.disabled ? 'true' : 'false'}">
        <span class="worse-select-option-label">${optionLabelHtml}</span>
    </div>
    `;
}

function createWorseOptionElement(
    worseSelectInstance: WorseSelect,
    selectOption: HTMLOptionElement,
    optionIndex: number,
    searchTerm = ''
) {
    const worseOptionElement = document.createRange().createContextualFragment(
        createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex, searchTerm)
    ).firstElementChild as HTMLDivElement;

    linkOption(selectOption, worseOptionElement);

    return worseOptionElement;
}

function createSearchHtml(worseSelectInstance: WorseSelect) {
    if (!worseSelectInstance.config.searchable) {
        return '';
    }

    return `
      <div class="worse-select-search">
        <input
            type="text"
            class="worse-select-search-input"
            placeholder="Search list"
            autocomplete="off"
            aria-label="Search options" />
      </div>
    `;
}

function createStatusHtml(worseSelectInstance: WorseSelect) {
    if (!worseSelectInstance.config.searchable) {
        return '';
    }

    return `
      <div
        class="worse-select-status worse-select-visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"></div>
    `;
}

function createWorseSelect(worseSelectInstance: WorseSelect) {
    const headerStyleAttribute = buildWorseSelectHeaderStyleAttribute(worseSelectInstance);
    const containerClasses = ['worse-select-container'];

    if (shouldUseListboxMode(worseSelectInstance)) {
        containerClasses.push('listbox');
    }

    if (isMultipleSelect(worseSelectInstance)) {
        containerClasses.push('multiple');
    }

    const htmlString = `
    <div class="${containerClasses.join(' ')}">
      <button
        type="button"
        class="worse-select-header"
        aria-haspopup="listbox"
        aria-expanded="false">
        <span class="worse-select-header-label"></span>
      </button>
      <div class="worse-select-options">
        ${createSearchHtml(worseSelectInstance)}
        ${createStatusHtml(worseSelectInstance)}
        <div class="worse-select-options-scroller"${headerStyleAttribute}></div>
      </div>
    </div>
    `;

    const worseSelectElement = document.createRange().createContextualFragment(
        htmlString
    ).firstElementChild as HTMLDivElement;

    const optionsScrollerElement = worseSelectElement.querySelector('.worse-select-options-scroller') as HTMLDivElement;
    optionsScrollerElement.setAttribute('role', 'listbox');
    optionsScrollerElement.tabIndex = shouldUseListboxMode(worseSelectInstance) ? 0 : -1;

    if (isMultipleSelect(worseSelectInstance)) {
        optionsScrollerElement.setAttribute('aria-multiselectable', 'true');
    }

    const selectOptions = worseSelectInstance.selectElement.options;
    for (let i = 0; i < selectOptions.length; i++) {
        const worseOptionElement = createWorseOptionElement(
            worseSelectInstance,
            selectOptions[i],
            i,
            worseSelectInstance.searchTerm
        );
        optionsScrollerElement.appendChild(worseOptionElement);
    }

    return worseSelectElement;
}

function syncDimensionsFromNative(worseSelectInstance: WorseSelect) {
    const worseSelectElement = worseSelectInstance.worseSelectElement;
    const headerElement = worseSelectInstance.headerElement;
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    const selectElement = worseSelectInstance.selectElement;

    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const computedStyle = window.getComputedStyle(selectElement);

    if (computedStyle.width && computedStyle.width !== 'auto') {
        worseSelectElement.style.width = computedStyle.width;
    }

    if (computedStyle.height && computedStyle.height !== 'auto' && computedStyle.height !== '0px') {
        headerElement.style.height = computedStyle.height;
    }

    headerElement.style.font = computedStyle.font;
    optionsScrollerElement.style.maxHeight = `${worseSelectInstance.config.dropdownHeightPx}px`;
}

function getSelectableVisibleOptions(worseSelectInstance: WorseSelect) {
    return Array.from(worseSelectInstance.selectElement.options).filter(selectOption => {
        if (selectOption.disabled) return false;

        const worseOptionElement = optionToDiv.get(selectOption);
        if (!(worseOptionElement instanceof HTMLDivElement)) return false;

        return !worseOptionElement.classList.contains('hidden');
    });
}

function scrollOptionIntoView(selectOption: HTMLOptionElement | undefined) {
    if (!selectOption) return;

    const worseOptionElement = optionToDiv.get(selectOption);
    if (!(worseOptionElement instanceof HTMLDivElement)) return;

    worseOptionElement.scrollIntoView({ block: 'nearest' });
}

function getDefaultActiveOption(worseSelectInstance: WorseSelect) {
    const selectableVisibleOptions = getSelectableVisibleOptions(worseSelectInstance);
    if (selectableVisibleOptions.length === 0) return undefined;

    const selectedVisibleOption = selectableVisibleOptions.find(selectOption => selectOption.selected);
    return selectedVisibleOption ?? selectableVisibleOptions[0];
}

function ensureValidActiveOption(worseSelectInstance: WorseSelect) {
    const selectableVisibleOptions = getSelectableVisibleOptions(worseSelectInstance);

    if (selectableVisibleOptions.length === 0) {
        worseSelectInstance.activeOption = undefined;
        updateActiveDescendant(worseSelectInstance);
        updateWorseActiveState(worseSelectInstance);
        return;
    }

    const currentActiveOption = worseSelectInstance.activeOption;
    if (currentActiveOption && selectableVisibleOptions.includes(currentActiveOption)) {
        updateActiveDescendant(worseSelectInstance);
        updateWorseActiveState(worseSelectInstance);
        return;
    }

    worseSelectInstance.activeOption = getDefaultActiveOption(worseSelectInstance);
    updateActiveDescendant(worseSelectInstance);
    updateWorseActiveState(worseSelectInstance);
}

function updateActiveDescendant(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const activeOption = worseSelectInstance.activeOption;
    if (!activeOption) {
        optionsScrollerElement.removeAttribute('aria-activedescendant');
        return;
    }

    const worseOptionElement = optionToDiv.get(activeOption);
    if (!(worseOptionElement instanceof HTMLDivElement)) {
        optionsScrollerElement.removeAttribute('aria-activedescendant');
        return;
    }

    optionsScrollerElement.setAttribute('aria-activedescendant', worseOptionElement.id);
}

function updateWorseActiveState(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    Array.from(optionsScrollerElement.children).forEach(worseOptionElement => {
        if (!(worseOptionElement instanceof HTMLDivElement)) return;
        worseOptionElement.classList.remove('active');
    });

    const activeOption = worseSelectInstance.activeOption;
    if (!activeOption) return;

    const worseOptionElement = optionToDiv.get(activeOption);
    worseOptionElement?.classList.add('active');
}

function setActiveOption(
    worseSelectInstance: WorseSelect,
    selectOption: HTMLOptionElement | undefined,
    scrollIntoView = true
) {
    worseSelectInstance.activeOption = selectOption;
    updateActiveDescendant(worseSelectInstance);
    updateWorseActiveState(worseSelectInstance);

    if (scrollIntoView) {
        scrollOptionIntoView(selectOption);
    }
}

function moveActiveOption(worseSelectInstance: WorseSelect, delta: number) {
    const selectableVisibleOptions = getSelectableVisibleOptions(worseSelectInstance);
    if (selectableVisibleOptions.length === 0) return;

    const currentActiveOption = worseSelectInstance.activeOption;
    const currentIndex = currentActiveOption
        ? selectableVisibleOptions.indexOf(currentActiveOption)
        : -1;

    const fallbackIndex = delta > 0 ? 0 : selectableVisibleOptions.length - 1;
    const nextIndex = currentIndex === -1
        ? fallbackIndex
        : Math.max(0, Math.min(selectableVisibleOptions.length - 1, currentIndex + delta));

    setActiveOption(worseSelectInstance, selectableVisibleOptions[nextIndex]);
}

function moveActiveOptionToBoundary(worseSelectInstance: WorseSelect, boundary: 'start' | 'end') {
    const selectableVisibleOptions = getSelectableVisibleOptions(worseSelectInstance);
    if (selectableVisibleOptions.length === 0) return;

    const targetOption = boundary === 'start'
        ? selectableVisibleOptions[0]
        : selectableVisibleOptions[selectableVisibleOptions.length - 1];

    setActiveOption(worseSelectInstance, targetOption);
}

function getPageJumpSize(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return 10;

    const firstVisibleOptionElement = Array.from(
        optionsScrollerElement.querySelectorAll('.worse-select-option')
    ).find(optionElement => {
        return optionElement instanceof HTMLDivElement && !optionElement.classList.contains('hidden');
    });

    if (!(firstVisibleOptionElement instanceof HTMLDivElement)) {
        return 10;
    }

    const optionHeight = firstVisibleOptionElement.offsetHeight || 1;
    return Math.max(1, Math.floor(optionsScrollerElement.clientHeight / optionHeight));
}

function moveActiveOptionByPage(worseSelectInstance: WorseSelect, direction: 1 | -1) {
    const pageJumpSize = getPageJumpSize(worseSelectInstance);
    moveActiveOption(worseSelectInstance, direction * pageJumpSize);
}

function commitActiveOptionSelection(worseSelectInstance: WorseSelect) {
    const activeOption = worseSelectInstance.activeOption;
    const selectElement = worseSelectInstance.selectElement;

    if (!activeOption || activeOption.disabled) return;

    if (selectElement.multiple) {
        activeOption.selected = !activeOption.selected;
    } else {
        selectElement.selectedIndex = Array.from(selectElement.options).indexOf(activeOption);
    }

    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
}

function closeWorseSelect(worseSelectInstance: WorseSelect) {
    if (shouldUseListboxMode(worseSelectInstance)) return;

    worseSelectInstance.open = false;
    updateWorseOpenState(worseSelectInstance);
}

function openWorseSelect(worseSelectInstance: WorseSelect) {
    if (worseSelectInstance.selectElement.disabled) return;
    if (shouldUseListboxMode(worseSelectInstance)) return;

    worseSelectInstance.open = true;
    updateWorseOpenState(worseSelectInstance);
    ensureValidActiveOption(worseSelectInstance);
}

function openWorseSelectAndFocusList(worseSelectInstance: WorseSelect) {
    openWorseSelect(worseSelectInstance);

    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    optionsScrollerElement.tabIndex = 0;
    optionsScrollerElement.focus();
    ensureValidActiveOption(worseSelectInstance);
    scrollOptionIntoView(worseSelectInstance.activeOption);
}

function closeWorseSelectAndFocusHeader(worseSelectInstance: WorseSelect) {
    closeWorseSelect(worseSelectInstance);
    worseSelectInstance.headerElement?.focus();
}

function toggleWorseSelect(worseSelectInstance: WorseSelect) {
    if (shouldUseListboxMode(worseSelectInstance)) return;

    if (worseSelectInstance.open) {
        closeWorseSelect(worseSelectInstance);
    } else {
        openWorseSelect(worseSelectInstance);
    }
}

function updateWorseOpenState(worseSelectInstance: WorseSelect) {
    if (!(worseSelectInstance.worseSelectElement instanceof HTMLDivElement)) return;

    const isListboxMode = shouldUseListboxMode(worseSelectInstance);
    const isOpen = isListboxMode ? true : worseSelectInstance.open;

    worseSelectInstance.worseSelectElement.classList.toggle('open', isOpen);
    worseSelectInstance.worseSelectElement.classList.toggle('listbox', isListboxMode);
    worseSelectInstance.worseSelectElement.classList.toggle('multiple', isMultipleSelect(worseSelectInstance));

    if (worseSelectInstance.headerElement instanceof HTMLButtonElement) {
        worseSelectInstance.headerElement.setAttribute('aria-expanded', String(isOpen));
    }

    if (worseSelectInstance.optionsScrollerElement instanceof HTMLDivElement) {
        worseSelectInstance.optionsScrollerElement.setAttribute('aria-multiselectable', String(isMultipleSelect(worseSelectInstance)));
        optionsScrollerTabState(worseSelectInstance);
    }
}

function optionsScrollerTabState(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const isListboxMode = shouldUseListboxMode(worseSelectInstance);
    const isOpen = isListboxMode ? true : worseSelectInstance.open;
    optionsScrollerElement.tabIndex = isOpen ? 0 : -1;
}

function updateWorseSelectedState(worseSelectInstance: WorseSelect) {
    const worseSelectElement = worseSelectInstance.worseSelectElement;
    const selectElement = worseSelectInstance.selectElement;

    if (!(worseSelectElement instanceof HTMLDivElement)) return;

    const optionsScrollerElement = worseSelectElement.querySelector('.worse-select-options-scroller');
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    Array.from(optionsScrollerElement.children).forEach(worseOptionElement => {
        if (!(worseOptionElement instanceof HTMLDivElement)) return;
        worseOptionElement.classList.remove('selected');
        worseOptionElement.setAttribute('aria-selected', 'false');
    });

    Array.from(selectElement.options).forEach(selectOption => {
        if (!selectOption.selected) return;

        const worseOptionElement = optionToDiv.get(selectOption);
        worseOptionElement?.classList.add('selected');
        worseOptionElement?.setAttribute('aria-selected', 'true');
    });
}

function updateWorseDisabledState(worseSelectInstance: WorseSelect) {
    const worseSelectElement = worseSelectInstance.worseSelectElement;
    const selectElement = worseSelectInstance.selectElement;
    const headerElement = worseSelectInstance.headerElement;
    const searchInputElement = worseSelectInstance.searchInputElement;

    if (!(worseSelectElement instanceof HTMLDivElement)) return;

    worseSelectElement.classList.toggle('disabled', selectElement.disabled);

    if (headerElement instanceof HTMLButtonElement) {
        headerElement.disabled = selectElement.disabled;
        headerElement.setAttribute('aria-disabled', String(selectElement.disabled));
    }

    if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.disabled = selectElement.disabled;
    }

    Array.from(selectElement.options).forEach(selectOption => {
        const worseOptionElement = optionToDiv.get(selectOption);
        worseOptionElement?.classList.toggle('disabled', selectOption.disabled);
        worseOptionElement?.setAttribute('aria-disabled', String(selectOption.disabled'));
    });
}

function updateWorseHeaderState(worseSelectInstance: WorseSelect) {
    const headerElement = worseSelectInstance.headerElement;
    const selectElement = worseSelectInstance.selectElement;

    if (!(headerElement instanceof HTMLButtonElement)) return;

    const headerLabelElement = headerElement.querySelector('.worse-select-header-label');
    if (!(headerLabelElement instanceof HTMLSpanElement)) return;

    const selectedOption =
        selectElement.selectedOptions[0] ??
        selectElement.options[selectElement.selectedIndex] ??
        null;

    const label = selectedOption?.textContent?.trim() || '';

    headerLabelElement.textContent = label;
    headerElement.title = label;
    headerElement.setAttribute('aria-label', label ? `Selected: ${label}` : 'Select an option');
}

function scrollFirstVisibleMatchIntoView(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const firstVisibleMatch = Array.from(optionsScrollerElement.querySelectorAll('.worse-select-option'))
        .find(optionElement => {
            if (!(optionElement instanceof HTMLDivElement)) return false;
            return !optionElement.classList.contains('hidden') && optionElement.querySelector('mark');
        });

    if (!(firstVisibleMatch instanceof HTMLDivElement)) return;

    firstVisibleMatch.scrollIntoView({ block: 'nearest' });
}

function updateSearchStatus(worseSelectInstance: WorseSelect) {
    const statusElement = worseSelectInstance.statusElement;
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;

    if (!(statusElement instanceof HTMLDivElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const searchTerm = worseSelectInstance.searchTerm.trim();
    if (!searchTerm) {
        statusElement.textContent = '';
        worseSelectInstance.lastSearchStatusMessage = '';
        return;
    }

    const visibleResultCount = Array.from(
        optionsScrollerElement.querySelectorAll('.worse-select-option')
    ).filter(optionElement => {
        return optionElement instanceof HTMLDivElement && !optionElement.classList.contains('hidden');
    }).length;

    const nextMessage =
        visibleResultCount === 0
            ? 'No results found'
            : visibleResultCount === 1
                ? '1 result available'
                : `${visibleResultCount} results available`;

    if (nextMessage === worseSelectInstance.lastSearchStatusMessage) {
        return;
    }

    worseSelectInstance.lastSearchStatusMessage = nextMessage;

    statusElement.textContent = '';
    window.setTimeout(() => {
        if (worseSelectInstance.statusElement === statusElement) {
            statusElement.textContent = nextMessage;
        }
    }, 0);
}

function applySearchFilter(worseSelectInstance: WorseSelect) {
    const searchTerm = worseSelectInstance.searchTerm.trim().toLowerCase();

    Array.from(worseSelectInstance.selectElement.options).forEach(selectOption => {
        const worseOptionElement = optionToDiv.get(selectOption);
        if (!(worseOptionElement instanceof HTMLDivElement)) return;

        const label = selectOption.textContent ?? '';
        const matches = !searchTerm || label.toLowerCase().includes(searchTerm);

        worseOptionElement.classList.toggle('hidden', !matches);

        const labelElement = worseOptionElement.querySelector('.worse-select-option-label');
        if (labelElement instanceof HTMLSpanElement) {
            labelElement.innerHTML = highlightOptionLabel(label, worseSelectInstance.searchTerm);
        }

        worseOptionElement.setAttribute('data-label', label);
    });

    updateSearchStatus(worseSelectInstance);
    ensureValidActiveOption(worseSelectInstance);
    scrollFirstVisibleMatchIntoView(worseSelectInstance);
}

function bindSelectEvents(worseSelectInstance: WorseSelect) {
    const worseSelectElement = worseSelectInstance.worseSelectElement;
    const selectElement = worseSelectInstance.selectElement;
    const optionsWrapperElement = worseSelectInstance.optionsWrapperElement;
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    const headerElement = worseSelectInstance.headerElement;
    const searchInputElement = worseSelectInstance.searchInputElement;

    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(optionsWrapperElement instanceof HTMLDivElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;

    const onOptionsClick: EventListener = event => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) return;

        const worseOptionElement = eventTarget.closest('.worse-select-option');
        if (!(worseOptionElement instanceof HTMLDivElement)) return;
        if (!optionsWrapperElement.contains(worseOptionElement)) return;
        if (worseOptionElement.classList.contains('disabled')) return;
        if (worseOptionElement.classList.contains('hidden')) return;

        const selectOption = divToOption.get(worseOptionElement);
        if (!selectOption || selectOption.disabled) return;

        setActiveOption(worseSelectInstance, selectOption, false);

        if (selectElement.multiple) {
            selectOption.selected = !selectOption.selected;
        } else {
            selectElement.selectedIndex = Array.from(selectElement.options).indexOf(selectOption);
        }

        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        closeWorseSelect(worseSelectInstance);
    };

    const onSelectChange: EventListener = () => {
        updateWorseHeaderState(worseSelectInstance);
        updateWorseSelectedState(worseSelectInstance);
        updateWorseDisabledState(worseSelectInstance);
        updateWorseOpenState(worseSelectInstance);
        syncDimensionsFromNative(worseSelectInstance);
        applySearchFilter(worseSelectInstance);
        ensureValidActiveOption(worseSelectInstance);
    };

    const onHeaderClick: EventListener = () => {
        toggleWorseSelect(worseSelectInstance);
    };

    const onHeaderKeyDown: EventListener = event => {
        if (!(event instanceof KeyboardEvent)) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveOption(worseSelectInstance, 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveOption(worseSelectInstance, -1);
                break;
            case 'Home':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveOptionToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveOptionToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveOptionByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance, -1);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (worseSelectInstance.open) {
                    closeWorseSelectAndFocusHeader(worseSelectInstance);
                } else {
                    openWorseSelectAndFocusList(worseSelectInstance);
                }
                break;
            default:
                break;
        }
    };

    const onOptionsKeyDown: EventListener = event => {
        if (!(event instanceof KeyboardEvent)) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                moveActiveOption(worseSelectInstance, 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                moveActiveOption(worseSelectInstance, -1);
                break;
            case 'Home':
                event.preventDefault();
                moveActiveOptionToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                moveActiveOptionToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                moveActiveOptionByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                moveActiveOptionByPage(worseSelectInstance, -1);
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                commitActiveOptionSelection(worseSelectInstance);
                if (!selectElement.multiple) {
                    closeWorseSelectAndFocusHeader(worseSelectInstance);
                }
                break;
            case 'Escape':
                event.preventDefault();
                closeWorseSelectAndFocusHeader(worseSelectInstance);
                break;
            default:
                break;
        }
    };

    const onDocumentPointerDown: EventListener = event => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof Node)) return;
        if (!worseSelectElement.contains(eventTarget)) {
            closeWorseSelect(worseSelectInstance);
        }
    };

    const onSearchInput: EventListener = event => {
        const eventTarget = event.target;
        if (!(eventTarget instanceof HTMLInputElement)) return;

        worseSelectInstance.searchTerm = eventTarget.value;
        applySearchFilter(worseSelectInstance);
    };

    const onSearchKeyDown: EventListener = event => {
        if (!(event instanceof KeyboardEvent)) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOption(worseSelectInstance, 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOption(worseSelectInstance, -1);
                break;
            case 'Home':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOptionToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOptionToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOptionByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveOptionByPage(worseSelectInstance, -1);
                break;
            case 'Escape':
                event.preventDefault();
                closeWorseSelectAndFocusHeader(worseSelectInstance);
                break;
            default:
                break;
        }
    };

    optionsWrapperElement.addEventListener('click', onOptionsClick);
    selectElement.addEventListener('change', onSelectChange);
    headerElement.addEventListener('click', onHeaderClick);
    headerElement.addEventListener('keydown', onHeaderKeyDown);
    optionsScrollerElement.addEventListener('keydown', onOptionsKeyDown);
    document.addEventListener('pointerdown', onDocumentPointerDown);

    if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.addEventListener('input', onSearchInput);
        searchInputElement.addEventListener('keydown', onSearchKeyDown);
        worseSelectInstance.onSearchInput = onSearchInput;
        worseSelectInstance.onSearchKeyDown = onSearchKeyDown;
    }

    worseSelectInstance.onOptionsClick = onOptionsClick;
    worseSelectInstance.onSelectChange = onSelectChange;
    worseSelectInstance.onHeaderClick = onHeaderClick;
    worseSelectInstance.onHeaderKeyDown = onHeaderKeyDown;
    worseSelectInstance.onOptionsKeyDown = onOptionsKeyDown;
    worseSelectInstance.onDocumentPointerDown = onDocumentPointerDown;

    updateWorseHeaderState(worseSelectInstance);
    updateWorseSelectedState(worseSelectInstance);
    updateWorseDisabledState(worseSelectInstance);
    updateWorseOpenState(worseSelectInstance);
    syncDimensionsFromNative(worseSelectInstance);
    applySearchFilter(worseSelectInstance);
    ensureValidActiveOption(worseSelectInstance);
}

function handleOptionChanges(worseSelectInstance: WorseSelect) {
    const worseSelectElement = worseSelectInstance.worseSelectElement;
    const selectElement = worseSelectInstance.selectElement;
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;

    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const observer = new MutationObserver(mutationList => {
        let shouldRebuildOptions = false;
        let shouldUpdateState = false;

        for (const mutation of mutationList) {
            if (mutation.type === 'childList') {
                shouldRebuildOptions = true;
                shouldUpdateState = true;
            }

            if (mutation.type === 'attributes') {
                shouldUpdateState = true;
            }
        }

        if (shouldRebuildOptions) {
            Array.from(selectElement.options).forEach((selectOption, optionIndex) => {
                const existingWorseOptionElement = optionToDiv.get(selectOption);
                if (existingWorseOptionElement instanceof HTMLDivElement) {
                    existingWorseOptionElement.id = getOptionElementId(worseSelectInstance, optionIndex);
                    return;
                }

                const worseOptionElement = createWorseOptionElement(
                    worseSelectInstance,
                    selectOption,
                    optionIndex,
                    worseSelectInstance.searchTerm
                );
                optionsScrollerElement.appendChild(worseOptionElement);
            });

            Array.from(optionsScrollerElement.children).forEach(worseOptionElement => {
                if (!(worseOptionElement instanceof HTMLDivElement)) return;

                const selectOption = divToOption.get(worseOptionElement);
                if (selectOption && Array.from(selectElement.options).includes(selectOption)) {
                    return;
                }

                worseOptionElement.remove();
            });

            Array.from(selectElement.options).forEach((selectOption, optionIndex) => {
                const worseOptionElement = optionToDiv.get(selectOption);
                if (!(worseOptionElement instanceof HTMLDivElement)) return;

                const referenceElement = optionsScrollerElement.children[optionIndex];
                if (referenceElement !== worseOptionElement) {
                    if (referenceElement) {
                        referenceElement.before(worseOptionElement);
                    } else {
                        optionsScrollerElement.appendChild(worseOptionElement);
                    }
                }

                worseOptionElement.id = getOptionElementId(worseSelectInstance, optionIndex);
            });
        }

        if (shouldUpdateState) {
            updateWorseHeaderState(worseSelectInstance);
            updateWorseSelectedState(worseSelectInstance);
            updateWorseDisabledState(worseSelectInstance);
            updateWorseOpenState(worseSelectInstance);
            syncDimensionsFromNative(worseSelectInstance);
            applySearchFilter(worseSelectInstance);
            ensureValidActiveOption(worseSelectInstance);
        }
    });

    observer.observe(selectElement, {
        childList: true,
        subtree: false,
        attributes: true,
        attributeFilter: ['style', 'class', 'disabled', 'multiple', 'size']
    });

    worseSelectInstance.optionObserver = observer;
}

function renderSelect(worseSelectInstance: WorseSelect) {
    const { selectElement, worseSelectElement } = worseSelectInstance;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;

    selectElement.style.display = 'none';
    selectElement.after(worseSelectElement);
}