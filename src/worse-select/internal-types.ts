export const DEFAULT_CONFIG = {
    searchable: false,
    dropdownHeightPx: 400,
    height: '32px',
    width: '100%'
};

export type Widen<T> = T extends boolean ? boolean : T extends string ? string : T extends number ? number : T;

export type SelectConfig = {
    [K in keyof typeof DEFAULT_CONFIG]: Widen<(typeof DEFAULT_CONFIG)[K]>
};

export type ConfigKey = keyof SelectConfig;
export type RootNode = ParentNode;

export type WorseSelectOptions = {
    observe?: boolean;
};

export interface WorseSelectContext {
    selectElement: HTMLSelectElement;
    config: SelectConfig;
    instanceId: string;
}