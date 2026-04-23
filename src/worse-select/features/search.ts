// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import type { Plugin, PluginContext } from '../internal-types';
import { getWorseOptionElement } from '../option-map';

function applyHighlight(context: PluginContext, searchTerm: string) {
    const term = searchTerm.trim().toLowerCase();

    Array.from(context.optionsListElement.children).forEach(worseOption => {
        if (!(worseOption instanceof HTMLDivElement)) return;
        const matches = term !== '' && worseOption.textContent.toLowerCase().includes(term);
        worseOption.classList.toggle('matches', matches);
    });

    if (!term) {
        context.clearMessage();
        return;
    }

    const matchCount = context.optionsListElement.querySelectorAll('.worse-select-option.matches').length;
    const message =
        matchCount === 0 ? 'No results found' :
        matchCount === 1 ? '1 result available' :
        `${matchCount} results available`;

    context.setMessage(message);

    const firstMatch = context.optionsListElement.querySelector('.worse-select-option.matches');
    if (firstMatch instanceof HTMLDivElement) {
        firstMatch.scrollIntoView({ block: 'nearest' });
    }
}

export function createBuiltinSearchPlugin(): Plugin {
    let searchTerm = '';
    let pluginContext: PluginContext | null = null;

    return {
        name: 'search',

        init(context: PluginContext) {
            pluginContext = context;
            const { searchInputElement } = context;
            if (!searchInputElement) return;

            context.on(searchInputElement, 'input', (event) => {
                const target = event.target;
                if (!(target instanceof HTMLInputElement)) return;
                searchTerm = target.value;
                applyHighlight(context, searchTerm);
            });
        },

        onSync() {
            if (!pluginContext) return;
            applyHighlight(pluginContext, searchTerm);
        },

        onClose() {
            if (!pluginContext) return;
            searchTerm = '';
            const { searchInputElement } = pluginContext;
            if (searchInputElement instanceof HTMLInputElement) {
                searchInputElement.value = '';
            }
            applyHighlight(pluginContext, '');
        },

        destroy() {
            pluginContext = null;
            searchTerm = '';
        },
    };
}
