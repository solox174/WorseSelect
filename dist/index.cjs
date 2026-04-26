"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  worseSelect: () => worseSelect
});
module.exports = __toCommonJS(index_exports);

// src/worse-select/internal-types.ts
var DEFAULT_CONFIG = {
  searchable: false,
  dropdownHeightPx: 400,
  height: "32px",
  width: "100%"
};

// src/worse-select/css.ts
function createCSS() {
  return (
    /* language=CSS */
    `
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
        --ws-optgroup-label-color: #6b7280;
        --ws-highlight-bg: #fff3a3;
        --ws-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
        --ws-height: ${DEFAULT_CONFIG.height};
        --ws-motion-duration: 200ms;
        --ws-motion-ease: cubic-bezier(0.16, 1, 0.3, 1);
    }

    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
        font: inherit;
        vertical-align: middle;
        color: var(--ws-text-color);
    }

    .worse-select-container:not(.listbox) {
        height: var(--ws-height);
    }

    .worse-select-container.listbox {
        width: 100%;
    }

    .worse-select-container.dark {
        color-scheme: dark;
        --ws-border-color: var(--ws-dark-border-color, #555);
        --ws-bg: var(--ws-dark-bg, #1e1e1e);
        --ws-text-color: var(--ws-dark-text-color, #e8eaed);
        --ws-disabled-bg: var(--ws-dark-disabled-bg, #2a2a2a);
        --ws-disabled-text-color: var(--ws-dark-disabled-text-color, #777);
        --ws-hover-bg: var(--ws-dark-hover-bg, #3a3a3a);
        --ws-active-bg: var(--ws-dark-active-bg, #1a3a5c);
        --ws-active-outline: var(--ws-dark-active-outline, #60a5fa);
        --ws-selected-bg: var(--ws-dark-selected-bg, #1e3a5f);
        --ws-selected-text-color: var(--ws-dark-selected-text-color, #93c5fd);
        --ws-focus-outline: var(--ws-dark-focus-outline, #60a5fa);
        --ws-search-border-color: var(--ws-dark-search-border-color, #555);
        --ws-divider-color: var(--ws-dark-divider-color, #3a3a3a);
        --ws-optgroup-label-color: var(--ws-dark-optgroup-label-color, #9ca3af);
        --ws-highlight-bg: var(--ws-dark-highlight-bg, #4a3c00);
        --ws-shadow: var(--ws-dark-shadow, 0 4px 12px rgba(0, 0, 0, 0.4));
    }

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.disabled .worse-select-header {
        background-color: var(--ws-disabled-bg);
        color: var(--ws-disabled-text-color);
        cursor: not-allowed;
    }


    .worse-select-container.open .worse-select-header::after {
        transform: translateY(-50%) rotate(180deg);
    }

    .worse-select-container.dark .worse-select-header::after {
        --ws-caret-color: white;
    }

    .worse-select-container.dark.disabled .worse-select-header::after {
        --ws-caret-color: var(--ws-disabled-text-color);
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
        background-color: var(--ws-caret-color, #777777);
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='white' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='white' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }

    .worse-select-header:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
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

    .worse-select-search-input:focus-visible {
        outline: 2px solid var(--ws-focus-outline) !important;
        outline-offset: 1px;
    }

    .worse-select-container:not(.listbox) .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
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
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
        transform-origin: top center;
        transition:
                display var(--ws-motion-duration) allow-discrete,
                opacity var(--ws-motion-duration) var(--ws-motion-ease),
                transform var(--ws-motion-duration) var(--ws-motion-ease);
    }

    .worse-select-options-scroller {
        overflow-y: auto;
    }

    .worse-select-options-scroller:focus-visible {
        outline: none !important;
    }

    .worse-select-optgroup-label {
        padding: 4px 8px 2px;
        font-size: 0.75em;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--ws-optgroup-label-color);
        cursor: default;
        user-select: none;
        pointer-events: none;
    }

    .worse-select-optgroup.disabled .worse-select-optgroup-label {
        opacity: 0.5;
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

    .worse-select-optgroup .worse-select-option {
        padding-left: 16px;
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
    `
  );
}

// src/worse-select/config.ts
var configKeys = Object.keys(DEFAULT_CONFIG);
function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`);
}
function parseConfigValue(key, attr) {
  const defaultValue = DEFAULT_CONFIG[key];
  if (typeof defaultValue === "boolean") {
    return attr === "true";
  }
  if (typeof defaultValue === "number") {
    return Number(attr);
  }
  return attr;
}
function getConfig(selectElement) {
  const config = { ...DEFAULT_CONFIG };
  for (let i = 0; i < configKeys.length; i++) {
    const key = configKeys[i];
    const dataAttributeName = `data-${toKebabCase(key)}`;
    const attr = selectElement.getAttribute(dataAttributeName);
    if (attr === null) continue;
    config[key] = parseConfigValue(key, attr);
  }
  return config;
}

// src/worse-select/select-helpers.ts
function shouldUseListboxMode(worseSelectInstance) {
  return worseSelectInstance.selectElement.size > 1;
}
function isMultipleSelect(worseSelectInstance) {
  return worseSelectInstance.selectElement.multiple;
}
function isPlaceholderOption(selectOption) {
  return selectOption !== null && selectOption.value === "" && selectOption.disabled;
}
function getListBoxHeight(selectElement, worseOptionElement) {
  if (selectElement.size <= 1) return null;
  const oneRowHeight = worseOptionElement.getBoundingClientRect().height;
  const totalHeight = oneRowHeight * selectElement.size;
  const selectParentHeight = selectElement.parentElement?.getBoundingClientRect().height ?? 1e4;
  return Math.min(totalHeight, selectParentHeight) + "px";
}

// src/worse-select/option-map.ts
var optionToDiv = /* @__PURE__ */ new WeakMap();
var divToOption = /* @__PURE__ */ new WeakMap();
function linkOption(selectOption, worseOptionElement) {
  optionToDiv.set(selectOption, worseOptionElement);
  divToOption.set(worseOptionElement, selectOption);
}
function unlinkOption(selectOption) {
  const worseOptionElement = optionToDiv.get(selectOption);
  if (!worseOptionElement) return;
  optionToDiv.delete(selectOption);
  divToOption.delete(worseOptionElement);
}
function getWorseOptionElement(selectOption) {
  return optionToDiv.get(selectOption);
}
function getSelectOptionElement(worseOptionElement) {
  return divToOption.get(worseOptionElement);
}

// src/worse-select/dom.ts
function scrollOptionIntoView(selectOption) {
  if (!selectOption) return;
  const el = getWorseOptionElement(selectOption);
  if (!(el instanceof HTMLDivElement)) return;
  el.scrollIntoView({ block: "nearest" });
}
function buildStyleAttribute(styleParts) {
  return styleParts.length > 0 ? ` style="${styleParts.join(" ")}"` : "";
}
function buildWorseSelectHeaderStyleAttribute(worseSelectInstance) {
  const headerStyleParts = [];
  if (worseSelectInstance.config.width !== DEFAULT_CONFIG.width) {
    headerStyleParts.push(`width: ${worseSelectInstance.config.width};`);
  }
  if (worseSelectInstance.config.height !== DEFAULT_CONFIG.height) {
    headerStyleParts.push(`height: ${worseSelectInstance.config.height};`);
  }
  return buildStyleAttribute(headerStyleParts);
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function getOptionId(worseSelectInstance, optionIndex) {
  return `${worseSelectInstance.instanceId}-option-${optionIndex}`;
}
function getWorseOptionClasses(selectOption) {
  const classes = ["worse-select-option"];
  if (selectOption.disabled) {
    classes.push("disabled");
  }
  if (selectOption.selected) {
    classes.push("selected");
  }
  return classes.join(" ");
}
function createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex) {
  const worseOptionClasses = getWorseOptionClasses(selectOption);
  const optionText = selectOption.textContent ?? "";
  return `
    <div id="${getOptionId(worseSelectInstance, optionIndex)}"
         class="${worseOptionClasses}"
         data-value="${escapeHtml(selectOption.value)}"
         role="option"
         aria-selected="${selectOption.selected ? "true" : "false"}"
         aria-disabled="${selectOption.disabled ? "true" : "false"}">
      ${escapeHtml(optionText)}
    </div>
    `;
}
function createWorseOptionElement(worseSelectInstance, selectOption, optionIndex) {
  return document.createRange().createContextualFragment(
    createWorseOptionHtml(worseSelectInstance, selectOption, optionIndex)
  ).firstElementChild;
}
function createSearchHtml(worseSelectInstance) {
  if (!worseSelectInstance.config.searchable) {
    return "";
  }
  return `
    <div class="worse-select-search">
      <input type="text"
             class="worse-select-search-input"
             placeholder="Search list"
             autocomplete="off"
             aria-label="Search options" />
    </div>
    `;
}
function createMessageHtml() {
  return `
    <div class="worse-select-message worse-select-visually-hidden"
         role="status"
         aria-live="polite"
         aria-atomic="true"></div>
    `;
}
function createWorseSelect(worseSelectInstance) {
  const headerStyleAttribute = buildWorseSelectHeaderStyleAttribute(worseSelectInstance);
  const containerClasses = ["worse-select-container"];
  if (shouldUseListboxMode(worseSelectInstance)) {
    containerClasses.push("listbox");
  }
  if (isMultipleSelect(worseSelectInstance)) {
    containerClasses.push("multiple");
  }
  const htmlString = `
    <div class="${containerClasses.join(" ")}">
      <button
        type="button"
        class="worse-select-header"
        aria-haspopup="listbox"
        aria-expanded="false">
        <span class="worse-select-header-label"></span>
      </button>
      <div class="worse-select-options">
        ${createSearchHtml(worseSelectInstance)}
        ${createMessageHtml()}
        <div class="worse-select-options-scroller"${headerStyleAttribute}></div>
      </div>
    </div>
    `;
  const worseSelectElement = document.createRange().createContextualFragment(
    htmlString
  ).firstElementChild;
  const optionsListElement = worseSelectElement.querySelector(".worse-select-options-scroller");
  optionsListElement.setAttribute("role", "listbox");
  optionsListElement.tabIndex = shouldUseListboxMode(worseSelectInstance) ? 0 : -1;
  if (isMultipleSelect(worseSelectInstance)) {
    optionsListElement.setAttribute("aria-multiselectable", "true");
  }
  const selectChildren = worseSelectInstance.selectElement.children;
  const worseSelectChildren = [];
  const optionIndexRef = { value: 0 };
  for (let i = 0; i < selectChildren.length; i++) {
    const selectChild = selectChildren[i];
    if (selectChild instanceof HTMLOptGroupElement) {
      worseSelectChildren.push(createWorseOptGroupElement(worseSelectInstance, selectChild, optionIndexRef));
    } else if (selectChild instanceof HTMLOptionElement) {
      worseSelectChildren.push(setupWorseOptionElement(worseSelectInstance, selectChild, optionIndexRef.value));
      optionIndexRef.value++;
    }
  }
  optionsListElement.append(...worseSelectChildren);
  return worseSelectElement;
}
function createWorseOptGroupElement(worseSelectInstance, optGroupElement, optionIndexRef) {
  const labelEl = document.createElement("div");
  labelEl.className = "worse-select-optgroup-label";
  labelEl.textContent = optGroupElement.label;
  const selectOptions = Array.from(optGroupElement.getElementsByTagName("option"));
  const worseOptionElements = selectOptions.map((selectOption) => {
    const el = setupWorseOptionElement(worseSelectInstance, selectOption, optionIndexRef.value);
    optionIndexRef.value++;
    if (optGroupElement.disabled) {
      el.classList.add("disabled");
      el.setAttribute("aria-disabled", "true");
    }
    return el;
  });
  const wrapper = document.createElement("div");
  wrapper.className = "worse-select-optgroup" + (optGroupElement.disabled ? " disabled" : "");
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", optGroupElement.label);
  wrapper.append(labelEl, ...worseOptionElements);
  return wrapper;
}
function setupWorseOptionElement(worseSelectInstance, selectOption, index) {
  const worseOptionElement = createWorseOptionElement(
    worseSelectInstance,
    selectOption,
    index
  );
  linkOption(selectOption, worseOptionElement);
  return worseOptionElement;
}

// src/worse-select/features/search.ts
function applyHighlight(context, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  Array.from(context.optionsListElement.children).forEach((worseOption) => {
    if (!(worseOption instanceof HTMLDivElement)) return;
    const matches = term !== "" && worseOption.textContent.toLowerCase().includes(term);
    worseOption.classList.toggle("matches", matches);
  });
  if (!term) {
    context.clearMessage();
    return;
  }
  const matchCount = context.optionsListElement.querySelectorAll(".worse-select-option.matches").length;
  const message = matchCount === 0 ? "No results found" : matchCount === 1 ? "1 result available" : `${matchCount} results available`;
  context.setMessage(message);
  const firstMatch = context.optionsListElement.querySelector(".worse-select-option.matches");
  if (firstMatch instanceof HTMLDivElement) {
    firstMatch.scrollIntoView({ block: "nearest" });
  }
}
function createBuiltinSearchPlugin() {
  let searchTerm = "";
  let pluginContext = null;
  return {
    name: "search",
    init(context) {
      pluginContext = context;
      const { searchInputElement } = context;
      if (!searchInputElement) return;
      context.on(searchInputElement, "input", (event) => {
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
      searchTerm = "";
      const { searchInputElement } = pluginContext;
      if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.value = "";
      }
      applyHighlight(pluginContext, "");
    },
    destroy() {
      pluginContext = null;
      searchTerm = "";
    }
  };
}

// src/worse-select/core.ts
var instances = /* @__PURE__ */ new WeakMap();
var nextInstanceId = 0;
var _WorseSelect = class _WorseSelect {
  constructor(selectElement, config = {}, root = document, plugins = []) {
    this.typeAheadText = "";
    this.typeAheadTimeout = 1e3;
    this.open = false;
    this.plugins = [];
    this.pluginListeners = [];
    this.handleTypeAhead = (e) => {
      if (e.key.length !== 1 || document.activeElement === this.searchInputElement) return;
      const worseOptions = this.optionsListElement?.children;
      this.typeAheadText += e.key;
      let typeAheadText = this.typeAheadText.toLowerCase();
      if (worseOptions && typeAheadText) {
        const matchingWorseOption = Array.from(worseOptions).find((worseOption) => {
          return worseOption.textContent.trim().toLowerCase().startsWith(typeAheadText);
        });
        this.optionsListElement?.querySelector(".active")?.classList.remove("active");
        matchingWorseOption?.classList.add("active");
        if (matchingWorseOption) matchingWorseOption.scrollIntoView({ block: "nearest" });
      }
      if (this.typeAheadTimerId) {
        clearTimeout(this.typeAheadTimerId);
      }
      this.typeAheadTimerId = setTimeout(() => {
        this.typeAheadText = "";
      }, this.typeAheadTimeout);
    };
    this.selectElement = selectElement;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.root = root;
    this.instanceId = `ws-${++nextInstanceId}`;
    this.plugins = [...plugins];
    if (this.config.searchable && !plugins.some((p) => p.name === "search")) {
      this.plugins.push(createBuiltinSearchPlugin());
    }
  }
  static handleDocumentPointerDown(event) {
    const target = event.target;
    if (!(target instanceof Node)) return;
    for (const instance of _WorseSelect.mountedInstances) {
      if (instance.worseSelectElement && !instance.worseSelectElement.contains(target)) {
        instance.closeDropdown();
      }
    }
  }
  mount() {
    if (this.worseSelectElement) return;
    ensureStyles();
    this.worseSelectElement = createWorseSelect(this);
    this.headerElement = this.worseSelectElement.querySelector(".worse-select-header");
    this.dropdownPanelElement = this.worseSelectElement.querySelector(".worse-select-options");
    this.optionsListElement = this.worseSelectElement.querySelector(".worse-select-options-scroller");
    this.searchInputElement = this.worseSelectElement.querySelector(".worse-select-search-input");
    this.messageElement = this.worseSelectElement.querySelector(".worse-select-message");
    if (_WorseSelect.mountedInstances.size === 0) {
      document.addEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    this.worseSelectElement.addEventListener("keyup", this.handleTypeAhead);
    _WorseSelect.mountedInstances.add(this);
    this.render();
    this.bindEvents();
    this.observeOptions();
    this.initPlugins();
  }
  destroy() {
    this.optionObserver?.disconnect();
    this.optionObserver = void 0;
    for (const plugin of this.plugins) {
      plugin.destroy?.();
    }
    for (const { target, event, handler } of this.pluginListeners) {
      target.removeEventListener(event, handler);
    }
    this.pluginListeners = [];
    this.plugins = [];
    if (this.onSelectChange) {
      this.selectElement.removeEventListener("change", this.onSelectChange);
      this.onSelectChange = void 0;
    }
    if (this.onOptionsClick && this.dropdownPanelElement) {
      this.dropdownPanelElement.removeEventListener("click", this.onOptionsClick);
      this.onOptionsClick = void 0;
    }
    if (this.onHeaderClick && this.headerElement) {
      this.headerElement.removeEventListener("click", this.onHeaderClick);
      this.onHeaderClick = void 0;
    }
    if (this.onHeaderKeyDown && this.headerElement) {
      this.headerElement.removeEventListener("keydown", this.onHeaderKeyDown);
      this.onHeaderKeyDown = void 0;
    }
    if (this.onOptionsKeyDown && this.optionsListElement) {
      this.optionsListElement.removeEventListener("keydown", this.onOptionsKeyDown);
      this.onOptionsKeyDown = void 0;
    }
    if (this.onSearchKeyDown && this.searchInputElement) {
      this.searchInputElement.removeEventListener("keydown", this.onSearchKeyDown);
      this.onSearchKeyDown = void 0;
    }
    if (this.onListboxFocus && this.optionsListElement) {
      this.optionsListElement.removeEventListener("focus", this.onListboxFocus);
      this.onListboxFocus = void 0;
    }
    _WorseSelect.mountedInstances.delete(this);
    if (_WorseSelect.mountedInstances.size === 0) {
      document.removeEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    this.worseSelectElement?.removeEventListener("keyup", this.handleTypeAhead);
    Array.from(this.selectElement.options).forEach(unlinkOption);
    this.worseSelectElement?.remove();
    this.selectElement.style.display = "";
    this.worseSelectElement = void 0;
    this.headerElement = void 0;
    this.dropdownPanelElement = void 0;
    this.optionsListElement = void 0;
    this.searchInputElement = void 0;
    this.messageElement = void 0;
    this.open = false;
    this.activeOption = void 0;
  }
  syncDimensions() {
    const { worseSelectElement, headerElement, optionsListElement, selectElement, config } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    const computedStyle = window.getComputedStyle(selectElement);
    if (computedStyle.width && computedStyle.width !== "auto" && computedStyle.width !== "0px") {
      worseSelectElement.style.width = computedStyle.width;
    }
    headerElement.style.font = computedStyle.font;
    if (shouldUseListboxMode(this)) {
      const firstOption = optionsListElement.children[0];
      const height = firstOption ? getListBoxHeight(selectElement, firstOption) : null;
      if (height) optionsListElement.style.height = height;
    } else {
      optionsListElement.style.maxHeight = `${config.dropdownHeightPx}px`;
    }
  }
  updateOpenState() {
    if (!(this.worseSelectElement instanceof HTMLDivElement)) return;
    const isListboxMode = shouldUseListboxMode(this);
    const isOpen = isListboxMode ? true : this.open;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches && getComputedStyle(this.selectElement).colorScheme.includes("dark");
    this.worseSelectElement.classList.toggle("open", isOpen);
    this.worseSelectElement.classList.toggle("listbox", isListboxMode);
    this.worseSelectElement.classList.toggle("multiple", isMultipleSelect(this));
    this.worseSelectElement.classList.toggle("dark", isDark);
    if (this.headerElement instanceof HTMLButtonElement) {
      this.headerElement.setAttribute("aria-expanded", String(isOpen));
    }
    if (this.optionsListElement instanceof HTMLDivElement) {
      this.optionsListElement.setAttribute("aria-multiselectable", String(isMultipleSelect(this)));
      this.optionsListElement.tabIndex = isOpen ? 0 : -1;
    }
    this.updateHeaderState();
  }
  updateSelectedState() {
    const { optionsListElement, selectElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    Array.from(optionsListElement.children).forEach((el) => {
      if (!(el instanceof HTMLDivElement)) return;
      el.classList.remove("selected");
      el.setAttribute("aria-selected", "false");
    });
    Array.from(selectElement.options).forEach((selectOption) => {
      if (!selectOption.selected) return;
      if (isPlaceholderOption(selectOption)) return;
      const el = getWorseOptionElement(selectOption);
      el?.classList.add("selected");
      el?.setAttribute("aria-selected", "true");
    });
  }
  updateDisabledState() {
    const { worseSelectElement, selectElement, headerElement, searchInputElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    worseSelectElement.classList.toggle("disabled", selectElement.disabled);
    if (headerElement instanceof HTMLButtonElement) {
      headerElement.disabled = selectElement.disabled;
      headerElement.setAttribute("aria-disabled", String(selectElement.disabled));
    }
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.disabled = selectElement.disabled;
    }
    Array.from(selectElement.options).forEach((selectOption) => {
      const el = getWorseOptionElement(selectOption);
      const isDisabled = selectOption.disabled || selectOption.parentElement instanceof HTMLOptGroupElement && selectOption.parentElement.disabled;
      el?.classList.toggle("disabled", isDisabled);
      el?.setAttribute("aria-disabled", String(isDisabled));
    });
  }
  updateHeaderState() {
    const { headerElement, selectElement } = this;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    const labelEl = headerElement.querySelector(".worse-select-header-label");
    if (!(labelEl instanceof HTMLSpanElement)) return;
    const selectedOption = selectElement.selectedOptions[0] ?? selectElement.options[selectElement.selectedIndex] ?? null;
    const label = isPlaceholderOption(selectedOption) && this.open ? "" : selectedOption?.textContent?.trim() || "";
    labelEl.textContent = label;
    headerElement.title = label;
    headerElement.setAttribute("aria-label", label ? `Selected: ${label}` : "Select an option");
  }
  updateActiveDescendant() {
    const { optionsListElement, activeOption } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    if (!activeOption) {
      optionsListElement.removeAttribute("aria-activedescendant");
      return;
    }
    const el = getWorseOptionElement(activeOption);
    if (!(el instanceof HTMLDivElement)) {
      optionsListElement.removeAttribute("aria-activedescendant");
      return;
    }
    optionsListElement.setAttribute("aria-activedescendant", el.id);
  }
  updateActiveOptionState() {
    const { optionsListElement, activeOption } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    Array.from(optionsListElement.children).forEach((el) => {
      if (el instanceof HTMLDivElement) el.classList.remove("active");
    });
    if (activeOption) {
      getWorseOptionElement(activeOption)?.classList.add("active");
    }
  }
  syncAll() {
    this.updateSelectedState();
    this.updateDisabledState();
    this.updateOpenState();
    this.syncDimensions();
    for (const plugin of this.plugins) {
      plugin.onSync?.();
    }
  }
  setMessage(text) {
    const { messageElement } = this;
    if (!(messageElement instanceof HTMLDivElement)) return;
    messageElement.textContent = "";
    window.setTimeout(() => {
      if (this.messageElement === messageElement) {
        messageElement.textContent = text;
      }
    }, 0);
  }
  clearMessage() {
    if (!(this.messageElement instanceof HTMLDivElement)) return;
    this.messageElement.textContent = "";
  }
  openDropdown() {
    if (this.selectElement.disabled) return;
    if (shouldUseListboxMode(this)) return;
    this.open = true;
    this.updateOpenState();
    for (const plugin of this.plugins) {
      plugin.onOpen?.();
    }
  }
  closeDropdown() {
    if (shouldUseListboxMode(this)) return;
    if (!this.open) return;
    this.open = false;
    for (const plugin of this.plugins) {
      plugin.onClose?.();
    }
    this.root.querySelector(".active")?.classList.remove("active");
    this.updateOpenState();
  }
  toggleDropdown() {
    if (shouldUseListboxMode(this)) return;
    this.open ? this.closeDropdown() : this.openDropdown();
  }
  openDropdownAndFocusList() {
    this.openDropdown();
    const { optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    optionsListElement.tabIndex = 0;
    optionsListElement.focus();
    scrollOptionIntoView(this.activeOption);
  }
  closeDropdownAndFocusHeader() {
    this.closeDropdown();
    this.headerElement?.focus();
  }
  getVisibleEnabledOptions() {
    return Array.from(this.selectElement.options).filter((opt) => {
      if (opt.disabled) return false;
      return getWorseOptionElement(opt) instanceof HTMLDivElement;
    });
  }
  setActiveOption(selectOption, scroll = true) {
    this.activeOption = selectOption;
    this.updateActiveDescendant();
    this.updateActiveOptionState();
    if (scroll) scrollOptionIntoView(selectOption);
  }
  moveActiveOption(delta) {
    const options = this.getVisibleEnabledOptions();
    if (options.length === 0) return;
    const currentIndex = this.activeOption ? options.indexOf(this.activeOption) : -1;
    const nextIndex = currentIndex === -1 ? delta >= 0 ? 0 : options.length - 1 : Math.max(0, Math.min(options.length - 1, currentIndex + delta));
    this.setActiveOption(options[nextIndex]);
  }
  moveActiveToBoundary(boundary) {
    const options = this.getVisibleEnabledOptions();
    if (options.length === 0) return;
    this.setActiveOption(boundary === "start" ? options[0] : options[options.length - 1]);
  }
  getPageJumpSize() {
    const { optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return 10;
    const firstOption = Array.from(optionsListElement.querySelectorAll(".worse-select-option")).find((el) => el instanceof HTMLDivElement);
    if (!(firstOption instanceof HTMLDivElement)) return 10;
    const optionHeight = firstOption.offsetHeight || 1;
    return Math.max(1, Math.floor(optionsListElement.clientHeight / optionHeight));
  }
  moveActiveByPage(direction) {
    this.moveActiveOption(this.getPageJumpSize() * direction);
  }
  commitActiveOptionSelection() {
    const { activeOption, selectElement } = this;
    if (!activeOption || activeOption.disabled) return;
    if (selectElement.multiple) {
      activeOption.selected = !activeOption.selected;
    } else {
      selectElement.selectedIndex = Array.from(selectElement.options).indexOf(activeOption);
    }
    selectElement.dispatchEvent(new Event("change", { bubbles: true }));
  }
  initPlugins() {
    if (!(this.headerElement instanceof HTMLButtonElement)) return;
    if (!(this.optionsListElement instanceof HTMLDivElement)) return;
    const context = {
      selectElement: this.selectElement,
      headerElement: this.headerElement,
      optionsListElement: this.optionsListElement,
      searchInputElement: this.searchInputElement,
      setMessage: (text) => this.setMessage(text),
      clearMessage: () => this.clearMessage(),
      on: (target, event, handler) => {
        target.addEventListener(event, handler);
        this.pluginListeners.push({ target, event, handler });
      }
    };
    for (const plugin of this.plugins) {
      plugin.init(context);
    }
  }
  // Keyboard contracts for header, list, and search are kept together here — splitting them
  // would scatter related key handling across multiple methods. If this grows significantly,
  // consider breaking out per-component handlers.
  bindEvents() {
    const { worseSelectElement, selectElement, dropdownPanelElement, optionsListElement, headerElement, searchInputElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(dropdownPanelElement instanceof HTMLDivElement)) return;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    const onOptionsClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const optionEl = target.closest(".worse-select-option");
      if (!(optionEl instanceof HTMLDivElement)) return;
      if (!dropdownPanelElement.contains(optionEl)) return;
      if (optionEl.classList.contains("disabled")) return;
      const selectOption = getSelectOptionElement(optionEl);
      if (!selectOption || selectOption.disabled) return;
      this.setActiveOption(selectOption, false);
      if (selectElement.multiple) {
        selectOption.selected = !selectOption.selected;
      } else {
        selectElement.selectedIndex = Array.from(selectElement.options).indexOf(selectOption);
      }
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      this.closeDropdown();
    };
    const onSelectChange = () => this.syncAll();
    const onHeaderClick = () => this.toggleDropdown();
    const onHeaderKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          this.openDropdownAndFocusList();
          this.moveActiveByPage(-1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          this.open ? this.closeDropdownAndFocusHeader() : this.openDropdownAndFocusList();
          break;
      }
    };
    const onOptionsKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          this.moveActiveByPage(-1);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          this.commitActiveOptionSelection();
          if (!selectElement.multiple) this.closeDropdownAndFocusHeader();
          break;
        case "Escape":
          event.preventDefault();
          this.closeDropdownAndFocusHeader();
          break;
      }
    };
    const onSearchKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          optionsListElement.focus();
          this.moveActiveByPage(-1);
          break;
        case "Escape":
          event.preventDefault();
          this.closeDropdownAndFocusHeader();
          break;
      }
    };
    dropdownPanelElement.addEventListener("click", onOptionsClick);
    selectElement.addEventListener("change", onSelectChange);
    headerElement.addEventListener("click", onHeaderClick);
    headerElement.addEventListener("keydown", onHeaderKeyDown);
    optionsListElement.addEventListener("keydown", onOptionsKeyDown);
    const onListboxFocus = () => {
      if (!shouldUseListboxMode(this) || this.activeOption) return;
      const selected = Array.from(selectElement.options).find((o) => o.selected && !isPlaceholderOption(o));
      const first = this.getVisibleEnabledOptions()[0];
      const target = selected ?? first;
      if (target) this.setActiveOption(target, true);
    };
    optionsListElement.addEventListener("focus", onListboxFocus);
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.addEventListener("keydown", onSearchKeyDown);
      this.onSearchKeyDown = onSearchKeyDown;
    }
    this.onOptionsClick = onOptionsClick;
    this.onSelectChange = onSelectChange;
    this.onHeaderClick = onHeaderClick;
    this.onHeaderKeyDown = onHeaderKeyDown;
    this.onOptionsKeyDown = onOptionsKeyDown;
    this.onListboxFocus = onListboxFocus;
    this.syncAll();
  }
  // DOM diffing is kept inline here because the mutation cases are tightly coupled to each
  // other and the scroller's child order. If this grows (e.g. option groups, reordering
  // animations), extract into a dedicated reconciler.
  observeOptions() {
    const { selectElement, optionsListElement } = this;
    if (!(optionsListElement instanceof HTMLDivElement)) return;
    const observer = new MutationObserver((mutationList) => {
      let shouldRebuild = false;
      let shouldUpdateState = false;
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          shouldRebuild = true;
          shouldUpdateState = true;
        }
        if (mutation.type === "attributes") {
          shouldUpdateState = true;
        }
      }
      if (shouldRebuild) {
        Array.from(optionsListElement.children).forEach((child) => {
          if (!(child instanceof HTMLDivElement)) return;
          const linkedOption = getSelectOptionElement(child);
          if (!linkedOption || !Array.from(selectElement.options).includes(linkedOption)) {
            if (linkedOption) unlinkOption(linkedOption);
            child.remove();
          }
        });
        Array.from(selectElement.options).forEach((selectOption, optionIndex) => {
          let el = getWorseOptionElement(selectOption);
          if (!(el instanceof HTMLDivElement)) {
            el = createWorseOptionElement(this, selectOption, optionIndex);
            linkOption(selectOption, el);
          }
          el.id = getOptionId(this, optionIndex);
          const currentAtIndex = optionsListElement.children[optionIndex];
          if (currentAtIndex !== el) {
            currentAtIndex ? currentAtIndex.before(el) : optionsListElement.appendChild(el);
          }
        });
        Array.from(optionsListElement.children).forEach((child) => {
          if (child instanceof HTMLDivElement && !getSelectOptionElement(child)) {
            child.remove();
          }
        });
      }
      if (shouldUpdateState) {
        this.syncAll();
      }
    });
    observer.observe(selectElement, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["style", "class", "disabled", "multiple", "size"]
    });
    this.optionObserver = observer;
  }
  render() {
    const { selectElement, worseSelectElement, optionsListElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    selectElement.style.display = "none";
    selectElement.after(worseSelectElement);
  }
};
// Tracks all mounted instances so a single document-level pointerdown listener can close any
// open dropdown when the user clicks outside, instead of registering one listener per instance.
// Note: `private` is a TypeScript-only constraint and is not enforced in the compiled output.
_WorseSelect.mountedInstances = /* @__PURE__ */ new Set();
var WorseSelect = _WorseSelect;
function worseSelect(root = document, options = {}) {
  const plugins = options.plugins ?? [];
  mountSelectsInRoot(root, plugins);
  let rootObserver;
  if (options.observe) {
    rootObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type !== "childList") continue;
        mutation.addedNodes.forEach((addedNode) => {
          if (!(addedNode instanceof Element)) return;
          if (addedNode instanceof HTMLSelectElement) {
            mountSelectElement(addedNode, root, plugins);
            return;
          }
          addedNode.querySelectorAll("select").forEach((el) => {
            mountSelectElement(el, root, plugins);
          });
        });
      }
    });
    rootObserver.observe(root, { childList: true, subtree: true });
  }
  return () => {
    rootObserver?.disconnect();
    getSelectElementsInRoot(root).forEach((selectElement) => {
      const instance = instances.get(selectElement);
      if (!instance) return;
      instance.destroy();
      instances.delete(selectElement);
    });
  };
}
function ensureStyles() {
  if (document.querySelector('[data-worse-select-styles="true"]')) return;
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-worse-select-styles", "true");
  styleElement.textContent = createCSS();
  document.head.appendChild(styleElement);
}
function getSelectElementsInRoot(root) {
  return Array.from(root.querySelectorAll("select"));
}
function mountSelectsInRoot(root, plugins) {
  getSelectElementsInRoot(root).forEach((selectElement) => mountSelectElement(selectElement, root, plugins));
}
function mountSelectElement(selectElement, root, plugins) {
  if (instances.get(selectElement)) return;
  const instance = new WorseSelect(selectElement, getConfig(selectElement), root, plugins);
  instance.mount();
  instances.set(selectElement, instance);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  worseSelect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7XG5leHBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlc1wiOyIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgZHJvcGRvd25IZWlnaHRQeDogNDAwLFxuICAgIGhlaWdodDogJzMycHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn07XG5cbi8vIE1hcHMgZWFjaCBjb25maWcgdmFsdWUgdG8gaXRzIHdpZGVuZWQgcHJpbWl0aXZlIHR5cGUgKGUuZy4gdHJ1ZSBcdTIxOTIgYm9vbGVhbikgc28gdGhhdFxuLy8gU2VsZWN0Q29uZmlnIGFjY2VwdHMgYW55IHZhbGlkIHZhbHVlIG9mIHRoYXQgdHlwZSwgbm90IGp1c3QgdGhlIHNwZWNpZmljIGRlZmF1bHQgbGl0ZXJhbC5cbmV4cG9ydCB0eXBlIFdpZGVuPFQ+ID0gVCBleHRlbmRzIGJvb2xlYW4gPyBib29sZWFuIDogVCBleHRlbmRzIHN0cmluZyA/IHN0cmluZyA6IFQgZXh0ZW5kcyBudW1iZXIgPyBudW1iZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RDb25maWcgPSB7XG4gICAgW0sgaW4ga2V5b2YgdHlwZW9mIERFRkFVTFRfQ09ORklHXTogV2lkZW48KHR5cGVvZiBERUZBVUxUX0NPTkZJRylbS10+XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXkgPSBrZXlvZiBTZWxlY3RDb25maWc7XG5leHBvcnQgdHlwZSBSb290Tm9kZSA9IFBhcmVudE5vZGU7XG5cbmV4cG9ydCB0eXBlIFBsdWdpbkNvbnRleHQgPSB7XG4gICAgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgaGVhZGVyRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgb3B0aW9uc0xpc3RFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgICBjbGVhck1lc3NhZ2UoKTogdm9pZDtcbiAgICBvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFBsdWdpbiA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KTogdm9pZDtcbiAgICBvblN5bmM/KCk6IHZvaWQ7XG4gICAgb25PcGVuPygpOiB2b2lkO1xuICAgIG9uQ2xvc2U/KCk6IHZvaWQ7XG4gICAgZGVzdHJveT8oKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFdvcnNlU2VsZWN0T3B0aW9ucyA9IHtcbiAgICBvYnNlcnZlPzogYm9vbGVhbjtcbiAgICBwbHVnaW5zPzogUGx1Z2luW107XG59O1xuXG4vLyBNaW5pbWFsIGludGVyZmFjZSBleHBvc2VkIHRvIGRvbS50cyBhbmQgc2VsZWN0LWhlbHBlcnMudHMuIFJlc3RyaWN0cyB0aG9zZSBtb2R1bGVzIHRvIHRoZVxuLy8gcHJvcGVydGllcyB0aGV5IGFjdHVhbGx5IG5lZWQsIGtlZXBpbmcgdGhlIGZ1bGwgV29yc2VTZWxlY3QgY2xhc3MgaW50ZXJuYWwgdG8gY29yZS50cy5cbmV4cG9ydCBpbnRlcmZhY2UgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTUygpIHtcbiAgICByZXR1cm4gIC8qIGxhbmd1YWdlPUNTUyAqLyBgXG4gICAgOnJvb3Qge1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogIzc2NzY3NjtcbiAgICAgICAgLS13cy1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIC0td3MtYmc6ICNmZmY7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogI2YwZjBmMDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiAjNmQ2ZDZkO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiAjZjFmMWYxO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogI2VlZjRmZjtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogI2QyZTNmYztcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjMTc0ZWE2O1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLW9wdGdyb3VwLWxhYmVsLWNvbG9yOiAjNmI3MjgwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICAgICAgLS13cy1oZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgLS13cy1tb3Rpb24tZHVyYXRpb246IDIwMG1zO1xuICAgICAgICAtLXdzLW1vdGlvbi1lYXNlOiBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lciB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lcjpub3QoLmxpc3Rib3gpIHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS13cy1oZWlnaHQpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3gge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5kYXJrIHtcbiAgICAgICAgY29sb3Itc2NoZW1lOiBkYXJrO1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogdmFyKC0td3MtZGFyay1ib3JkZXItY29sb3IsICM1NTUpO1xuICAgICAgICAtLXdzLWJnOiB2YXIoLS13cy1kYXJrLWJnLCAjMWUxZTFlKTtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiB2YXIoLS13cy1kYXJrLXRleHQtY29sb3IsICNlOGVhZWQpO1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiB2YXIoLS13cy1kYXJrLWRpc2FibGVkLWJnLCAjMmEyYTJhKTtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiB2YXIoLS13cy1kYXJrLWRpc2FibGVkLXRleHQtY29sb3IsICM3NzcpO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiB2YXIoLS13cy1kYXJrLWhvdmVyLWJnLCAjM2EzYTNhKTtcbiAgICAgICAgLS13cy1hY3RpdmUtYmc6IHZhcigtLXdzLWRhcmstYWN0aXZlLWJnLCAjMWEzYTVjKTtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogdmFyKC0td3MtZGFyay1hY3RpdmUtb3V0bGluZSwgIzYwYTVmYSk7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtYmc6IHZhcigtLXdzLWRhcmstc2VsZWN0ZWQtYmcsICMxZTNhNWYpO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6IHZhcigtLXdzLWRhcmstc2VsZWN0ZWQtdGV4dC1jb2xvciwgIzkzYzVmZCk7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogdmFyKC0td3MtZGFyay1mb2N1cy1vdXRsaW5lLCAjNjBhNWZhKTtcbiAgICAgICAgLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yOiB2YXIoLS13cy1kYXJrLXNlYXJjaC1ib3JkZXItY29sb3IsICM1NTUpO1xuICAgICAgICAtLXdzLWRpdmlkZXItY29sb3I6IHZhcigtLXdzLWRhcmstZGl2aWRlci1jb2xvciwgIzNhM2EzYSk7XG4gICAgICAgIC0td3Mtb3B0Z3JvdXAtbGFiZWwtY29sb3I6IHZhcigtLXdzLWRhcmstb3B0Z3JvdXAtbGFiZWwtY29sb3IsICM5Y2EzYWYpO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogdmFyKC0td3MtZGFyay1oaWdobGlnaHQtYmcsICM0YTNjMDApO1xuICAgICAgICAtLXdzLXNoYWRvdzogdmFyKC0td3MtZGFyay1zaGFkb3csIDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjQpKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5kaXNhYmxlZCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIH1cblxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDE4MGRlZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGFyayAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICAtLXdzLWNhcmV0LWNvbG9yOiB3aGl0ZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5kYXJrLmRpc2FibGVkIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlciB7XG4gICAgICAgIC0td3MtY2FyZXQtY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgICAgIHRyYW5zaXRpb246XG4gICAgICAgICAgICBkaXNwbGF5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgYWxsb3ctZGlzY3JldGUsXG4gICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgIH1cblxuICAgIEBzdGFydGluZy1zdHlsZSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTZweCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogJHtERUZBVUxUX0NPTkZJRy53aWR0aH07XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIlwiO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICByaWdodDogOHB4O1xuICAgICAgICB3aWR0aDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgwZGVnKTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSB2YXIoLS13cy1tb3Rpb24tZWFzZSk7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWNhcmV0LWNvbG9yLCAjNzc3Nzc3KTtcbiAgICAgICAgLXdlYmtpdC1tYXNrLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyB2aWV3Qm94PScwIDAgMTIgMTInIGZpbGw9J25vbmUnJTNFJTNDcGF0aCBkPSdNMyA0LjVMNiA3LjVMOSA0LjUnIHN0cm9rZT0nd2hpdGUnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgICAgIG1hc2staW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSd3aGl0ZScgc3Ryb2tlLXdpZHRoPScxLjEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvJTNFJTNDL3N2ZyUzRVwiKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlcjpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQ6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS13cy1mb2N1cy1vdXRsaW5lKSAhaW1wb3J0YW50O1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyOm5vdCgubGlzdGJveCkgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKDEwMCUgKyAycHgpO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNnB4KTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgYm94LXNoYWRvdzogdmFyKC0td3Mtc2hhZG93KTtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgICAgIGRpc3BsYXkgdmFyKC0td3MtbW90aW9uLWR1cmF0aW9uKSBhbGxvdy1kaXNjcmV0ZSxcbiAgICAgICAgICAgICAgICBvcGFjaXR5IHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcjpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0Z3JvdXAtbGFiZWwge1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4IDJweDtcbiAgICAgICAgZm9udC1zaXplOiAwLjc1ZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA1ZW07XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1vcHRncm91cC1sYWJlbC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0Z3JvdXAuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1vcHRncm91cC1sYWJlbCB7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbiB7XG4gICAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRncm91cCAud29yc2Utc2VsZWN0LW9wdGlvbiB7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMTZweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uaGlkZGVuIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgICAubWF0Y2hlcyB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhpZ2hsaWdodC1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC12aXN1YWxseS1oaWRkZW4ge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHdpZHRoOiAxcHg7XG4gICAgICAgIGhlaWdodDogMXB4O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICBtYXJnaW46IC0xcHg7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIGNsaXA6IHJlY3QoMCwgMCwgMCwgMCk7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICAgICAud29yc2Utc2VsZWN0LWhlYWRlcjo6YWZ0ZXIsXG4gICAgICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGA7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IENvbmZpZ0tleSwgREVGQVVMVF9DT05GSUcsIFNlbGVjdENvbmZpZyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5jb25zdCBjb25maWdLZXlzID0gT2JqZWN0LmtleXMoREVGQVVMVF9DT05GSUcpIGFzIENvbmZpZ0tleVtdO1xuXG5mdW5jdGlvbiB0b0tlYmFiQ2FzZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1tBLVpdL2csIGNoYXJhY3RlciA9PiBgLSR7Y2hhcmFjdGVyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnVmFsdWU8SyBleHRlbmRzIENvbmZpZ0tleT4oa2V5OiBLLCBhdHRyOiBzdHJpbmcpOiBTZWxlY3RDb25maWdbS10ge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IERFRkFVTFRfQ09ORklHW2tleV07XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiAoYXR0ciA9PT0gJ3RydWUnKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoYXR0cikgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyIGFzIFNlbGVjdENvbmZpZ1tLXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZyhzZWxlY3RFbGVtZW50OiBFbGVtZW50KTogU2VsZWN0Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFNlbGVjdENvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBjb25maWdLZXlzW2ldO1xuICAgICAgICBjb25zdCBkYXRhQXR0cmlidXRlTmFtZSA9IGBkYXRhLSR7dG9LZWJhYkNhc2Uoa2V5KX1gO1xuICAgICAgICBjb25zdCBhdHRyID0gc2VsZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgICAgIGlmIChhdHRyID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAoY29uZmlnIGFzIFJlY29yZDxDb25maWdLZXksIHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI+KVtrZXldID0gcGFyc2VDb25maWdWYWx1ZShrZXksIGF0dHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5zaXplID4gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5tdWx0aXBsZTtcbn1cblxuLy8gTWF0Y2hlcyB0aGUgY29udmVudGlvbmFsIEhUTUwgcGxhY2Vob2xkZXIgcGF0dGVybjogPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPkxhYmVsPC9vcHRpb24+LlxuLy8gT3B0aW9ucyB0aGF0IGFyZSBub3QgZGlzYWJsZWQgb3IgaGF2ZSBhIG5vbi1lbXB0eSB2YWx1ZSBhcmUgdHJlYXRlZCBhcyBzZWxlY3RhYmxlLlxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uICE9PSBudWxsICYmIHNlbGVjdE9wdGlvbi52YWx1ZSA9PT0gJycgJiYgc2VsZWN0T3B0aW9uLmRpc2FibGVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGlzdEJveEhlaWdodChzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgd29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChzZWxlY3RFbGVtZW50LnNpemUgPD0gMSkgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBvbmVSb3dIZWlnaHQgPSB3b3JzZU9wdGlvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gb25lUm93SGVpZ2h0ICogc2VsZWN0RWxlbWVudC5zaXplO1xuXG4gICAgY29uc3Qgc2VsZWN0UGFyZW50SGVpZ2h0ID0gc2VsZWN0RWxlbWVudC5wYXJlbnRFbGVtZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgPz8gMTAwMDA7XG4gICAgcmV0dXJuIE1hdGgubWluKHRvdGFsSGVpZ2h0LCBzZWxlY3RQYXJlbnRIZWlnaHQpICsgJ3B4Jztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLy8gVHdvIFdlYWtNYXBzIG1haW50YWluIGEgYmlkaXJlY3Rpb25hbCBsaW5rIGJldHdlZW4gbmF0aXZlIDxvcHRpb24+IGVsZW1lbnRzIGFuZCB0aGVpclxuLy8gcmVuZGVyZWQgd2lkZ2V0IGRpdnMuIFdlYWtNYXAga2V5cyBhbGxvdyBHQyB0byByZWNsYWltIGVsZW1lbnRzIHJlbW92ZWQgZnJvbSB0aGUgRE9NXG4vLyB3aXRob3V0IHJlcXVpcmluZyBleHBsaWNpdCBjbGVhbnVwIG9uIGV2ZXJ5IHJlbW92YWwgcGF0aC5cbmNvbnN0IG9wdGlvblRvRGl2ID0gbmV3IFdlYWtNYXA8SFRNTE9wdGlvbkVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PigpO1xuY29uc3QgZGl2VG9PcHRpb24gPSBuZXcgV2Vha01hcDxIVE1MRGl2RWxlbWVudCwgSFRNTE9wdGlvbkVsZW1lbnQ+KCk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCwgd29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIG9wdGlvblRvRGl2LnNldChzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgZGl2VG9PcHRpb24uc2V0KHdvcnNlT3B0aW9uRWxlbWVudCwgc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVubGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCF3b3JzZU9wdGlvbkVsZW1lbnQpIHJldHVybjtcblxuICAgIG9wdGlvblRvRGl2LmRlbGV0ZShzZWxlY3RPcHRpb24pO1xuICAgIGRpdlRvT3B0aW9uLmRlbGV0ZSh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICByZXR1cm4gb3B0aW9uVG9EaXYuZ2V0KHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RPcHRpb25FbGVtZW50KHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICByZXR1cm4gZGl2VG9PcHRpb24uZ2V0KHdvcnNlT3B0aW9uRWxlbWVudCk7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IERFRkFVTFRfQ09ORklHLCBXb3JzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGlzTXVsdGlwbGVTZWxlY3QsIHNob3VsZFVzZUxpc3Rib3hNb2RlIH0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24gfSBmcm9tICcuL29wdGlvbi1tYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBpZiAoIXNlbGVjdE9wdGlvbikgcmV0dXJuO1xuICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG59XG5cblxuZnVuY3Rpb24gYnVpbGRTdHlsZUF0dHJpYnV0ZShzdHlsZVBhcnRzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBzdHlsZVBhcnRzLmxlbmd0aCA+IDAgPyBgIHN0eWxlPVwiJHtzdHlsZVBhcnRzLmpvaW4oJyAnKX1cImAgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRoICE9PSBERUZBVUxUX0NPTkZJRy53aWR0aCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYHdpZHRoOiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLndpZHRofTtgKTtcbiAgICB9XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0ICE9PSBERUZBVUxUX0NPTkZJRy5oZWlnaHQpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGBoZWlnaHQ6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuaGVpZ2h0fTtgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRTdHlsZUF0dHJpYnV0ZShoZWFkZXJTdHlsZVBhcnRzKTtcbn1cblxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsIG9wdGlvbkluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gYCR7d29yc2VTZWxlY3RJbnN0YW5jZS5pbnN0YW5jZUlkfS1vcHRpb24tJHtvcHRpb25JbmRleH1gO1xufVxuXG5mdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1vcHRpb24nXTtcblxuICAgIGlmIChzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25DbGFzc2VzID0gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbik7XG4gICAgY29uc3Qgb3B0aW9uVGV4dCA9IHNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA/PyAnJztcblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBpZD1cIiR7Z2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZSwgb3B0aW9uSW5kZXgpfVwiXG4gICAgICAgICBjbGFzcz1cIiR7d29yc2VPcHRpb25DbGFzc2VzfVwiXG4gICAgICAgICBkYXRhLXZhbHVlPVwiJHtlc2NhcGVIdG1sKHNlbGVjdE9wdGlvbi52YWx1ZSl9XCJcbiAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgYXJpYS1zZWxlY3RlZD1cIiR7c2VsZWN0T3B0aW9uLnNlbGVjdGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIlxuICAgICAgICAgYXJpYS1kaXNhYmxlZD1cIiR7c2VsZWN0T3B0aW9uLmRpc2FibGVkID8gJ3RydWUnIDogJ2ZhbHNlJ31cIj5cbiAgICAgICR7ZXNjYXBlSHRtbChvcHRpb25UZXh0KX1cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGNyZWF0ZVdvcnNlT3B0aW9uSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlLCBzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KVxuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGlmICghd29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuc2VhcmNoYWJsZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaFwiPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXRcIlxuICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGxpc3RcIlxuICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgYXJpYS1sYWJlbD1cIlNlYXJjaCBvcHRpb25zXCIgLz5cbiAgICA8L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZUh0bWwoKSB7XG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW1lc3NhZ2Ugd29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlblwiXG4gICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgICBhcmlhLWF0b21pYz1cInRydWVcIj48L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVBdHRyaWJ1dGUgPSBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LWNvbnRhaW5lciddO1xuXG4gICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbGlzdGJveCcpO1xuICAgIH1cblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbXVsdGlwbGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBodG1sU3RyaW5nID0gYFxuICAgIDxkaXYgY2xhc3M9XCIke2NvbnRhaW5lckNsYXNzZXMuam9pbignICcpfVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnNcIj5cbiAgICAgICAgJHtjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UpfVxuICAgICAgICAke2NyZWF0ZU1lc3NhZ2VIdG1sKCl9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlclwiJHtoZWFkZXJTdHlsZUF0dHJpYnV0ZX0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3Qgd29yc2VTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGh0bWxTdHJpbmdcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3Qgb3B0aW9uc0xpc3RFbGVtZW50ID0gd29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbGlzdGJveCcpO1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpID8gMCA6IC0xO1xuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdENoaWxkcmVuID0gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50LmNoaWxkcmVuO1xuICAgIGNvbnN0IHdvcnNlU2VsZWN0Q2hpbGRyZW46IEhUTUxEaXZFbGVtZW50W10gPSBbXTtcbiAgICBjb25zdCBvcHRpb25JbmRleFJlZiA9IHsgdmFsdWU6IDAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Q2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0Q2hpbGQgPSBzZWxlY3RDaGlsZHJlbltpXTtcblxuICAgICAgICBpZiAoc2VsZWN0Q2hpbGQgaW5zdGFuY2VvZiBIVE1MT3B0R3JvdXBFbGVtZW50KSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdENoaWxkcmVuLnB1c2goY3JlYXRlV29yc2VPcHRHcm91cEVsZW1lbnQod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0Q2hpbGQsIG9wdGlvbkluZGV4UmVmKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0Q2hpbGQgaW5zdGFuY2VvZiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgICAgICAgICAgd29yc2VTZWxlY3RDaGlsZHJlbi5wdXNoKHNldHVwV29yc2VPcHRpb25FbGVtZW50KHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdENoaWxkLCBvcHRpb25JbmRleFJlZi52YWx1ZSkpO1xuICAgICAgICAgICAgb3B0aW9uSW5kZXhSZWYudmFsdWUrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kKC4uLndvcnNlU2VsZWN0Q2hpbGRyZW4pO1xuXG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRHcm91cEVsZW1lbnQoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIG9wdEdyb3VwRWxlbWVudDogSFRNTE9wdEdyb3VwRWxlbWVudCxcbiAgICBvcHRpb25JbmRleFJlZjogeyB2YWx1ZTogbnVtYmVyIH0sXG4pIHtcbiAgICBjb25zdCBsYWJlbEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGFiZWxFbC5jbGFzc05hbWUgPSAnd29yc2Utc2VsZWN0LW9wdGdyb3VwLWxhYmVsJztcbiAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gb3B0R3JvdXBFbGVtZW50LmxhYmVsO1xuXG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IEFycmF5LmZyb20ob3B0R3JvdXBFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKSkgYXMgSFRNTE9wdGlvbkVsZW1lbnRbXTtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnRzID0gc2VsZWN0T3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IHNldHVwV29yc2VPcHRpb25FbGVtZW50KHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXhSZWYudmFsdWUpO1xuICAgICAgICBvcHRpb25JbmRleFJlZi52YWx1ZSsrO1xuICAgICAgICBpZiAob3B0R3JvdXBFbGVtZW50LmRpc2FibGVkKSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfSk7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSAnd29yc2Utc2VsZWN0LW9wdGdyb3VwJyArIChvcHRHcm91cEVsZW1lbnQuZGlzYWJsZWQgPyAnIGRpc2FibGVkJyA6ICcnKTtcbiAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZSgncm9sZScsICdncm91cCcpO1xuICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgb3B0R3JvdXBFbGVtZW50LmxhYmVsKTtcbiAgICB3cmFwcGVyLmFwcGVuZChsYWJlbEVsLCAuLi53b3JzZU9wdGlvbkVsZW1lbnRzKTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBXb3JzZU9wdGlvbkVsZW1lbnQod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LCBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50PSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgICAgIHdvcnNlU2VsZWN0SW5zdGFuY2UsXG4gICAgICAgIHNlbGVjdE9wdGlvbixcbiAgICAgICAgaW5kZXhcbiAgICApO1xuICAgIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHdvcnNlT3B0aW9uRWxlbWVudDtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW4sIFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQgfSBmcm9tICcuLi9vcHRpb24tbWFwJztcblxuZnVuY3Rpb24gYXBwbHlIaWdobGlnaHQoY29udGV4dDogUGx1Z2luQ29udGV4dCwgc2VhcmNoVGVybTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGVybSA9IHNlYXJjaFRlcm0udHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBBcnJheS5mcm9tKGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgaWYgKCEod29yc2VPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRlcm0gIT09ICcnICYmIHdvcnNlT3B0aW9uLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSk7XG4gICAgICAgIHdvcnNlT3B0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ21hdGNoZXMnLCBtYXRjaGVzKTtcbiAgICB9KTtcblxuICAgIGlmICghdGVybSkge1xuICAgICAgICBjb250ZXh0LmNsZWFyTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hDb3VudCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKS5sZW5ndGg7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBmb3VuZCcgOlxuICAgICAgICBtYXRjaENvdW50ID09PSAxID8gJzEgcmVzdWx0IGF2YWlsYWJsZScgOlxuICAgICAgICBgJHttYXRjaENvdW50fSByZXN1bHRzIGF2YWlsYWJsZWA7XG5cbiAgICBjb250ZXh0LnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBjb25zdCBmaXJzdE1hdGNoID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpO1xuICAgIGlmIChmaXJzdE1hdGNoIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgZmlyc3RNYXRjaC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpOiBQbHVnaW4ge1xuICAgIGxldCBzZWFyY2hUZXJtID0gJyc7XG4gICAgbGV0IHBsdWdpbkNvbnRleHQ6IFBsdWdpbkNvbnRleHQgfCBudWxsID0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdzZWFyY2gnLFxuXG4gICAgICAgIGluaXQoY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gY29udGV4dDtcbiAgICAgICAgICAgIGlmICghc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnRleHQub24oc2VhcmNoSW5wdXRFbGVtZW50LCAnaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KGNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TeW5jKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gcGx1Z2luQ29udGV4dDtcbiAgICAgICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseUhpZ2hsaWdodChwbHVnaW5Db250ZXh0LCAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHR5cGUge1dvcnNlU2VsZWN0Q29udGV4dH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG4vKipcbiAqIFByb2dyZXNzaXZlLWVuaGFuY2VtZW50IHV0aWxpdGllcyBmb3IgbmF0aXZlIHtAbGluayBIVE1MU2VsZWN0RWxlbWVudH0gY29udHJvbHMuXG4gKlxuICogS2VlcHMgdGhlIG5hdGl2ZSBgPHNlbGVjdD5gIGFzIHNvdXJjZSBvZiB0cnV0aCBmb3IgdmFsdWUsIGRpc2FibGVkIHN0YXRlLCBgc2l6ZWAsIGFuZFxuICogYG11bHRpcGxlYCwgd2hpbGUgbWlycm9yaW5nIHRoYXQgc3RhdGUgaW50byBhIGN1c3RvbSBET00gc3RydWN0dXJlIHRoYXQgaXMgZWFzaWVyIHRvIHN0eWxlLlxuICpcbiAqIFdpZGdldC1zcGVjaWZpYyBiZWhhdmlvciB1c2VzIGBkYXRhLSpgIGF0dHJpYnV0ZXMgc3VjaCBhcyBgZGF0YS1zZWFyY2hhYmxlYCBhbmRcbiAqIGBkYXRhLWRyb3Bkb3duLWhlaWdodC1weGAsIGtlZXBpbmcgdGhlIHB1YmxpYyBBUEkgYWxpZ25lZCB3aXRoIHN0YW5kYXJkIEhUTUwuXG4gKi9cbmltcG9ydCB7IERFRkFVTFRfQ09ORklHLCBQbHVnaW4sIFBsdWdpbkNvbnRleHQsIFJvb3ROb2RlLCBTZWxlY3RDb25maWcsIFdvcnNlU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlQ1NTIH0gZnJvbSAnLi9jc3MnO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgY3JlYXRlV29yc2VPcHRpb25FbGVtZW50LCBjcmVhdGVXb3JzZVNlbGVjdCwgZ2V0T3B0aW9uSWQsIHNjcm9sbE9wdGlvbkludG9WaWV3IH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCwgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uLCB1bmxpbmtPcHRpb24gfSBmcm9tICcuL29wdGlvbi1tYXAnO1xuaW1wb3J0IHsgZ2V0TGlzdEJveEhlaWdodCwgaXNNdWx0aXBsZVNlbGVjdCwgaXNQbGFjZWhvbGRlck9wdGlvbiwgc2hvdWxkVXNlTGlzdGJveE1vZGUgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4gfSBmcm9tICcuL2ZlYXR1cmVzL3NlYXJjaCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IG5ldyBXZWFrTWFwPEhUTUxTZWxlY3RFbGVtZW50LCBXb3JzZVNlbGVjdD4oKTtcbmxldCBuZXh0SW5zdGFuY2VJZCA9IDA7XG5cbnR5cGUgUGx1Z2luTGlzdGVuZXIgPSB7IHRhcmdldDogRXZlbnRUYXJnZXQ7IGV2ZW50OiBzdHJpbmc7IGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgfTtcblxuY2xhc3MgV29yc2VTZWxlY3QgaW1wbGVtZW50cyBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIC8vIFRyYWNrcyBhbGwgbW91bnRlZCBpbnN0YW5jZXMgc28gYSBzaW5nbGUgZG9jdW1lbnQtbGV2ZWwgcG9pbnRlcmRvd24gbGlzdGVuZXIgY2FuIGNsb3NlIGFueVxuICAgIC8vIG9wZW4gZHJvcGRvd24gd2hlbiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSwgaW5zdGVhZCBvZiByZWdpc3RlcmluZyBvbmUgbGlzdGVuZXIgcGVyIGluc3RhbmNlLlxuICAgIC8vIE5vdGU6IGBwcml2YXRlYCBpcyBhIFR5cGVTY3JpcHQtb25seSBjb25zdHJhaW50IGFuZCBpcyBub3QgZW5mb3JjZWQgaW4gdGhlIGNvbXBpbGVkIG91dHB1dC5cbiAgICBwcml2YXRlIHN0YXRpYyBtb3VudGVkSW5zdGFuY2VzID0gbmV3IFNldDxXb3JzZVNlbGVjdD4oKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGhhbmRsZURvY3VtZW50UG9pbnRlckRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2Uud29yc2VTZWxlY3RFbGVtZW50ICYmICFpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZXJJZD86IG51bWJlcjtcbiAgICBwcml2YXRlIHR5cGVBaGVhZFRleHQgPSAnJztcbiAgICBwcml2YXRlIHR5cGVBaGVhZFRpbWVvdXQgPSAxMDAwO1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIHJvb3Q6IFJvb3ROb2RlO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcblxuICAgIHdvcnNlU2VsZWN0RWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIGhlYWRlckVsZW1lbnQ/OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBkcm9wZG93blBhbmVsRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgbWVzc2FnZUVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25PYnNlcnZlcj86IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgICBvblNlbGVjdENoYW5nZT86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25TZWFyY2hLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkxpc3Rib3hGb2N1cz86IEV2ZW50TGlzdGVuZXI7XG5cbiAgICBvcGVuID0gZmFsc2U7XG4gICAgYWN0aXZlT3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IFBsdWdpbltdID0gW107XG4gICAgcHJpdmF0ZSBwbHVnaW5MaXN0ZW5lcnM6IFBsdWdpbkxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCBjb25maWc6IFBhcnRpYWw8U2VsZWN0Q29uZmlnPiA9IHt9LCByb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJZCA9IGB3cy0keysrbmV4dEluc3RhbmNlSWR9YDtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gWy4uLnBsdWdpbnNdO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWFyY2hhYmxlICYmICFwbHVnaW5zLnNvbWUocCA9PiBwLm5hbWUgPT09ICdzZWFyY2gnKSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gY3JlYXRlV29yc2VTZWxlY3QodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW1lc3NhZ2UnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVUeXBlQWhlYWQpO1xuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmFkZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmRlc3Ryb3k/LigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgeyB0YXJnZXQsIGV2ZW50LCBoYW5kbGVyIH0gb2YgdGhpcy5wbHVnaW5MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5vblNlbGVjdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0NsaWNrICYmIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlckNsaWNrICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkhlYWRlckNsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyS2V5RG93biAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkhlYWRlcktleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNLZXlEb3duICYmIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbk9wdGlvbnNLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uU2VhcmNoS2V5RG93biAmJiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25MaXN0Ym94Rm9jdXMgJiYgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vbkxpc3Rib3hGb2N1cyk7XG4gICAgICAgICAgICB0aGlzLm9uTGlzdGJveEZvY3VzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5kZWxldGUodGhpcyk7XG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZVR5cGVBaGVhZCk7XG5cbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCh1bmxpbmtPcHRpb24pO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzeW5jRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgY29uZmlnIH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZWN0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUud2lkdGggJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJ2F1dG8nICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICcwcHgnKSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSBjb21wdXRlZFN0eWxlLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZGVyRWxlbWVudC5zdHlsZS5mb250ID0gY29tcHV0ZWRTdHlsZS5mb250O1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuWzBdIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gZmlyc3RPcHRpb24gPyBnZXRMaXN0Qm94SGVpZ2h0KHNlbGVjdEVsZW1lbnQsIGZpcnN0T3B0aW9uKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0KSBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NvbmZpZy5kcm9wZG93bkhlaWdodFB4fXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU9wZW5TdGF0ZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBpc0xpc3Rib3hNb2RlID0gc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGlzTGlzdGJveE1vZGUgPyB0cnVlIDogdGhpcy5vcGVuO1xuXG4gICAgICAgIGNvbnN0IGlzRGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcyAmJlxuICAgICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnNlbGVjdEVsZW1lbnQpLmNvbG9yU2NoZW1lLmluY2x1ZGVzKCdkYXJrJyk7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicsIGlzT3Blbik7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3Rib3gnLCBpc0xpc3Rib3hNb2RlKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbXVsdGlwbGUnLCBpc011bHRpcGxlU2VsZWN0KHRoaXMpKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsIGlzRGFyayk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgU3RyaW5nKGlzT3BlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCBTdHJpbmcoaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSkpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBpc09wZW4gPyAwIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbi5zZWxlY3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmIChoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBzZWxlY3RPcHRpb24uZGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgICAoc2VsZWN0T3B0aW9uLnBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MT3B0R3JvdXBFbGVtZW50ICYmIHNlbGVjdE9wdGlvbi5wYXJlbnRFbGVtZW50LmRpc2FibGVkKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhpc0Rpc2FibGVkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUhlYWRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlckVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBsYWJlbEVsID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbCcpO1xuICAgICAgICBpZiAoIShsYWJlbEVsIGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID1cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zWzBdID8/XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50Lm9wdGlvbnNbc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4XSA/P1xuICAgICAgICAgICAgbnVsbDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdGVkT3B0aW9uKSAmJiB0aGlzLm9wZW4pXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6IHNlbGVjdGVkT3B0aW9uPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC50aXRsZSA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsID8gYFNlbGVjdGVkOiAke2xhYmVsfWAgOiAnU2VsZWN0IGFuIG9wdGlvbicpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSB7XG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGVsLmlkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKT8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3luY0RpbWVuc2lvbnMoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25TeW5jPy4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHsgbWVzc2FnZUVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIC8vIERlZmVyIHRoZSB1cGRhdGUgYnkgb25lIHRpY2sgc28gc2NyZWVuIHJlYWRlcnMgYW5ub3VuY2UgYSBjaGFuZ2UgZXZlbiB3aGVuIHRoZVxuICAgICAgICAvLyBtZXNzYWdlIHRleHQgaGFwcGVucyB0byBiZSB0aGUgc2FtZSBzdHJpbmcgYXMgdGhlIHByZXZpb3VzIGFubm91bmNlbWVudC5cbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUVsZW1lbnQgPT09IG1lc3NhZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG5cbiAgICBjbGVhck1lc3NhZ2UoKSB7XG4gICAgICAgIGlmICghKHRoaXMubWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5tZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgIH1cblxuICAgIG9wZW5Ecm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbk9wZW4/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcGVuKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uQ2xvc2U/LigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKCkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cblxuICAgIG9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpIHtcbiAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcblxuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHNjcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuYWN0aXZlT3B0aW9uKTtcbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZmlsdGVyKG9wdCA9PiB7XG4gICAgICAgICAgICBpZiAob3B0LmRpc2FibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZ2V0V29yc2VPcHRpb25FbGVtZW50KG9wdCkgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCB1bmRlZmluZWQsIHNjcm9sbCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSBzZWxlY3RPcHRpb247XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCk7XG4gICAgICAgIGlmIChzY3JvbGwpIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbik7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZU9wdGlvbihkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmFjdGl2ZU9wdGlvbiA/IG9wdGlvbnMuaW5kZXhPZih0aGlzLmFjdGl2ZU9wdGlvbikgOiAtMTtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ID09PSAtMVxuICAgICAgICAgICAgPyAoZGVsdGEgPj0gMCA/IDAgOiBvcHRpb25zLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKG9wdGlvbnMubGVuZ3RoIC0gMSwgY3VycmVudEluZGV4ICsgZGVsdGEpKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihvcHRpb25zW25leHRJbmRleF0pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVUb0JvdW5kYXJ5KGJvdW5kYXJ5OiAnc3RhcnQnIHwgJ2VuZCcpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihib3VuZGFyeSA9PT0gJ3N0YXJ0JyA/IG9wdGlvbnNbMF0gOiBvcHRpb25zW29wdGlvbnMubGVuZ3RoIC0gMV0pO1xuICAgIH1cblxuICAgIGdldFBhZ2VKdW1wU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKSlcbiAgICAgICAgICAgIC5maW5kKGVsID0+IGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpO1xuICAgICAgICBpZiAoIShmaXJzdE9wdGlvbiBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkhlaWdodCA9IGZpcnN0T3B0aW9uLm9mZnNldEhlaWdodCB8fCAxO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihvcHRpb25zTGlzdEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gb3B0aW9uSGVpZ2h0KSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZUJ5UGFnZShkaXJlY3Rpb246IDEgfCAtMSkge1xuICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24odGhpcy5nZXRQYWdlSnVtcFNpemUoKSAqIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZU9wdGlvbiwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24gfHwgYWN0aXZlT3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbi5zZWxlY3RlZCA9ICFhY3RpdmVPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihhY3RpdmVPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQbHVnaW5zKCkge1xuICAgICAgICBpZiAoISh0aGlzLmhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEodGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb250ZXh0OiBQbHVnaW5Db250ZXh0ID0ge1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudDogdGhpcy5zZWxlY3RFbGVtZW50LFxuICAgICAgICAgICAgaGVhZGVyRWxlbWVudDogdGhpcy5oZWFkZXJFbGVtZW50LFxuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50OiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCxcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudDogdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQsXG4gICAgICAgICAgICBzZXRNZXNzYWdlOiAodGV4dCkgPT4gdGhpcy5zZXRNZXNzYWdlKHRleHQpLFxuICAgICAgICAgICAgY2xlYXJNZXNzYWdlOiAoKSA9PiB0aGlzLmNsZWFyTWVzc2FnZSgpLFxuICAgICAgICAgICAgb246ICh0YXJnZXQsIGV2ZW50LCBoYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJzLnB1c2goeyB0YXJnZXQsIGV2ZW50LCBoYW5kbGVyIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5pbml0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gS2V5Ym9hcmQgY29udHJhY3RzIGZvciBoZWFkZXIsIGxpc3QsIGFuZCBzZWFyY2ggYXJlIGtlcHQgdG9nZXRoZXIgaGVyZSBcdTIwMTQgc3BsaXR0aW5nIHRoZW1cbiAgICAvLyB3b3VsZCBzY2F0dGVyIHJlbGF0ZWQga2V5IGhhbmRsaW5nIGFjcm9zcyBtdWx0aXBsZSBtZXRob2RzLiBJZiB0aGlzIGdyb3dzIHNpZ25pZmljYW50bHksXG4gICAgLy8gY29uc2lkZXIgYnJlYWtpbmcgb3V0IHBlci1jb21wb25lbnQgaGFuZGxlcnMuXG4gICAgcHJpdmF0ZSBiaW5kRXZlbnRzKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgZHJvcGRvd25QYW5lbEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSB0aGlzO1xuXG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShkcm9wZG93blBhbmVsRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0NsaWNrOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uRWwgPSB0YXJnZXQuY2xvc2VzdCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKTtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbkVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIWRyb3Bkb3duUGFuZWxFbGVtZW50LmNvbnRhaW5zKG9wdGlvbkVsKSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG9wdGlvbkVsLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KG9wdGlvbkVsKTtcbiAgICAgICAgICAgIGlmICghc2VsZWN0T3B0aW9uIHx8IHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihzZWxlY3RPcHRpb24sIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPSAhc2VsZWN0T3B0aW9uLnNlbGVjdGVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25TZWxlY3RDaGFuZ2U6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnN5bmNBbGwoKTtcbiAgICAgICAgY29uc3Qgb25IZWFkZXJDbGljazogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblxuICAgICAgICBjb25zdCBvbkhlYWRlcktleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIDogdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25TZWFyY2hLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PcHRpb25zQ2xpY2spO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIG9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uSGVhZGVyQ2xpY2spO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkhlYWRlcktleURvd24pO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uT3B0aW9uc0tleURvd24pO1xuXG4gICAgICAgIGNvbnN0IG9uTGlzdGJveEZvY3VzOiBFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSB8fCB0aGlzLmFjdGl2ZU9wdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZmluZChvID0+IG8uc2VsZWN0ZWQgJiYgIWlzUGxhY2Vob2xkZXJPcHRpb24obykpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpWzBdO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gc2VsZWN0ZWQgPz8gZmlyc3Q7XG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB0aGlzLnNldEFjdGl2ZU9wdGlvbih0YXJnZXQsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkxpc3Rib3hGb2N1cyk7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuICAgICAgICB0aGlzLm9uTGlzdGJveEZvY3VzID0gb25MaXN0Ym94Rm9jdXM7XG5cbiAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgfVxuXG4gICAgLy8gRE9NIGRpZmZpbmcgaXMga2VwdCBpbmxpbmUgaGVyZSBiZWNhdXNlIHRoZSBtdXRhdGlvbiBjYXNlcyBhcmUgdGlnaHRseSBjb3VwbGVkIHRvIGVhY2hcbiAgICAvLyBvdGhlciBhbmQgdGhlIHNjcm9sbGVyJ3MgY2hpbGQgb3JkZXIuIElmIHRoaXMgZ3Jvd3MgKGUuZy4gb3B0aW9uIGdyb3VwcywgcmVvcmRlcmluZ1xuICAgIC8vIGFuaW1hdGlvbnMpLCBleHRyYWN0IGludG8gYSBkZWRpY2F0ZWQgcmVjb25jaWxlci5cbiAgICBwcml2YXRlIG9ic2VydmVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3VsZFJlYnVpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGVTdGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWJ1aWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRSZWJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rZWRPcHRpb24gPSBnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5rZWRPcHRpb24gfHwgIUFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmNsdWRlcyhsaW5rZWRPcHRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlua2VkT3B0aW9uKSB1bmxpbmtPcHRpb24obGlua2VkT3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCgoc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQodGhpcywgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuaWQgPSBnZXRPcHRpb25JZCh0aGlzLCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF0SW5kZXggPSBvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW5bb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF0SW5kZXggIT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXRJbmRleCA/IGN1cnJlbnRBdEluZGV4LmJlZm9yZShlbCkgOiBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50ICYmICFnZXRTZWxlY3RPcHRpb25FbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2VsZWN0RWxlbWVudCwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJywgJ2NsYXNzJywgJ2Rpc2FibGVkJywgJ211bHRpcGxlJywgJ3NpemUnXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgd29yc2VTZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZnRlcih3b3JzZVNlbGVjdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVHlwZUFoZWFkID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Lmxlbmd0aCAhPT0gMSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHdvcnNlT3B0aW9ucyA9IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50Py5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ICs9IGUua2V5O1xuICAgICAgICBsZXQgdHlwZUFoZWFkVGV4dCA9IHRoaXMudHlwZUFoZWFkVGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICh3b3JzZU9wdGlvbnMgJiYgdHlwZUFoZWFkVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdXb3JzZU9wdGlvbiA9IEFycmF5LmZyb20od29yc2VPcHRpb25zKS5maW5kKHdvcnNlT3B0aW9uID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd29yc2VPcHRpb24udGV4dENvbnRlbnQudHJpbSgpLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0eXBlQWhlYWRUZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBtYXRjaGluZ1dvcnNlT3B0aW9uPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nV29yc2VPcHRpb24pIG1hdGNoaW5nV29yc2VPcHRpb24uc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnR5cGVBaGVhZFRpbWVySWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnR5cGVBaGVhZFRpbWVySWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHlwZUFoZWFkVGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50eXBlQWhlYWRUZXh0ID0gJyc7XG4gICAgICAgIH0sIHRoaXMudHlwZUFoZWFkVGltZW91dCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEVuaGFuY2VzIGV2ZXJ5IG5hdGl2ZSBgPHNlbGVjdD5gIGVsZW1lbnQgaW5zaWRlIHRoZSBwcm92aWRlZCByb290LlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzYWZlIHRvIGNhbGwgbXVsdGlwbGUgdGltZXMuIEVhY2ggYDxzZWxlY3Q+YCBpcyBtb3VudGVkIGF0IG1vc3Qgb25jZS5cbiAqIElmIGBvcHRpb25zLm9ic2VydmVgIGlzIHRydWUsIG5ld2x5IGFkZGVkIHNlbGVjdHMgdW5kZXIgdGhlIHJvb3QgYXJlIGVuaGFuY2VkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogUmV0dXJucyBhIGNsZWFudXAgZnVuY3Rpb24gdGhhdCBkaXNjb25uZWN0cyB0aGUgcm9vdCBvYnNlcnZlciBhbmQgZGVzdHJveXMgbW91bnRlZCBpbnN0YW5jZXNcbiAqIHVuZGVyIHRoZSBwcm92aWRlZCByb290LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd29yc2VTZWxlY3Qocm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgb3B0aW9uczogV29yc2VTZWxlY3RPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zID8/IFtdO1xuICAgIG1vdW50U2VsZWN0c0luUm9vdChyb290LCBwbHVnaW5zKTtcblxuICAgIGxldCByb290T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5vYnNlcnZlKSB7XG4gICAgICAgIHJvb3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uTGlzdCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlICE9PSAnY2hpbGRMaXN0JykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goYWRkZWROb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYWRkZWROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChhZGRlZE5vZGUsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChlbCwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb290T2JzZXJ2ZXIub2JzZXJ2ZShyb290LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByb290T2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgaW5zdGFuY2VzLmRlbGV0ZShzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCkge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzPVwidHJ1ZVwiXScpKSByZXR1cm47XG5cbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcycsICd0cnVlJyk7XG4gICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3JlYXRlQ1NTKCk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290OiBSb290Tm9kZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RzSW5Sb290KHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudCwgcm9vdCwgcGx1Z2lucykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGlmIChpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBXb3JzZVNlbGVjdChzZWxlY3RFbGVtZW50LCBnZXRDb25maWcoc2VsZWN0RWxlbWVudCksIHJvb3QsIHBsdWdpbnMpO1xuICAgIGluc3RhbmNlLm1vdW50KCk7XG4gICAgaW5zdGFuY2VzLnNldChzZWxlY3RFbGVtZW50LCBpbnN0YW5jZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0dPLElBQU0saUJBQWlCO0FBQUEsRUFDMUIsWUFBWTtBQUFBLEVBQ1osa0JBQWtCO0FBQUEsRUFDbEIsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUNYOzs7QUNITyxTQUFTLFlBQVk7QUFDeEI7QUFBQTtBQUFBLElBQTJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBbUJSLGVBQWUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBa0czQixlQUFlLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQWlFZixlQUFlLGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXFIckQ7OztBQzVT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