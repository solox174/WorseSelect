// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: AGPL-3.0-or-later

// Two WeakMaps maintain a bidirectional link between native <option> elements and their
// rendered widget divs. WeakMap keys allow GC to reclaim elements removed from the DOM
// without requiring explicit cleanup on every removal path.
const optionToDiv = new WeakMap<HTMLOptionElement, HTMLDivElement>();
const divToOption = new WeakMap<HTMLDivElement, HTMLOptionElement>();


export function linkOption(selectOption: HTMLOptionElement, worseOptionElement: HTMLDivElement) {
    optionToDiv.set(selectOption, worseOptionElement);
    divToOption.set(worseOptionElement, selectOption);
}

export function unlinkOption(selectOption: HTMLOptionElement) {
    const worseOptionElement = optionToDiv.get(selectOption);
    if (!worseOptionElement) return;

    optionToDiv.delete(selectOption);
    divToOption.delete(worseOptionElement);
}

export function getWorseOptionElement(selectOption: HTMLOptionElement) {
    return optionToDiv.get(selectOption);
}

export function getSelectOptionElement(worseOptionElement: HTMLDivElement) {
    return divToOption.get(worseOptionElement);
}