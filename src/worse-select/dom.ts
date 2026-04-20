import {DEFAULT_CONFIG} from "./internal-types";
import { WorseSelectContext } from './internal-types'

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

export function isPlaceholderOption(selectOption: HTMLOptionElement) {
    return selectOption.value === '' && selectOption.disabled;
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
    <div
        id="${getOptionId(worseSelectInstance, optionIndex)}"
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
        <input
            type="text"
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
      <div
        class="worse-select-status worse-select-visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"></div>
    `;
}