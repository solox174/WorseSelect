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
        --ws-focus-outline: AccentColor;
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
function createStatusHtml(worseSelectInstance) {
  if (!worseSelectInstance.config.searchable) {
    return "";
  }
  return `
    <div class="worse-select-status worse-select-visually-hidden" 
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
        ${createStatusHtml(worseSelectInstance)}
        <div class="worse-select-options-scroller"${headerStyleAttribute}></div>
      </div>
    </div>
    `;
  const worseSelectElement = document.createRange().createContextualFragment(
    htmlString
  ).firstElementChild;
  const optionsScrollerElement = worseSelectElement.querySelector(".worse-select-options-scroller");
  optionsScrollerElement.setAttribute("role", "listbox");
  optionsScrollerElement.tabIndex = shouldUseListboxMode(worseSelectInstance) ? 0 : -1;
  if (isMultipleSelect(worseSelectInstance)) {
    optionsScrollerElement.setAttribute("aria-multiselectable", "true");
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
    optionsScrollerElement.appendChild(worseOptionElement);
  }
  return worseSelectElement;
}

// src/worse-select/features/search.ts
function scrollFirstVisibleMatchIntoView(context) {
  const { optionsScrollerElement } = context;
  if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
  const firstMatch = optionsScrollerElement.querySelector(".worse-select-option.matches");
  if (!(firstMatch instanceof HTMLDivElement)) return;
  firstMatch.scrollIntoView({ block: "nearest" });
}
function updateSearchStatus(context) {
  const { statusElement, optionsScrollerElement } = context;
  if (!(statusElement instanceof HTMLDivElement)) return;
  if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
  const searchTerm = context.searchTerm.trim();
  if (!searchTerm) {
    statusElement.textContent = "";
    context.lastSearchStatusMessage = "";
    return;
  }
  const visibleResultCount = Array.from(
    optionsScrollerElement.querySelectorAll(".worse-select-option.matches")
  ).length;
  const nextMessage = visibleResultCount === 0 ? "No results found" : visibleResultCount === 1 ? "1 result available" : `${visibleResultCount} results available`;
  if (nextMessage === context.lastSearchStatusMessage) return;
  context.lastSearchStatusMessage = nextMessage;
  statusElement.textContent = "";
  window.setTimeout(() => {
    if (context.statusElement === statusElement) {
      statusElement.textContent = nextMessage;
    }
  }, 0);
}
function applySearchFilter(context) {
  const searchTerm = context.searchTerm.trim().toLowerCase();
  Array.from(context.selectElement.options).forEach((selectOption) => {
    const worseOptionElement = getWorseOptionElement(selectOption);
    if (!(worseOptionElement instanceof HTMLDivElement)) return;
    const matches = searchTerm !== "" && worseOptionElement.textContent.toLowerCase().includes(searchTerm);
    worseOptionElement.classList.toggle("matches", matches);
  });
  updateSearchStatus(context);
  scrollFirstVisibleMatchIntoView(context);
}

// src/worse-select/core.ts
var instances = /* @__PURE__ */ new WeakMap();
var nextInstanceId = 0;
var _WorseSelect = class _WorseSelect {
  constructor(selectElement, config = {}, root = document) {
    this.open = false;
    this.searchTerm = "";
    this.lastSearchStatusMessage = "";
    this.selectElement = selectElement;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.root = root;
    this.instanceId = `ws-${++nextInstanceId}`;
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
    this.optionsWrapperElement = this.worseSelectElement.querySelector(".worse-select-options");
    this.optionsScrollerElement = this.worseSelectElement.querySelector(".worse-select-options-scroller");
    this.searchInputElement = this.worseSelectElement.querySelector(".worse-select-search-input");
    this.statusElement = this.worseSelectElement.querySelector(".worse-select-status");
    if (_WorseSelect.mountedInstances.size === 0) {
      document.addEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    _WorseSelect.mountedInstances.add(this);
    this.bindEvents();
    this.observeOptions();
    this.render();
  }
  destroy() {
    this.optionObserver?.disconnect();
    this.optionObserver = void 0;
    if (this.onSelectChange) {
      this.selectElement.removeEventListener("change", this.onSelectChange);
      this.onSelectChange = void 0;
    }
    if (this.onOptionsClick && this.optionsWrapperElement) {
      this.optionsWrapperElement.removeEventListener("click", this.onOptionsClick);
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
    if (this.onOptionsKeyDown && this.optionsScrollerElement) {
      this.optionsScrollerElement.removeEventListener("keydown", this.onOptionsKeyDown);
      this.onOptionsKeyDown = void 0;
    }
    _WorseSelect.mountedInstances.delete(this);
    if (_WorseSelect.mountedInstances.size === 0) {
      document.removeEventListener("pointerdown", _WorseSelect.handleDocumentPointerDown);
    }
    if (this.onSearchInput && this.searchInputElement) {
      this.searchInputElement.removeEventListener("input", this.onSearchInput);
      this.onSearchInput = void 0;
    }
    if (this.onSearchKeyDown && this.searchInputElement) {
      this.searchInputElement.removeEventListener("keydown", this.onSearchKeyDown);
      this.onSearchKeyDown = void 0;
    }
    Array.from(this.selectElement.options).forEach(unlinkOption);
    this.worseSelectElement?.remove();
    this.selectElement.style.display = "";
    this.worseSelectElement = void 0;
    this.headerElement = void 0;
    this.optionsWrapperElement = void 0;
    this.optionsScrollerElement = void 0;
    this.searchInputElement = void 0;
    this.statusElement = void 0;
    this.open = false;
    this.searchTerm = "";
    this.lastSearchStatusMessage = "";
    this.activeOption = void 0;
  }
  // --- State sync ---
  syncDimensions() {
    const { worseSelectElement, headerElement, optionsScrollerElement, selectElement, config } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    const computedStyle = window.getComputedStyle(selectElement);
    if (computedStyle.width && computedStyle.width !== "auto" && computedStyle.width !== "0px") {
      worseSelectElement.style.width = computedStyle.width;
    }
    headerElement.style.font = computedStyle.font;
    optionsScrollerElement.style.maxHeight = `${config.dropdownHeightPx}px`;
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
    if (this.optionsScrollerElement instanceof HTMLDivElement) {
      this.optionsScrollerElement.setAttribute("aria-multiselectable", String(isMultipleSelect(this)));
      this.optionsScrollerElement.tabIndex = isOpen ? 0 : -1;
    }
    this.updateHeaderState();
  }
  updateSelectedState() {
    const { optionsScrollerElement, selectElement } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    Array.from(optionsScrollerElement.children).forEach((el) => {
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
    const { optionsScrollerElement, activeOption } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    if (!activeOption) {
      optionsScrollerElement.removeAttribute("aria-activedescendant");
      return;
    }
    const el = getWorseOptionElement(activeOption);
    if (!(el instanceof HTMLDivElement)) {
      optionsScrollerElement.removeAttribute("aria-activedescendant");
      return;
    }
    optionsScrollerElement.setAttribute("aria-activedescendant", el.id);
  }
  updateActiveOptionState() {
    const { optionsScrollerElement, activeOption } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    Array.from(optionsScrollerElement.children).forEach((el) => {
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
    applySearchFilter(this);
  }
  // --- Open / close ---
  openDropdown() {
    if (this.selectElement.disabled) return;
    if (shouldUseListboxMode(this)) return;
    this.open = true;
    this.updateOpenState();
  }
  closeDropdown() {
    if (shouldUseListboxMode(this)) return;
    if (!this.open) return;
    this.searchTerm = "";
    this.open = false;
    if (this.searchInputElement instanceof HTMLInputElement) {
      this.searchInputElement.value = "";
    }
    applySearchFilter(this);
    this.updateOpenState();
  }
  toggleDropdown() {
    if (shouldUseListboxMode(this)) return;
    this.open ? this.closeDropdown() : this.openDropdown();
  }
  openDropdownAndFocusList() {
    this.openDropdown();
    const { optionsScrollerElement } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    optionsScrollerElement.tabIndex = 0;
    optionsScrollerElement.focus();
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
    const { optionsScrollerElement } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return 10;
    const firstOption = Array.from(optionsScrollerElement.querySelectorAll(".worse-select-option")).find((el) => el instanceof HTMLDivElement);
    if (!(firstOption instanceof HTMLDivElement)) return 10;
    const optionHeight = firstOption.offsetHeight || 1;
    return Math.max(1, Math.floor(optionsScrollerElement.clientHeight / optionHeight));
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
  // Keyboard contracts for header, list, and search are kept together here — splitting them
  // would scatter related key handling across multiple methods. If this grows significantly,
  // consider breaking out per-component handlers.
  bindEvents() {
    const { worseSelectElement, selectElement, optionsWrapperElement, optionsScrollerElement, headerElement, searchInputElement } = this;
    if (!(worseSelectElement instanceof HTMLDivElement)) return;
    if (!(optionsWrapperElement instanceof HTMLDivElement)) return;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
    if (!(headerElement instanceof HTMLButtonElement)) return;
    const onOptionsClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const optionEl = target.closest(".worse-select-option");
      if (!(optionEl instanceof HTMLDivElement)) return;
      if (!optionsWrapperElement.contains(optionEl)) return;
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
    const onSearchInput = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      this.searchTerm = target.value;
      applySearchFilter(this);
    };
    const onSearchKeyDown = (event) => {
      if (!(event instanceof KeyboardEvent)) return;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveOption(1);
          break;
        case "ArrowUp":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveOption(-1);
          break;
        case "Home":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveToBoundary("start");
          break;
        case "End":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveToBoundary("end");
          break;
        case "PageDown":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveByPage(1);
          break;
        case "PageUp":
          event.preventDefault();
          optionsScrollerElement.focus();
          this.moveActiveByPage(-1);
          break;
        case "Escape":
          event.preventDefault();
          this.closeDropdownAndFocusHeader();
          break;
      }
    };
    optionsWrapperElement.addEventListener("click", onOptionsClick);
    selectElement.addEventListener("change", onSelectChange);
    headerElement.addEventListener("click", onHeaderClick);
    headerElement.addEventListener("keydown", onHeaderKeyDown);
    optionsScrollerElement.addEventListener("keydown", onOptionsKeyDown);
    if (searchInputElement instanceof HTMLInputElement) {
      searchInputElement.addEventListener("input", onSearchInput);
      searchInputElement.addEventListener("keydown", onSearchKeyDown);
      this.onSearchInput = onSearchInput;
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
    const { selectElement, optionsScrollerElement } = this;
    if (!(optionsScrollerElement instanceof HTMLDivElement)) return;
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
        Array.from(optionsScrollerElement.children).forEach((child) => {
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
          const currentAtIndex = optionsScrollerElement.children[optionIndex];
          if (currentAtIndex !== el) {
            currentAtIndex ? currentAtIndex.before(el) : optionsScrollerElement.appendChild(el);
          }
        });
        Array.from(optionsScrollerElement.children).forEach((child) => {
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
  mountSelectsInRoot(root);
  let rootObserver;
  if (options.observe) {
    rootObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type !== "childList") continue;
        mutation.addedNodes.forEach((addedNode) => {
          if (!(addedNode instanceof Element)) return;
          if (addedNode instanceof HTMLSelectElement) {
            mountSelectElement(addedNode, root);
            return;
          }
          addedNode.querySelectorAll("select").forEach((el) => {
            mountSelectElement(el, root);
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
function mountSelectsInRoot(root) {
  getSelectElementsInRoot(root).forEach((selectElement) => mountSelectElement(selectElement, root));
}
function mountSelectElement(selectElement, root) {
  if (instances.get(selectElement)) return;
  const instance = new WorseSelect(selectElement, getConfig(selectElement), root);
  instance.mount();
  instances.set(selectElement, instance);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  worseSelect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3QvaW50ZXJuYWwtdHlwZXMudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jc3MudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb25maWcudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9zZWxlY3QtaGVscGVycy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L29wdGlvbi1tYXAudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9kb20udHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9mZWF0dXJlcy9zZWFyY2gudHMiLCAiLi4vc3JjL3dvcnNlLXNlbGVjdC9jb3JlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgeyB3b3JzZVNlbGVjdCB9IGZyb20gXCIuL3dvcnNlLXNlbGVjdC9jb3JlXCI7IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xufTtcblxuLy8gTWluaW1hbCBpbnRlcmZhY2UgZXhwb3NlZCB0byBkb20udHMgYW5kIHNlbGVjdC1oZWxwZXJzLnRzLiBSZXN0cmljdHMgdGhvc2UgbW9kdWxlcyB0byB0aGVcbi8vIHByb3BlcnRpZXMgdGhleSBhY3R1YWxseSBuZWVkLCBrZWVwaW5nIHRoZSBmdWxsIFdvcnNlU2VsZWN0IGNsYXNzIGludGVybmFsIHRvIGNvcmUudHMuXG5leHBvcnQgaW50ZXJmYWNlIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xufVxuXG4vLyBJbnRlcmZhY2UgZm9yIHNlYXJjaC50cy4gQ29udGFpbnMgb25seSB0aGUgZmllbGRzIHRoZSBzZWFyY2ggZmVhdHVyZSByZWFkcyBhbmQgd3JpdGVzLlxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc3RhdHVzRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIHNlYXJjaFRlcm06IHN0cmluZztcbiAgICBsYXN0U2VhcmNoU3RhdHVzTWVzc2FnZTogc3RyaW5nO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgLyogbGFuZ3VhZ2U9Q1NTICovIGBcbiAgICA6cm9vdCB7XG4gICAgICAgIC0td3MtYm9yZGVyLWNvbG9yOiAjNzY3Njc2O1xuICAgICAgICAtLXdzLWJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgLS13cy1iZzogI2ZmZjtcbiAgICAgICAgLS13cy10ZXh0LWNvbG9yOiBpbmhlcml0O1xuICAgICAgICAtLXdzLWRpc2FibGVkLWJnOiAjZjBmMGYwO1xuICAgICAgICAtLXdzLWRpc2FibGVkLXRleHQtY29sb3I6ICM2ZDZkNmQ7XG4gICAgICAgIC0td3MtaG92ZXItYmc6ICNmMWYxZjE7XG4gICAgICAgIC0td3MtYWN0aXZlLWJnOiAjZWVmNGZmO1xuICAgICAgICAtLXdzLWFjdGl2ZS1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLWJnOiAjZDJlM2ZjO1xuICAgICAgICAtLXdzLXNlbGVjdGVkLXRleHQtY29sb3I6ICMxNzRlYTY7XG4gICAgICAgIC0td3MtZm9jdXMtb3V0bGluZTogQWNjZW50Q29sb3I7XG4gICAgICAgIC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcjogI2I3YjdiNztcbiAgICAgICAgLS13cy1kaXZpZGVyLWNvbG9yOiAjZDBkMGQwO1xuICAgICAgICAtLXdzLWhpZ2hsaWdodC1iZzogI2ZmZjNhMztcbiAgICAgICAgLS13cy1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE2KTtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6ICR7REVGQVVMVF9DT05GSUcud2lkdGh9O1xuICAgICAgICBoZWlnaHQ6ICR7REVGQVVMVF9DT05GSUcuaGVpZ2h0fTtcbiAgICAgICAgcGFkZGluZzogMCAyOHB4IDAgOHB4O1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtYmcpO1xuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCA4cHggY2VudGVyO1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwcHggMTBweDtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMicgdmlld0JveD0nMCAwIDEyIDEyJyBmaWxsPSdub25lJyUzRSUzQ3BhdGggZD0nTTMgNC41TDYgNy41TDkgNC41JyBzdHJva2U9JyUyMzMzMzMzMycgc3Ryb2tlLXdpZHRoPScxLjEnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcvJTNFJTNDL3N2ZyUzRVwiKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIubGlzdGJveCAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDcuNUw2IDQuNUw5IDcuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIuZGlzYWJsZWQgLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy1kaXNhYmxlZC10ZXh0LWNvbG9yKTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXI6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IG5vbmUgIWltcG9ydGFudDtcbiAgICB9XG4gICAgXG4gICAgLndvcnNlLXNlbGVjdC1oZWFkZXI6Zm9jdXMtdmlzaWJsZSxcbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dDpmb2N1cy12aXNpYmxlIHtcbiAgICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXdzLWZvY3VzLW91dGxpbmUpICFpbXBvcnRhbnQ7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSArIDJweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS13cy1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtYmcpO1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS13cy1zaGFkb3cpO1xuICAgICAgICBwYWRkaW5nOiAycHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1jb250YWluZXIub3BlbiAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5saXN0Ym94IC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS13cy1kaXZpZGVyLWNvbG9yKTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0IHtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLXNlYXJjaC1ib3JkZXItY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyIHtcbiAgICAgICAgbWF4LWhlaWdodDogJHtERUZBVUxUX0NPTkZJRy5kcm9wZG93bkhlaWdodFB4fXB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uIHtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWhvdmVyLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1hY3RpdmUtYmcpO1xuICAgICAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0td3MtYWN0aXZlLW91dGxpbmUpO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogLTFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5zZWxlY3RlZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLXNlbGVjdGVkLWJnKTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXNlbGVjdGVkLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkLmFjdGl2ZSB7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmRpc2FibGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLWRpc2FibGVkLXRleHQtY29sb3IpO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1kaXNhYmxlZC1iZyk7XG4gICAgfVxuXG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbi5oaWRkZW4ge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5tYXRjaGVzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaGlnaGxpZ2h0LWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgd2lkdGg6IDFweDtcbiAgICAgICAgaGVpZ2h0OiAxcHg7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIG1hcmdpbjogLTFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgYm9yZGVyOiAwO1xuICAgIH1cbiAgICBgO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7Q29uZmlnS2V5LCBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnfSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5jb25zdCBjb25maWdLZXlzID0gT2JqZWN0LmtleXMoREVGQVVMVF9DT05GSUcpIGFzIENvbmZpZ0tleVtdO1xuXG5mdW5jdGlvbiB0b0tlYmFiQ2FzZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1tBLVpdL2csIGNoYXJhY3RlciA9PiBgLSR7Y2hhcmFjdGVyLnRvTG93ZXJDYXNlKCl9YCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQ29uZmlnVmFsdWU8SyBleHRlbmRzIENvbmZpZ0tleT4oa2V5OiBLLCBhdHRyOiBzdHJpbmcpOiBTZWxlY3RDb25maWdbS10ge1xuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IERFRkFVTFRfQ09ORklHW2tleV07XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiAoYXR0ciA9PT0gJ3RydWUnKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoYXR0cikgYXMgU2VsZWN0Q29uZmlnW0tdO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRyIGFzIFNlbGVjdENvbmZpZ1tLXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZyhzZWxlY3RFbGVtZW50OiBFbGVtZW50KTogU2VsZWN0Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWc6IFNlbGVjdENvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBjb25maWdLZXlzW2ldO1xuICAgICAgICBjb25zdCBkYXRhQXR0cmlidXRlTmFtZSA9IGBkYXRhLSR7dG9LZWJhYkNhc2Uoa2V5KX1gO1xuICAgICAgICBjb25zdCBhdHRyID0gc2VsZWN0RWxlbWVudC5nZXRBdHRyaWJ1dGUoZGF0YUF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgICAgIGlmIChhdHRyID09PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAoY29uZmlnIGFzIFJlY29yZDxDb25maWdLZXksIHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXI+KVtrZXldID0gcGFyc2VDb25maWdWYWx1ZShrZXksIGF0dHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjb25maWc7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7V29yc2VTZWxlY3RDb250ZXh0fSBmcm9tIFwiLi9pbnRlcm5hbC10eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5zaXplID4gMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgcmV0dXJuIHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5tdWx0aXBsZTtcbn1cblxuLy8gTWF0Y2hlcyB0aGUgY29udmVudGlvbmFsIEhUTUwgcGxhY2Vob2xkZXIgcGF0dGVybjogPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPkxhYmVsPC9vcHRpb24+LlxuLy8gT3B0aW9ucyB0aGF0IGFyZSBub3QgZGlzYWJsZWQgb3IgaGF2ZSBhIG5vbi1lbXB0eSB2YWx1ZSBhcmUgdHJlYXRlZCBhcyBzZWxlY3RhYmxlLlxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uICE9PSBudWxsICYmIHNlbGVjdE9wdGlvbi52YWx1ZSA9PT0gJycgJiYgc2VsZWN0T3B0aW9uLmRpc2FibGVkO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG4vLyBUd28gV2Vha01hcHMgbWFpbnRhaW4gYSBiaWRpcmVjdGlvbmFsIGxpbmsgYmV0d2VlbiBuYXRpdmUgPG9wdGlvbj4gZWxlbWVudHMgYW5kIHRoZWlyXG4vLyByZW5kZXJlZCB3aWRnZXQgZGl2cy4gV2Vha01hcCBrZXlzIGFsbG93IEdDIHRvIHJlY2xhaW0gZWxlbWVudHMgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIHdpdGhvdXQgcmVxdWlyaW5nIGV4cGxpY2l0IGNsZWFudXAgb24gZXZlcnkgcmVtb3ZhbCBwYXRoLlxuY29uc3Qgb3B0aW9uVG9EaXYgPSBuZXcgV2Vha01hcDxIVE1MT3B0aW9uRWxlbWVudCwgSFRNTERpdkVsZW1lbnQ+KCk7XG5jb25zdCBkaXZUb09wdGlvbiA9IG5ldyBXZWFrTWFwPEhUTUxEaXZFbGVtZW50LCBIVE1MT3B0aW9uRWxlbWVudD4oKTtcblxuXG5leHBvcnQgZnVuY3Rpb24gbGlua09wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LCB3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgb3B0aW9uVG9EaXYuc2V0KHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICBkaXZUb09wdGlvbi5zZXQod29yc2VPcHRpb25FbGVtZW50LCBzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5saW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIXdvcnNlT3B0aW9uRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgb3B0aW9uVG9EaXYuZGVsZXRlKHNlbGVjdE9wdGlvbik7XG4gICAgZGl2VG9PcHRpb24uZGVsZXRlKHdvcnNlT3B0aW9uRWxlbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIHJldHVybiBvcHRpb25Ub0Rpdi5nZXQoc2VsZWN0T3B0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdE9wdGlvbkVsZW1lbnQod29yc2VPcHRpb25FbGVtZW50OiBIVE1MRGl2RWxlbWVudCkge1xuICAgIHJldHVybiBkaXZUb09wdGlvbi5nZXQod29yc2VPcHRpb25FbGVtZW50KTtcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgaXNNdWx0aXBsZVNlbGVjdCwgc2hvdWxkVXNlTGlzdGJveE1vZGUgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiB9IGZyb20gJy4vb3B0aW9uLW1hcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGlmICghc2VsZWN0T3B0aW9uKSByZXR1cm47XG4gICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZFN0eWxlQXR0cmlidXRlKHN0eWxlUGFydHM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIHN0eWxlUGFydHMubGVuZ3RoID4gMCA/IGAgc3R5bGU9XCIke3N0eWxlUGFydHMuam9pbignICcpfVwiYCA6ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRXb3JzZVNlbGVjdEhlYWRlclN0eWxlQXR0cmlidXRlKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGNvbnN0IGhlYWRlclN0eWxlUGFydHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAod29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGggIT09IERFRkFVTFRfQ09ORklHLndpZHRoKSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgd2lkdGg6ICR7d29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcud2lkdGh9O2ApO1xuICAgIH1cblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHQgIT09IERFRkFVTFRfQ09ORklHLmhlaWdodCkge1xuICAgICAgICBoZWFkZXJTdHlsZVBhcnRzLnB1c2goYGhlaWdodDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5oZWlnaHR9O2ApO1xuICAgIH1cblxuICAgIHJldHVybiBidWlsZFN0eWxlQXR0cmlidXRlKGhlYWRlclN0eWxlUGFydHMpO1xufVxuXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCwgb3B0aW9uSW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBgJHt3b3JzZVNlbGVjdEluc3RhbmNlLmluc3RhbmNlSWR9LW9wdGlvbi0ke29wdGlvbkluZGV4fWA7XG59XG5cbmZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LW9wdGlvbiddO1xuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdE9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBjbGFzc2VzLnB1c2goJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VPcHRpb25IdG1sKFxuICAgIHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCxcbiAgICBzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50LFxuICAgIG9wdGlvbkluZGV4OiBudW1iZXIsXG4pIHtcbiAgICBjb25zdCB3b3JzZU9wdGlvbkNsYXNzZXMgPSBnZXRXb3JzZU9wdGlvbkNsYXNzZXMoc2VsZWN0T3B0aW9uKTtcbiAgICBjb25zdCBvcHRpb25UZXh0ID0gc2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID8/ICcnO1xuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGlkPVwiJHtnZXRPcHRpb25JZCh3b3JzZVNlbGVjdEluc3RhbmNlLCBvcHRpb25JbmRleCl9XCJcbiAgICAgICAgIGNsYXNzPVwiJHt3b3JzZU9wdGlvbkNsYXNzZXN9XCJcbiAgICAgICAgIGRhdGEtdmFsdWU9XCIke2VzY2FwZUh0bWwoc2VsZWN0T3B0aW9uLnZhbHVlKX1cIlxuICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICBhcmlhLXNlbGVjdGVkPVwiJHtzZWxlY3RPcHRpb24uc2VsZWN0ZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiXG4gICAgICAgICBhcmlhLWRpc2FibGVkPVwiJHtzZWxlY3RPcHRpb24uZGlzYWJsZWQgPyAndHJ1ZScgOiAnZmFsc2UnfVwiPlxuICAgICAgJHtlc2NhcGVIdG1sKG9wdGlvblRleHQpfVxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgY3JlYXRlV29yc2VPcHRpb25IdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpXG4gICAgKS5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRGl2RWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgaWYgKCF3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5zZWFyY2hhYmxlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgIGNsYXNzPVwid29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggbGlzdFwiXG4gICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiU2VhcmNoIG9wdGlvbnNcIiAvPlxuICAgIDwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdGF0dXNIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2U6IFdvcnNlU2VsZWN0Q29udGV4dCkge1xuICAgIGlmICghd29yc2VTZWxlY3RJbnN0YW5jZS5jb25maWcuc2VhcmNoYWJsZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LXN0YXR1cyB3b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuXCIgXG4gICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXG4gICAgICAgICBhcmlhLWF0b21pYz1cInRydWVcIj48L2Rpdj5cbiAgICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yc2VTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVBdHRyaWJ1dGUgPSBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZSk7XG4gICAgY29uc3QgY29udGFpbmVyQ2xhc3NlcyA9IFsnd29yc2Utc2VsZWN0LWNvbnRhaW5lciddO1xuXG4gICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbGlzdGJveCcpO1xuICAgIH1cblxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KHdvcnNlU2VsZWN0SW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnRhaW5lckNsYXNzZXMucHVzaCgnbXVsdGlwbGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBodG1sU3RyaW5nID0gYFxuICAgIDxkaXYgY2xhc3M9XCIke2NvbnRhaW5lckNsYXNzZXMuam9pbignICcpfVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyXCJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIlxuICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3b3JzZS1zZWxlY3QtaGVhZGVyLWxhYmVsXCI+PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwid29yc2Utc2VsZWN0LW9wdGlvbnNcIj5cbiAgICAgICAgJHtjcmVhdGVTZWFyY2hIdG1sKHdvcnNlU2VsZWN0SW5zdGFuY2UpfVxuICAgICAgICAke2NyZWF0ZVN0YXR1c0h0bWwod29yc2VTZWxlY3RJbnN0YW5jZSl9XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlclwiJHtoZWFkZXJTdHlsZUF0dHJpYnV0ZX0+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3Qgd29yc2VTZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoXG4gICAgICAgIGh0bWxTdHJpbmdcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xuXG4gICAgY29uc3Qgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCA9IHdvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdsaXN0Ym94Jyk7XG4gICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC50YWJJbmRleCA9IHNob3VsZFVzZUxpc3Rib3hNb2RlKHdvcnNlU2VsZWN0SW5zdGFuY2UpID8gMCA6IC0xO1xuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gQXJyYXkuZnJvbSh3b3JzZVNlbGVjdEluc3RhbmNlLnNlbGVjdEVsZW1lbnQub3B0aW9ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdE9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gc2VsZWN0T3B0aW9uc1tpXTtcbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KFxuICAgICAgICAgICAgd29yc2VTZWxlY3RJbnN0YW5jZSxcbiAgICAgICAgICAgIHNlbGVjdE9wdGlvbixcbiAgICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIHdvcnNlT3B0aW9uRWxlbWVudCk7XG4gICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuYXBwZW5kQ2hpbGQod29yc2VPcHRpb25FbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yc2VTZWxlY3RFbGVtZW50O1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBnZXRXb3JzZU9wdGlvbkVsZW1lbnQgfSBmcm9tICcuLi9vcHRpb24tbWFwJztcbmltcG9ydCB0eXBlIHsgU2VhcmNoQ29udGV4dCB9IGZyb20gJy4uL2ludGVybmFsLXR5cGVzJztcblxuZnVuY3Rpb24gc2Nyb2xsRmlyc3RWaXNpYmxlTWF0Y2hJbnRvVmlldyhjb250ZXh0OiBTZWFyY2hDb250ZXh0KSB7XG4gICAgY29uc3QgeyBvcHRpb25zU2Nyb2xsZXJFbGVtZW50IH0gPSBjb250ZXh0O1xuICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IGZpcnN0TWF0Y2ggPSBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKTtcbiAgICBpZiAoIShmaXJzdE1hdGNoIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBmaXJzdE1hdGNoLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VhcmNoU3RhdHVzKGNvbnRleHQ6IFNlYXJjaENvbnRleHQpIHtcbiAgICBjb25zdCB7IHN0YXR1c0VsZW1lbnQsIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgfSA9IGNvbnRleHQ7XG4gICAgaWYgKCEoc3RhdHVzRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSBjb250ZXh0LnNlYXJjaFRlcm0udHJpbSgpO1xuXG4gICAgaWYgKCFzZWFyY2hUZXJtKSB7XG4gICAgICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgY29udGV4dC5sYXN0U2VhcmNoU3RhdHVzTWVzc2FnZSA9ICcnO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdmlzaWJsZVJlc3VsdENvdW50ID0gQXJyYXkuZnJvbShcbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbi5tYXRjaGVzJylcbiAgICApLmxlbmd0aDtcblxuICAgIGNvbnN0IG5leHRNZXNzYWdlID1cbiAgICAgICAgdmlzaWJsZVJlc3VsdENvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgZm91bmQnIDpcbiAgICAgICAgdmlzaWJsZVJlc3VsdENvdW50ID09PSAxID8gJzEgcmVzdWx0IGF2YWlsYWJsZScgOlxuICAgICAgICBgJHt2aXNpYmxlUmVzdWx0Q291bnR9IHJlc3VsdHMgYXZhaWxhYmxlYDtcblxuICAgIGlmIChuZXh0TWVzc2FnZSA9PT0gY29udGV4dC5sYXN0U2VhcmNoU3RhdHVzTWVzc2FnZSkgcmV0dXJuO1xuXG4gICAgY29udGV4dC5sYXN0U2VhcmNoU3RhdHVzTWVzc2FnZSA9IG5leHRNZXNzYWdlO1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgIC8vIERlZmVyIHRoZSB1cGRhdGUgYnkgb25lIHRpY2sgc28gc2NyZWVuIHJlYWRlcnMgYW5ub3VuY2UgYSBjaGFuZ2UgZXZlbiB3aGVuIHRoZVxuICAgIC8vIG1lc3NhZ2UgdGV4dCBoYXBwZW5zIHRvIGJlIHRoZSBzYW1lIHN0cmluZyBhcyB0aGUgcHJldmlvdXMgYW5ub3VuY2VtZW50LlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGNvbnRleHQuc3RhdHVzRWxlbWVudCA9PT0gc3RhdHVzRWxlbWVudCkge1xuICAgICAgICAgICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IG5leHRNZXNzYWdlO1xuICAgICAgICB9XG4gICAgfSwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVNlYXJjaEZpbHRlcihjb250ZXh0OiBTZWFyY2hDb250ZXh0KSB7XG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IGNvbnRleHQuc2VhcmNoVGVybS50cmltKCkudG9Mb3dlckNhc2UoKTtcblxuICAgIEFycmF5LmZyb20oY29udGV4dC5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgY29uc3Qgd29yc2VPcHRpb25FbGVtZW50ID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG4gICAgICAgIGlmICghKHdvcnNlT3B0aW9uRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzZWFyY2hUZXJtICE9PSAnJyAmJiB3b3JzZU9wdGlvbkVsZW1lbnQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtKTtcbiAgICAgICAgd29yc2VPcHRpb25FbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ21hdGNoZXMnLCBtYXRjaGVzKTtcbiAgICB9KTtcblxuICAgIHVwZGF0ZVNlYXJjaFN0YXR1cyhjb250ZXh0KTtcbiAgICBzY3JvbGxGaXJzdFZpc2libGVNYXRjaEludG9WaWV3KGNvbnRleHQpO1xufVxuIiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbi8qKlxuICogUHJvZ3Jlc3NpdmUtZW5oYW5jZW1lbnQgdXRpbGl0aWVzIGZvciBuYXRpdmUge0BsaW5rIEhUTUxTZWxlY3RFbGVtZW50fSBjb250cm9scy5cbiAqXG4gKiBLZWVwcyB0aGUgbmF0aXZlIGA8c2VsZWN0PmAgYXMgc291cmNlIG9mIHRydXRoIGZvciB2YWx1ZSwgZGlzYWJsZWQgc3RhdGUsIGBzaXplYCwgYW5kXG4gKiBgbXVsdGlwbGVgLCB3aGlsZSBtaXJyb3JpbmcgdGhhdCBzdGF0ZSBpbnRvIGEgY3VzdG9tIERPTSBzdHJ1Y3R1cmUgdGhhdCBpcyBlYXNpZXIgdG8gc3R5bGUuXG4gKlxuICogV2lkZ2V0LXNwZWNpZmljIGJlaGF2aW9yIHVzZXMgYGRhdGEtKmAgYXR0cmlidXRlcyBzdWNoIGFzIGBkYXRhLXNlYXJjaGFibGVgIGFuZFxuICogYGRhdGEtZHJvcGRvd24taGVpZ2h0LXB4YCwga2VlcGluZyB0aGUgcHVibGljIEFQSSBhbGlnbmVkIHdpdGggc3RhbmRhcmQgSFRNTC5cbiAqL1xuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcsIFNlbGVjdENvbmZpZywgUm9vdE5vZGUsIFdvcnNlU2VsZWN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBXb3JzZVNlbGVjdENvbnRleHQgfSBmcm9tICcuL2ludGVybmFsLXR5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUNTUyB9IGZyb20gJy4vY3NzJztcbmltcG9ydCB7IGdldENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudCwgY3JlYXRlV29yc2VTZWxlY3QsIGdldE9wdGlvbklkLCBzY3JvbGxPcHRpb25JbnRvVmlldyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQsIGdldFdvcnNlT3B0aW9uRWxlbWVudCwgbGlua09wdGlvbiwgdW5saW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcbmltcG9ydCB7IGlzUGxhY2Vob2xkZXJPcHRpb24sIHNob3VsZFVzZUxpc3Rib3hNb2RlLCBpc011bHRpcGxlU2VsZWN0IH0gZnJvbSAnLi9zZWxlY3QtaGVscGVycyc7XG5pbXBvcnQgeyBhcHBseVNlYXJjaEZpbHRlciB9IGZyb20gJy4vZmVhdHVyZXMvc2VhcmNoJztcblxuY29uc3QgaW5zdGFuY2VzID0gbmV3IFdlYWtNYXA8SFRNTFNlbGVjdEVsZW1lbnQsIFdvcnNlU2VsZWN0PigpO1xubGV0IG5leHRJbnN0YW5jZUlkID0gMDtcblxuY2xhc3MgV29yc2VTZWxlY3QgaW1wbGVtZW50cyBXb3JzZVNlbGVjdENvbnRleHQge1xuICAgIC8vIFRyYWNrcyBhbGwgbW91bnRlZCBpbnN0YW5jZXMgc28gYSBzaW5nbGUgZG9jdW1lbnQtbGV2ZWwgcG9pbnRlcmRvd24gbGlzdGVuZXIgY2FuIGNsb3NlIGFueVxuICAgIC8vIG9wZW4gZHJvcGRvd24gd2hlbiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSwgaW5zdGVhZCBvZiByZWdpc3RlcmluZyBvbmUgbGlzdGVuZXIgcGVyIGluc3RhbmNlLlxuICAgIC8vIE5vdGU6IGBwcml2YXRlYCBpcyBhIFR5cGVTY3JpcHQtb25seSBjb25zdHJhaW50IGFuZCBpcyBub3QgZW5mb3JjZWQgaW4gdGhlIGNvbXBpbGVkIG91dHB1dC5cbiAgICBwcml2YXRlIHN0YXRpYyBtb3VudGVkSW5zdGFuY2VzID0gbmV3IFNldDxXb3JzZVNlbGVjdD4oKTtcblxuICAgIHByaXZhdGUgc3RhdGljIGhhbmRsZURvY3VtZW50UG9pbnRlckRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpIHJldHVybjtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0YW5jZSBvZiBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzKSB7XG4gICAgICAgICAgICBpZiAoaW5zdGFuY2Uud29yc2VTZWxlY3RFbGVtZW50ICYmICFpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbmZpZzogU2VsZWN0Q29uZmlnO1xuICAgIHJvb3Q6IFJvb3ROb2RlO1xuICAgIGluc3RhbmNlSWQ6IHN0cmluZztcblxuICAgIHdvcnNlU2VsZWN0RWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIGhlYWRlckVsZW1lbnQ/OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBvcHRpb25zV3JhcHBlckVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc2VhcmNoSW5wdXRFbGVtZW50PzogSFRNTElucHV0RWxlbWVudDtcbiAgICBzdGF0dXNFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgb3B0aW9uT2JzZXJ2ZXI/OiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgb25TZWxlY3RDaGFuZ2U/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0NsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlckNsaWNrPzogRXZlbnRMaXN0ZW5lcjtcbiAgICBvbkhlYWRlcktleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uT3B0aW9uc0tleURvd24/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uU2VhcmNoSW5wdXQ/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uU2VhcmNoS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG5cbiAgICBvcGVuID0gZmFsc2U7XG4gICAgc2VhcmNoVGVybSA9ICcnO1xuICAgIGxhc3RTZWFyY2hTdGF0dXNNZXNzYWdlID0gJyc7XG4gICAgYWN0aXZlT3B0aW9uPzogSFRNTE9wdGlvbkVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCwgY29uZmlnOiBQYXJ0aWFsPFNlbGVjdENvbmZpZz4gPSB7fSwgcm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQgPSBzZWxlY3RFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHsgLi4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZyB9O1xuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xuICAgICAgICB0aGlzLmluc3RhbmNlSWQgPSBgd3MtJHsrK25leHRJbnN0YW5jZUlkfWA7XG4gICAgfVxuXG4gICAgLy8gLS0tIExpZmVjeWNsZSAtLS1cblxuICAgIG1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQpIHJldHVybjtcblxuICAgICAgICBlbnN1cmVTdHlsZXMoKTtcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IGNyZWF0ZVdvcnNlU2VsZWN0KHRoaXMpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlcicpIGFzIEhUTUxCdXR0b25FbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNXcmFwcGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucycpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXInKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgPSB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LXNlYXJjaC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtc3RhdHVzJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmFkZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy5vblNlbGVjdENoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0NsaWNrICYmIHRoaXMub3B0aW9uc1dyYXBwZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNXcmFwcGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25PcHRpb25zQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uSGVhZGVyQ2xpY2sgJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uSGVhZGVyQ2xpY2spO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlckNsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJLZXlEb3duICYmIHRoaXMuaGVhZGVyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uT3B0aW9uc0tleURvd24gJiYgdGhpcy5vcHRpb25zU2Nyb2xsZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25PcHRpb25zS2V5RG93bik7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBXb3JzZVNlbGVjdC5tb3VudGVkSW5zdGFuY2VzLmRlbGV0ZSh0aGlzKTtcbiAgICAgICAgaWYgKFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBXb3JzZVNlbGVjdC5oYW5kbGVEb2N1bWVudFBvaW50ZXJEb3duKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uU2VhcmNoSW5wdXQgJiYgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5vblNlYXJjaElucHV0KTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hJbnB1dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uU2VhcmNoS2V5RG93biAmJiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaCh1bmxpbmtPcHRpb24pO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50Py5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5oZWFkZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNXcmFwcGVyRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vcHRpb25zU2Nyb2xsZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGF0dXNFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMubGFzdFNlYXJjaFN0YXR1c01lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gLS0tIFN0YXRlIHN5bmMgLS0tXG5cbiAgICBzeW5jRGltZW5zaW9ucygpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGNvbmZpZyB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzZWxlY3RFbGVtZW50KTtcblxuICAgICAgICBpZiAoY29tcHV0ZWRTdHlsZS53aWR0aCAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnYXV0bycgJiYgY29tcHV0ZWRTdHlsZS53aWR0aCAhPT0gJzBweCcpIHtcbiAgICAgICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbXB1dGVkU3R5bGUud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkZXJFbGVtZW50LnN0eWxlLmZvbnQgPSBjb21wdXRlZFN0eWxlLmZvbnQ7XG4gICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7Y29uZmlnLmRyb3Bkb3duSGVpZ2h0UHh9cHhgO1xuICAgIH1cblxuICAgIHVwZGF0ZU9wZW5TdGF0ZSgpIHtcbiAgICAgICAgaWYgKCEodGhpcy53b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBpc0xpc3Rib3hNb2RlID0gc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGlzTGlzdGJveE1vZGUgPyB0cnVlIDogdGhpcy5vcGVuO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nLCBpc09wZW4pO1xuICAgICAgICB0aGlzLndvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdsaXN0Ym94JywgaXNMaXN0Ym94TW9kZSk7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ211bHRpcGxlJywgaXNNdWx0aXBsZVNlbGVjdCh0aGlzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgU3RyaW5nKGlzT3BlbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLW11bHRpc2VsZWN0YWJsZScsIFN0cmluZyhpc011bHRpcGxlU2VsZWN0KHRoaXMpKSk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQudGFiSW5kZXggPSBpc09wZW4gPyAwIDogLTE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlclN0YXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbi5zZWxlY3RlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzUGxhY2Vob2xkZXJPcHRpb24oc2VsZWN0T3B0aW9uKSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgZWw/LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc2FibGVkU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHdvcnNlU2VsZWN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQpO1xuXG4gICAgICAgIGlmIChoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGhlYWRlckVsZW1lbnQuZGlzYWJsZWQgPSBzZWxlY3RFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIGVsPy5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIHNlbGVjdE9wdGlvbi5kaXNhYmxlZCk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgU3RyaW5nKHNlbGVjdE9wdGlvbi5kaXNhYmxlZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVIZWFkZXJTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBoZWFkZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShoZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbGFiZWxFbCA9IGhlYWRlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWwnKTtcbiAgICAgICAgaWYgKCEobGFiZWxFbCBpbnN0YW5jZW9mIEhUTUxTcGFuRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkT3B0aW9uc1swXSA/P1xuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5vcHRpb25zW3NlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleF0gPz9cbiAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RlZE9wdGlvbikgJiYgdGhpcy5vcGVuKVxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiBzZWxlY3RlZE9wdGlvbj8udGV4dENvbnRlbnQ/LnRyaW0oKSB8fCAnJztcblxuICAgICAgICBsYWJlbEVsLnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgIGhlYWRlckVsZW1lbnQudGl0bGUgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCA/IGBTZWxlY3RlZDogJHtsYWJlbH1gIDogJ1NlbGVjdCBhbiBvcHRpb24nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pO1xuICAgICAgICBpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkge1xuICAgICAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIGVsLmlkKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LCBhY3RpdmVPcHRpb24gfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoYWN0aXZlT3B0aW9uKSB7XG4gICAgICAgICAgICBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoYWN0aXZlT3B0aW9uKT8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzeW5jQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIHRoaXMuc3luY0RpbWVuc2lvbnMoKTtcbiAgICAgICAgYXBwbHlTZWFyY2hGaWx0ZXIodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gLS0tIE9wZW4gLyBjbG9zZSAtLS1cblxuICAgIG9wZW5Ecm9wZG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RWxlbWVudC5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUodGhpcykpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU9wZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMub3BlbikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoVGVybSA9ICcnO1xuICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlTZWFyY2hGaWx0ZXIodGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRHJvcGRvd24oKSB7XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm9wZW4gPyB0aGlzLmNsb3NlRHJvcGRvd24oKSA6IHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gICAgfVxuXG4gICAgb3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCkge1xuICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHNjcm9sbE9wdGlvbkludG9WaWV3KHRoaXMuYWN0aXZlT3B0aW9uKTtcbiAgICB9XG5cbiAgICBjbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tIE5hdmlnYXRpb24gLS0tXG5cbiAgICBnZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5maWx0ZXIob3B0ID0+IHtcbiAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBnZXRXb3JzZU9wdGlvbkVsZW1lbnQob3B0KSBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCB8IHVuZGVmaW5lZCwgc2Nyb2xsID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHNlbGVjdE9wdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVEZXNjZW5kYW50KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQWN0aXZlT3B0aW9uU3RhdGUoKTtcbiAgICAgICAgaWYgKHNjcm9sbCkgc2Nyb2xsT3B0aW9uSW50b1ZpZXcoc2VsZWN0T3B0aW9uKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlT3B0aW9uKGRlbHRhOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0VmlzaWJsZUVuYWJsZWRPcHRpb25zKCk7XG4gICAgICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuYWN0aXZlT3B0aW9uID8gb3B0aW9ucy5pbmRleE9mKHRoaXMuYWN0aXZlT3B0aW9uKSA6IC0xO1xuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50SW5kZXggPT09IC0xXG4gICAgICAgICAgICA/IChkZWx0YSA+PSAwID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgTWF0aC5taW4ob3B0aW9ucy5sZW5ndGggLSAxLCBjdXJyZW50SW5kZXggKyBkZWx0YSkpO1xuXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbnNbbmV4dEluZGV4XSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZVRvQm91bmRhcnkoYm91bmRhcnk6ICdzdGFydCcgfCAnZW5kJykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKGJvdW5kYXJ5ID09PSAnc3RhcnQnID8gb3B0aW9uc1swXSA6IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUp1bXBTaXplKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBmaXJzdE9wdGlvbiA9IEFycmF5LmZyb20ob3B0aW9uc1Njcm9sbGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yc2Utc2VsZWN0LW9wdGlvbicpKVxuICAgICAgICAgICAgLmZpbmQoZWwgPT4gZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCk7XG4gICAgICAgIGlmICghKGZpcnN0T3B0aW9uIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm4gMTA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSGVpZ2h0ID0gZmlyc3RPcHRpb24ub2Zmc2V0SGVpZ2h0IHx8IDE7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgxLCBNYXRoLmZsb29yKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gb3B0aW9uSGVpZ2h0KSk7XG4gICAgfVxuXG4gICAgbW92ZUFjdGl2ZUJ5UGFnZShkaXJlY3Rpb246IDEgfCAtMSkge1xuICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24odGhpcy5nZXRQYWdlSnVtcFNpemUoKSAqIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgY29tbWl0QWN0aXZlT3B0aW9uU2VsZWN0aW9uKCkge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZU9wdGlvbiwgc2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24gfHwgYWN0aXZlT3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbi5zZWxlY3RlZCA9ICFhY3RpdmVPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdGVkSW5kZXggPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5kZXhPZihhY3RpdmVPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gSW50ZXJuYWwgd2lyaW5nIC0tLVxuXG4gICAgLy8gS2V5Ym9hcmQgY29udHJhY3RzIGZvciBoZWFkZXIsIGxpc3QsIGFuZCBzZWFyY2ggYXJlIGtlcHQgdG9nZXRoZXIgaGVyZSBcdTIwMTQgc3BsaXR0aW5nIHRoZW1cbiAgICAvLyB3b3VsZCBzY2F0dGVyIHJlbGF0ZWQga2V5IGhhbmRsaW5nIGFjcm9zcyBtdWx0aXBsZSBtZXRob2RzLiBJZiB0aGlzIGdyb3dzIHNpZ25pZmljYW50bHksXG4gICAgLy8gY29uc2lkZXIgYnJlYWtpbmcgb3V0IHBlci1jb21wb25lbnQgaGFuZGxlcnMuXG4gICAgcHJpdmF0ZSBiaW5kRXZlbnRzKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgc2VsZWN0RWxlbWVudCwgb3B0aW9uc1dyYXBwZXJFbGVtZW50LCBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LCBoZWFkZXJFbGVtZW50LCBzZWFyY2hJbnB1dEVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNXcmFwcGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNDbGljazogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkVsID0gdGFyZ2V0LmNsb3Nlc3QoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJyk7XG4gICAgICAgICAgICBpZiAoIShvcHRpb25FbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zV3JhcHBlckVsZW1lbnQuY29udGFpbnMob3B0aW9uRWwpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQob3B0aW9uRWwpO1xuICAgICAgICAgICAgaWYgKCFzZWxlY3RPcHRpb24gfHwgc2VsZWN0T3B0aW9uLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHNlbGVjdE9wdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbi5zZWxlY3RlZCA9ICFzZWxlY3RPcHRpb24uc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKHNlbGVjdE9wdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlbGVjdENoYW5nZTogRXZlbnRMaXN0ZW5lciA9ICgpID0+IHRoaXMuc3luY0FsbCgpO1xuICAgICAgICBjb25zdCBvbkhlYWRlckNsaWNrOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy50b2dnbGVEcm9wZG93bigpO1xuXG4gICAgICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCkgOiB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk9wdGlvbnNLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvblNlYXJjaElucHV0OiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGVybSA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIGFwcGx5U2VhcmNoRmlsdGVyKHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VhcmNoS2V5RG93bjogRXZlbnRMaXN0ZW5lciA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlVG9Cb3VuZGFyeSgnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBvcHRpb25zV3JhcHBlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbk9wdGlvbnNDbGljayk7XG4gICAgICAgIHNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xuICAgICAgICBoZWFkZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25IZWFkZXJDbGljayk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uSGVhZGVyS2V5RG93bik7XG4gICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uT3B0aW9uc0tleURvd24pO1xuXG4gICAgICAgIGlmIChzZWFyY2hJbnB1dEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICBzZWFyY2hJbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBvblNlYXJjaElucHV0KTtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25TZWFyY2hLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hJbnB1dCA9IG9uU2VhcmNoSW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm9uU2VhcmNoS2V5RG93biA9IG9uU2VhcmNoS2V5RG93bjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25PcHRpb25zQ2xpY2sgPSBvbk9wdGlvbnNDbGljaztcbiAgICAgICAgdGhpcy5vblNlbGVjdENoYW5nZSA9IG9uU2VsZWN0Q2hhbmdlO1xuICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSBvbkhlYWRlckNsaWNrO1xuICAgICAgICB0aGlzLm9uSGVhZGVyS2V5RG93biA9IG9uSGVhZGVyS2V5RG93bjtcbiAgICAgICAgdGhpcy5vbk9wdGlvbnNLZXlEb3duID0gb25PcHRpb25zS2V5RG93bjtcblxuICAgICAgICB0aGlzLnN5bmNBbGwoKTtcbiAgICB9XG5cbiAgICAvLyBET00gZGlmZmluZyBpcyBrZXB0IGlubGluZSBoZXJlIGJlY2F1c2UgdGhlIG11dGF0aW9uIGNhc2VzIGFyZSB0aWdodGx5IGNvdXBsZWQgdG8gZWFjaFxuICAgIC8vIG90aGVyIGFuZCB0aGUgc2Nyb2xsZXIncyBjaGlsZCBvcmRlci4gSWYgdGhpcyBncm93cyAoZS5nLiBvcHRpb24gZ3JvdXBzLCByZW9yZGVyaW5nXG4gICAgLy8gYW5pbWF0aW9ucyksIGV4dHJhY3QgaW50byBhIGRlZGljYXRlZCByZWNvbmNpbGVyLlxuICAgIHByaXZhdGUgb2JzZXJ2ZU9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0RWxlbWVudCwgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGxldCBzaG91bGRSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlU3RhdGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVidWlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGVTdGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVidWlsZCkge1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ob3B0aW9uc1Njcm9sbGVyRWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGNoaWxkIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmtlZE9wdGlvbiA9IGdldFNlbGVjdE9wdGlvbkVsZW1lbnQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmtlZE9wdGlvbiB8fCAhQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluY2x1ZGVzKGxpbmtlZE9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5rZWRPcHRpb24pIHVubGlua09wdGlvbihsaW5rZWRPcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKChzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbCA9IGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudCh0aGlzLCBzZWxlY3RPcHRpb24sIG9wdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtPcHRpb24oc2VsZWN0T3B0aW9uLCBlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbC5pZCA9IGdldE9wdGlvbklkKHRoaXMsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QXRJbmRleCA9IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuY2hpbGRyZW5bb3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudEF0SW5kZXggIT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50QXRJbmRleCA/IGN1cnJlbnRBdEluZGV4LmJlZm9yZShlbCkgOiBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQgJiYgIWdldFNlbGVjdE9wdGlvbkVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3RFbGVtZW50LCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnLCAnY2xhc3MnLCAnZGlzYWJsZWQnLCAnbXVsdGlwbGUnLCAnc2l6ZSddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uT2JzZXJ2ZXIgPSBvYnNlcnZlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCB3b3JzZVNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKHdvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZnRlcih3b3JzZVNlbGVjdEVsZW1lbnQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBFbmhhbmNlcyBldmVyeSBuYXRpdmUgYDxzZWxlY3Q+YCBlbGVtZW50IGluc2lkZSB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgc2FmZSB0byBjYWxsIG11bHRpcGxlIHRpbWVzLiBFYWNoIGA8c2VsZWN0PmAgaXMgbW91bnRlZCBhdCBtb3N0IG9uY2UuXG4gKiBJZiBgb3B0aW9ucy5vYnNlcnZlYCBpcyB0cnVlLCBuZXdseSBhZGRlZCBzZWxlY3RzIHVuZGVyIHRoZSByb290IGFyZSBlbmhhbmNlZCBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIFJldHVybnMgYSBjbGVhbnVwIGZ1bmN0aW9uIHRoYXQgZGlzY29ubmVjdHMgdGhlIHJvb3Qgb2JzZXJ2ZXIgYW5kIGRlc3Ryb3lzIG1vdW50ZWQgaW5zdGFuY2VzXG4gKiB1bmRlciB0aGUgcHJvdmlkZWQgcm9vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdvcnNlU2VsZWN0KHJvb3Q6IFJvb3ROb2RlID0gZG9jdW1lbnQsIG9wdGlvbnM6IFdvcnNlU2VsZWN0T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gICAgbW91bnRTZWxlY3RzSW5Sb290KHJvb3QpO1xuXG4gICAgbGV0IHJvb3RPYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChvcHRpb25zLm9ic2VydmUpIHtcbiAgICAgICAgcm9vdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25MaXN0ID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbXV0YXRpb24gb2YgbXV0YXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09ICdjaGlsZExpc3QnKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIG11dGF0aW9uLmFkZGVkTm9kZXMuZm9yRWFjaChhZGRlZE5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShhZGRlZE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRlZE5vZGUgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGFkZGVkTm9kZSwgcm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhZGRlZE5vZGUucXVlcnlTZWxlY3RvckFsbDxIVE1MU2VsZWN0RWxlbWVudD4oJ3NlbGVjdCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW91bnRTZWxlY3RFbGVtZW50KGVsLCByb290KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJvb3RPYnNlcnZlci5vYnNlcnZlKHJvb3QsIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHJvb3RPYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuXG4gICAgICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSByZXR1cm47XG4gICAgICAgICAgICBpbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBpbnN0YW5jZXMuZGVsZXRlKHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbnN1cmVTdHlsZXMoKSB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXM9XCJ0cnVlXCJdJykpIHJldHVybjtcblxuICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS13b3JzZS1zZWxlY3Qtc3R5bGVzJywgJ3RydWUnKTtcbiAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjcmVhdGVDU1MoKTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3Q6IFJvb3ROb2RlKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdHNJblJvb3Qocm9vdDogUm9vdE5vZGUpIHtcbiAgICBnZXRTZWxlY3RFbGVtZW50c0luUm9vdChyb290KS5mb3JFYWNoKHNlbGVjdEVsZW1lbnQgPT4gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQsIHJvb3QpKTtcbn1cblxuZnVuY3Rpb24gbW91bnRTZWxlY3RFbGVtZW50KHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCByb290OiBSb290Tm9kZSkge1xuICAgIGlmIChpbnN0YW5jZXMuZ2V0KHNlbGVjdEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBXb3JzZVNlbGVjdChzZWxlY3RFbGVtZW50LCBnZXRDb25maWcoc2VsZWN0RWxlbWVudCksIHJvb3QpO1xuICAgIGluc3RhbmNlLm1vdW50KCk7XG4gICAgaW5zdGFuY2VzLnNldChzZWxlY3RFbGVtZW50LCBpbnN0YW5jZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0dPLElBQU0saUJBQWlCO0FBQUEsRUFDMUIsWUFBWTtBQUFBLEVBQ1osa0JBQWtCO0FBQUEsRUFDbEIsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUNYOzs7QUNITyxTQUFTLFlBQVk7QUFDeEI7QUFBQTtBQUFBLElBQTJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFtQ2QsZUFBZSxLQUFLO0FBQUEsa0JBQ25CLGVBQWUsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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