// Copyright (c) 2026 Kevin Matthews
// SPDX-License-Identifier: LGPL-3.0-or-later

import { DEFAULT_CONFIG } from './internal-types';

export function createCSS() {
    return  /* language=CSS */ `
    :root {
        --ws-border-color: #767676;
        --ws-border-radius: 4px;
        --ws-bg: #fff;
        --ws-text-color: inherit;
        --ws-disabled-bg: #f0f0f0;
        --ws-disabled-text-color: #6d6d6d;
        --ws-hover-bg: #f1f1f1;
        --ws-active-bg: #eef4ff;
        --ws-active-outline: #2563eb;
        --ws-selected-bg: #d2e3fc;
        --ws-selected-text-color: #174ea6;
        --ws-focus-outline: #2563eb;
        --ws-search-border-color: #b7b7b7;
        --ws-divider-color: #d0d0d0;
        --ws-highlight-bg: #fff3a3;
        --ws-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
        --ws-height: ${DEFAULT_CONFIG.height};
        --ws-motion-duration: 160ms;
        --ws-motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
        height: var(--ws-height);
        font: inherit;
        vertical-align: middle;
        color: var(--ws-text-color);
    }

    .worse-select-container.listbox {
        width: 100%;
    }

    .worse-select-header {
        box-sizing: border-box;
        width: ${DEFAULT_CONFIG.width};
        height: var(--ws-height);
        padding: 0 28px 0 8px;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background-color: var(--ws-bg);
        color: var(--ws-text-color);
        font: inherit;
        line-height: normal;
        text-align: left;
        cursor: pointer;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .worse-select-header::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 8px;
        width: 10px;
        height: 10px;
        pointer-events: none;
        transform: translateY(-50%) rotate(0deg);
        transform-origin: center;
        transition: transform var(--ws-motion-duration) var(--ws-motion-ease);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 10px 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    .worse-select-container.open .worse-select-header::after {
        transform: translateY(-50%) rotate(180deg);
    }

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.disabled .worse-select-header {
        background-color: var(--ws-disabled-bg);
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
    }

    .worse-select-options-scroller:focus-visible {
        outline: none !important;
    }
    
    .worse-select-header:focus-visible,
    .worse-select-search-input:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
    }

    .worse-select-options {
        box-sizing: border-box;
        position: absolute;
        top: calc(100% + 2px);
        left: 0;
        right: 0;
        z-index: 1000;
        display: none;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-6px);
        transform-origin: top center;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
        transition:
            display var(--ws-motion-duration) allow-discrete,
            opacity var(--ws-motion-duration) var(--ws-motion-ease),
            transform var(--ws-motion-duration) var(--ws-motion-ease);
    }

    .worse-select-container.open .worse-select-options {
        display: block;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
        transition:
            display var(--ws-motion-duration) allow-discrete,
            opacity var(--ws-motion-duration) var(--ws-motion-ease),
            transform var(--ws-motion-duration) var(--ws-motion-ease);
    }

    @starting-style {
        .worse-select-container.open .worse-select-options {
            opacity: 0;
            transform: translateY(-6px);
        }
    }

    .worse-select-container.listbox .worse-select-options {
        position: relative;
        top: 0;
        left: 0;
        right: auto;
        display: block;
        box-shadow: none;
        opacity: 1;
        pointer-events: auto;
        transform: none;
        transition: none;
    }

    .worse-select-search {
        padding: 4px;
        border-bottom: 1px solid var(--ws-divider-color);
        margin-bottom: 2px;
    }

    .worse-select-search-input {
        box-sizing: border-box;
        width: 100%;
        height: 32px;
        padding: 0 8px;
        border: 1px solid var(--ws-search-border-color);
        border-radius: var(--ws-border-radius);
        font: inherit;
        color: var(--ws-text-color);
        background: var(--ws-bg);
    }

    .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
        overflow-y: auto;
    }

    .worse-select-option {
        padding: 4px 8px;
        border-radius: var(--ws-border-radius);
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--ws-text-color);
    }

    .worse-select-option:hover {
        background: var(--ws-hover-bg);
    }

    .worse-select-option.active {
        background: var(--ws-active-bg);
        outline: 1px solid var(--ws-active-outline);
        outline-offset: -1px;
    }

    .worse-select-option.selected {
        background: var(--ws-selected-bg);
        color: var(--ws-selected-text-color);
    }

    .worse-select-option.selected.active {
        outline: 1px solid var(--ws-active-outline);
        outline-offset: -1px;
    }

    .worse-select-option.disabled {
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
        background: var(--ws-disabled-bg);
    }


    .worse-select-option.hidden {
        display: none;
    }

    .matches {
        background: var(--ws-highlight-bg);
    }

    .worse-select-visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .worse-select-header::after,
        .worse-select-options {
            transition: none;
        }
    }
    `;
}
