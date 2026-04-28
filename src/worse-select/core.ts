// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import type {WorseSelectContext} from './internal-types';
/**
 * Progressive-enhancement utilities for native {@link HTMLSelectElement} controls.
 *
 * Keeps the native `<select>` as source of truth for value, disabled state, `size`, and
 * `multiple`, while mirroring that state into a custom DOM structure that is easier to style.
 *
 * Widget-specific behavior uses `data-*` attributes such as `data-searchable` and
 * `data-dropdown-height-px`, keeping the public API aligned with standard HTML.
 */
import { DEFAULT_CONFIG, Plugin, PluginContext, RootNode, SelectConfig, WorseSelectOptions } from './internal-types';
import { createCSS } from './css';
import { getConfig } from './config';
import { createWorseOptionElement, createWorseSelect, getOptionId, scrollOptionIntoView } from './dom';
import { getSelectOptionElement, getWorseOptionElement, linkOption, unlinkOption } from './option-map';
import { getListBoxHeight, isMultipleSelect, isPlaceholderOption, shouldUseListboxMode } from './select-helpers';
import { createBuiltinSearchPlugin } from './features/search';

const instances = new WeakMap<HTMLSelectElement, WorseSelect>();
let nextInstanceId = 0;

type PluginListener = { target: EventTarget; event: string; handler: EventListener };

class WorseSelect implements WorseSelectContext {
    // Tracks all mounted instances so a single document-level pointerdown listener can close any
    // open dropdown when the user clicks outside, instead of registering one listener per instance.
    // Note: `private` is a TypeScript-only constraint and is not enforced in the compiled output.
    private static mountedInstances = new Set<WorseSelect>();
    private static colorSchemeObserver?: MutationObserver;

    private static handleColorSchemeChange() {
        for (const instance of WorseSelect.mountedInstances) {
            instance.updateOpenState();
        }
    }

    private static handleDocumentPointerDown(event: Event) {
        const target = event.target;
        if (!(target instanceof Node)) return;
        for (const instance of WorseSelect.mountedInstances) {
            if (instance.worseSelectElement && !instance.worseSelectElement.contains(target)) {
                instance.closeDropdown();
            }
        }
    }

    private typeAheadTimerId?: number;
    private typeAheadText = '';
    private typeAheadTimeout = 1000;
    selectElement: HTMLSelectElement;
    config: SelectConfig;
    root: RootNode;
    instanceId: string;

    worseSelectElement?: HTMLDivElement;
    headerElement?: HTMLButtonElement;
    dropdownPanelElement?: HTMLDivElement;
    optionsListElement?: HTMLDivElement;
    searchInputElement?: HTMLInputElement;
    messageElement?: HTMLDivElement;
    optionObserver?: MutationObserver;

    onSelectChange?: EventListener;
    onOptionsClick?: EventListener;
    onHeaderClick?: EventListener;
    onHeaderKeyDown?: EventListener;
    onOptionsKeyDown?: EventListener;
    onSearchKeyDown?: EventListener;
    onListboxFocus?: EventListener;

    open = false;
    activeOption?: HTMLOptionElement;

    private plugins: Plugin[] = [];
    private pluginListeners: PluginListener[] = [];

    constructor(selectElement: HTMLSelectElement, config: Partial<SelectConfig> = {}, root: RootNode = document, plugins: Plugin[] = []) {
        this.selectElement = selectElement;
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.root = root;
        this.instanceId = `ws-${++nextInstanceId}`;
        this.plugins = [...plugins];

        if (this.config.searchable && !plugins.some(p => p.name === 'search')) {
            this.plugins.push(createBuiltinSearchPlugin());
        }
    }


    mount() {
        if (this.worseSelectElement) return;

        ensureStyles();

        this.worseSelectElement = createWorseSelect(this);
        this.headerElement = this.worseSelectElement.querySelector('.worse-select-header') as HTMLButtonElement | undefined;
        this.dropdownPanelElement = this.worseSelectElement.querySelector('.worse-select-options') as HTMLDivElement | undefined;
        this.optionsListElement = this.worseSelectElement.querySelector('.worse-select-options-scroller') as HTMLDivElement | undefined;
        this.searchInputElement = this.worseSelectElement.querySelector('.worse-select-search-input') as HTMLInputElement | undefined;
        this.messageElement = this.worseSelectElement.querySelector('.worse-select-message') as HTMLDivElement | undefined;

        if (WorseSelect.mountedInstances.size === 0) {
            document.addEventListener('pointerdown', WorseSelect.handleDocumentPointerDown);
            WorseSelect.colorSchemeObserver = new MutationObserver(WorseSelect.handleColorSchemeChange);
            WorseSelect.colorSchemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
        }
        this.worseSelectElement.addEventListener('keyup', this.handleTypeAhead);
        WorseSelect.mountedInstances.add(this);

        this.render();
        this.bindEvents();
        this.observeOptions();
        this.initPlugins();
    }

    destroy() {
        this.optionObserver?.disconnect();
        this.optionObserver = undefined;

        for (const plugin of this.plugins) {
            plugin.destroy?.();
        }
        for (const { target, event, handler } of this.pluginListeners) {
            target.removeEventListener(event, handler);
        }
        this.pluginListeners = [];
        this.plugins = [];

        if (this.onSelectChange) {
            this.selectElement.removeEventListener('change', this.onSelectChange);
            this.onSelectChange = undefined;
        }

        if (this.onOptionsClick && this.dropdownPanelElement) {
            this.dropdownPanelElement.removeEventListener('click', this.onOptionsClick);
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

        if (this.onOptionsKeyDown && this.optionsListElement) {
            this.optionsListElement.removeEventListener('keydown', this.onOptionsKeyDown);
            this.onOptionsKeyDown = undefined;
        }

        if (this.onSearchKeyDown && this.searchInputElement) {
            this.searchInputElement.removeEventListener('keydown', this.onSearchKeyDown);
            this.onSearchKeyDown = undefined;
        }

        if (this.onListboxFocus && this.optionsListElement) {
            this.optionsListElement.removeEventListener('focus', this.onListboxFocus);
            this.onListboxFocus = undefined;
        }

        WorseSelect.mountedInstances.delete(this);
        if (WorseSelect.mountedInstances.size === 0) {
            document.removeEventListener('pointerdown', WorseSelect.handleDocumentPointerDown);
            WorseSelect.colorSchemeObserver?.disconnect();
            WorseSelect.colorSchemeObserver = undefined;
        }

        this.worseSelectElement?.removeEventListener('keyup', this.handleTypeAhead);

        Array.from(this.selectElement.options).forEach(unlinkOption);

        this.worseSelectElement?.remove();
        this.selectElement.style.display = '';

        this.worseSelectElement = undefined;
        this.headerElement = undefined;
        this.dropdownPanelElement = undefined;
        this.optionsListElement = undefined;
        this.searchInputElement = undefined;
        this.messageElement = undefined;
        this.open = false;
        this.activeOption = undefined;
    }

    syncDimensions() {
        const { worseSelectElement, headerElement, optionsListElement, selectElement, config } = this;
        if (!(worseSelectElement instanceof HTMLDivElement)) return;
        if (!(headerElement instanceof HTMLButtonElement)) return;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        const computedStyle = window.getComputedStyle(selectElement);

        if (computedStyle.width && computedStyle.width !== 'auto' && computedStyle.width !== '0px') {
            worseSelectElement.style.width = computedStyle.width;
        }

        headerElement.style.font = computedStyle.font;
        if (shouldUseListboxMode(this)) {
            const firstOption = optionsListElement.children[0] as HTMLDivElement;
            const height = firstOption ? getListBoxHeight(selectElement, firstOption) : null;
            if (height) optionsListElement.style.height = height;
        } else {
            optionsListElement.style.maxHeight = `${config.dropdownHeightPx}px`;
        }
    }

    updateOpenState() {
        if (!(this.worseSelectElement instanceof HTMLDivElement)) return;

        const isListboxMode = shouldUseListboxMode(this);
        const isOpen = isListboxMode ? true : this.open;

        const computedColorScheme = getComputedStyle(this.selectElement).colorScheme;
        const isDark = computedColorScheme === 'dark' ||
            (computedColorScheme.includes('dark') && window.matchMedia('(prefers-color-scheme: dark)').matches);

        this.worseSelectElement.classList.toggle('open', isOpen);
        this.worseSelectElement.classList.toggle('listbox', isListboxMode);
        this.worseSelectElement.classList.toggle('multiple', isMultipleSelect(this));
        this.worseSelectElement.classList.toggle('dark', isDark);

        if (this.headerElement instanceof HTMLButtonElement) {
            this.headerElement.setAttribute('aria-expanded', String(isOpen));
        }

        if (this.optionsListElement instanceof HTMLDivElement) {
            this.optionsListElement.setAttribute('aria-multiselectable', String(isMultipleSelect(this)));
            this.optionsListElement.tabIndex = isOpen ? 0 : -1;
        }

        this.updateHeaderState();
    }

    updateSelectedState() {
        const { optionsListElement, selectElement } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        Array.from(optionsListElement.querySelectorAll('.worse-select-option')).forEach(el => {
            el.classList.remove('selected');
            el.setAttribute('aria-selected', 'false');
        });

        Array.from(selectElement.options).forEach(selectOption => {
            if (!selectOption.selected) return;
            if (isPlaceholderOption(selectOption)) return;
            const el = getWorseOptionElement(selectOption);
            el?.classList.add('selected');
            el?.setAttribute('aria-selected', 'true');
        });
    }

    updateDisabledState() {
        const { worseSelectElement, selectElement, headerElement, searchInputElement } = this;
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
            const el = getWorseOptionElement(selectOption);
            const isDisabled = selectOption.disabled ||
                (selectOption.parentElement instanceof HTMLOptGroupElement && selectOption.parentElement.disabled);
            el?.classList.toggle('disabled', isDisabled);
            el?.setAttribute('aria-disabled', String(isDisabled));
        });
    }

    updateHeaderState() {
        const { headerElement, selectElement } = this;
        if (!(headerElement instanceof HTMLButtonElement)) return;

        const labelEl = headerElement.querySelector('.worse-select-header-label');
        if (!(labelEl instanceof HTMLSpanElement)) return;

        const selectedOption =
            selectElement.selectedOptions[0] ??
            selectElement.options[selectElement.selectedIndex] ??
            null;

        const label = (isPlaceholderOption(selectedOption) && this.open)
            ? ''
            : selectedOption?.textContent?.trim() || '';

        labelEl.textContent = label;
        headerElement.title = label;
        headerElement.setAttribute('aria-label', label ? `Selected: ${label}` : 'Select an option');
    }

    updateActiveDescendant() {
        const { optionsListElement, activeOption } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        if (!activeOption) {
            optionsListElement.removeAttribute('aria-activedescendant');
            return;
        }

        const el = getWorseOptionElement(activeOption);
        if (!(el instanceof HTMLDivElement)) {
            optionsListElement.removeAttribute('aria-activedescendant');
            return;
        }

        optionsListElement.setAttribute('aria-activedescendant', el.id);
    }

    updateActiveOptionState() {
        const { optionsListElement, activeOption } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        Array.from(optionsListElement.querySelectorAll('.worse-select-option')).forEach(el => {
            el.classList.remove('active');
        });

        if (activeOption) {
            getWorseOptionElement(activeOption)?.classList.add('active');
        }
    }

    syncAll() {
        this.updateSelectedState();
        this.updateDisabledState();
        this.updateOpenState();
        this.syncDimensions();
        for (const plugin of this.plugins) {
            plugin.onSync?.();
        }
    }

    setMessage(text: string) {
        const { messageElement } = this;
        if (!(messageElement instanceof HTMLDivElement)) return;
        messageElement.textContent = '';
        // Defer the update by one tick so screen readers announce a change even when the
        // message text happens to be the same string as the previous announcement.
        window.setTimeout(() => {
            if (this.messageElement === messageElement) {
                messageElement.textContent = text;
            }
        }, 0);
    }

    clearMessage() {
        if (!(this.messageElement instanceof HTMLDivElement)) return;
        this.messageElement.textContent = '';
    }

    openDropdown() {
        if (this.selectElement.disabled) return;
        if (shouldUseListboxMode(this)) return;

        this.open = true;
        this.updateOpenState();
        for (const plugin of this.plugins) {
            plugin.onOpen?.();
        }
    }

    closeDropdown() {
        if (shouldUseListboxMode(this)) return;
        if (!this.open) return;

        this.open = false;
        for (const plugin of this.plugins) {
            plugin.onClose?.();
        }
        this.root.querySelector('.active')?.classList.remove('active');
        this.updateOpenState();
    }

    toggleDropdown() {
        if (shouldUseListboxMode(this)) return;
        this.open ? this.closeDropdown() : this.openDropdown();
    }

    openDropdownAndFocusList() {
        this.openDropdown();

        const { optionsListElement } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        optionsListElement.tabIndex = 0;
        optionsListElement.focus();
        scrollOptionIntoView(this.activeOption);
    }

    closeDropdownAndFocusHeader() {
        this.closeDropdown();
        this.headerElement?.focus();
    }

    getVisibleEnabledOptions() {
        return Array.from(this.selectElement.options).filter(opt => {
            if (opt.disabled) return false;
            return getWorseOptionElement(opt) instanceof HTMLDivElement;
        });
    }

    setActiveOption(selectOption: HTMLOptionElement | undefined, scroll = true) {
        this.activeOption = selectOption;
        this.updateActiveDescendant();
        this.updateActiveOptionState();
        if (scroll) scrollOptionIntoView(selectOption);
    }

    moveActiveOption(delta: number) {
        const options = this.getVisibleEnabledOptions();
        if (options.length === 0) return;

        const currentIndex = this.activeOption ? options.indexOf(this.activeOption) : -1;
        const nextIndex = currentIndex === -1
            ? (delta >= 0 ? 0 : options.length - 1)
            : Math.max(0, Math.min(options.length - 1, currentIndex + delta));

        this.setActiveOption(options[nextIndex]);
    }

    moveActiveToBoundary(boundary: 'start' | 'end') {
        const options = this.getVisibleEnabledOptions();
        if (options.length === 0) return;
        this.setActiveOption(boundary === 'start' ? options[0] : options[options.length - 1]);
    }

    getPageJumpSize() {
        const { optionsListElement } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return 10;

        const firstOption = Array.from(optionsListElement.querySelectorAll('.worse-select-option'))
            .find(el => el instanceof HTMLDivElement);
        if (!(firstOption instanceof HTMLDivElement)) return 10;

        const optionHeight = firstOption.offsetHeight || 1;
        return Math.max(1, Math.floor(optionsListElement.clientHeight / optionHeight));
    }

    moveActiveByPage(direction: 1 | -1) {
        this.moveActiveOption(this.getPageJumpSize() * direction);
    }

    commitActiveOptionSelection() {
        const { activeOption, selectElement } = this;
        if (!activeOption || activeOption.disabled) return;

        if (selectElement.multiple) {
            activeOption.selected = !activeOption.selected;
        } else {
            selectElement.selectedIndex = Array.from(selectElement.options).indexOf(activeOption);
        }

        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
    }

    private initPlugins() {
        if (!(this.headerElement instanceof HTMLButtonElement)) return;
        if (!(this.optionsListElement instanceof HTMLDivElement)) return;

        const context: PluginContext = {
            selectElement: this.selectElement,
            headerElement: this.headerElement,
            optionsListElement: this.optionsListElement,
            searchInputElement: this.searchInputElement,
            setMessage: (text) => this.setMessage(text),
            clearMessage: () => this.clearMessage(),
            on: (target, event, handler) => {
                target.addEventListener(event, handler);
                this.pluginListeners.push({ target, event, handler });
            },
        };

        for (const plugin of this.plugins) {
            plugin.init(context);
        }
    }

    // Keyboard contracts for header, list, and search are kept together here — splitting them
    // would scatter related key handling across multiple methods. If this grows significantly,
    // consider breaking out per-component handlers.
    private bindEvents() {
        const { worseSelectElement, selectElement, dropdownPanelElement, optionsListElement, headerElement, searchInputElement } = this;

        if (!(worseSelectElement instanceof HTMLDivElement)) return;
        if (!(dropdownPanelElement instanceof HTMLDivElement)) return;
        if (!(optionsListElement instanceof HTMLDivElement)) return;
        if (!(headerElement instanceof HTMLButtonElement)) return;

        const onOptionsClick: EventListener = event => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const optionEl = target.closest('.worse-select-option');
            if (!(optionEl instanceof HTMLDivElement)) return;
            if (!dropdownPanelElement.contains(optionEl)) return;
            if (optionEl.classList.contains('disabled')) return;

            const selectOption = getSelectOptionElement(optionEl);
            if (!selectOption || selectOption.disabled) return;

            this.setActiveOption(selectOption, false);

            if (selectElement.multiple) {
                selectOption.selected = !selectOption.selected;
            } else {
                selectElement.selectedIndex = Array.from(selectElement.options).indexOf(selectOption);
            }

            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
            this.closeDropdown();
        };

        const onSelectChange: EventListener = () => this.syncAll();
        const onHeaderClick: EventListener = () => this.toggleDropdown();

        const onHeaderKeyDown: EventListener = event => {
            if (!(event instanceof KeyboardEvent)) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveOption(1);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveOption(-1);
                    break;
                case 'Home':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveToBoundary('start');
                    break;
                case 'End':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveToBoundary('end');
                    break;
                case 'PageDown':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveByPage(1);
                    break;
                case 'PageUp':
                    event.preventDefault();
                    this.openDropdownAndFocusList();
                    this.moveActiveByPage(-1);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.open ? this.closeDropdownAndFocusHeader() : this.openDropdownAndFocusList();
                    break;
            }
        };

        const onOptionsKeyDown: EventListener = event => {
            if (!(event instanceof KeyboardEvent)) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.moveActiveOption(1);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.moveActiveOption(-1);
                    break;
                case 'Home':
                    event.preventDefault();
                    this.moveActiveToBoundary('start');
                    break;
                case 'End':
                    event.preventDefault();
                    this.moveActiveToBoundary('end');
                    break;
                case 'PageDown':
                    event.preventDefault();
                    this.moveActiveByPage(1);
                    break;
                case 'PageUp':
                    event.preventDefault();
                    this.moveActiveByPage(-1);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.commitActiveOptionSelection();
                    if (!selectElement.multiple) this.closeDropdownAndFocusHeader();
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.closeDropdownAndFocusHeader();
                    break;
            }
        };

        const onSearchKeyDown: EventListener = event => {
            if (!(event instanceof KeyboardEvent)) return;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveOption(1);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveOption(-1);
                    break;
                case 'Home':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveToBoundary('start');
                    break;
                case 'End':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveToBoundary('end');
                    break;
                case 'PageDown':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveByPage(1);
                    break;
                case 'PageUp':
                    event.preventDefault();
                    optionsListElement.focus();
                    this.moveActiveByPage(-1);
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.closeDropdownAndFocusHeader();
                    break;
            }
        };

        dropdownPanelElement.addEventListener('click', onOptionsClick);
        selectElement.addEventListener('change', onSelectChange);
        headerElement.addEventListener('click', onHeaderClick);
        headerElement.addEventListener('keydown', onHeaderKeyDown);
        optionsListElement.addEventListener('keydown', onOptionsKeyDown);

        const onListboxFocus: EventListener = () => {
            if (!shouldUseListboxMode(this) || this.activeOption) return;
            const selected = Array.from(selectElement.options).find(o => o.selected && !isPlaceholderOption(o));
            const first = this.getVisibleEnabledOptions()[0];
            const target = selected ?? first;
            if (target) this.setActiveOption(target, true);
        };
        optionsListElement.addEventListener('focus', onListboxFocus);

        if (searchInputElement instanceof HTMLInputElement) {
            searchInputElement.addEventListener('keydown', onSearchKeyDown);
            this.onSearchKeyDown = onSearchKeyDown;
        }

        this.onOptionsClick = onOptionsClick;
        this.onSelectChange = onSelectChange;
        this.onHeaderClick = onHeaderClick;
        this.onHeaderKeyDown = onHeaderKeyDown;
        this.onOptionsKeyDown = onOptionsKeyDown;
        this.onListboxFocus = onListboxFocus;

        this.syncAll();
    }

    // DOM diffing is kept inline here because the mutation cases are tightly coupled to each
    // other and the scroller's child order. If this grows (e.g. option groups, reordering
    // animations), extract into a dedicated reconciler.
    private observeOptions() {
        const { selectElement, optionsListElement } = this;
        if (!(optionsListElement instanceof HTMLDivElement)) return;

        const observer = new MutationObserver(mutationList => {
            let shouldRebuild = false;
            let shouldUpdateState = false;

            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    shouldRebuild = true;
                    shouldUpdateState = true;
                }
                if (mutation.type === 'attributes') {
                    shouldUpdateState = true;
                }
            }

            if (shouldRebuild) {
                Array.from(optionsListElement.children).forEach(child => {
                    if (!(child instanceof HTMLDivElement)) return;
                    const linkedOption = getSelectOptionElement(child);
                    if (!linkedOption || !Array.from(selectElement.options).includes(linkedOption)) {
                        if (linkedOption) unlinkOption(linkedOption);
                        child.remove();
                    }
                });

                Array.from(selectElement.options).forEach((selectOption, optionIndex) => {
                    let el = getWorseOptionElement(selectOption);

                    if (!(el instanceof HTMLDivElement)) {
                        el = createWorseOptionElement(this, selectOption, optionIndex);
                        linkOption(selectOption, el);
                    }

                    el.id = getOptionId(this, optionIndex);

                    const currentAtIndex = optionsListElement.children[optionIndex];
                    if (currentAtIndex !== el) {
                        currentAtIndex ? currentAtIndex.before(el) : optionsListElement.appendChild(el);
                    }
                });

                Array.from(optionsListElement.children).forEach(child => {
                    if (child instanceof HTMLDivElement && !getSelectOptionElement(child)) {
                        child.remove();
                    }
                });
            }

            if (shouldUpdateState) {
                this.syncAll();
            }
        });

        observer.observe(selectElement, {
            childList: true,
            subtree: false,
            attributes: true,
            attributeFilter: ['style', 'class', 'disabled', 'multiple', 'size']
        });

        this.optionObserver = observer;
    }

    private render() {
        const { selectElement, worseSelectElement, optionsListElement } = this;
        if (!(worseSelectElement instanceof HTMLDivElement)) return;

        selectElement.style.display = 'none';
        selectElement.after(worseSelectElement);
    }

    private handleTypeAhead = (e: KeyboardEvent) => {
        if (e.key.length !== 1 || document.activeElement === this.searchInputElement) return;

        const worseOptions = this.optionsListElement?.children;
        this.typeAheadText += e.key;
        let typeAheadText = this.typeAheadText.toLowerCase();

        if (worseOptions && typeAheadText) {
            const matchingWorseOption = Array.from(worseOptions).find(worseOption => {
                return worseOption.textContent.trim().toLowerCase().startsWith(typeAheadText);
            });
            this.optionsListElement?.querySelector('.active')?.classList.remove('active');
            matchingWorseOption?.classList.add('active');

            if (matchingWorseOption) matchingWorseOption.scrollIntoView({ block: 'nearest' });
        }
        if (this.typeAheadTimerId) {
            clearTimeout(this.typeAheadTimerId);
        }
        this.typeAheadTimerId = setTimeout(() => {
            this.typeAheadText = '';
        }, this.typeAheadTimeout);
    }
}

/**
 * Enhances every native `<select>` element inside the provided root.
 *
 * The function is safe to call multiple times. Each `<select>` is mounted at most once.
 * If `options.observe` is true, newly added selects under the root are enhanced automatically.
 *
 * Returns a cleanup function that disconnects the root observer and destroys mounted instances
 * under the provided root.
 */
export function worseSelect(root: RootNode = document, options: WorseSelectOptions = {}): () => void {
    const plugins = options.plugins ?? [];
    mountSelectsInRoot(root, plugins);

    let rootObserver: MutationObserver | undefined;

    if (options.observe) {
        rootObserver = new MutationObserver(mutationList => {
            for (const mutation of mutationList) {
                if (mutation.type !== 'childList') continue;

                mutation.addedNodes.forEach(addedNode => {
                    if (!(addedNode instanceof Element)) return;

                    if (addedNode instanceof HTMLSelectElement) {
                        mountSelectElement(addedNode, root, plugins);
                        return;
                    }

                    addedNode.querySelectorAll<HTMLSelectElement>('select').forEach(el => {
                        mountSelectElement(el, root, plugins);
                    });
                });
            }
        });

        rootObserver.observe(root, { childList: true, subtree: true });
    }

    return () => {
        rootObserver?.disconnect();

        getSelectElementsInRoot(root).forEach(selectElement => {
            const instance = instances.get(selectElement);
            if (!instance) return;
            instance.destroy();
            instances.delete(selectElement);
        });
    };
}

function ensureStyles() {
    if (document.querySelector('[data-worse-select-styles="true"]')) return;

    const styleElement = document.createElement('style');
    styleElement.setAttribute('data-worse-select-styles', 'true');
    styleElement.textContent = createCSS();
    document.head.appendChild(styleElement);
}

function getSelectElementsInRoot(root: RootNode) {
    return Array.from(root.querySelectorAll<HTMLSelectElement>('select'));
}

function mountSelectsInRoot(root: RootNode, plugins: Plugin[]) {
    getSelectElementsInRoot(root).forEach(selectElement => mountSelectElement(selectElement, root, plugins));
}

function mountSelectElement(selectElement: HTMLSelectElement, root: RootNode, plugins: Plugin[]) {
    if (instances.get(selectElement)) return;

    const instance = new WorseSelect(selectElement, getConfig(selectElement), root, plugins);
    instance.mount();
    instances.set(selectElement, instance);
}
