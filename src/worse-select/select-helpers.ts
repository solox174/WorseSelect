import {WorseSelectContext} from "./internal-types";

export function shouldUseListboxMode(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.size > 1;
}

export function isMultipleSelect(worseSelectInstance: WorseSelectContext) {
    return worseSelectInstance.selectElement.multiple;
}

export function isPlaceholderOption(selectOption: HTMLOptionElement) {
    return selectOption.value === '' && selectOption.disabled;
}