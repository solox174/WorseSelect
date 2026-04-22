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

export function createStatusHtml(worseSelectInstance: WorseSelectContext) {
    if (!worseSelectInstance.config.searchable) {
        return '';
    }

    return `
    <div class="worse-select-status worse-select-visually-hidden" 
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
        ${createStatusHtml(worseSelectInstance)}
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

    const selectOptions = Array.from(worseSelectInstance.selectElement.options);

    for (let i = 0; i < selectOptions.length; i++) {
        const selectOption = selectOptions[i];
        const worseOptionElement = createWorseOptionElement(
            worseSelectInstance,
            selectOption,
            i
        );
        linkOption(selectOption, worseOptionElement);
        optionsListElement.appendChild(worseOptionElement);
    }

    return worseSelectElement;
}