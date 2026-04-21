/**
 * Core
 * Copyright (c) 2026 Kevin Matthews
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * See the LICENSE file for details.
 */

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

// TODO: In handleOptionChanges() inside the shouldRebuild block, call unlinkOption(linkedOption)
// before child.remove() when removing orphaned/placeholder option nodes. WeakMap cleanup is
// eventually automatic, but explicit unlinking keeps the option-to-node mapping teardown clear
// and avoids stale bookkeeping while the widget is still alive.
import { DEFAULT_CONFIG, SelectConfig, RootNode, WorseSelectOptions } from './internal-types';
import type { WorseSelectContext } from './internal-types';
import { createCSS } from './css';
import { getConfig } from './config';
import {
    createWorseOptionElement, createWorseSelect, getOptionId
} from './dom';
import { getSelectOptionElement, getWorseOptionElement, linkOption, unlinkOption } from './option-map';
import { isPlaceholderOption } from './select-helpers';

const instances = new WeakMap<HTMLSelectElement, WorseSelect>();

let nextInstanceId = 0;

class WorseSelect implements  WorseSelectContext {
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

    onSelectChange?: EventListener;
    onOptionsClick?: EventListener;
    onHeaderClick?: EventListener;
    onHeaderKeyDown?: EventListener;
    onOptionsKeyDown?: EventListener;
    onDocumentPointerDown?: EventListener;
    onSearchInput?: EventListener;
    onSearchKeyDown?: EventListener;

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
        this.instanceId = `ws-${++nextInstanceId}`;
    }

    mount() {
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
 * The function is safe to call multiple times. Each `<select>` is mounted at most once.
 * If `options.observe` is true, newly added selects under the root are enhanced automatically.
 *
 * Returns a cleanup function that disconnects the root observer and destroys mounted instances
 * under the provided root.
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

                    addedNode.querySelectorAll<HTMLSelectElement>('select').forEach(selectElement => {
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

        getSelectElementsInRoot(root).forEach(selectElement => {
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
    getSelectElementsInRoot(root).forEach(selectElement => {
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
    styleElement.textContent = createCSS(DEFAULT_CONFIG);

    document.head.appendChild(styleElement);
}

function shouldUseListboxMode(worseSelectInstance: WorseSelect) {
    return worseSelectInstance.selectElement.size > 1;
}

function isMultipleSelect(worseSelectInstance: WorseSelect) {
    return worseSelectInstance.selectElement.multiple;
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

function getVisibleEnabledOptions(worseSelectInstance: WorseSelect) {
    return Array.from(worseSelectInstance.selectElement.options).filter(selectOption => {
        if (selectOption.disabled) return false;

        const worseOptionElement = getWorseOptionElement(selectOption);

        return worseOptionElement instanceof HTMLDivElement;
    });
}

function scrollOptionIntoView(selectOption?: HTMLOptionElement) {
    if (!selectOption) return;

    const worseOptionElement = getWorseOptionElement(selectOption);
    if (!(worseOptionElement instanceof HTMLDivElement)) return;

    worseOptionElement.scrollIntoView({ block: 'nearest' });
}

function updateActiveDescendant(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const activeOption = worseSelectInstance.activeOption;
    if (!activeOption) {
        optionsScrollerElement.removeAttribute('aria-activedescendant');
        return;
    }

    const worseOptionElement = getWorseOptionElement(activeOption);
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

    const worseOptionElement = getWorseOptionElement(activeOption);
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
    const visibleEnabledOptions = getVisibleEnabledOptions(worseSelectInstance);
    if (visibleEnabledOptions.length === 0) return;

    const currentIndex = worseSelectInstance.activeOption
        ? visibleEnabledOptions.indexOf(worseSelectInstance.activeOption)
        : -1;

    const nextIndex = currentIndex === -1
        ? (delta >= 0 ? 0 : visibleEnabledOptions.length - 1)
        : Math.max(0, Math.min(visibleEnabledOptions.length - 1, currentIndex + delta));

    setActiveOption(worseSelectInstance, visibleEnabledOptions[nextIndex]);
}

function moveActiveToBoundary(worseSelectInstance: WorseSelect, boundary: 'start' | 'end') {
    const visibleEnabledOptions = getVisibleEnabledOptions(worseSelectInstance);
    if (visibleEnabledOptions.length === 0) return;

    setActiveOption(
        worseSelectInstance,
        boundary === 'start' ? visibleEnabledOptions[0] : visibleEnabledOptions[visibleEnabledOptions.length - 1]
    );
}

function getPageJumpSize(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return 10;

    const firstVisibleOption = Array.from(optionsScrollerElement.querySelectorAll('.worse-select-option'))
        .find(optionElement => optionElement instanceof HTMLDivElement);

    if (!(firstVisibleOption instanceof HTMLDivElement)) return 10;

    const optionHeight = firstVisibleOption.offsetHeight || 1;
    return Math.max(1, Math.floor(optionsScrollerElement.clientHeight / optionHeight));
}

function moveActiveByPage(worseSelectInstance: WorseSelect, direction: 1 | -1) {
    moveActiveOption(worseSelectInstance, getPageJumpSize(worseSelectInstance) * direction);
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

function scrollFirstVisibleMatchIntoView(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const firstVisibleMatch = optionsScrollerElement.querySelector('.worse-select-option.matches');
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

    const visibleResultCount = Array.from(optionsScrollerElement.querySelectorAll('.worse-select-option.matches')).length;

    const nextMessage =
        visibleResultCount === 0 ? 'No results found' :
            visibleResultCount === 1 ? '1 result available' :
                `${visibleResultCount} results available`;

    if (nextMessage === worseSelectInstance.lastSearchStatusMessage) return;

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
        const worseOptionElement = getWorseOptionElement(selectOption);
        if (!(worseOptionElement instanceof HTMLDivElement)) return;

        const matches = searchTerm && worseOptionElement.textContent.toLowerCase().includes(searchTerm);

        if (matches) {
            worseOptionElement.classList.add('matches');
        } else {
            worseOptionElement.classList.remove('matches');
        }
    });

    updateSearchStatus(worseSelectInstance);
    scrollFirstVisibleMatchIntoView(worseSelectInstance);
}

function closeWorseSelect(worseSelectInstance: WorseSelect) {
    if (shouldUseListboxMode(worseSelectInstance)) return;

    worseSelectInstance.searchTerm = '';
    worseSelectInstance.open = false;

    if (worseSelectInstance.searchInputElement instanceof HTMLInputElement) {
        worseSelectInstance.searchInputElement.value = '';
    }

    applySearchFilter(worseSelectInstance);
    updateWorseOpenState(worseSelectInstance);
}

function openWorseSelect(worseSelectInstance: WorseSelect) {
    if (worseSelectInstance.selectElement.disabled) return;
    if (shouldUseListboxMode(worseSelectInstance)) return;

    worseSelectInstance.open = true;
    updateWorseOpenState(worseSelectInstance);
}

function openWorseSelectAndFocusList(worseSelectInstance: WorseSelect) {
    openWorseSelect(worseSelectInstance);

    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    optionsScrollerElement.tabIndex = 0;
    optionsScrollerElement.focus();
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
        worseSelectInstance.optionsScrollerElement.tabIndex = isOpen ? 0 : -1;
    }

    updateWorseHeaderState(worseSelectInstance);
}

function updateWorseSelectedState(worseSelectInstance: WorseSelect) {
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    Array.from(optionsScrollerElement.children).forEach(worseOptionElement => {
        if (!(worseOptionElement instanceof HTMLDivElement)) return;
        worseOptionElement.classList.remove('selected');
        worseOptionElement.setAttribute('aria-selected', 'false');
    });

    Array.from(worseSelectInstance.selectElement.options).forEach(selectOption => {
        if (!selectOption.selected) return;

        const worseOptionElement = getWorseOptionElement(selectOption);
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
        const worseOptionElement = getWorseOptionElement(selectOption);
        worseOptionElement?.classList.toggle('disabled', selectOption.disabled);
        worseOptionElement?.setAttribute('aria-disabled', String(selectOption.disabled));
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

    const label = (isPlaceholderOption(selectedOption) && worseSelectInstance.open)
        ? ''
        : selectedOption?.textContent?.trim() || '';

    headerLabelElement.textContent = label;
    headerElement.title = label;
    headerElement.setAttribute('aria-label', label ? `Selected: ${label}` : 'Select an option');
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

        const selectOption = getSelectOptionElement(worseOptionElement);
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
                moveActiveToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                openWorseSelectAndFocusList(worseSelectInstance);
                moveActiveByPage(worseSelectInstance, -1);
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
                moveActiveToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                moveActiveToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                moveActiveByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                moveActiveByPage(worseSelectInstance, -1);
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
                moveActiveToBoundary(worseSelectInstance, 'start');
                break;
            case 'End':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveToBoundary(worseSelectInstance, 'end');
                break;
            case 'PageDown':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveByPage(worseSelectInstance, 1);
                break;
            case 'PageUp':
                event.preventDefault();
                optionsScrollerElement.focus();
                moveActiveByPage(worseSelectInstance, -1);
                break;
            case 'Escape':
                event.preventDefault();
                closeWorseSelectAndFocusHeader(worseSelectInstance);
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
}

function handleOptionChanges(worseSelectInstance: WorseSelect) {
    const selectElement = worseSelectInstance.selectElement;
    const optionsScrollerElement = worseSelectInstance.optionsScrollerElement;

    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

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
            Array.from(optionsScrollerElement.children).forEach(child => {
                if (!(child instanceof HTMLDivElement)) return;
                const linkedOption = getSelectOptionElement(child);
                if (!linkedOption || !Array.from(selectElement.options).includes(linkedOption)) {
                    child.remove();
                }
            });

            const renderedOptions = Array.from(selectElement.options);

            renderedOptions.forEach((selectOption, optionIndex) => {
                let worseOptionElement = getWorseOptionElement(selectOption);

                if (!(worseOptionElement instanceof HTMLDivElement)) {
                    worseOptionElement = createWorseOptionElement(
                        worseSelectInstance,
                        selectOption,
                        optionIndex
                    );
                    linkOption(selectOption, worseOptionElement);
                }

                worseOptionElement.id = getOptionId(worseSelectInstance, optionIndex);

                const currentAtIndex = optionsScrollerElement.children[optionIndex];
                if (currentAtIndex !== worseOptionElement) {
                    if (currentAtIndex) {
                        currentAtIndex.before(worseOptionElement);
                    } else {
                        optionsScrollerElement.appendChild(worseOptionElement);
                    }
                }
            });

            Array.from(optionsScrollerElement.children).forEach(child => {
                if (!(child instanceof HTMLDivElement)) return;
                const linkedOption = getSelectOptionElement(child);
                if (!linkedOption) {
                    child.remove();
                }
            });
        }

        if (shouldUpdateState) {
            updateWorseHeaderState(worseSelectInstance);
            updateWorseSelectedState(worseSelectInstance);
            updateWorseDisabledState(worseSelectInstance);
            updateWorseOpenState(worseSelectInstance);
            syncDimensionsFromNative(worseSelectInstance);
            applySearchFilter(worseSelectInstance);
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