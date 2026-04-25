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

    .worse-select-container:not(.listbox) .worse-select-options-scroller {
        max-height: ${DEFAULT_CONFIG.dropdownHeightPx}px;
    }
    
    .worse-select-options-scroller {
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
        --ws-highlight-bg: var(--ws-dark-highlight-bg, #4a3c00);
        --ws-shadow: var(--ws-dark-shadow, 0 4px 12px rgba(0, 0, 0, 0.4));
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
  const selectOptions = Array.from(worseSelectInstance.selectElement.options);
  for (let i = 0; i < selectOptions.length; i++) {
    const selectOption = selectOptions[i];
    const worseOptionElement = createWorseOptionElement(
      worseSelectInstance,
      selectOption,
      i
    );
    linkOption(selectOption, worseOptionElement);
    optionsListElement.appendChild(worseOptionElement);
  }
  return worseSelectElement;
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
      el?.classList.toggle("disabled", selectOption.disabled);
      el?.setAttribute("aria-disabled", String(selectOption.disabled));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7XG5leHBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlc1wiOyIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgZHJvcGRvd25IZWlnaHRQeDogNDAwLFxuICAgIGhlaWdodDogJzMycHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn07XG5cbi8vIE1hcHMgZWFjaCBjb25maWcgdmFsdWUgdG8gaXRzIHdpZGVuZWQgcHJpbWl0aXZlIHR5cGUgKGUuZy4gdHJ1ZSBcdTIxOTIgYm9vbGVhbikgc28gdGhhdFxuLy8gU2VsZWN0Q29uZmlnIGFjY2VwdHMgYW55IHZhbGlkIHZhbHVlIG9mIHRoYXQgdHlwZSwgbm90IGp1c3QgdGhlIHNwZWNpZmljIGRlZmF1bHQgbGl0ZXJhbC5cbmV4cG9ydCB0eXBlIFdpZGVuPFQ+ID0gVCBleHRlbmRzIGJvb2xlYW4gPyBib29sZWFuIDogVCBleHRlbmRzIHN0cmluZyA/IHN0cmluZyA6IFQgZXh0ZW5kcyBudW1iZXIgPyBudW1iZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RDb25maWcgPSB7XG4gICAgW0sgaW4ga2V5b2YgdHlwZW9mIERFRkFVTFRfQ09ORklHXTogV2lkZW48KHR5cGVvZiBERUZBVUxUX0NPTkZJRylbS10+XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXkgPSBrZXlvZiBTZWxlY3RDb25maWc7XG5leHBvcnQgdHlwZSBSb290Tm9kZSA9IFBhcmVudE5vZGU7XG5cbmV4cG9ydCB0eXBlIFBsdWdpbkNvbnRleHQgPSB7XG4gICAgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgaGVhZGVyRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgb3B0aW9uc0xpc3RFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgICBjbGVhck1lc3NhZ2UoKTogdm9pZDtcbiAgICBvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFBsdWdpbiA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KTogdm9pZDtcbiAgICBvblN5bmM/KCk6IHZvaWQ7XG4gICAgb25PcGVuPygpOiB2b2lkO1xuICAgIG9uQ2xvc2U/KCk6IHZvaWQ7XG4gICAgZGVzdHJveT8oKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFdvcnNlU2VsZWN0T3B0aW9ucyA9IHtcbiAgICBvYnNlcnZlPzogYm9vbGVhbjtcbiAgICBwbHVnaW5zPzogUGx1Z2luW107XG59O1xuXG4vLyBNaW5pbWFsIGludGVyZmFjZSBleHBvc2VkIHRvIGRvbS50cyBhbmQgc2VsZWN0LWhlbHBlcnMudHMuIFJlc3RyaWN0cyB0aG9zZSBtb2R1bGVzIHRvIHRoZVxuLy8gcHJvcGVydGllcyB0aGV5IGFjdHVhbGx5IG5lZWQsIGtlZXBpbmcgdGhlIGZ1bGwgV29yc2VTZWxlY3QgY2xhc3MgaW50ZXJuYWwgdG8gY29yZS50cy5cbmV4cG9ydCBpbnRlcmZhY2UgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTUygpIHtcbiAgICByZXR1cm4gIC8qIGxhbmd1YWdlPUNTUyAqLyBgXG4gICAgOnJvb3Qge1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogIzc2NzY3NjtcbiAgICAgICAgLS13cy1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIC0td3MtYmc6ICNmZmY7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogI2YwZjBmMDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiAjNmQ2ZDZkO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiAjZjFmMWYxO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogI2VlZjRmZjtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogI2QyZTNmYztcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjMTc0ZWE2O1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICAgICAgLS13cy1oZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgLS13cy1tb3Rpb24tZHVyYXRpb246IDIwMG1zO1xuICAgICAgICAtLXdzLW1vdGlvbi1lYXNlOiBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXI6bm90KC5saXN0Ym94KSB7XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6ICR7REVGQVVMVF9DT05GSUcud2lkdGh9O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXdzLWhlaWdodCk7XG4gICAgICAgIHBhZGRpbmc6IDAgMjhweCAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgcmlnaHQ6IDhweDtcbiAgICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMGRlZyk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTBweCAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyB2aWV3Qm94PScwIDAgMTIgMTInIGZpbGw9J25vbmUnJTNFJTNDcGF0aCBkPSdNMyA0LjVMNiA3LjVMOSA0LjUnIHN0cm9rZT0nJTIzMzMzMzMzJyBzdHJva2Utd2lkdGg9JzEuMScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRpc2FibGVkIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOmZvY3VzLXZpc2libGUsXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQ6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS13cy1mb2N1cy1vdXRsaW5lKSAhaW1wb3J0YW50O1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKDEwMCUgKyAycHgpO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNnB4KTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgYm94LXNoYWRvdzogdmFyKC0td3Mtc2hhZG93KTtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgZGlzcGxheSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIGFsbG93LWRpc2NyZXRlLFxuICAgICAgICAgICAgb3BhY2l0eSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKSxcbiAgICAgICAgICAgIHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgZGlzcGxheSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIGFsbG93LWRpc2NyZXRlLFxuICAgICAgICAgICAgb3BhY2l0eSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKSxcbiAgICAgICAgICAgIHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICB9XG5cbiAgICBAc3RhcnRpbmctc3R5bGUge1xuICAgICAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoIHtcbiAgICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0td3MtZGl2aWRlci1jb2xvcik7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyOm5vdCgubGlzdGJveCkgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlcixcbiAgICAgICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbi53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRhcmsge1xuICAgICAgICBjb2xvci1zY2hlbWU6IGRhcms7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiB2YXIoLS13cy1kYXJrLWJvcmRlci1jb2xvciwgIzU1NSk7XG4gICAgICAgIC0td3MtYmc6IHZhcigtLXdzLWRhcmstYmcsICMxZTFlMWUpO1xuICAgICAgICAtLXdzLXRleHQtY29sb3I6IHZhcigtLXdzLWRhcmstdGV4dC1jb2xvciwgI2U4ZWFlZCk7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtYmc6IHZhcigtLXdzLWRhcmstZGlzYWJsZWQtYmcsICMyYTJhMmEpO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6IHZhcigtLXdzLWRhcmstZGlzYWJsZWQtdGV4dC1jb2xvciwgIzc3Nyk7XG4gICAgICAgIC0td3MtaG92ZXItYmc6IHZhcigtLXdzLWRhcmstaG92ZXItYmcsICMzYTNhM2EpO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogdmFyKC0td3MtZGFyay1hY3RpdmUtYmcsICMxYTNhNWMpO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiB2YXIoLS13cy1kYXJrLWFjdGl2ZS1vdXRsaW5lLCAjNjBhNWZhKTtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogdmFyKC0td3MtZGFyay1zZWxlY3RlZC1iZywgIzFlM2E1Zik7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcjogdmFyKC0td3MtZGFyay1zZWxlY3RlZC10ZXh0LWNvbG9yLCAjOTNjNWZkKTtcbiAgICAgICAgLS13cy1mb2N1cy1vdXRsaW5lOiB2YXIoLS13cy1kYXJrLWZvY3VzLW91dGxpbmUsICM2MGE1ZmEpO1xuICAgICAgICAtLXdzLXNlYXJjaC1ib3JkZXItY29sb3I6IHZhcigtLXdzLWRhcmstc2VhcmNoLWJvcmRlci1jb2xvciwgIzU1NSk7XG4gICAgICAgIC0td3MtZGl2aWRlci1jb2xvcjogdmFyKC0td3MtZGFyay1kaXZpZGVyLWNvbG9yLCAjM2EzYTNhKTtcbiAgICAgICAgLS13cy1oaWdobGlnaHQtYmc6IHZhcigtLXdzLWRhcmstaGlnaGxpZ2h0LWJnLCAjNGEzYzAwKTtcbiAgICAgICAgLS13cy1zaGFkb3c6IHZhcigtLXdzLWRhcmstc2hhZG93LCAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC40KSk7XG4gICAgfVxuICAgIGA7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtDb25maWdLZXksIERFRkFVTFRfQ09ORklHLCBTZWxlY3RDb25maWd9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmNvbnN0IGNvbmZpZ0tleXMgPSBPYmplY3Qua2V5cyhERUZBVUxUX0NPTkZJRykgYXMgQ29uZmlnS2V5W107XG5cbmZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW0EtWl0vZywgY2hhcmFjdGVyID0+IGAtJHtjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb25maWdWYWx1ZTxLIGV4dGVuZHMgQ29uZmlnS2V5PihrZXk6IEssIGF0dHI6IHN0cmluZyk6IFNlbGVjdENvbmZpZ1tLXSB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gREVGQVVMVF9DT05GSUdba2V5XTtcblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIChhdHRyID09PSAndHJ1ZScpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihhdHRyKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHIgYXMgU2VsZWN0Q29uZmlnW0tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQ6IEVsZW1lbnQpOiBTZWxlY3RDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogU2VsZWN0Q29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbmZpZ0tleXNbaV07XG4gICAgICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVOYW1lID0gYGRhdGEtJHt0b0tlYmFiQ2FzZShrZXkpfWA7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBzZWxlY3RFbGVtZW50LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlTmFtZSk7XG5cbiAgICAgICAgaWYgKGF0dHIgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIChjb25maWcgYXMgUmVjb3JkPENvbmZpZ0tleSwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcj4pW2tleV0gPSBwYXJzZUNvbmZpZ1ZhbHVlKGtleSwgYXR0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtXb3JzZVNlbGVjdENvbnRleHR9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50LnNpemUgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm11bHRpcGxlO1xufVxuXG4vLyBNYXRjaGVzIHRoZSBjb252ZW50aW9uYWwgSFRNTCBwbGFjZWhvbGRlciBwYXR0ZXJuOiA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ+TGFiZWw8L29wdGlvbj4uXG4vLyBPcHRpb25zIHRoYXQgYXJlIG5vdCBkaXNhYmxlZCBvciBoYXZlIGEgbm9uLWVtcHR5IHZhbHVlIGFyZSB0cmVhdGVkIGFzIHNlbGVjdGFibGUuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWxlY3RPcHRpb24gIT09IG51bGwgJiYgc2VsZWN0T3B0aW9uLnZhbHVlID09PSAnJyAmJiBzZWxlY3RPcHRpb24uZGlzYWJsZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMaXN0Qm94SGVpZ2h0KHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHNlbGVjdEVsZW1lbnQuc2l6ZSA8PSAxKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IG9uZVJvd0hlaWdodCA9IHdvcnNlT3B0aW9uRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgY29uc3QgdG90YWxIZWlnaHQgPSBvbmVSb3dIZWlnaHQgKiBzZWxlY3RFbGVtZW50LnNpemU7XG5cbiAgICBjb25zdCBzZWxlY3RQYXJlbnRIZWlnaHQgPSBzZWxlY3RFbGVtZW50LnBhcmVudEVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA/PyAxMDAwMDtcbiAgICByZXR1cm4gTWF0aC5taW4odG90YWxIZWlnaHQsIHNlbGVjdFBhcmVudEhlaWdodCkgKyAncHgnO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG4vLyBUd28gV2Vha01hcHMgbWFpbnRhaW4gYSBiaWRpcmVjdGlvbmFsIGxpbmsgYmV0d2VlbiBuYXRpdmUgPG9wdGlvbj4gZWxlbWVudHMgYW5kIHRoZWlyXG4vLyByZW5kZXJlZCB3aWRnZXQgZGl2cy4gV2Vha01hcCBrZXlzIGFsbG93IEdDIHRvIHJlY2xhaW0gZWxlbWVudHMgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIHdpdGhvdXQgcmVxdWlyaW5nIGV4cGxpY2l0IGNsZWFudXAgb24gZXZlcnkgcmVtb3ZhbCBwYXRoLlxuY29uc3Qgb3B0aW9uVG9EaXYgPSBuZXcgV2Vha01hcDxIVE1MT3B0aW9uRWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+KCk7XG5jb25zdCBkaXZUb09wdGlvbiA9IG5ldyBXZWFrTWFwPEhUTUxEaXZFbGVtZW50LCBIVE1MT3B0aW9uRWxlbWVudD4oKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgb3B0aW9uVG9EaXYuc2V0KHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICBkaXZUb09wdGlvbi5zZXQod29yc2VPcHRpb25FbGVtZW50LCBzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIXdvcnNlT3B0aW9uRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgb3B0aW9uVG9EaXYuZGVsZXRlKHNlbGVjdE9wdGlvbik7XG4gICAgZGl2VG9PcHRpb24uZGVsZXRlKHdvcnNlT3B0aW9uRWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIHJldHVybiBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdE9wdGlvbkVsZW1lbnQod29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIHJldHVybiBkaXZUb09wdGlvbi5nZXQod29yc2VPcHRpb25FbGVtZW50KTtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgaXNNdWx0aXBsZVNlbGVjdCwgc2hvdWxkVXNlTGlzdGJveE1vZGUgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGlmICghc2VsZWN0T3B0aW9uKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZFN0eWxlQXR0cmlidXRlKHN0eWxlUGFydHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHN0eWxlUGFydHMubGVuZ3RoID4gMCA/IGAgc3R5bGU9XCIke3N0eWxlUGFydHMuam9pbignICcpfVwiYCA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlUGFydHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGggIT09IERFRkFVTFRfQ09ORklHLndpZHRoKSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgd2lkdGg6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGh9O2ApO1xuICAgIH1cblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHQgIT09IERFRkFVTFRfQ09ORklHLmhlaWdodCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYGhlaWdodDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHR9O2ApO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFN0eWxlQXR0cmlidXRlKGhlYWRlclN0eWxlUGFydHMpO1xufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCwgb3B0aW9uSW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBgJHt3b3JzZVNlbGVjdEluc3RhbmNlLmluc3RhbmNlSWR9LW9wdGlvbi0ke29wdGlvbkluZGV4fWA7XG59XG5cbmZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LW9wdGlvbiddO1xuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25IdG1sKFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkNsYXNzZXMgPSBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uKTtcbiAgICBjb25zdCBvcHRpb25UZXh0ID0gc2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID8/ICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGlkPVwiJHtnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlLCBvcHRpb25JbmRleCl9XCJcbiAgICAgICAgIGNsYXNzPVwiJHt3b3JzZU9wdGlvbkNsYXNzZXN9XCJcbiAgICAgICAgIGRhdGEtdmFsdWU9XCIke2VzY2FwZUh0bWwoc2VsZWN0T3B0aW9uLnZhbHVlKX1cIlxuICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHtzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICAgICBhcmlhLWRpc2FibGVkPVwiJHtzZWxlY3RPcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiPlxuICAgICAgJHtlc2NhcGVIdG1sKG9wdGlvblRleHQpfVxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgY3JlYXRlV29yc2VPcHRpb25IdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgaWYgKCF3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5zZWFyY2hhYmxlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggbGlzdFwiXG4gICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIG9wdGlvbnNcIiAvPlxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlSHRtbCgpIHtcbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtbWVzc2FnZSB3b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZUF0dHJpYnV0ZSA9IGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gWyd3b3JzZS1zZWxlY3QtY29udGFpbmVyJ107XG5cbiAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdsaXN0Ym94Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBgXG4gICAgPGRpdiBjbGFzcz1cIiR7Y29udGFpbmVyQ2xhc3Nlcy5qb2luKCcgJyl9XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXJcIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9uc1wiPlxuICAgICAgICAke2NyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSl9XG4gICAgICAgICR7Y3JlYXRlTWVzc2FnZUh0bWwoKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyXCIke2hlYWRlclN0eWxlQXR0cmlidXRlfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCB3b3JzZVNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgaHRtbFN0cmluZ1xuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdCBvcHRpb25zTGlzdEVsZW1lbnQgPSB3b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkgPyAwIDogLTE7XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IEFycmF5LmZyb20od29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IHNlbGVjdE9wdGlvbnNbaV07XG4gICAgICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0SW5zdGFuY2UsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb24sXG4gICAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQod29yc2VPcHRpb25FbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yc2VTZWxlY3RFbGVtZW50O1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCB9IGZyb20gJy4uL29wdGlvbi1tYXAnO1xuXG5mdW5jdGlvbiBhcHBseUhpZ2hsaWdodChjb250ZXh0OiBQbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtID0gc2VhcmNoVGVybS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIEFycmF5LmZyb20oY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2god29yc2VPcHRpb24gPT4ge1xuICAgICAgICBpZiAoISh3b3JzZU9wdGlvbiBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gdGVybSAhPT0gJycgJiYgd29yc2VPcHRpb24udGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXJtKTtcbiAgICAgICAgd29yc2VPcHRpb24uY2xhc3NMaXN0LnRvZ2dsZSgnbWF0Y2hlcycsIG1hdGNoZXMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgIGNvbnRleHQuY2xlYXJNZXNzYWdlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaENvdW50ID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpLmxlbmd0aDtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgbWF0Y2hDb3VudCA9PT0gMCA/ICdObyByZXN1bHRzIGZvdW5kJyA6XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDEgPyAnMSByZXN1bHQgYXZhaWxhYmxlJyA6XG4gICAgICAgIGAke21hdGNoQ291bnR9IHJlc3VsdHMgYXZhaWxhYmxlYDtcblxuICAgIGNvbnRleHQuc2V0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgIGNvbnN0IGZpcnN0TWF0Y2ggPSBjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJyk7XG4gICAgaWYgKGZpcnN0TWF0Y2ggaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICBmaXJzdE1hdGNoLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2luKCk6IFBsdWdpbiB7XG4gICAgbGV0IHNlYXJjaFRlcm0gPSAnJztcbiAgICBsZXQgcGx1Z2luQ29udGV4dDogUGx1Z2luQ29udGV4dCB8IG51bGwgPSBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3NlYXJjaCcsXG5cbiAgICAgICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KSB7XG4gICAgICAgICAgICBwbHVnaW5Db250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBjb250ZXh0O1xuICAgICAgICAgICAgaWYgKCFzZWFyY2hJbnB1dEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICAgICAgY29udGV4dC5vbihzZWFyY2hJbnB1dEVsZW1lbnQsICdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlYXJjaFRlcm0gPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQoY29udGV4dCwgc2VhcmNoVGVybSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblN5bmMoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KHBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgICAgICBpZiAoIXBsdWdpbkNvbnRleHQpIHJldHVybjtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgICAgIGNvbnN0IHsgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSBwbHVnaW5Db250ZXh0O1xuICAgICAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFwcGx5SGlnaGxpZ2h0KHBsdWdpbkNvbnRleHQsICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IG51bGw7XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgdHlwZSB7V29yc2VTZWxlY3RDb250ZXh0fSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbi8qKlxuICogUHJvZ3Jlc3NpdmUtZW5oYW5jZW1lbnQgdXRpbGl0aWVzIGZvciBuYXRpdmUge0BsaW5rIEhUTUxTZWxlY3RFbGVtZW50fSBjb250cm9scy5cbiAqXG4gKiBLZWVwcyB0aGUgbmF0aXZlIGA8c2VsZWN0PmAgYXMgc291cmNlIG9mIHRydXRoIGZvciB2YWx1ZSwgZGlzYWJsZWQgc3RhdGUsIGBzaXplYCwgYW5kXG4gKiBgbXVsdGlwbGVgLCB3aGlsZSBtaXJyb3JpbmcgdGhhdCBzdGF0ZSBpbnRvIGEgY3VzdG9tIERPTSBzdHJ1Y3R1cmUgdGhhdCBpcyBlYXNpZXIgdG8gc3R5bGUuXG4gKlxuICogV2lkZ2V0LXNwZWNpZmljIGJlaGF2aW9yIHVzZXMgYGRhdGEtKmAgYXR0cmlidXRlcyBzdWNoIGFzIGBkYXRhLXNlYXJjaGFibGVgIGFuZFxuICogYGRhdGEtZHJvcGRvd24taGVpZ2h0LXB4YCwga2VlcGluZyB0aGUgcHVibGljIEFQSSBhbGlnbmVkIHdpdGggc3RhbmRhcmQgSFRNTC5cbiAqL1xuaW1wb3J0IHtERUZBVUxUX0NPTkZJRywgUGx1Z2luLCBQbHVnaW5Db250ZXh0LCBSb290Tm9kZSwgU2VsZWN0Q29uZmlnLCBXb3JzZVNlbGVjdE9wdGlvbnN9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVDU1N9IGZyb20gJy4vY3NzJztcbmltcG9ydCB7Z2V0Q29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2NyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudCwgY3JlYXRlV29yc2VTZWxlY3QsIGdldE9wdGlvbklkLCBzY3JvbGxPcHRpb25JbnRvVmlld30gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHtnZXRTZWxlY3RPcHRpb25FbGVtZW50LCBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24sIHVubGlua09wdGlvbn0gZnJvbSAnLi9vcHRpb24tbWFwJztcbmltcG9ydCB7Z2V0TGlzdEJveEhlaWdodCwgaXNNdWx0aXBsZVNlbGVjdCwgaXNQbGFjZWhvbGRlck9wdGlvbiwgc2hvdWxkVXNlTGlzdGJveE1vZGV9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHtjcmVhdGVCdWlsdGluU2VhcmNoUGx1Z2lufSBmcm9tICcuL2ZlYXR1cmVzL3NlYXJjaCc7XG5cbmNvbnN0IGluc3RhbmNlcyA9IG5ldyBXZWFrTWFwPEhUTUxTZWxlY3RFbGVtZW50LCBXb3JzZVNlbGVjdD4oKTtcbmxldCBuZXh0SW5zdGFuY2VJZCA9IDA7XG5cbnR5cGUgUGx1Z2luTGlzdGVuZXIgPSB7IHRhcmdldDogRXZlbnRUYXJnZXQ7IGV2ZW50OiBzdHJpbmc7IGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgfTtcblxuY2xhc3MgV29yc2VTZWxlY3QgaW1wbGVtZW50cyBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIC8vIFRyYWNrcyBhbGwgbW91bnRlZCBpbnN0YW5jZXMgc28gYSBzaW5nbGUgZG9jdW1lbnQtbGV2ZWwgcG9pbnRlcmRvd24gbGlzdGVuZXIgY2FuIGNsb3NlIGFueVxuICAgIC8vIG9wZW4gZHJvcGRvd24gd2hlbiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSwgaW5zdGVhZCBvZiByZWdpc3RlcmluZyBvbmUgbGlzdGVuZXIgcGVyIGluc3RhbmNlLlxuICAgIC8vIE5vdGU6IGBwcml2YXRlYCBpcyBhIFR5cGVTY3JpcHQtb25seSBjb25zdHJhaW50IGFuZCBpcyBub3QgZW5mb3JjZWQgaW4gdGhlIGNvbXBpbGVkIG91dHB1dC5cbiAgICBwcml2YXRlIHN0YXRpYyBtb3VudGVkSW5zdGFuY2VzID0gbmV3IFNldDxXb3JzZVNlbGVjdD4oKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGhhbmRsZURvY3VtZW50UG9pbnRlckRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2Uud29yc2VTZWxlY3RFbGVtZW50ICYmICFpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZXJJZD86IG51bWJlcjtcbiAgICBwcml2YXRlIHR5cGVBaGVhZFRleHQgPSAnJztcbiAgICBwcml2YXRlIHR5cGVBaGVhZFRpbWVvdXQgPSAxMDAwO1xuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIHJvb3Q6IFJvb3ROb2RlO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcblxuICAgIHdvcnNlU2VsZWN0RWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIGhlYWRlckVsZW1lbnQ/OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBkcm9wZG93blBhbmVsRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNMaXN0RWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIHNlYXJjaElucHV0RWxlbWVudD86IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgbWVzc2FnZUVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25PYnNlcnZlcj86IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgICBvblNlbGVjdENoYW5nZT86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25TZWFyY2hLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkxpc3Rib3hGb2N1cz86IEV2ZW50TGlzdGVuZXI7XG5cbiAgICBvcGVuID0gZmFsc2U7XG4gICAgYWN0aXZlT3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICBwcml2YXRlIHBsdWdpbnM6IFBsdWdpbltdID0gW107XG4gICAgcHJpdmF0ZSBwbHVnaW5MaXN0ZW5lcnM6IFBsdWdpbkxpc3RlbmVyW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCBjb25maWc6IFBhcnRpYWw8U2VsZWN0Q29uZmlnPiA9IHt9LCByb290OiBSb290Tm9kZSA9IGRvY3VtZW50LCBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJZCA9IGB3cy0keysrbmV4dEluc3RhbmNlSWR9YDtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gWy4uLnBsdWdpbnNdO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWFyY2hhYmxlICYmICFwbHVnaW5zLnNvbWUocCA9PiBwLm5hbWUgPT09ICdzZWFyY2gnKSkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5zLnB1c2goY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gY3JlYXRlV29yc2VTZWxlY3QodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW1lc3NhZ2UnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVUeXBlQWhlYWQpO1xuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmFkZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmluaXRQbHVnaW5zKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmRlc3Ryb3k/LigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgeyB0YXJnZXQsIGV2ZW50LCBoYW5kbGVyIH0gb2YgdGhpcy5wbHVnaW5MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycyA9IFtdO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5vblNlbGVjdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0NsaWNrICYmIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlckNsaWNrICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkhlYWRlckNsaWNrKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyS2V5RG93biAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbkhlYWRlcktleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlcktleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNLZXlEb3duICYmIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbk9wdGlvbnNLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uU2VhcmNoS2V5RG93biAmJiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25MaXN0Ym94Rm9jdXMgJiYgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vbkxpc3Rib3hGb2N1cyk7XG4gICAgICAgICAgICB0aGlzLm9uTGlzdGJveEZvY3VzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5kZWxldGUodGhpcyk7XG4gICAgICAgIGlmIChXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgV29yc2VTZWxlY3QuaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmhhbmRsZVR5cGVBaGVhZCk7XG5cbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCh1bmxpbmtPcHRpb24pO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBzeW5jRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIG9wdGlvbnNMaXN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgY29uZmlnIH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc2VsZWN0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGNvbXB1dGVkU3R5bGUud2lkdGggJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJ2F1dG8nICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICcwcHgnKSB7XG4gICAgICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSBjb21wdXRlZFN0eWxlLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZGVyRWxlbWVudC5zdHlsZS5mb250ID0gY29tcHV0ZWRTdHlsZS5mb250O1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuWzBdIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gZmlyc3RPcHRpb24gPyBnZXRMaXN0Qm94SGVpZ2h0KHNlbGVjdEVsZW1lbnQsIGZpcnN0T3B0aW9uKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoaGVpZ2h0KSBvcHRpb25zTGlzdEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NvbmZpZy5kcm9wZG93bkhlaWdodFB4fXB4YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU9wZW5TdGF0ZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBpc0xpc3Rib3hNb2RlID0gc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGlzTGlzdGJveE1vZGUgPyB0cnVlIDogdGhpcy5vcGVuO1xuXG4gICAgICAgIGNvbnN0IGlzRGFyayA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcyAmJlxuICAgICAgICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnNlbGVjdEVsZW1lbnQpLmNvbG9yU2NoZW1lLmluY2x1ZGVzKCdkYXJrJyk7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicsIGlzT3Blbik7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3Rib3gnLCBpc0xpc3Rib3hNb2RlKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbXVsdGlwbGUnLCBpc011bHRpcGxlU2VsZWN0KHRoaXMpKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsIGlzRGFyayk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgU3RyaW5nKGlzT3BlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCBTdHJpbmcoaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSkpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBpc09wZW4gPyAwIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbi5zZWxlY3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmIChoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdE9wdGlvbi5kaXNhYmxlZCk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIZWFkZXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbGFiZWxFbCA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWwnKTtcbiAgICAgICAgaWYgKCEobGFiZWxFbCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkT3B0aW9uc1swXSA/P1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5vcHRpb25zW3NlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0gPz9cbiAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RlZE9wdGlvbikgJiYgdGhpcy5vcGVuKVxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiBzZWxlY3RlZE9wdGlvbj8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblxuICAgICAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQudGl0bGUgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCA/IGBTZWxlY3RlZDogJHtsYWJlbH1gIDogJ1NlbGVjdCBhbiBvcHRpb24nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBlbC5pZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZU9wdGlvbikge1xuICAgICAgICAgICAgZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik/LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3luY0FsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgICAgICB0aGlzLnN5bmNEaW1lbnNpb25zKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uU3luYz8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRNZXNzYWdlKHRleHQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7IG1lc3NhZ2VFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShtZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBEZWZlciB0aGUgdXBkYXRlIGJ5IG9uZSB0aWNrIHNvIHNjcmVlbiByZWFkZXJzIGFubm91bmNlIGEgY2hhbmdlIGV2ZW4gd2hlbiB0aGVcbiAgICAgICAgLy8gbWVzc2FnZSB0ZXh0IGhhcHBlbnMgdG8gYmUgdGhlIHNhbWUgc3RyaW5nIGFzIHRoZSBwcmV2aW91cyBhbm5vdW5jZW1lbnQuXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VFbGVtZW50ID09PSBtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgY2xlYXJNZXNzYWdlKCkge1xuICAgICAgICBpZiAoISh0aGlzLm1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICB9XG5cbiAgICBvcGVuRHJvcGRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25PcGVuPy4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3BlbikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbkNsb3NlPy4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpPy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBvcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKSB7XG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBzY3JvbGxPcHRpb25JbnRvVmlldyh0aGlzLmFjdGl2ZU9wdGlvbik7XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50Py5mb2N1cygpO1xuICAgIH1cblxuICAgIGdldFZpc2libGVFbmFibGVkT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZpbHRlcihvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdC5kaXNhYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGdldFdvcnNlT3B0aW9uRWxlbWVudChvcHQpIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZU9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgdW5kZWZpbmVkLCBzY3JvbGwgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gc2VsZWN0T3B0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpO1xuICAgICAgICBpZiAoc2Nyb2xsKSBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVPcHRpb24oZGVsdGE6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5hY3RpdmVPcHRpb24gPyBvcHRpb25zLmluZGV4T2YodGhpcy5hY3RpdmVPcHRpb24pIDogLTE7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCA9PT0gLTFcbiAgICAgICAgICAgID8gKGRlbHRhID49IDAgPyAwIDogb3B0aW9ucy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBNYXRoLm1pbihvcHRpb25zLmxlbmd0aCAtIDEsIGN1cnJlbnRJbmRleCArIGRlbHRhKSk7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24ob3B0aW9uc1tuZXh0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlVG9Cb3VuZGFyeShib3VuZGFyeTogJ3N0YXJ0JyB8ICdlbmQnKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oYm91bmRhcnkgPT09ICdzdGFydCcgPyBvcHRpb25zWzBdIDogb3B0aW9uc1tvcHRpb25zLmxlbmd0aCAtIDFdKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlSnVtcFNpemUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBmaXJzdE9wdGlvbiA9IEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJykpXG4gICAgICAgICAgICAuZmluZChlbCA9PiBlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KTtcbiAgICAgICAgaWYgKCEoZmlyc3RPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBvcHRpb25IZWlnaHQgPSBmaXJzdE9wdGlvbi5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDEsIE1hdGguZmxvb3Iob3B0aW9uc0xpc3RFbGVtZW50LmNsaWVudEhlaWdodCAvIG9wdGlvbkhlaWdodCkpO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVCeVBhZ2UoZGlyZWN0aW9uOiAxIHwgLTEpIHtcbiAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKHRoaXMuZ2V0UGFnZUp1bXBTaXplKCkgKiBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpIHtcbiAgICAgICAgY29uc3QgeyBhY3RpdmVPcHRpb24sIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghYWN0aXZlT3B0aW9uIHx8IGFjdGl2ZU9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICBhY3RpdmVPcHRpb24uc2VsZWN0ZWQgPSAhYWN0aXZlT3B0aW9uLnNlbGVjdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2YoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGx1Z2lucygpIHtcbiAgICAgICAgaWYgKCEodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKHRoaXMub3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29udGV4dDogUGx1Z2luQ29udGV4dCA9IHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHRoaXMuc2VsZWN0RWxlbWVudCxcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQ6IHRoaXMuaGVhZGVyRWxlbWVudCxcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudDogdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQsXG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQ6IHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgc2V0TWVzc2FnZTogKHRleHQpID0+IHRoaXMuc2V0TWVzc2FnZSh0ZXh0KSxcbiAgICAgICAgICAgIGNsZWFyTWVzc2FnZTogKCkgPT4gdGhpcy5jbGVhck1lc3NhZ2UoKSxcbiAgICAgICAgICAgIG9uOiAodGFyZ2V0LCBldmVudCwgaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbkxpc3RlbmVycy5wdXNoKHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uaW5pdChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEtleWJvYXJkIGNvbnRyYWN0cyBmb3IgaGVhZGVyLCBsaXN0LCBhbmQgc2VhcmNoIGFyZSBrZXB0IHRvZ2V0aGVyIGhlcmUgXHUyMDE0IHNwbGl0dGluZyB0aGVtXG4gICAgLy8gd291bGQgc2NhdHRlciByZWxhdGVkIGtleSBoYW5kbGluZyBhY3Jvc3MgbXVsdGlwbGUgbWV0aG9kcy4gSWYgdGhpcyBncm93cyBzaWduaWZpY2FudGx5LFxuICAgIC8vIGNvbnNpZGVyIGJyZWFraW5nIG91dCBwZXItY29tcG9uZW50IGhhbmRsZXJzLlxuICAgIHByaXZhdGUgYmluZEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGRyb3Bkb3duUGFuZWxFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoZHJvcGRvd25QYW5lbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNDbGljazogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkVsID0gdGFyZ2V0LmNsb3Nlc3QoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJyk7XG4gICAgICAgICAgICBpZiAoIShvcHRpb25FbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFkcm9wZG93blBhbmVsRWxlbWVudC5jb250YWlucyhvcHRpb25FbCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChvcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChvcHRpb25FbCk7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbiB8fCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uLnNlbGVjdGVkID0gIXNlbGVjdE9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2Yoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VsZWN0Q2hhbmdlOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3Qgb25IZWFkZXJLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSA6IHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0tleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VhcmNoS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBkcm9wZG93blBhbmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblNlbGVjdENoYW5nZSk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkhlYWRlckNsaWNrKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbk9wdGlvbnNLZXlEb3duKTtcblxuICAgICAgICBjb25zdCBvbkxpc3Rib3hGb2N1czogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykgfHwgdGhpcy5hY3RpdmVPcHRpb24pIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZpbmQobyA9PiBvLnNlbGVjdGVkICYmICFpc1BsYWNlaG9sZGVyT3B0aW9uKG8pKTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKVswXTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHNlbGVjdGVkID8/IGZpcnN0O1xuICAgICAgICAgICAgaWYgKHRhcmdldCkgdGhpcy5zZXRBY3RpdmVPcHRpb24odGFyZ2V0LCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgb25MaXN0Ym94Rm9jdXMpO1xuXG4gICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uU2VhcmNoS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoS2V5RG93biA9IG9uU2VhcmNoS2V5RG93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25PcHRpb25zQ2xpY2sgPSBvbk9wdGlvbnNDbGljaztcbiAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IG9uU2VsZWN0Q2hhbmdlO1xuICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSBvbkhlYWRlckNsaWNrO1xuICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IG9uSGVhZGVyS2V5RG93bjtcbiAgICAgICAgdGhpcy5vbk9wdGlvbnNLZXlEb3duID0gb25PcHRpb25zS2V5RG93bjtcbiAgICAgICAgdGhpcy5vbkxpc3Rib3hGb2N1cyA9IG9uTGlzdGJveEZvY3VzO1xuXG4gICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgIH1cblxuICAgIC8vIERPTSBkaWZmaW5nIGlzIGtlcHQgaW5saW5lIGhlcmUgYmVjYXVzZSB0aGUgbXV0YXRpb24gY2FzZXMgYXJlIHRpZ2h0bHkgY291cGxlZCB0byBlYWNoXG4gICAgLy8gb3RoZXIgYW5kIHRoZSBzY3JvbGxlcidzIGNoaWxkIG9yZGVyLiBJZiB0aGlzIGdyb3dzIChlLmcuIG9wdGlvbiBncm91cHMsIHJlb3JkZXJpbmdcbiAgICAvLyBhbmltYXRpb25zKSwgZXh0cmFjdCBpbnRvIGEgZGVkaWNhdGVkIHJlY29uY2lsZXIuXG4gICAgcHJpdmF0ZSBvYnNlcnZlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGxldCBzaG91bGRSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlU3RhdGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVidWlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVidWlsZCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlua2VkT3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlua2VkT3B0aW9uIHx8ICFBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5jbHVkZXMobGlua2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZE9wdGlvbikgdW5saW5rT3B0aW9uKGxpbmtlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goKHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KHRoaXMsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gZ2V0T3B0aW9uSWQodGhpcywgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdEluZGV4ID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuW29wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdEluZGV4ICE9PSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEF0SW5kZXggPyBjdXJyZW50QXRJbmRleC5iZWZvcmUoZWwpIDogb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiAhZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNlbGVjdEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZScsICdjbGFzcycsICdkaXNhYmxlZCcsICdtdWx0aXBsZScsICdzaXplJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIHdvcnNlU2VsZWN0RWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBzZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWZ0ZXIod29yc2VTZWxlY3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVR5cGVBaGVhZCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLmtleS5sZW5ndGggIT09IDEgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbnMgPSB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudD8uY2hpbGRyZW47XG4gICAgICAgIHRoaXMudHlwZUFoZWFkVGV4dCArPSBlLmtleTtcbiAgICAgICAgbGV0IHR5cGVBaGVhZFRleHQgPSB0aGlzLnR5cGVBaGVhZFRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAod29yc2VPcHRpb25zICYmIHR5cGVBaGVhZFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nV29yc2VPcHRpb24gPSBBcnJheS5mcm9tKHdvcnNlT3B0aW9ucykuZmluZCh3b3JzZU9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcnNlT3B0aW9uLnRleHRDb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgodHlwZUFoZWFkVGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50Py5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbWF0Y2hpbmdXb3JzZU9wdGlvbj8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGluZ1dvcnNlT3B0aW9uKSBtYXRjaGluZ1dvcnNlT3B0aW9uLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlQWhlYWRUaW1lcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50eXBlQWhlYWRUaW1lcklkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnR5cGVBaGVhZFRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgICAgICB9LCB0aGlzLnR5cGVBaGVhZFRpbWVvdXQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFbmhhbmNlcyBldmVyeSBuYXRpdmUgYDxzZWxlY3Q+YCBlbGVtZW50IGluc2lkZSB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgc2FmZSB0byBjYWxsIG11bHRpcGxlIHRpbWVzLiBFYWNoIGA8c2VsZWN0PmAgaXMgbW91bnRlZCBhdCBtb3N0IG9uY2UuXG4gKiBJZiBgb3B0aW9ucy5vYnNlcnZlYCBpcyB0cnVlLCBuZXdseSBhZGRlZCBzZWxlY3RzIHVuZGVyIHRoZSByb290IGFyZSBlbmhhbmNlZCBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIFJldHVybnMgYSBjbGVhbnVwIGZ1bmN0aW9uIHRoYXQgZGlzY29ubmVjdHMgdGhlIHJvb3Qgb2JzZXJ2ZXIgYW5kIGRlc3Ryb3lzIG1vdW50ZWQgaW5zdGFuY2VzXG4gKiB1bmRlciB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcnNlU2VsZWN0KHJvb3Q6IFJvb3ROb2RlID0gZG9jdW1lbnQsIG9wdGlvbnM6IFdvcnNlU2VsZWN0T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgcGx1Z2lucyA9IG9wdGlvbnMucGx1Z2lucyA/PyBbXTtcbiAgICBtb3VudFNlbGVjdHNJblJvb3Qocm9vdCwgcGx1Z2lucyk7XG5cbiAgICBsZXQgcm9vdE9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKG9wdGlvbnMub2JzZXJ2ZSkge1xuICAgICAgICByb290T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSAhPT0gJ2NoaWxkTGlzdCcpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGFkZGVkTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoYWRkZWROb2RlLCByb290LCBwbHVnaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoZWwsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdE9ic2VydmVyLm9ic2VydmUocm9vdCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcm9vdE9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG5cbiAgICAgICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmdldChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHJldHVybjtcbiAgICAgICAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGluc3RhbmNlcy5kZWxldGUoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVN0eWxlcygpIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcz1cInRydWVcIl0nKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXMnLCAndHJ1ZScpO1xuICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNyZWF0ZUNTUygpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdDogUm9vdE5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0c0luUm9vdChyb290OiBSb290Tm9kZSwgcGx1Z2luczogUGx1Z2luW10pIHtcbiAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQsIHJvb3QsIHBsdWdpbnMpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCByb290OiBSb290Tm9kZSwgcGx1Z2luczogUGx1Z2luW10pIHtcbiAgICBpZiAoaW5zdGFuY2VzLmdldChzZWxlY3RFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgV29yc2VTZWxlY3Qoc2VsZWN0RWxlbWVudCwgZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQpLCByb290LCBwbHVnaW5zKTtcbiAgICBpbnN0YW5jZS5tb3VudCgpO1xuICAgIGluc3RhbmNlcy5zZXQoc2VsZWN0RWxlbWVudCwgaW5zdGFuY2UpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNHTyxJQUFNLGlCQUFpQjtBQUFBLEVBQzFCLFlBQVk7QUFBQSxFQUNaLGtCQUFrQjtBQUFBLEVBQ2xCLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFDWDs7O0FDSE8sU0FBUyxZQUFZO0FBQ3hCO0FBQUE7QUFBQSxJQUEyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFrQlIsZUFBZSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXdCM0IsZUFBZSxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFtSWYsZUFBZSxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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USxTQUFTO0FBQ2pCLG1CQUFlLElBQUksaUJBQWlCLGtCQUFnQjtBQUNoRCxpQkFBVyxZQUFZLGNBQWM7QUFDakMsWUFBSSxTQUFTLFNBQVMsWUFBYTtBQUVuQyxpQkFBUyxXQUFXLFFBQVEsZUFBYTtBQUNyQyxjQUFJLEVBQUUscUJBQXFCLFNBQVU7QUFFckMsY0FBSSxxQkFBcUIsbUJBQW1CO0FBQ3hDLCtCQUFtQixXQUFXLE1BQU0sT0FBTztBQUMzQztBQUFBLFVBQ0o7QUFFQSxvQkFBVSxpQkFBb0MsUUFBUSxFQUFFLFFBQVEsUUFBTTtBQUNsRSwrQkFBbUIsSUFBSSxNQUFNLE9BQU87QUFBQSxVQUN4QyxDQUFDO0FBQUEsUUFDTCxDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0osQ0FBQztBQUVELGlCQUFhLFFBQVEsTUFBTSxFQUFFLFdBQVcsTUFBTSxTQUFTLEtBQUssQ0FBQztBQUFBLEVBQ2pFO0FBRUEsU0FBTyxNQUFNO0FBQ1Qsa0JBQWMsV0FBVztBQUV6Qiw0QkFBd0IsSUFBSSxFQUFFLFFBQVEsbUJBQWlCO0FBQ25ELFlBQU0sV0FBVyxVQUFVLElBQUksYUFBYTtBQUM1QyxVQUFJLENBQUMsU0FBVTtBQUNmLGVBQVMsUUFBUTtBQUNqQixnQkFBVSxPQUFPLGFBQWE7QUFBQSxJQUNsQyxDQUFDO0FBQUEsRUFDTDtBQUNKO0FBRUEsU0FBUyxlQUFlO0FBQ3BCLE1BQUksU0FBUyxjQUFjLG1DQUFtQyxFQUFHO0FBRWpFLFFBQU0sZUFBZSxTQUFTLGNBQWMsT0FBTztBQUNuRCxlQUFhLGFBQWEsNEJBQTRCLE1BQU07QUFDNUQsZUFBYSxjQUFjLFVBQVU7QUFDckMsV0FBUyxLQUFLLFlBQVksWUFBWTtBQUMxQztBQUVBLFNBQVMsd0JBQXdCLE1BQWdCO0FBQzdDLFNBQU8sTUFBTSxLQUFLLEtBQUssaUJBQW9DLFFBQVEsQ0FBQztBQUN4RTtBQUVBLFNBQVMsbUJBQW1CLE1BQWdCLFNBQW1CO0FBQzNELDBCQUF3QixJQUFJLEVBQUUsUUFBUSxtQkFBaUIsbUJBQW1CLGVBQWUsTUFBTSxPQUFPLENBQUM7QUFDM0c7QUFFQSxTQUFTLG1CQUFtQixlQUFrQyxNQUFnQixTQUFtQjtBQUM3RixNQUFJLFVBQVUsSUFBSSxhQUFhLEVBQUc7QUFFbEMsUUFBTSxXQUFXLElBQUksWUFBWSxlQUFlLFVBQVUsYUFBYSxHQUFHLE1BQU0sT0FBTztBQUN2RixXQUFTLE1BQU07QUFDZixZQUFVLElBQUksZUFBZSxRQUFRO0FBQ3pDOyIsCiAgIm5hbWVzIjogW10KfQo=