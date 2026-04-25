// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import { DEFAULT_CONFIG, WorseSelectContext } from './internal-types';
import { isMultipleSelect, shouldUseListboxMode } from './select-helpers';
import { getWorseOptionElement, linkOption } from './option-map';

export function scrollOptionIntoView(selectOption?: HTMLOptionElement) {
    if (!selectOption) return;
    const el = getWorseOptionElement(selectOption);
    if (!(el instanceof HTMLDivElement)) return;
    el.scrollIntoView({ block: 'nearest' });
}


function buildStyleAttribute(styleParts: string[]) {
    return styleParts.length > 0 ? ` style="${styleParts.join(' ')}"` : '';
}

export function buildWorseSelectHeaderStyleAttribute(worseSelectInstance: WorseSelectContext) {
    const headerStyleParts: string[] = [];

    if (worseSelectInstance.config.width !== DEFAULT_CONFIG.width) {
        headerStyleParts.push(`width: ${worseSelectInstance.config.width};`);
    }

    if (worseSelectInstance.config.height !== DEFAULT_CONFIG.height) {
        headerStyleParts.push(`height: ${worseSelectInstance.config.height};`);
    }

    return buildStyleAttribute(headerStyleParts);
}


function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function getOptionId(worseSelectInstance: WorseSelectContext, optionIndex: number) {
    return `${worseSelectInstance.instanceId}-option-${optionIndex}`;
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

export function createWorseOptionHtml(
    worseSelectInstance: WorseSelectContext,
    selectOption: HTMLOptionElement,
    optionIndex: number,
) {
    const worseOptionClasses = getWorseOptionClasses(selectOption);
    const optionText = selectOption.textContent ?? '';

    return `
    <div id="${getOptionId(worseSelectInstance, optionIndex)}"
         class="${worseOptionClasses}"
         data-value="${escapeHtml(selectOption.value)}"
         role="option"
         aria-selected="${selectOption.selected ? 'true' : 'false'}"
         aria-disabled="${selectOption.disabled ? 'true' : 'false'}">
      ${escapeHtml(optionText)}
    </div>
    `;
}

export function createWorseOptionElement(
    worseSelectInstance: WorseSelectContext,
    selectOption: HTMLOptionElement,
    optionIndex: number,
) {
    return document.createRange().createContextualFragment(
        createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex)
    ).firstElementChild as HTMLDivElement;
}

export function createSearchHtml(worseSelectInstance: WorseSelectContext) {
    if (!worseSelectInstance.config.searchable) {
        return '';
    }

    return `
    <div class="worse-select-search">
      <input type="text"
             class="worse-select-search-input"
             placeholder="Search list"
             autocomplete="off"
             aria-label="Search options" />
    </div>
    `;
}

export function createMessageHtml() {
    return `
    <div class="worse-select-message worse-select-visually-hidden"
         role="status"
         aria-live="polite"
         aria-atomic="true"></div>
    `;
}

export function createWorseSelect(worseSelectInstance: WorseSelectContext) {
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
        ${createMessageHtml()}
        <div class="worse-select-options-scroller"${headerStyleAttribute}></div>
      </div>
    </div>
    `;

    const worseSelectElement = document.createRange().createContextualFragment(
        htmlString
    ).firstElementChild as HTMLDivElement;

    const optionsListElement = worseSelectElement.querySelector('.worse-select-options-scroller') as HTMLDivElement;
    optionsListElement.setAttribute('role', 'listbox');
    optionsListElement.tabIndex = shouldUseListboxMode(worseSelectInstance) ? 0 : -1;

    if (isMultipleSelect(worseSelectInstance)) {
        optionsListElement.setAttribute('aria-multiselectable', 'true');
    }

    const selectChildren = worseSelectInstance.selectElement.children;
    const worseSelectChildren: HTMLDivElement[] = [];
    const optionIndexRef = { value: 0 };

    for (let i = 0; i < selectChildren.length; i++) {
        const selectChild = selectChildren[i];

        if (selectChild instanceof HTMLOptGroupElement) {
            worseSelectChildren.push(createWorseOptGroupElement(worseSelectInstance, selectChild, optionIndexRef));
        } else if (selectChild instanceof HTMLOptionElement) {
            worseSelectChildren.push(setupWorseOptionElement(worseSelectInstance, selectChild, optionIndexRef.value));
            optionIndexRef.value++;
        }
    }
    optionsListElement.append(...worseSelectChildren);

    return worseSelectElement;
}

function createWorseOptGroupElement(
    worseSelectInstance: WorseSelectContext,
    optGroupElement: HTMLOptGroupElement,
    optionIndexRef: { value: number },
) {
    const labelEl = document.createElement('div');
    labelEl.className = 'worse-select-optgroup-label';
    labelEl.textContent = optGroupElement.label;

    const selectOptions = Array.from(optGroupElement.getElementsByTagName('option')) as HTMLOptionElement[];
    const worseOptionElements = selectOptions.map((selectOption) => {
        const el = setupWorseOptionElement(worseSelectInstance, selectOption, optionIndexRef.value);
        optionIndexRef.value++;
        if (optGroupElement.disabled) {
            el.classList.add('disabled');
            el.setAttribute('aria-disabled', 'true');
        }
        return el;
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'worse-select-optgroup' + (optGroupElement.disabled ? ' disabled' : '');
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', optGroupElement.label);
    wrapper.append(labelEl, ...worseOptionElements);
    return wrapper;
}

function setupWorseOptionElement(worseSelectInstance: WorseSelectContext, selectOption: HTMLOptionElement, index: number) {
    const worseOptionElement= createWorseOptionElement(
        worseSelectInstance,
        selectOption,
        index
    );
    linkOption(selectOption, worseOptionElement);

    return worseOptionElement;
}