// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import {ConfigKey, DEFAULT_CONFIG, SelectConfig} from "./internal-types";

const configKeys = Object.keys(DEFAULT_CONFIG) as ConfigKey[];

function toKebabCase(value: string) {
    return value.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);
}

function parseConfigValue<K extends ConfigKey>(key: K, attr: string): SelectConfig[K] {
    const defaultValue = DEFAULT_CONFIG[key];

    if (typeof defaultValue === 'boolean') {
        return (attr === 'true') as SelectConfig[K];
    }

    if (typeof defaultValue === 'number') {
        return Number(attr) as SelectConfig[K];
    }

    return attr as SelectConfig[K];
}

export function getConfig(selectElement: Element): SelectConfig {
    const config: SelectConfig = { ...DEFAULT_CONFIG };

    for (let i = 0; i < configKeys.length; i++) {
        const key = configKeys[i];
        const dataAttributeName = `data-${toKebabCase(key)}`;
        const attr = selectElement.getAttribute(dataAttributeName);

        if (attr === null) continue;

        (config as Record<ConfigKey, string | boolean | number>)[key] = parseConfigValue(key, attr);
    }

    return config;
}