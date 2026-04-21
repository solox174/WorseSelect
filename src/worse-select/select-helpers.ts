// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: AGPL-3.0-or-later

import {WorseSelectContext} from "./internal-types";

export function shouldUseListboxMode(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.size > 1;
}

export function isMultipleSelect(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.multiple;
}

// Matches the conventional HTML placeholder pattern: <option value="" disabled>Label</option>.
// Options that are not disabled or have a non-empty value are treated as selectable.
export function isPlaceholderOption(selectOption: HTMLOptionElement) {
    return selectOption.value === '' && selectOption.disabled;
}