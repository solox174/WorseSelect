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
        --ws-border-color: #555;
        --ws-bg: #1e1e1e;
        --ws-text-color: #e8eaed;
        --ws-disabled-bg: #2a2a2a;
        --ws-disabled-text-color: #777;
        --ws-hover-bg: #3a3a3a;
        --ws-active-bg: #1a3a5c;
        --ws-active-outline: #60a5fa;
        --ws-selected-bg: #1e3a5f;
        --ws-selected-text-color: #93c5fd;
        --ws-focus-outline: #60a5fa;
        --ws-search-border-color: #555;
        --ws-divider-color: #3a3a3a;
        --ws-highlight-bg: #4a3c00;
        --ws-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
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
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.addEventListener("keydown", onSearchKeyDown);
      this.onSearchKeyDown = onSearchKeyDown;
    }
    this.onOptionsClick = onOptionsClick;
    this.onSelectChange = onSelectChange;
    this.onHeaderClick = onHeaderClick;
    this.onHeaderKeyDown = onHeaderKeyDown;
    this.onOptionsKeyDown = onOptionsKeyDown;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7XG5leHBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlc1wiOyIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgZHJvcGRvd25IZWlnaHRQeDogNDAwLFxuICAgIGhlaWdodDogJzMycHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn07XG5cbi8vIE1hcHMgZWFjaCBjb25maWcgdmFsdWUgdG8gaXRzIHdpZGVuZWQgcHJpbWl0aXZlIHR5cGUgKGUuZy4gdHJ1ZSBcdTIxOTIgYm9vbGVhbikgc28gdGhhdFxuLy8gU2VsZWN0Q29uZmlnIGFjY2VwdHMgYW55IHZhbGlkIHZhbHVlIG9mIHRoYXQgdHlwZSwgbm90IGp1c3QgdGhlIHNwZWNpZmljIGRlZmF1bHQgbGl0ZXJhbC5cbmV4cG9ydCB0eXBlIFdpZGVuPFQ+ID0gVCBleHRlbmRzIGJvb2xlYW4gPyBib29sZWFuIDogVCBleHRlbmRzIHN0cmluZyA/IHN0cmluZyA6IFQgZXh0ZW5kcyBudW1iZXIgPyBudW1iZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RDb25maWcgPSB7XG4gICAgW0sgaW4ga2V5b2YgdHlwZW9mIERFRkFVTFRfQ09ORklHXTogV2lkZW48KHR5cGVvZiBERUZBVUxUX0NPTkZJRylbS10+XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXkgPSBrZXlvZiBTZWxlY3RDb25maWc7XG5leHBvcnQgdHlwZSBSb290Tm9kZSA9IFBhcmVudE5vZGU7XG5cbmV4cG9ydCB0eXBlIFBsdWdpbkNvbnRleHQgPSB7XG4gICAgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgaGVhZGVyRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgb3B0aW9uc0xpc3RFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgICBjbGVhck1lc3NhZ2UoKTogdm9pZDtcbiAgICBvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFBsdWdpbiA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KTogdm9pZDtcbiAgICBvblN5bmM/KCk6IHZvaWQ7XG4gICAgb25PcGVuPygpOiB2b2lkO1xuICAgIG9uQ2xvc2U/KCk6IHZvaWQ7XG4gICAgZGVzdHJveT8oKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFdvcnNlU2VsZWN0T3B0aW9ucyA9IHtcbiAgICBvYnNlcnZlPzogYm9vbGVhbjtcbiAgICBwbHVnaW5zPzogUGx1Z2luW107XG59O1xuXG4vLyBNaW5pbWFsIGludGVyZmFjZSBleHBvc2VkIHRvIGRvbS50cyBhbmQgc2VsZWN0LWhlbHBlcnMudHMuIFJlc3RyaWN0cyB0aG9zZSBtb2R1bGVzIHRvIHRoZVxuLy8gcHJvcGVydGllcyB0aGV5IGFjdHVhbGx5IG5lZWQsIGtlZXBpbmcgdGhlIGZ1bGwgV29yc2VTZWxlY3QgY2xhc3MgaW50ZXJuYWwgdG8gY29yZS50cy5cbmV4cG9ydCBpbnRlcmZhY2UgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTUygpIHtcbiAgICByZXR1cm4gIC8qIGxhbmd1YWdlPUNTUyAqLyBgXG4gICAgOnJvb3Qge1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogIzc2NzY3NjtcbiAgICAgICAgLS13cy1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIC0td3MtYmc6ICNmZmY7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogI2YwZjBmMDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiAjNmQ2ZDZkO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiAjZjFmMWYxO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogI2VlZjRmZjtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogI2QyZTNmYztcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjMTc0ZWE2O1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICAgICAgLS13cy1oZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgLS13cy1tb3Rpb24tZHVyYXRpb246IDIwMG1zO1xuICAgICAgICAtLXdzLW1vdGlvbi1lYXNlOiBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXI6bm90KC5saXN0Ym94KSB7XG4gICAgICAgIGhlaWdodDogdmFyKC0td3MtaGVpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6ICR7REVGQVVMVF9DT05GSUcud2lkdGh9O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLXdzLWhlaWdodCk7XG4gICAgICAgIHBhZGRpbmc6IDAgMjhweCAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgcmlnaHQ6IDhweDtcbiAgICAgICAgd2lkdGg6IDEwcHg7XG4gICAgICAgIGhlaWdodDogMTBweDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoMGRlZyk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXdzLW1vdGlvbi1kdXJhdGlvbikgdmFyKC0td3MtbW90aW9uLWVhc2UpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTBweCAxMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyB2aWV3Qm94PScwIDAgMTIgMTInIGZpbGw9J25vbmUnJTNFJTNDcGF0aCBkPSdNMyA0LjVMNiA3LjVMOSA0LjUnIHN0cm9rZT0nJTIzMzMzMzMzJyBzdHJva2Utd2lkdGg9JzEuMScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1oZWFkZXI6OmFmdGVyIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSgxODBkZWcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRpc2FibGVkIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOmZvY3VzLXZpc2libGUsXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQ6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS13cy1mb2N1cy1vdXRsaW5lKSAhaW1wb3J0YW50O1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiBjYWxjKDEwMCUgKyAycHgpO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNnB4KTtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgYm94LXNoYWRvdzogdmFyKC0td3Mtc2hhZG93KTtcbiAgICAgICAgcGFkZGluZzogMnB4O1xuICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgY2VudGVyO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgZGlzcGxheSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIGFsbG93LWRpc2NyZXRlLFxuICAgICAgICAgICAgb3BhY2l0eSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKSxcbiAgICAgICAgICAgIHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgICAgZGlzcGxheSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIGFsbG93LWRpc2NyZXRlLFxuICAgICAgICAgICAgb3BhY2l0eSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKSxcbiAgICAgICAgICAgIHRyYW5zZm9ybSB2YXIoLS13cy1tb3Rpb24tZHVyYXRpb24pIHZhcigtLXdzLW1vdGlvbi1lYXNlKTtcbiAgICB9XG5cbiAgICBAc3RhcnRpbmctc3R5bGUge1xuICAgICAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02cHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHRvcDogMDtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoIHtcbiAgICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0td3MtZGl2aWRlci1jb2xvcik7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDMycHg7XG4gICAgICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1zZWFyY2gtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyOm5vdCgubGlzdGJveCkgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgIH1cbiAgICBcbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cblxuICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOjphZnRlcixcbiAgICAgICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICB9XG5cbi53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRhcmsge1xuICAgICAgICBjb2xvci1zY2hlbWU6IGRhcms7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNTU1O1xuICAgICAgICAtLXdzLWJnOiAjMWUxZTFlO1xuICAgICAgICAtLXdzLXRleHQtY29sb3I6ICNlOGVhZWQ7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtYmc6ICMyYTJhMmE7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcjogIzc3NztcbiAgICAgICAgLS13cy1ob3Zlci1iZzogIzNhM2EzYTtcbiAgICAgICAgLS13cy1hY3RpdmUtYmc6ICMxYTNhNWM7XG4gICAgICAgIC0td3MtYWN0aXZlLW91dGxpbmU6ICM2MGE1ZmE7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtYmc6ICMxZTNhNWY7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcjogIzkzYzVmZDtcbiAgICAgICAgLS13cy1mb2N1cy1vdXRsaW5lOiAjNjBhNWZhO1xuICAgICAgICAtLXdzLXNlYXJjaC1ib3JkZXItY29sb3I6ICM1NTU7XG4gICAgICAgIC0td3MtZGl2aWRlci1jb2xvcjogIzNhM2EzYTtcbiAgICAgICAgLS13cy1oaWdobGlnaHQtYmc6ICM0YTNjMDA7XG4gICAgICAgIC0td3Mtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICB9XG4gICAgYDtcbn1cbiIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge0NvbmZpZ0tleSwgREVGQVVMVF9DT05GSUcsIFNlbGVjdENvbmZpZ30gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuY29uc3QgY29uZmlnS2V5cyA9IE9iamVjdC5rZXlzKERFRkFVTFRfQ09ORklHKSBhcyBDb25maWdLZXlbXTtcblxuZnVuY3Rpb24gdG9LZWJhYkNhc2UodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bQS1aXS9nLCBjaGFyYWN0ZXIgPT4gYC0ke2NoYXJhY3Rlci50b0xvd2VyQ2FzZSgpfWApO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbmZpZ1ZhbHVlPEsgZXh0ZW5kcyBDb25maWdLZXk+KGtleTogSywgYXR0cjogc3RyaW5nKTogU2VsZWN0Q29uZmlnW0tdIHtcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBERUZBVUxUX0NPTkZJR1trZXldO1xuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gKGF0dHIgPT09ICd0cnVlJykgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGF0dHIpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0ciBhcyBTZWxlY3RDb25maWdbS107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb25maWcoc2VsZWN0RWxlbWVudDogRWxlbWVudCk6IFNlbGVjdENvbmZpZyB7XG4gICAgY29uc3QgY29uZmlnOiBTZWxlY3RDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZ0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0gY29uZmlnS2V5c1tpXTtcbiAgICAgICAgY29uc3QgZGF0YUF0dHJpYnV0ZU5hbWUgPSBgZGF0YS0ke3RvS2ViYWJDYXNlKGtleSl9YDtcbiAgICAgICAgY29uc3QgYXR0ciA9IHNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKGRhdGFBdHRyaWJ1dGVOYW1lKTtcblxuICAgICAgICBpZiAoYXR0ciA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgKGNvbmZpZyBhcyBSZWNvcmQ8Q29uZmlnS2V5LCBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyPilba2V5XSA9IHBhcnNlQ29uZmlnVmFsdWUoa2V5LCBhdHRyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQge1dvcnNlU2VsZWN0Q29udGV4dH0gZnJvbSBcIi4vaW50ZXJuYWwtdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQuc2l6ZSA+IDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIHJldHVybiB3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQubXVsdGlwbGU7XG59XG5cbi8vIE1hdGNoZXMgdGhlIGNvbnZlbnRpb25hbCBIVE1MIHBsYWNlaG9sZGVyIHBhdHRlcm46IDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZD5MYWJlbDwvb3B0aW9uPi5cbi8vIE9wdGlvbnMgdGhhdCBhcmUgbm90IGRpc2FibGVkIG9yIGhhdmUgYSBub24tZW1wdHkgdmFsdWUgYXJlIHRyZWF0ZWQgYXMgc2VsZWN0YWJsZS5cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNlbGVjdE9wdGlvbiAhPT0gbnVsbCAmJiBzZWxlY3RPcHRpb24udmFsdWUgPT09ICcnICYmIHNlbGVjdE9wdGlvbi5kaXNhYmxlZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExpc3RCb3hIZWlnaHQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoc2VsZWN0RWxlbWVudC5zaXplIDw9IDEpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3Qgb25lUm93SGVpZ2h0ID0gd29yc2VPcHRpb25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICBjb25zdCB0b3RhbEhlaWdodCA9IG9uZVJvd0hlaWdodCAqIHNlbGVjdEVsZW1lbnQuc2l6ZTtcblxuICAgIGNvbnN0IHNlbGVjdFBhcmVudEhlaWdodCA9IHNlbGVjdEVsZW1lbnQucGFyZW50RWxlbWVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ID8/IDEwMDAwO1xuICAgIHJldHVybiBNYXRoLm1pbih0b3RhbEhlaWdodCwgc2VsZWN0UGFyZW50SGVpZ2h0KSArICdweCc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbi8vIFR3byBXZWFrTWFwcyBtYWludGFpbiBhIGJpZGlyZWN0aW9uYWwgbGluayBiZXR3ZWVuIG5hdGl2ZSA8b3B0aW9uPiBlbGVtZW50cyBhbmQgdGhlaXJcbi8vIHJlbmRlcmVkIHdpZGdldCBkaXZzLiBXZWFrTWFwIGtleXMgYWxsb3cgR0MgdG8gcmVjbGFpbSBlbGVtZW50cyByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gd2l0aG91dCByZXF1aXJpbmcgZXhwbGljaXQgY2xlYW51cCBvbiBldmVyeSByZW1vdmFsIHBhdGguXG5jb25zdCBvcHRpb25Ub0RpdiA9IG5ldyBXZWFrTWFwPEhUTUxPcHRpb25FbGVtZW50LCBIVE1MRGl2RWxlbWVudD4oKTtcbmNvbnN0IGRpdlRvT3B0aW9uID0gbmV3IFdlYWtNYXA8SFRNTERpdkVsZW1lbnQsIEhUTUxPcHRpb25FbGVtZW50PigpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBvcHRpb25Ub0Rpdi5zZXQoc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIGRpdlRvT3B0aW9uLnNldCh3b3JzZU9wdGlvbkVsZW1lbnQsIHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghd29yc2VPcHRpb25FbGVtZW50KSByZXR1cm47XG5cbiAgICBvcHRpb25Ub0Rpdi5kZWxldGUoc2VsZWN0T3B0aW9uKTtcbiAgICBkaXZUb09wdGlvbi5kZWxldGUod29yc2VPcHRpb25FbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgcmV0dXJuIG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCh3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRpdlRvT3B0aW9uLmdldCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBpc011bHRpcGxlU2VsZWN0LCBzaG91bGRVc2VMaXN0Ym94TW9kZSB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgaWYgKCFzZWxlY3RPcHRpb24pIHJldHVybjtcbiAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoc3R5bGVQYXJ0czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gc3R5bGVQYXJ0cy5sZW5ndGggPiAwID8gYCBzdHlsZT1cIiR7c3R5bGVQYXJ0cy5qb2luKCcgJyl9XCJgIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aCAhPT0gREVGQVVMVF9DT05GSUcud2lkdGgpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGB3aWR0aDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aH07YCk7XG4gICAgfVxuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodCAhPT0gREVGQVVMVF9DT05GSUcuaGVpZ2h0KSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgaGVpZ2h0OiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodH07YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoaGVhZGVyU3R5bGVQYXJ0cyk7XG59XG5cblxuZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LCBvcHRpb25JbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3dvcnNlU2VsZWN0SW5zdGFuY2UuaW5zdGFuY2VJZH0tb3B0aW9uLSR7b3B0aW9uSW5kZXh9YDtcbn1cblxuZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWyd3b3JzZS1zZWxlY3Qtb3B0aW9uJ107XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkh0bWwoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uQ2xhc3NlcyA9IGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb24pO1xuICAgIGNvbnN0IG9wdGlvblRleHQgPSBzZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPz8gJyc7XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgaWQ9XCIke2dldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2UsIG9wdGlvbkluZGV4KX1cIlxuICAgICAgICAgY2xhc3M9XCIke3dvcnNlT3B0aW9uQ2xhc3Nlc31cIlxuICAgICAgICAgZGF0YS12YWx1ZT1cIiR7ZXNjYXBlSHRtbChzZWxlY3RPcHRpb24udmFsdWUpfVwiXG4gICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9XCIke3NlbGVjdE9wdGlvbi5zZWxlY3RlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgICAgIGFyaWEtZGlzYWJsZWQ9XCIke3NlbGVjdE9wdGlvbi5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCI+XG4gICAgICAke2VzY2FwZUh0bWwob3B0aW9uVGV4dCl9XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBjcmVhdGVXb3JzZU9wdGlvbkh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleClcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBpZiAoIXdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLnNlYXJjaGFibGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2hcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBsaXN0XCJcbiAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2ggb3B0aW9uc1wiIC8+XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VIdG1sKCkge1xuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1tZXNzYWdlIHdvcnNlLXNlbGVjdC12aXN1YWxseS1oaWRkZW5cIlxuICAgICAgICAgcm9sZT1cInN0YXR1c1wiXG4gICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCI+PC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlQXR0cmlidXRlID0gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2UpO1xuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzZXMgPSBbJ3dvcnNlLXNlbGVjdC1jb250YWluZXInXTtcblxuICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ2xpc3Rib3gnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBjb250YWluZXJDbGFzc2VzLnB1c2goJ211bHRpcGxlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaHRtbFN0cmluZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiJHtjb250YWluZXJDbGFzc2VzLmpvaW4oJyAnKX1cIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlclwiXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwid29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbFwiPjwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zXCI+XG4gICAgICAgICR7Y3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlKX1cbiAgICAgICAgJHtjcmVhdGVNZXNzYWdlSHRtbCgpfVxuICAgICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXJcIiR7aGVhZGVyU3R5bGVBdHRyaWJ1dGV9PjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcblxuICAgIGNvbnN0IHdvcnNlU2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBodG1sU3RyaW5nXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0IG9wdGlvbnNMaXN0RWxlbWVudCA9IHdvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlKSA/IDAgOiAtMTtcblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gQXJyYXkuZnJvbSh3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQub3B0aW9ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gc2VsZWN0T3B0aW9uc1tpXTtcbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgICAgICAgICAgd29yc2VTZWxlY3RJbnN0YW5jZSxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbixcbiAgICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hcHBlbmRDaGlsZCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JzZVNlbGVjdEVsZW1lbnQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luLCBQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50IH0gZnJvbSAnLi4vb3B0aW9uLW1hcCc7XG5cbmZ1bmN0aW9uIGFwcGx5SGlnaGxpZ2h0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQsIHNlYXJjaFRlcm06IHN0cmluZykge1xuICAgIGNvbnN0IHRlcm0gPSBzZWFyY2hUZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgQXJyYXkuZnJvbShjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaCh3b3JzZU9wdGlvbiA9PiB7XG4gICAgICAgIGlmICghKHdvcnNlT3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXJtICE9PSAnJyAmJiB3b3JzZU9wdGlvbi50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRlcm0pO1xuICAgICAgICB3b3JzZU9wdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdtYXRjaGVzJywgbWF0Y2hlcyk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRlcm0pIHtcbiAgICAgICAgY29udGV4dC5jbGVhck1lc3NhZ2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoQ291bnQgPSBjb250ZXh0Lm9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJykubGVuZ3RoO1xuICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICBtYXRjaENvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgZm91bmQnIDpcbiAgICAgICAgbWF0Y2hDb3VudCA9PT0gMSA/ICcxIHJlc3VsdCBhdmFpbGFibGUnIDpcbiAgICAgICAgYCR7bWF0Y2hDb3VudH0gcmVzdWx0cyBhdmFpbGFibGVgO1xuXG4gICAgY29udGV4dC5zZXRNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgZmlyc3RNYXRjaCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKTtcbiAgICBpZiAoZmlyc3RNYXRjaCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgIGZpcnN0TWF0Y2guc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4oKTogUGx1Z2luIHtcbiAgICBsZXQgc2VhcmNoVGVybSA9ICcnO1xuICAgIGxldCBwbHVnaW5Db250ZXh0OiBQbHVnaW5Db250ZXh0IHwgbnVsbCA9IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnc2VhcmNoJyxcblxuICAgICAgICBpbml0KGNvbnRleHQ6IFBsdWdpbkNvbnRleHQpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgY29uc3QgeyBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IGNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoIXNlYXJjaElucHV0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb250ZXh0Lm9uKHNlYXJjaElucHV0RWxlbWVudCwgJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VhcmNoVGVybSA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBhcHBseUhpZ2hsaWdodChjb250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uU3luYygpIHtcbiAgICAgICAgICAgIGlmICghcGx1Z2luQ29udGV4dCkgcmV0dXJuO1xuICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQocGx1Z2luQ29udGV4dCwgc2VhcmNoVGVybSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25DbG9zZSgpIHtcbiAgICAgICAgICAgIGlmICghcGx1Z2luQ29udGV4dCkgcmV0dXJuO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICAgICAgY29uc3QgeyBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHBsdWdpbkNvbnRleHQ7XG4gICAgICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwbHlIaWdobGlnaHQocGx1Z2luQ29udGV4dCwgJycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBwbHVnaW5Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgfSxcbiAgICB9O1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB0eXBlIHtXb3JzZVNlbGVjdENvbnRleHR9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuLyoqXG4gKiBQcm9ncmVzc2l2ZS1lbmhhbmNlbWVudCB1dGlsaXRpZXMgZm9yIG5hdGl2ZSB7QGxpbmsgSFRNTFNlbGVjdEVsZW1lbnR9IGNvbnRyb2xzLlxuICpcbiAqIEtlZXBzIHRoZSBuYXRpdmUgYDxzZWxlY3Q+YCBhcyBzb3VyY2Ugb2YgdHJ1dGggZm9yIHZhbHVlLCBkaXNhYmxlZCBzdGF0ZSwgYHNpemVgLCBhbmRcbiAqIGBtdWx0aXBsZWAsIHdoaWxlIG1pcnJvcmluZyB0aGF0IHN0YXRlIGludG8gYSBjdXN0b20gRE9NIHN0cnVjdHVyZSB0aGF0IGlzIGVhc2llciB0byBzdHlsZS5cbiAqXG4gKiBXaWRnZXQtc3BlY2lmaWMgYmVoYXZpb3IgdXNlcyBgZGF0YS0qYCBhdHRyaWJ1dGVzIHN1Y2ggYXMgYGRhdGEtc2VhcmNoYWJsZWAgYW5kXG4gKiBgZGF0YS1kcm9wZG93bi1oZWlnaHQtcHhgLCBrZWVwaW5nIHRoZSBwdWJsaWMgQVBJIGFsaWduZWQgd2l0aCBzdGFuZGFyZCBIVE1MLlxuICovXG5pbXBvcnQge0RFRkFVTFRfQ09ORklHLCBQbHVnaW4sIFBsdWdpbkNvbnRleHQsIFJvb3ROb2RlLCBTZWxlY3RDb25maWcsIFdvcnNlU2VsZWN0T3B0aW9uc30gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZUNTU30gZnJvbSAnLi9jc3MnO1xuaW1wb3J0IHtnZXRDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Y3JlYXRlV29yc2VPcHRpb25FbGVtZW50LCBjcmVhdGVXb3JzZVNlbGVjdCwgZ2V0T3B0aW9uSWQsIHNjcm9sbE9wdGlvbkludG9WaWV3fSBmcm9tICcuL2RvbSc7XG5pbXBvcnQge2dldFNlbGVjdE9wdGlvbkVsZW1lbnQsIGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiwgdW5saW5rT3B0aW9ufSBmcm9tICcuL29wdGlvbi1tYXAnO1xuaW1wb3J0IHtnZXRMaXN0Qm94SGVpZ2h0LCBpc011bHRpcGxlU2VsZWN0LCBpc1BsYWNlaG9sZGVyT3B0aW9uLCBzaG91bGRVc2VMaXN0Ym94TW9kZX0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQge2NyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW59IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxudHlwZSBQbHVnaW5MaXN0ZW5lciA9IHsgdGFyZ2V0OiBFdmVudFRhcmdldDsgZXZlbnQ6IHN0cmluZzsgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9O1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0eXBlQWhlYWRUaW1lcklkPzogbnVtYmVyO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgIHByaXZhdGUgdHlwZUFoZWFkVGltZW91dCA9IDEwMDA7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbk9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIG9uU2VsZWN0Q2hhbmdlPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvblNlYXJjaEtleURvd24/OiBFdmVudExpc3RlbmVyO1xuXG4gICAgb3BlbiA9IGZhbHNlO1xuICAgIGFjdGl2ZU9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdO1xuICAgIHByaXZhdGUgcGx1Z2luTGlzdGVuZXJzOiBQbHVnaW5MaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgY29uZmlnOiBQYXJ0aWFsPFNlbGVjdENvbmZpZz4gPSB7fSwgcm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgcGx1Z2luczogUGx1Z2luW10gPSBbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZyB9O1xuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICB0aGlzLmluc3RhbmNlSWQgPSBgd3MtJHsrK25leHRJbnN0YW5jZUlkfWA7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFsuLi5wbHVnaW5zXTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2VhcmNoYWJsZSAmJiAhcGx1Z2lucy5zb21lKHAgPT4gcC5uYW1lID09PSAnc2VhcmNoJykpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5wdXNoKGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICBlbnN1cmVTdHlsZXMoKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IGNyZWF0ZVdvcnNlU2VsZWN0KHRoaXMpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1tZXNzYWdlJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMuaGFuZGxlVHlwZUFoZWFkKTtcbiAgICAgICAgV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5hZGQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5pbml0UGx1Z2lucygpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5kZXN0cm95Py4oKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHsgdGFyZ2V0LCBldmVudCwgaGFuZGxlciB9IG9mIHRoaXMucGx1Z2luTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdGhpcy5wbHVnaW5zID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWxlY3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uU2VsZWN0Q2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbk9wdGlvbnNDbGljayAmJiB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWxFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbk9wdGlvbnNDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJDbGljayAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25IZWFkZXJDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlcktleURvd24gJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zS2V5RG93biAmJiB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25PcHRpb25zS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vblNlYXJjaEtleURvd24gJiYgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uU2VhcmNoS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuZGVsZXRlKHRoaXMpO1xuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5oYW5kbGVUeXBlQWhlYWQpO1xuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2godW5saW5rT3B0aW9uKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3luY0RpbWVuc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGNvbmZpZyB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGVjdEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChjb21wdXRlZFN0eWxlLndpZHRoICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICdhdXRvJyAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnMHB4Jykge1xuICAgICAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZWRTdHlsZS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRlckVsZW1lbnQuc3R5bGUuZm9udCA9IGNvbXB1dGVkU3R5bGUuZm9udDtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE9wdGlvbiA9IG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlblswXSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGZpcnN0T3B0aW9uID8gZ2V0TGlzdEJveEhlaWdodChzZWxlY3RFbGVtZW50LCBmaXJzdE9wdGlvbikgOiBudWxsO1xuICAgICAgICAgICAgaWYgKGhlaWdodCkgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjb25maWcuZHJvcGRvd25IZWlnaHRQeH1weGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVPcGVuU3RhdGUoKSB7XG4gICAgICAgIGlmICghKHRoaXMud29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXNMaXN0Ym94TW9kZSA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBpc09wZW4gPSBpc0xpc3Rib3hNb2RlID8gdHJ1ZSA6IHRoaXMub3BlbjtcblxuICAgICAgICBjb25zdCBpc0RhcmsgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMgJiZcbiAgICAgICAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy5zZWxlY3RFbGVtZW50KS5jb2xvclNjaGVtZS5pbmNsdWRlcygnZGFyaycpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0Ym94JywgaXNMaXN0Ym94TW9kZSk7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ211bHRpcGxlJywgaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSk7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnLCBpc0RhcmspO1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIFN0cmluZyhpc09wZW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgU3RyaW5nKGlzTXVsdGlwbGVTZWxlY3QodGhpcykpKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gaXNPcGVuID8gMCA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbikpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RFbGVtZW50LmRpc2FibGVkKTtcblxuICAgICAgICBpZiAoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RPcHRpb24uZGlzYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGVhZGVyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyRWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsRWwgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsJyk7XG4gICAgICAgIGlmICghKGxhYmVsRWwgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPVxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZE9wdGlvbnNbMF0gPz9cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQub3B0aW9uc1tzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXhdID8/XG4gICAgICAgICAgICBudWxsO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0ZWRPcHRpb24pICYmIHRoaXMub3BlbilcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogc2VsZWN0ZWRPcHRpb24/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnRpdGxlID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgPyBgU2VsZWN0ZWQ6ICR7bGFiZWx9YCA6ICdTZWxlY3QgYW4gb3B0aW9uJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgZWwuaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN5bmNBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zeW5jRGltZW5zaW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vblN5bmM/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEobWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgLy8gRGVmZXIgdGhlIHVwZGF0ZSBieSBvbmUgdGljayBzbyBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSBhIGNoYW5nZSBldmVuIHdoZW4gdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UgdGV4dCBoYXBwZW5zIHRvIGJlIHRoZSBzYW1lIHN0cmluZyBhcyB0aGUgcHJldmlvdXMgYW5ub3VuY2VtZW50LlxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlRWxlbWVudCA9PT0gbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy5tZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RFbGVtZW50LmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLm9uT3Blbj8uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW4pIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25DbG9zZT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24oKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCkge1xuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQob3B0KSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IHVuZGVmaW5lZCwgc2Nyb2xsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHNlbGVjdE9wdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKTtcbiAgICAgICAgaWYgKHNjcm9sbCkgc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlT3B0aW9uKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWN0aXZlT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKHRoaXMuYWN0aXZlT3B0aW9uKSA6IC0xO1xuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xXG4gICAgICAgICAgICA/IChkZWx0YSA+PSAwID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4ob3B0aW9ucy5sZW5ndGggLSAxLCBjdXJyZW50SW5kZXggKyBkZWx0YSkpO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbnNbbmV4dEluZGV4XSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZVRvQm91bmRhcnkoYm91bmRhcnk6ICdzdGFydCcgfCAnZW5kJykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKGJvdW5kYXJ5ID09PSAnc3RhcnQnID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUp1bXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3QgZmlyc3RPcHRpb24gPSBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbicpKVxuICAgICAgICAgICAgLmZpbmQoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgIGlmICghKGZpcnN0T3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gZmlyc3RPcHRpb24ub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG9wdGlvbnNMaXN0RWxlbWVudC5jbGllbnRIZWlnaHQgLyBvcHRpb25IZWlnaHQpKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlQnlQYWdlKGRpcmVjdGlvbjogMSB8IC0xKSB7XG4gICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbih0aGlzLmdldFBhZ2VKdW1wU2l6ZSgpICogZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0aXZlT3B0aW9uLCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbiB8fCBhY3RpdmVPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYWN0aXZlT3B0aW9uLnNlbGVjdGVkID0gIWFjdGl2ZU9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGlmICghKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbnRleHQ6IFBsdWdpbkNvbnRleHQgPSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50OiB0aGlzLnNlbGVjdEVsZW1lbnQsXG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50OiB0aGlzLmhlYWRlckVsZW1lbnQsXG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQ6IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LFxuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50OiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6ICh0ZXh0KSA9PiB0aGlzLnNldE1lc3NhZ2UodGV4dCksXG4gICAgICAgICAgICBjbGVhck1lc3NhZ2U6ICgpID0+IHRoaXMuY2xlYXJNZXNzYWdlKCksXG4gICAgICAgICAgICBvbjogKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMucHVzaCh7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmluaXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZXlib2FyZCBjb250cmFjdHMgZm9yIGhlYWRlciwgbGlzdCwgYW5kIHNlYXJjaCBhcmUga2VwdCB0b2dldGhlciBoZXJlIFx1MjAxNCBzcGxpdHRpbmcgdGhlbVxuICAgIC8vIHdvdWxkIHNjYXR0ZXIgcmVsYXRlZCBrZXkgaGFuZGxpbmcgYWNyb3NzIG11bHRpcGxlIG1ldGhvZHMuIElmIHRoaXMgZ3Jvd3Mgc2lnbmlmaWNhbnRseSxcbiAgICAvLyBjb25zaWRlciBicmVha2luZyBvdXQgcGVyLWNvbXBvbmVudCBoYW5kbGVycy5cbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBkcm9wZG93blBhbmVsRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGRyb3Bkb3duUGFuZWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbCA9IHRhcmdldC5jbG9zZXN0KCcud29yc2Utc2VsZWN0LW9wdGlvbicpO1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uRWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghZHJvcGRvd25QYW5lbEVsZW1lbnQuY29udGFpbnMob3B0aW9uRWwpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQob3B0aW9uRWwpO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24gfHwgc2VsZWN0T3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbi5zZWxlY3RlZCA9ICFzZWxlY3RPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlbGVjdENoYW5nZTogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMuc3luY0FsbCgpO1xuICAgICAgICBjb25zdCBvbkhlYWRlckNsaWNrOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkgOiB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlYXJjaEtleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZHJvcGRvd25QYW5lbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk9wdGlvbnNDbGljayk7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25IZWFkZXJDbGljayk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25PcHRpb25zS2V5RG93bik7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuXG4gICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgIH1cblxuICAgIC8vIERPTSBkaWZmaW5nIGlzIGtlcHQgaW5saW5lIGhlcmUgYmVjYXVzZSB0aGUgbXV0YXRpb24gY2FzZXMgYXJlIHRpZ2h0bHkgY291cGxlZCB0byBlYWNoXG4gICAgLy8gb3RoZXIgYW5kIHRoZSBzY3JvbGxlcidzIGNoaWxkIG9yZGVyLiBJZiB0aGlzIGdyb3dzIChlLmcuIG9wdGlvbiBncm91cHMsIHJlb3JkZXJpbmdcbiAgICAvLyBhbmltYXRpb25zKSwgZXh0cmFjdCBpbnRvIGEgZGVkaWNhdGVkIHJlY29uY2lsZXIuXG4gICAgcHJpdmF0ZSBvYnNlcnZlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGxldCBzaG91bGRSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlU3RhdGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVidWlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVidWlsZCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlua2VkT3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlua2VkT3B0aW9uIHx8ICFBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5jbHVkZXMobGlua2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZE9wdGlvbikgdW5saW5rT3B0aW9uKGxpbmtlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goKHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KHRoaXMsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gZ2V0T3B0aW9uSWQodGhpcywgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdEluZGV4ID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuW29wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdEluZGV4ICE9PSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEF0SW5kZXggPyBjdXJyZW50QXRJbmRleC5iZWZvcmUoZWwpIDogb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiAhZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNlbGVjdEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZScsICdjbGFzcycsICdkaXNhYmxlZCcsICdtdWx0aXBsZScsICdzaXplJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIHdvcnNlU2VsZWN0RWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBzZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWZ0ZXIod29yc2VTZWxlY3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVR5cGVBaGVhZCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChlLmtleS5sZW5ndGggIT09IDEgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbnMgPSB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudD8uY2hpbGRyZW47XG4gICAgICAgIHRoaXMudHlwZUFoZWFkVGV4dCArPSBlLmtleTtcbiAgICAgICAgbGV0IHR5cGVBaGVhZFRleHQgPSB0aGlzLnR5cGVBaGVhZFRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAod29yc2VPcHRpb25zICYmIHR5cGVBaGVhZFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nV29yc2VPcHRpb24gPSBBcnJheS5mcm9tKHdvcnNlT3B0aW9ucykuZmluZCh3b3JzZU9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdvcnNlT3B0aW9uLnRleHRDb250ZW50LnRyaW0oKS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgodHlwZUFoZWFkVGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50Py5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbWF0Y2hpbmdXb3JzZU9wdGlvbj8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGluZ1dvcnNlT3B0aW9uKSBtYXRjaGluZ1dvcnNlT3B0aW9uLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50eXBlQWhlYWRUaW1lcklkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50eXBlQWhlYWRUaW1lcklkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnR5cGVBaGVhZFRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHlwZUFoZWFkVGV4dCA9ICcnO1xuICAgICAgICB9LCB0aGlzLnR5cGVBaGVhZFRpbWVvdXQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFbmhhbmNlcyBldmVyeSBuYXRpdmUgYDxzZWxlY3Q+YCBlbGVtZW50IGluc2lkZSB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgc2FmZSB0byBjYWxsIG11bHRpcGxlIHRpbWVzLiBFYWNoIGA8c2VsZWN0PmAgaXMgbW91bnRlZCBhdCBtb3N0IG9uY2UuXG4gKiBJZiBgb3B0aW9ucy5vYnNlcnZlYCBpcyB0cnVlLCBuZXdseSBhZGRlZCBzZWxlY3RzIHVuZGVyIHRoZSByb290IGFyZSBlbmhhbmNlZCBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIFJldHVybnMgYSBjbGVhbnVwIGZ1bmN0aW9uIHRoYXQgZGlzY29ubmVjdHMgdGhlIHJvb3Qgb2JzZXJ2ZXIgYW5kIGRlc3Ryb3lzIG1vdW50ZWQgaW5zdGFuY2VzXG4gKiB1bmRlciB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcnNlU2VsZWN0KHJvb3Q6IFJvb3ROb2RlID0gZG9jdW1lbnQsIG9wdGlvbnM6IFdvcnNlU2VsZWN0T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgcGx1Z2lucyA9IG9wdGlvbnMucGx1Z2lucyA/PyBbXTtcbiAgICBtb3VudFNlbGVjdHNJblJvb3Qocm9vdCwgcGx1Z2lucyk7XG5cbiAgICBsZXQgcm9vdE9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKG9wdGlvbnMub2JzZXJ2ZSkge1xuICAgICAgICByb290T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSAhPT0gJ2NoaWxkTGlzdCcpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGFkZGVkTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoYWRkZWROb2RlLCByb290LCBwbHVnaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoZWwsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdE9ic2VydmVyLm9ic2VydmUocm9vdCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcm9vdE9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG5cbiAgICAgICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmdldChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHJldHVybjtcbiAgICAgICAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGluc3RhbmNlcy5kZWxldGUoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVN0eWxlcygpIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcz1cInRydWVcIl0nKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXMnLCAndHJ1ZScpO1xuICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNyZWF0ZUNTUygpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdDogUm9vdE5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0c0luUm9vdChyb290OiBSb290Tm9kZSwgcGx1Z2luczogUGx1Z2luW10pIHtcbiAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQsIHJvb3QsIHBsdWdpbnMpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCByb290OiBSb290Tm9kZSwgcGx1Z2luczogUGx1Z2luW10pIHtcbiAgICBpZiAoaW5zdGFuY2VzLmdldChzZWxlY3RFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgV29yc2VTZWxlY3Qoc2VsZWN0RWxlbWVudCwgZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQpLCByb290LCBwbHVnaW5zKTtcbiAgICBpbnN0YW5jZS5tb3VudCgpO1xuICAgIGluc3RhbmNlcy5zZXQoc2VsZWN0RWxl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