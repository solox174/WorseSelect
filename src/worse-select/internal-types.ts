// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

export const DEFAULT_CONFIG = {
    searchable: false,
    dropdownHeightPx: 400,
    height: '32px',
    width: '100%'
};

// Maps each config value to its widened primitive type (e.g. true → boolean) so that
// SelectConfig accepts any valid value of that type, not just the specific default literal.
export type Widen<T> = T extends boolean ? boolean : T extends string ? string : T extends number ? number : T;

export type SelectConfig = {
    [K in keyof typeof DEFAULT_CONFIG]: Widen<(typeof DEFAULT_CONFIG)[K]>
};

export type ConfigKey = keyof SelectConfig;
export type RootNode = ParentNode;

export type WorseSelectOptions = {
    observe?: boolean;
};

// Minimal interface exposed to dom.ts and select-helpers.ts. Restricts those modules to the
// properties they actually need, keeping the full WorseSelect class internal to core.ts.
export interface WorseSelectContext {
    selectElement: HTMLSelectElement;
    config: SelectConfig;
    instanceId: string;
}

// Interface for search.ts. Contains only the fields the search feature reads and writes.
export interface SearchContext {
    selectElement: HTMLSelectElement;
    optionsScrollerElement?: HTMLDivElement;
    statusElement?: HTMLDivElement;
    searchTerm: string;
    lastSearchStatusMessage: string;
}