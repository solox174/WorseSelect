// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import { WorseSelectContext } from './internal-types';

export function shouldUseListboxMode(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.size > 1;
}

export function isMultipleSelect(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.multiple;
}

// Matches the conventional HTML placeholder pattern: <option value="" disabled>Label</option>.
// Options that are not disabled or have a non-empty value are treated as selectable.
export function isPlaceholderOption(selectOption: HTMLOptionElement | null): boolean {
    return selectOption !== null && selectOption.value === '' && selectOption.disabled;
}

export function getListBoxHeight(selectElement: HTMLSelectElement, worseOptionElement: HTMLDivElement): string | null {
    if (selectElement.size <= 1) return null;

    const oneRowHeight = worseOptionElement.getBoundingClientRect().height;
    const totalHeight = oneRowHeight * selectElement.size;

    const selectParentHeight = selectElement.parentElement?.getBoundingClientRect().height ?? 10000;
    return Math.min(totalHeight, selectParentHeight) + 'px';
}