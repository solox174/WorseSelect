// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: AGPL-3.0-or-later

import { getWorseOptionElement } from '../option-map';
import type { SearchContext } from '../internal-types';

function scrollFirstVisibleMatchIntoView(context: SearchContext) {
    const { optionsScrollerElement } = context;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const firstMatch = optionsScrollerElement.querySelector('.worse-select-option.matches');
    if (!(firstMatch instanceof HTMLDivElement)) return;

    firstMatch.scrollIntoView({ block: 'nearest' });
}

function updateSearchStatus(context: SearchContext) {
    const { statusElement, optionsScrollerElement } = context;
    if (!(statusElement instanceof HTMLDivElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;

    const searchTerm = context.searchTerm.trim();

    if (!searchTerm) {
        statusElement.textContent = '';
        context.lastSearchStatusMessage = '';
        return;
    }

    const visibleResultCount = Array.from(
        optionsScrollerElement.querySelectorAll('.worse-select-option.matches')
    ).length;

    const nextMessage =
        visibleResultCount === 0 ? 'No results found' :
        visibleResultCount === 1 ? '1 result available' :
        `${visibleResultCount} results available`;

    if (nextMessage === context.lastSearchStatusMessage) return;

    context.lastSearchStatusMessage = nextMessage;
    statusElement.textContent = '';

    // Defer the update by one tick so screen readers announce a change even when the
    // message text happens to be the same string as the previous announcement.
    window.setTimeout(() => {
        if (context.statusElement === statusElement) {
            statusElement.textContent = nextMessage;
        }
    }, 0);
}

export function applySearchFilter(context: SearchContext) {
    const searchTerm = context.searchTerm.trim().toLowerCase();

    Array.from(context.selectElement.options).forEach(selectOption => {
        const worseOptionElement = getWorseOptionElement(selectOption);
        if (!(worseOptionElement instanceof HTMLDivElement)) return;

        const matches = searchTerm !== '' && worseOptionElement.textContent.toLowerCase().includes(searchTerm);
        worseOptionElement.classList.toggle('matches', matches);
    });

    updateSearchStatus(context);
    scrollFirstVisibleMatchIntoView(context);
}
