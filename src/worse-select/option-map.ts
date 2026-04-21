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