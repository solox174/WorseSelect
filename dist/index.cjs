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
    }
    
    .worse-select-container {
        position: relative;
        display: inline-block;
        min-width: 0;
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
        height: ${DEFAULT_CONFIG.height};
        padding: 0 28px 0 8px;
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background-color: var(--ws-bg);
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 10px 10px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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

    .worse-select-container.listbox .worse-select-header {
        display: none;
    }

    .worse-select-container.open .worse-select-header {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 7.5L6 4.5L9 7.5' stroke='%23333333' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
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
        border: 1px solid var(--ws-border-color);
        border-radius: var(--ws-border-radius);
        background: var(--ws-bg);
        box-shadow: var(--ws-shadow);
        padding: 2px;
    }

    .worse-select-container.open .worse-select-options {
        display: block;
    }

    .worse-select-container.listbox .worse-select-options {
        position: relative;
        top: 0;
        left: 0;
        right: auto;
        display: block;
        box-shadow: none;
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
function applyFilter(context, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  Array.from(context.selectElement.options).forEach((selectOption) => {
    const el = getWorseOptionElement(selectOption);
    if (!(el instanceof HTMLDivElement)) return;
    const matches = term !== "" && el.textContent.toLowerCase().includes(term);
    el.classList.toggle("matches", matches);
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
        applyFilter(context, searchTerm);
      });
    },
    onSync() {
      if (!pluginContext) return;
      applyFilter(pluginContext, searchTerm);
    },
    onClose() {
      if (!pluginContext) return;
      searchTerm = "";
      const { searchInputElement } = pluginContext;
      if (searchInputElement instanceof HTMLInputElement) {
        searchInputElement.value = "";
      }
      applyFilter(pluginContext, "");
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
    this.open = false;
    this.plugins = [];
    this.pluginListeners = [];
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
  // --- Lifecycle ---
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
    _WorseSelect.mountedInstances.add(this);
    this.bindEvents();
    this.observeOptions();
    this.render();
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
  // --- State sync ---
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
    optionsListElement.style.maxHeight = `${config.dropdownHeightPx}px`;
  }
  updateOpenState() {
    if (!(this.worseSelectElement instanceof HTMLDivElement)) return;
    const isListboxMode = shouldUseListboxMode(this);
    const isOpen = isListboxMode ? true : this.open;
    this.worseSelectElement.classList.toggle("open", isOpen);
    this.worseSelectElement.classList.toggle("listbox", isListboxMode);
    this.worseSelectElement.classList.toggle("multiple", isMultipleSelect(this));
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
  // --- Message ---
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
  // --- Open / close ---
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
  // --- Navigation ---
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
  // --- Internal wiring ---
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
    const { selectElement, worseSelectElement } = this;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7XG5leHBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlc1wiOyIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XG4gICAgc2VhcmNoYWJsZTogZmFsc2UsXG4gICAgZHJvcGRvd25IZWlnaHRQeDogNDAwLFxuICAgIGhlaWdodDogJzMycHgnLFxuICAgIHdpZHRoOiAnMTAwJSdcbn07XG5cbi8vIE1hcHMgZWFjaCBjb25maWcgdmFsdWUgdG8gaXRzIHdpZGVuZWQgcHJpbWl0aXZlIHR5cGUgKGUuZy4gdHJ1ZSBcdTIxOTIgYm9vbGVhbikgc28gdGhhdFxuLy8gU2VsZWN0Q29uZmlnIGFjY2VwdHMgYW55IHZhbGlkIHZhbHVlIG9mIHRoYXQgdHlwZSwgbm90IGp1c3QgdGhlIHNwZWNpZmljIGRlZmF1bHQgbGl0ZXJhbC5cbmV4cG9ydCB0eXBlIFdpZGVuPFQ+ID0gVCBleHRlbmRzIGJvb2xlYW4gPyBib29sZWFuIDogVCBleHRlbmRzIHN0cmluZyA/IHN0cmluZyA6IFQgZXh0ZW5kcyBudW1iZXIgPyBudW1iZXIgOiBUO1xuXG5leHBvcnQgdHlwZSBTZWxlY3RDb25maWcgPSB7XG4gICAgW0sgaW4ga2V5b2YgdHlwZW9mIERFRkFVTFRfQ09ORklHXTogV2lkZW48KHR5cGVvZiBERUZBVUxUX0NPTkZJRylbS10+XG59O1xuXG5leHBvcnQgdHlwZSBDb25maWdLZXkgPSBrZXlvZiBTZWxlY3RDb25maWc7XG5leHBvcnQgdHlwZSBSb290Tm9kZSA9IFBhcmVudE5vZGU7XG5cbmV4cG9ydCB0eXBlIFBsdWdpbkNvbnRleHQgPSB7XG4gICAgcmVhZG9ubHkgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgaGVhZGVyRWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcmVhZG9ubHkgb3B0aW9uc0xpc3RFbGVtZW50OiBIVE1MRGl2RWxlbWVudDtcbiAgICByZWFkb25seSBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNldE1lc3NhZ2UodGV4dDogc3RyaW5nKTogdm9pZDtcbiAgICBjbGVhck1lc3NhZ2UoKTogdm9pZDtcbiAgICBvbih0YXJnZXQ6IEV2ZW50VGFyZ2V0LCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFBsdWdpbiA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdChjb250ZXh0OiBQbHVnaW5Db250ZXh0KTogdm9pZDtcbiAgICBvblN5bmM/KCk6IHZvaWQ7XG4gICAgb25PcGVuPygpOiB2b2lkO1xuICAgIG9uQ2xvc2U/KCk6IHZvaWQ7XG4gICAgZGVzdHJveT8oKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFdvcnNlU2VsZWN0T3B0aW9ucyA9IHtcbiAgICBvYnNlcnZlPzogYm9vbGVhbjtcbiAgICBwbHVnaW5zPzogUGx1Z2luW107XG59O1xuXG4vLyBNaW5pbWFsIGludGVyZmFjZSBleHBvc2VkIHRvIGRvbS50cyBhbmQgc2VsZWN0LWhlbHBlcnMudHMuIFJlc3RyaWN0cyB0aG9zZSBtb2R1bGVzIHRvIHRoZVxuLy8gcHJvcGVydGllcyB0aGV5IGFjdHVhbGx5IG5lZWQsIGtlZXBpbmcgdGhlIGZ1bGwgV29yc2VTZWxlY3QgY2xhc3MgaW50ZXJuYWwgdG8gY29yZS50cy5cbmV4cG9ydCBpbnRlcmZhY2UgV29yc2VTZWxlY3RDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25maWc6IFNlbGVjdENvbmZpZztcbiAgICBpbnN0YW5jZUlkOiBzdHJpbmc7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTUygpIHtcbiAgICByZXR1cm4gIC8qIGxhbmd1YWdlPUNTUyAqLyBgXG4gICAgOnJvb3Qge1xuICAgICAgICAtLXdzLWJvcmRlci1jb2xvcjogIzc2NzY3NjtcbiAgICAgICAgLS13cy1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIC0td3MtYmc6ICNmZmY7XG4gICAgICAgIC0td3MtdGV4dC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC1iZzogI2YwZjBmMDtcbiAgICAgICAgLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yOiAjNmQ2ZDZkO1xuICAgICAgICAtLXdzLWhvdmVyLWJnOiAjZjFmMWYxO1xuICAgICAgICAtLXdzLWFjdGl2ZS1iZzogI2VlZjRmZjtcbiAgICAgICAgLS13cy1hY3RpdmUtb3V0bGluZTogIzI1NjNlYjtcbiAgICAgICAgLS13cy1zZWxlY3RlZC1iZzogI2QyZTNmYztcbiAgICAgICAgLS13cy1zZWxlY3RlZC10ZXh0LWNvbG9yOiAjMTc0ZWE2O1xuICAgICAgICAtLXdzLWZvY3VzLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6ICR7REVGQVVMVF9DT05GSUcud2lkdGh9O1xuICAgICAgICBoZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCA4cHggY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwcHggMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMicgdmlld0JveD0nMCAwIDEyIDEyJyBmaWxsPSdub25lJyUzRSUzQ3BhdGggZD0nTTMgNC41TDYgNy41TDkgNC41JyBzdHJva2U9JyUyMzMzMzMzMycgc3Ryb2tlLXdpZHRoPScxLjEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvJTNFJTNDL3N2ZyUzRVwiKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDcuNUw2IDQuNUw5IDcuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXI6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6Zm9jdXMtdmlzaWJsZSxcbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cbiAgICBgO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7Q29uZmlnS2V5LCBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnfSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5jb25zdCBjb25maWdLZXlzID0gT2JqZWN0LmtleXMoREVGQVVMVF9DT05GSUcpIGFzIENvbmZpZ0tleVtdO1xuXG5mdW5jdGlvbiB0b0tlYmFiQ2FzZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1tBLVpdL2csIGNoYXJhY3RlciA9PiBgLSR7Y2hhcmFjdGVyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnVmFsdWU8SyBleHRlbmRzIENvbmZpZ0tleT4oa2V5OiBLLCBhdHRyOiBzdHJpbmcpOiBTZWxlY3RDb25maWdbS10ge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IERFRkFVTFRfQ09ORklHW2tleV07XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiAoYXR0ciA9PT0gJ3RydWUnKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoYXR0cikgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyIGFzIFNlbGVjdENvbmZpZ1tLXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZyhzZWxlY3RFbGVtZW50OiBFbGVtZW50KTogU2VsZWN0Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFNlbGVjdENvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBjb25maWdLZXlzW2ldO1xuICAgICAgICBjb25zdCBkYXRhQXR0cmlidXRlTmFtZSA9IGBkYXRhLSR7dG9LZWJhYkNhc2Uoa2V5KX1gO1xuICAgICAgICBjb25zdCBhdHRyID0gc2VsZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgICAgIGlmIChhdHRyID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAoY29uZmlnIGFzIFJlY29yZDxDb25maWdLZXksIHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI+KVtrZXldID0gcGFyc2VDb25maWdWYWx1ZShrZXksIGF0dHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7V29yc2VTZWxlY3RDb250ZXh0fSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5zaXplID4gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5tdWx0aXBsZTtcbn1cblxuLy8gTWF0Y2hlcyB0aGUgY29udmVudGlvbmFsIEhUTUwgcGxhY2Vob2xkZXIgcGF0dGVybjogPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPkxhYmVsPC9vcHRpb24+LlxuLy8gT3B0aW9ucyB0aGF0IGFyZSBub3QgZGlzYWJsZWQgb3IgaGF2ZSBhIG5vbi1lbXB0eSB2YWx1ZSBhcmUgdHJlYXRlZCBhcyBzZWxlY3RhYmxlLlxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uICE9PSBudWxsICYmIHNlbGVjdE9wdGlvbi52YWx1ZSA9PT0gJycgJiYgc2VsZWN0T3B0aW9uLmRpc2FibGVkO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG4vLyBUd28gV2Vha01hcHMgbWFpbnRhaW4gYSBiaWRpcmVjdGlvbmFsIGxpbmsgYmV0d2VlbiBuYXRpdmUgPG9wdGlvbj4gZWxlbWVudHMgYW5kIHRoZWlyXG4vLyByZW5kZXJlZCB3aWRnZXQgZGl2cy4gV2Vha01hcCBrZXlzIGFsbG93IEdDIHRvIHJlY2xhaW0gZWxlbWVudHMgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIHdpdGhvdXQgcmVxdWlyaW5nIGV4cGxpY2l0IGNsZWFudXAgb24gZXZlcnkgcmVtb3ZhbCBwYXRoLlxuY29uc3Qgb3B0aW9uVG9EaXYgPSBuZXcgV2Vha01hcDxIVE1MT3B0aW9uRWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+KCk7XG5jb25zdCBkaXZUb09wdGlvbiA9IG5ldyBXZWFrTWFwPEhUTUxEaXZFbGVtZW50LCBIVE1MT3B0aW9uRWxlbWVudD4oKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgb3B0aW9uVG9EaXYuc2V0KHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICBkaXZUb09wdGlvbi5zZXQod29yc2VPcHRpb25FbGVtZW50LCBzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIXdvcnNlT3B0aW9uRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgb3B0aW9uVG9EaXYuZGVsZXRlKHNlbGVjdE9wdGlvbik7XG4gICAgZGl2VG9PcHRpb24uZGVsZXRlKHdvcnNlT3B0aW9uRWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIHJldHVybiBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdE9wdGlvbkVsZW1lbnQod29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIHJldHVybiBkaXZUb09wdGlvbi5nZXQod29yc2VPcHRpb25FbGVtZW50KTtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgaXNNdWx0aXBsZVNlbGVjdCwgc2hvdWxkVXNlTGlzdGJveE1vZGUgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGlmICghc2VsZWN0T3B0aW9uKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZFN0eWxlQXR0cmlidXRlKHN0eWxlUGFydHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHN0eWxlUGFydHMubGVuZ3RoID4gMCA/IGAgc3R5bGU9XCIke3N0eWxlUGFydHMuam9pbignICcpfVwiYCA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlUGFydHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGggIT09IERFRkFVTFRfQ09ORklHLndpZHRoKSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgd2lkdGg6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGh9O2ApO1xuICAgIH1cblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHQgIT09IERFRkFVTFRfQ09ORklHLmhlaWdodCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYGhlaWdodDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHR9O2ApO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFN0eWxlQXR0cmlidXRlKGhlYWRlclN0eWxlUGFydHMpO1xufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCwgb3B0aW9uSW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBgJHt3b3JzZVNlbGVjdEluc3RhbmNlLmluc3RhbmNlSWR9LW9wdGlvbi0ke29wdGlvbkluZGV4fWA7XG59XG5cbmZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LW9wdGlvbiddO1xuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25IdG1sKFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkNsYXNzZXMgPSBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uKTtcbiAgICBjb25zdCBvcHRpb25UZXh0ID0gc2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID8/ICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGlkPVwiJHtnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlLCBvcHRpb25JbmRleCl9XCJcbiAgICAgICAgIGNsYXNzPVwiJHt3b3JzZU9wdGlvbkNsYXNzZXN9XCJcbiAgICAgICAgIGRhdGEtdmFsdWU9XCIke2VzY2FwZUh0bWwoc2VsZWN0T3B0aW9uLnZhbHVlKX1cIlxuICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHtzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICAgICBhcmlhLWRpc2FibGVkPVwiJHtzZWxlY3RPcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiPlxuICAgICAgJHtlc2NhcGVIdG1sKG9wdGlvblRleHQpfVxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgY3JlYXRlV29yc2VPcHRpb25IdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgaWYgKCF3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5zZWFyY2hhYmxlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggbGlzdFwiXG4gICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIG9wdGlvbnNcIiAvPlxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlSHRtbCgpIHtcbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtbWVzc2FnZSB3b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZUF0dHJpYnV0ZSA9IGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gWyd3b3JzZS1zZWxlY3QtY29udGFpbmVyJ107XG5cbiAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdsaXN0Ym94Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBgXG4gICAgPGRpdiBjbGFzcz1cIiR7Y29udGFpbmVyQ2xhc3Nlcy5qb2luKCcgJyl9XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXJcIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9uc1wiPlxuICAgICAgICAke2NyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSl9XG4gICAgICAgICR7Y3JlYXRlTWVzc2FnZUh0bWwoKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyXCIke2hlYWRlclN0eWxlQXR0cmlidXRlfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCB3b3JzZVNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgaHRtbFN0cmluZ1xuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdCBvcHRpb25zTGlzdEVsZW1lbnQgPSB3b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyJykgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkgPyAwIDogLTE7XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsICd0cnVlJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IEFycmF5LmZyb20od29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IHNlbGVjdE9wdGlvbnNbaV07XG4gICAgICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0SW5zdGFuY2UsXG4gICAgICAgICAgICBzZWxlY3RPcHRpb24sXG4gICAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQod29yc2VPcHRpb25FbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yc2VTZWxlY3RFbGVtZW50O1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiwgUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCB9IGZyb20gJy4uL29wdGlvbi1tYXAnO1xuXG5mdW5jdGlvbiBhcHBseUZpbHRlcihjb250ZXh0OiBQbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0ZXJtID0gc2VhcmNoVGVybS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIEFycmF5LmZyb20oY29udGV4dC5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRlcm0gIT09ICcnICYmIGVsLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGVybSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoJ21hdGNoZXMnLCBtYXRjaGVzKTtcbiAgICB9KTtcblxuICAgIGlmICghdGVybSkge1xuICAgICAgICBjb250ZXh0LmNsZWFyTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hDb3VudCA9IGNvbnRleHQub3B0aW9uc0xpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKS5sZW5ndGg7XG4gICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgIG1hdGNoQ291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBmb3VuZCcgOlxuICAgICAgICBtYXRjaENvdW50ID09PSAxID8gJzEgcmVzdWx0IGF2YWlsYWJsZScgOlxuICAgICAgICBgJHttYXRjaENvdW50fSByZXN1bHRzIGF2YWlsYWJsZWA7XG5cbiAgICBjb250ZXh0LnNldE1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBjb25zdCBmaXJzdE1hdGNoID0gY29udGV4dC5vcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpO1xuICAgIGlmIChmaXJzdE1hdGNoIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgZmlyc3RNYXRjaC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbigpOiBQbHVnaW4ge1xuICAgIGxldCBzZWFyY2hUZXJtID0gJyc7XG4gICAgbGV0IHBsdWdpbkNvbnRleHQ6IFBsdWdpbkNvbnRleHQgfCBudWxsID0gbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdzZWFyY2gnLFxuXG4gICAgICAgIGluaXQoY29udGV4dDogUGx1Z2luQ29udGV4dCkge1xuICAgICAgICAgICAgcGx1Z2luQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gY29udGV4dDtcbiAgICAgICAgICAgIGlmICghc2VhcmNoSW5wdXRFbGVtZW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnRleHQub24oc2VhcmNoSW5wdXRFbGVtZW50LCAnaW5wdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZWFyY2hUZXJtID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGFwcGx5RmlsdGVyKGNvbnRleHQsIHNlYXJjaFRlcm0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25TeW5jKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBhcHBseUZpbHRlcihwbHVnaW5Db250ZXh0LCBzZWFyY2hUZXJtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgaWYgKCFwbHVnaW5Db250ZXh0KSByZXR1cm47XG4gICAgICAgICAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgICAgICAgICBjb25zdCB7IHNlYXJjaElucHV0RWxlbWVudCB9ID0gcGx1Z2luQ29udGV4dDtcbiAgICAgICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseUZpbHRlcihwbHVnaW5Db250ZXh0LCAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgIHBsdWdpbkNvbnRleHQgPSBudWxsO1xuICAgICAgICAgICAgc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB9LFxuICAgIH07XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLyoqXG4gKiBQcm9ncmVzc2l2ZS1lbmhhbmNlbWVudCB1dGlsaXRpZXMgZm9yIG5hdGl2ZSB7QGxpbmsgSFRNTFNlbGVjdEVsZW1lbnR9IGNvbnRyb2xzLlxuICpcbiAqIEtlZXBzIHRoZSBuYXRpdmUgYDxzZWxlY3Q+YCBhcyBzb3VyY2Ugb2YgdHJ1dGggZm9yIHZhbHVlLCBkaXNhYmxlZCBzdGF0ZSwgYHNpemVgLCBhbmRcbiAqIGBtdWx0aXBsZWAsIHdoaWxlIG1pcnJvcmluZyB0aGF0IHN0YXRlIGludG8gYSBjdXN0b20gRE9NIHN0cnVjdHVyZSB0aGF0IGlzIGVhc2llciB0byBzdHlsZS5cbiAqXG4gKiBXaWRnZXQtc3BlY2lmaWMgYmVoYXZpb3IgdXNlcyBgZGF0YS0qYCBhdHRyaWJ1dGVzIHN1Y2ggYXMgYGRhdGEtc2VhcmNoYWJsZWAgYW5kXG4gKiBgZGF0YS1kcm9wZG93bi1oZWlnaHQtcHhgLCBrZWVwaW5nIHRoZSBwdWJsaWMgQVBJIGFsaWduZWQgd2l0aCBzdGFuZGFyZCBIVE1MLlxuICovXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnLCBSb290Tm9kZSwgV29yc2VTZWxlY3RPcHRpb25zLCBQbHVnaW4sIFBsdWdpbkNvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB0eXBlIHsgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVDU1MgfSBmcm9tICcuL2Nzcyc7XG5pbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQsIGNyZWF0ZVdvcnNlU2VsZWN0LCBnZXRPcHRpb25JZCwgc2Nyb2xsT3B0aW9uSW50b1ZpZXcgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBnZXRTZWxlY3RPcHRpb25FbGVtZW50LCBnZXRXb3JzZU9wdGlvbkVsZW1lbnQsIGxpbmtPcHRpb24sIHVubGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5pbXBvcnQgeyBpc1BsYWNlaG9sZGVyT3B0aW9uLCBzaG91bGRVc2VMaXN0Ym94TW9kZSwgaXNNdWx0aXBsZVNlbGVjdCB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgY3JlYXRlQnVpbHRpblNlYXJjaFBsdWdpbiB9IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxudHlwZSBQbHVnaW5MaXN0ZW5lciA9IHsgdGFyZ2V0OiBFdmVudFRhcmdldDsgZXZlbnQ6IHN0cmluZzsgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciB9O1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGRyb3Bkb3duUGFuZWxFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uc0xpc3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbk9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcblxuICAgIG9uU2VsZWN0Q2hhbmdlPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJDbGljaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25IZWFkZXJLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbk9wdGlvbnNLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvblNlYXJjaEtleURvd24/OiBFdmVudExpc3RlbmVyO1xuXG4gICAgb3BlbiA9IGZhbHNlO1xuICAgIGFjdGl2ZU9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50O1xuXG4gICAgcHJpdmF0ZSBwbHVnaW5zOiBQbHVnaW5bXSA9IFtdO1xuICAgIHByaXZhdGUgcGx1Z2luTGlzdGVuZXJzOiBQbHVnaW5MaXN0ZW5lcltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgY29uZmlnOiBQYXJ0aWFsPFNlbGVjdENvbmZpZz4gPSB7fSwgcm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgcGx1Z2luczogUGx1Z2luW10gPSBbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZyB9O1xuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICB0aGlzLmluc3RhbmNlSWQgPSBgd3MtJHsrK25leHRJbnN0YW5jZUlkfWA7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFsuLi5wbHVnaW5zXTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcuc2VhcmNoYWJsZSAmJiAhcGx1Z2lucy5zb21lKHAgPT4gcC5uYW1lID09PSAnc2VhcmNoJykpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2lucy5wdXNoKGNyZWF0ZUJ1aWx0aW5TZWFyY2hQbHVnaW4oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAtLS0gTGlmZWN5Y2xlIC0tLVxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gY3JlYXRlV29yc2VTZWxlY3QodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW1lc3NhZ2UnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuYWRkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLm9ic2VydmVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdFBsdWdpbnMoKTtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4uZGVzdHJveT8uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSBvZiB0aGlzLnBsdWdpbkxpc3RlbmVycykge1xuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luTGlzdGVuZXJzID0gW107XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLm9uU2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vblNlbGVjdENoYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zQ2xpY2sgJiYgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PcHRpb25zQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyQ2xpY2sgJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSGVhZGVyQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJLZXlEb3duICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0tleURvd24gJiYgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uT3B0aW9uc0tleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWFyY2hLZXlEb3duICYmIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmRlbGV0ZSh0aGlzKTtcbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2godW5saW5rT3B0aW9uKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudD8ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zTGlzdEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gLS0tIFN0YXRlIHN5bmMgLS0tXG4gICAgc3luY0RpbWVuc2lvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGNvbmZpZyB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGVjdEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChjb21wdXRlZFN0eWxlLndpZHRoICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICdhdXRvJyAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnMHB4Jykge1xuICAgICAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZWRTdHlsZS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRlckVsZW1lbnQuc3R5bGUuZm9udCA9IGNvbXB1dGVkU3R5bGUuZm9udDtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke2NvbmZpZy5kcm9wZG93bkhlaWdodFB4fXB4YDtcbiAgICB9XG5cbiAgICB1cGRhdGVPcGVuU3RhdGUoKSB7XG4gICAgICAgIGlmICghKHRoaXMud29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgaXNMaXN0Ym94TW9kZSA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpO1xuICAgICAgICBjb25zdCBpc09wZW4gPSBpc0xpc3Rib3hNb2RlID8gdHJ1ZSA6IHRoaXMub3BlbjtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJywgaXNPcGVuKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbGlzdGJveCcsIGlzTGlzdGJveE1vZGUpO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdtdWx0aXBsZScsIGlzTXVsdGlwbGVTZWxlY3QodGhpcykpO1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIFN0cmluZyhpc09wZW4pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNMaXN0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgU3RyaW5nKGlzTXVsdGlwbGVTZWxlY3QodGhpcykpKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gaXNPcGVuID8gMCA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJTdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc0xpc3RFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24uc2VsZWN0ZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdE9wdGlvbikpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNhYmxlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgc2VhcmNoSW5wdXRFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICB3b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RFbGVtZW50LmRpc2FibGVkKTtcblxuICAgICAgICBpZiAoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICBlbD8uY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RPcHRpb24uZGlzYWJsZWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGVhZGVyU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgaGVhZGVyRWxlbWVudCwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsRWwgPSBoZWFkZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsJyk7XG4gICAgICAgIGlmICghKGxhYmVsRWwgaW5zdGFuY2VvZiBIVE1MU3BhbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPVxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZE9wdGlvbnNbMF0gPz9cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQub3B0aW9uc1tzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXhdID8/XG4gICAgICAgICAgICBudWxsO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0ZWRPcHRpb24pICYmIHRoaXMub3BlbilcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogc2VsZWN0ZWRPcHRpb24/LnRleHRDb250ZW50Py50cmltKCkgfHwgJyc7XG5cbiAgICAgICAgbGFiZWxFbC50ZXh0Q29udGVudCA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnRpdGxlID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgPyBgU2VsZWN0ZWQ6ICR7bGFiZWx9YCA6ICdTZWxlY3QgYW4gb3B0aW9uJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgZWwuaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zTGlzdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNMaXN0RWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN5bmNBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zeW5jRGltZW5zaW9ucygpO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vblN5bmM/LigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tIE1lc3NhZ2UgLS0tXG4gICAgc2V0TWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEobWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgLy8gRGVmZXIgdGhlIHVwZGF0ZSBieSBvbmUgdGljayBzbyBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSBhIGNoYW5nZSBldmVuIHdoZW4gdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UgdGV4dCBoYXBwZW5zIHRvIGJlIHRoZSBzYW1lIHN0cmluZyBhcyB0aGUgcHJldmlvdXMgYW5ub3VuY2VtZW50LlxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlRWxlbWVudCA9PT0gbWVzc2FnZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy5tZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gLS0tIE9wZW4gLyBjbG9zZSAtLS1cbiAgICBvcGVuRHJvcGRvd24oKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgZm9yIChjb25zdCBwbHVnaW4gb2YgdGhpcy5wbHVnaW5zKSB7XG4gICAgICAgICAgICBwbHVnaW4ub25PcGVuPy4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3BlbikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHBsdWdpbiBvZiB0aGlzLnBsdWdpbnMpIHtcbiAgICAgICAgICAgIHBsdWdpbi5vbkNsb3NlPy4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZURyb3Bkb3duKCkge1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcbiAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKCkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cblxuICAgIG9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpIHtcbiAgICAgICAgdGhpcy5vcGVuRHJvcGRvd24oKTtcblxuICAgICAgICBjb25zdCB7IG9wdGlvbnNMaXN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc0xpc3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHNjcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuYWN0aXZlT3B0aW9uKTtcbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tIE5hdmlnYXRpb24gLS0tXG4gICAgZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZmlsdGVyKG9wdCA9PiB7XG4gICAgICAgICAgICBpZiAob3B0LmRpc2FibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZ2V0V29yc2VPcHRpb25FbGVtZW50KG9wdCkgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQgfCB1bmRlZmluZWQsIHNjcm9sbCA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSBzZWxlY3RPcHRpb247XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlRGVzY2VuZGFudCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCk7XG4gICAgICAgIGlmIChzY3JvbGwpIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbik7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZU9wdGlvbihkZWx0YTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLmFjdGl2ZU9wdGlvbiA/IG9wdGlvbnMuaW5kZXhPZih0aGlzLmFjdGl2ZU9wdGlvbikgOiAtMTtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gY3VycmVudEluZGV4ID09PSAtMVxuICAgICAgICAgICAgPyAoZGVsdGEgPj0gMCA/IDAgOiBvcHRpb25zLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKG9wdGlvbnMubGVuZ3RoIC0gMSwgY3VycmVudEluZGV4ICsgZGVsdGEpKTtcblxuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihvcHRpb25zW25leHRJbmRleF0pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVUb0JvdW5kYXJ5KGJvdW5kYXJ5OiAnc3RhcnQnIHwgJ2VuZCcpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihib3VuZGFyeSA9PT0gJ3N0YXJ0JyA/IG9wdGlvbnNbMF0gOiBvcHRpb25zW29wdGlvbnMubGVuZ3RoIC0gMV0pO1xuICAgIH1cblxuICAgIGdldFBhZ2VKdW1wU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKSlcbiAgICAgICAgICAgIC5maW5kKGVsID0+IGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpO1xuICAgICAgICBpZiAoIShmaXJzdE9wdGlvbiBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkhlaWdodCA9IGZpcnN0T3B0aW9uLm9mZnNldEhlaWdodCB8fCAxO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihvcHRpb25zTGlzdEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gb3B0aW9uSGVpZ2h0KSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZUJ5UGFnZShkaXJlY3Rpb246IDEgfCAtMSkge1xuICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24odGhpcy5nZXRQYWdlSnVtcFNpemUoKSAqIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZU9wdGlvbiwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24gfHwgYWN0aXZlT3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbi5zZWxlY3RlZCA9ICFhY3RpdmVPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihhY3RpdmVPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gSW50ZXJuYWwgd2lyaW5nIC0tLVxuICAgIHByaXZhdGUgaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGlmICghKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbnRleHQ6IFBsdWdpbkNvbnRleHQgPSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50OiB0aGlzLnNlbGVjdEVsZW1lbnQsXG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50OiB0aGlzLmhlYWRlckVsZW1lbnQsXG4gICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQ6IHRoaXMub3B0aW9uc0xpc3RFbGVtZW50LFxuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50OiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCxcbiAgICAgICAgICAgIHNldE1lc3NhZ2U6ICh0ZXh0KSA9PiB0aGlzLnNldE1lc3NhZ2UodGV4dCksXG4gICAgICAgICAgICBjbGVhck1lc3NhZ2U6ICgpID0+IHRoaXMuY2xlYXJNZXNzYWdlKCksXG4gICAgICAgICAgICBvbjogKHRhcmdldCwgZXZlbnQsIGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5MaXN0ZW5lcnMucHVzaCh7IHRhcmdldCwgZXZlbnQsIGhhbmRsZXIgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoY29uc3QgcGx1Z2luIG9mIHRoaXMucGx1Z2lucykge1xuICAgICAgICAgICAgcGx1Z2luLmluaXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZXlib2FyZCBjb250cmFjdHMgZm9yIGhlYWRlciwgbGlzdCwgYW5kIHNlYXJjaCBhcmUga2VwdCB0b2dldGhlciBoZXJlIFx1MjAxNCBzcGxpdHRpbmcgdGhlbVxuICAgIC8vIHdvdWxkIHNjYXR0ZXIgcmVsYXRlZCBrZXkgaGFuZGxpbmcgYWNyb3NzIG11bHRpcGxlIG1ldGhvZHMuIElmIHRoaXMgZ3Jvd3Mgc2lnbmlmaWNhbnRseSxcbiAgICAvLyBjb25zaWRlciBicmVha2luZyBvdXQgcGVyLWNvbXBvbmVudCBoYW5kbGVycy5cbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBkcm9wZG93blBhbmVsRWxlbWVudCwgb3B0aW9uc0xpc3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGRyb3Bkb3duUGFuZWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb25PcHRpb25zQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25FbCA9IHRhcmdldC5jbG9zZXN0KCcud29yc2Utc2VsZWN0LW9wdGlvbicpO1xuICAgICAgICAgICAgaWYgKCEob3B0aW9uRWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmICghZHJvcGRvd25QYW5lbEVsZW1lbnQuY29udGFpbnMob3B0aW9uRWwpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQob3B0aW9uRWwpO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24gfHwgc2VsZWN0T3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbi5zZWxlY3RlZCA9ICFzZWxlY3RPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlbGVjdENoYW5nZTogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMuc3luY0FsbCgpO1xuICAgICAgICBjb25zdCBvbkhlYWRlckNsaWNrOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkgOiB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlYXJjaEtleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0xpc3RFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTGlzdEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZHJvcGRvd25QYW5lbEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk9wdGlvbnNDbGljayk7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25IZWFkZXJDbGljayk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgIG9wdGlvbnNMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25PcHRpb25zS2V5RG93bik7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuXG4gICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgIH1cblxuICAgIC8vIERPTSBkaWZmaW5nIGlzIGtlcHQgaW5saW5lIGhlcmUgYmVjYXVzZSB0aGUgbXV0YXRpb24gY2FzZXMgYXJlIHRpZ2h0bHkgY291cGxlZCB0byBlYWNoXG4gICAgLy8gb3RoZXIgYW5kIHRoZSBzY3JvbGxlcidzIGNoaWxkIG9yZGVyLiBJZiB0aGlzIGdyb3dzIChlLmcuIG9wdGlvbiBncm91cHMsIHJlb3JkZXJpbmdcbiAgICAvLyBhbmltYXRpb25zKSwgZXh0cmFjdCBpbnRvIGEgZGVkaWNhdGVkIHJlY29uY2lsZXIuXG4gICAgcHJpdmF0ZSBvYnNlcnZlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCBvcHRpb25zTGlzdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNMaXN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGxldCBzaG91bGRSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlU3RhdGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVidWlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVidWlsZCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlua2VkT3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlua2VkT3B0aW9uIHx8ICFBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5jbHVkZXMobGlua2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZE9wdGlvbikgdW5saW5rT3B0aW9uKGxpbmtlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goKHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KHRoaXMsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gZ2V0T3B0aW9uSWQodGhpcywgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdEluZGV4ID0gb3B0aW9uc0xpc3RFbGVtZW50LmNoaWxkcmVuW29wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRBdEluZGV4ICE9PSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEF0SW5kZXggPyBjdXJyZW50QXRJbmRleC5iZWZvcmUoZWwpIDogb3B0aW9uc0xpc3RFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zTGlzdEVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiAhZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNlbGVjdEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZScsICdjbGFzcycsICdkaXNhYmxlZCcsICdtdWx0aXBsZScsICdzaXplJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIHdvcnNlU2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFmdGVyKHdvcnNlU2VsZWN0RWxlbWVudCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEVuaGFuY2VzIGV2ZXJ5IG5hdGl2ZSBgPHNlbGVjdD5gIGVsZW1lbnQgaW5zaWRlIHRoZSBwcm92aWRlZCByb290LlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzYWZlIHRvIGNhbGwgbXVsdGlwbGUgdGltZXMuIEVhY2ggYDxzZWxlY3Q+YCBpcyBtb3VudGVkIGF0IG1vc3Qgb25jZS5cbiAqIElmIGBvcHRpb25zLm9ic2VydmVgIGlzIHRydWUsIG5ld2x5IGFkZGVkIHNlbGVjdHMgdW5kZXIgdGhlIHJvb3QgYXJlIGVuaGFuY2VkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogUmV0dXJucyBhIGNsZWFudXAgZnVuY3Rpb24gdGhhdCBkaXNjb25uZWN0cyB0aGUgcm9vdCBvYnNlcnZlciBhbmQgZGVzdHJveXMgbW91bnRlZCBpbnN0YW5jZXNcbiAqIHVuZGVyIHRoZSBwcm92aWRlZCByb290LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd29yc2VTZWxlY3Qocm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgb3B0aW9uczogV29yc2VTZWxlY3RPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zID8/IFtdO1xuICAgIG1vdW50U2VsZWN0c0luUm9vdChyb290LCBwbHVnaW5zKTtcblxuICAgIGxldCByb290T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5vYnNlcnZlKSB7XG4gICAgICAgIHJvb3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uTGlzdCA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlICE9PSAnY2hpbGRMaXN0JykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBtdXRhdGlvbi5hZGRlZE5vZGVzLmZvckVhY2goYWRkZWROb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYWRkZWROb2RlIGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWRkZWROb2RlIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChhZGRlZE5vZGUsIHJvb3QsIHBsdWdpbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkZWROb2RlLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdW50U2VsZWN0RWxlbWVudChlbCwgcm9vdCwgcGx1Z2lucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb290T2JzZXJ2ZXIub2JzZXJ2ZShyb290LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICByb290T2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgaW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgICAgaW5zdGFuY2VzLmRlbGV0ZShzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZW5zdXJlU3R5bGVzKCkge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzPVwidHJ1ZVwiXScpKSByZXR1cm47XG5cbiAgICBjb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcycsICd0cnVlJyk7XG4gICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3JlYXRlQ1NTKCk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290OiBSb290Tm9kZSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RzSW5Sb290KHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudCwgcm9vdCwgcGx1Z2lucykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHJvb3Q6IFJvb3ROb2RlLCBwbHVnaW5zOiBQbHVnaW5bXSkge1xuICAgIGlmIChpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBXb3JzZVNlbGVjdChzZWxlY3RFbGVtZW50LCBnZXRDb25maWcoc2VsZWN0RWxlbWVudCksIHJvb3QsIHBsdWdpbnMpO1xuICAgIGluc3RhbmNlLm1vdW50KCk7XG4gICAgaW5zdGFuY2VzLnNldChzZWxlY3RFbGVtZW50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