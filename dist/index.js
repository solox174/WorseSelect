// src/worse-select/internal-types.ts
var DEFAULT_CONFIG = {
  searchable: false,
  dropdownHeightPx: 400,
  height: "32px",
  width: "100%"
};

// src/worse-select/css.ts
function createCSS() {
  return `
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
        outline: 2px solid var(--ws-focus-outline);
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
    `;
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
export {
  worseSelect
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3dvcnNlLXNlbGVjdC9pbnRlcm5hbC10eXBlcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2Nzcy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvbmZpZy50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L3NlbGVjdC1oZWxwZXJzLnRzIiwgIi4uL3NyYy93b3JzZS1zZWxlY3Qvb3B0aW9uLW1hcC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2RvbS50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2ZlYXR1cmVzL3NlYXJjaC50cyIsICIuLi9zcmMvd29yc2Utc2VsZWN0L2NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRyA9IHtcbiAgICBzZWFyY2hhYmxlOiBmYWxzZSxcbiAgICBkcm9wZG93bkhlaWdodFB4OiA0MDAsXG4gICAgaGVpZ2h0OiAnMzJweCcsXG4gICAgd2lkdGg6ICcxMDAlJ1xufTtcblxuLy8gTWFwcyBlYWNoIGNvbmZpZyB2YWx1ZSB0byBpdHMgd2lkZW5lZCBwcmltaXRpdmUgdHlwZSAoZS5nLiB0cnVlIFx1MjE5MiBib29sZWFuKSBzbyB0aGF0XG4vLyBTZWxlY3RDb25maWcgYWNjZXB0cyBhbnkgdmFsaWQgdmFsdWUgb2YgdGhhdCB0eXBlLCBub3QganVzdCB0aGUgc3BlY2lmaWMgZGVmYXVsdCBsaXRlcmFsLlxuZXhwb3J0IHR5cGUgV2lkZW48VD4gPSBUIGV4dGVuZHMgYm9vbGVhbiA/IGJvb2xlYW4gOiBUIGV4dGVuZHMgc3RyaW5nID8gc3RyaW5nIDogVCBleHRlbmRzIG51bWJlciA/IG51bWJlciA6IFQ7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdENvbmZpZyA9IHtcbiAgICBbSyBpbiBrZXlvZiB0eXBlb2YgREVGQVVMVF9DT05GSUddOiBXaWRlbjwodHlwZW9mIERFRkFVTFRfQ09ORklHKVtLXT5cbn07XG5cbmV4cG9ydCB0eXBlIENvbmZpZ0tleSA9IGtleW9mIFNlbGVjdENvbmZpZztcbmV4cG9ydCB0eXBlIFJvb3ROb2RlID0gUGFyZW50Tm9kZTtcblxuZXhwb3J0IHR5cGUgV29yc2VTZWxlY3RPcHRpb25zID0ge1xuICAgIG9ic2VydmU/OiBib29sZWFuO1xufTtcblxuLy8gTWluaW1hbCBpbnRlcmZhY2UgZXhwb3NlZCB0byBkb20udHMgYW5kIHNlbGVjdC1oZWxwZXJzLnRzLiBSZXN0cmljdHMgdGhvc2UgbW9kdWxlcyB0byB0aGVcbi8vIHByb3BlcnRpZXMgdGhleSBhY3R1YWxseSBuZWVkLCBrZWVwaW5nIHRoZSBmdWxsIFdvcnNlU2VsZWN0IGNsYXNzIGludGVybmFsIHRvIGNvcmUudHMuXG5leHBvcnQgaW50ZXJmYWNlIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xufVxuXG4vLyBJbnRlcmZhY2UgZm9yIHNlYXJjaC50cy4gQ29udGFpbnMgb25seSB0aGUgZmllbGRzIHRoZSBzZWFyY2ggZmVhdHVyZSByZWFkcyBhbmQgd3JpdGVzLlxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hDb250ZXh0IHtcbiAgICBzZWxlY3RFbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgc3RhdHVzRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIHNlYXJjaFRlcm06IHN0cmluZztcbiAgICBsYXN0U2VhcmNoU3RhdHVzTWVzc2FnZTogc3RyaW5nO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRyB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTKCkge1xuICAgIHJldHVybiAgYFxuICAgIDpyb290IHtcbiAgICAgICAgLS13cy1ib3JkZXItY29sb3I6ICM3Njc2NzY7XG4gICAgICAgIC0td3MtYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAtLXdzLWJnOiAjZmZmO1xuICAgICAgICAtLXdzLXRleHQtY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtYmc6ICNmMGYwZjA7XG4gICAgICAgIC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcjogIzZkNmQ2ZDtcbiAgICAgICAgLS13cy1ob3Zlci1iZzogI2YxZjFmMTtcbiAgICAgICAgLS13cy1hY3RpdmUtYmc6ICNlZWY0ZmY7XG4gICAgICAgIC0td3MtYWN0aXZlLW91dGxpbmU6ICMyNTYzZWI7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtYmc6ICNkMmUzZmM7XG4gICAgICAgIC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcjogIzE3NGVhNjtcbiAgICAgICAgLS13cy1mb2N1cy1vdXRsaW5lOiAjMjU2M2ViO1xuICAgICAgICAtLXdzLXNlYXJjaC1ib3JkZXItY29sb3I6ICNiN2I3Yjc7XG4gICAgICAgIC0td3MtZGl2aWRlci1jb2xvcjogI2QwZDBkMDtcbiAgICAgICAgLS13cy1oaWdobGlnaHQtYmc6ICNmZmYzYTM7XG4gICAgICAgIC0td3Mtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xNik7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3gge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWhlYWRlciB7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIHdpZHRoOiAke0RFRkFVTFRfQ09ORklHLndpZHRofTtcbiAgICAgICAgaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmhlaWdodH07XG4gICAgICAgIHBhZGRpbmc6IDAgMjhweCAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3MtYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0td3MtYm9yZGVyLXJhZGl1cyk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXdzLWJnKTtcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgOHB4IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAxMHB4IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIHZpZXdCb3g9JzAgMCAxMiAxMicgZmlsbD0nbm9uZSclM0UlM0NwYXRoIGQ9J00zIDQuNUw2IDcuNUw5IDQuNScgc3Ryb2tlPSclMjMzMzMzMzMnIHN0cm9rZS13aWR0aD0nMS4xJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnLyUzRSUzQy9zdmclM0VcIik7XG4gICAgICAgIGNvbG9yOiB2YXIoLS13cy10ZXh0LWNvbG9yKTtcbiAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLm9wZW4gLndvcnNlLXNlbGVjdC1oZWFkZXIge1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEyJyBoZWlnaHQ9JzEyJyB2aWV3Qm94PScwIDAgMTIgMTInIGZpbGw9J25vbmUnJTNFJTNDcGF0aCBkPSdNMyA3LjVMNiA0LjVMOSA3LjUnIHN0cm9rZT0nJTIzMzMzMzMzJyBzdHJva2Utd2lkdGg9JzEuMScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJy8lM0UlM0Mvc3ZnJTNFXCIpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmRpc2FibGVkIC53b3JzZS1zZWxlY3QtaGVhZGVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyOmZvY3VzLXZpc2libGUge1xuICAgICAgICBvdXRsaW5lOiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuICAgIFxuICAgIC53b3JzZS1zZWxlY3QtaGVhZGVyOmZvY3VzLXZpc2libGUsXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQ6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS13cy1mb2N1cy1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IDFweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogY2FsYygxMDAlICsgMnB4KTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXdzLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1iZyk7XG4gICAgICAgIGJveC1zaGFkb3c6IHZhcigtLXdzLXNoYWRvdyk7XG4gICAgICAgIHBhZGRpbmc6IDJweDtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LWNvbnRhaW5lci5vcGVuIC53b3JzZS1zZWxlY3Qtb3B0aW9ucyB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtY29udGFpbmVyLmxpc3Rib3ggLndvcnNlLXNlbGVjdC1vcHRpb25zIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LXNlYXJjaCB7XG4gICAgICAgIHBhZGRpbmc6IDRweDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXdzLWRpdmlkZXItY29sb3IpO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1zZWFyY2gtaW5wdXQge1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICBwYWRkaW5nOiAwIDhweDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0td3Mtc2VhcmNoLWJvcmRlci1jb2xvcik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXdzLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICBmb250OiBpbmhlcml0O1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtdGV4dC1jb2xvcik7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWJnKTtcbiAgICB9XG5cbiAgICAud29yc2Utc2VsZWN0LW9wdGlvbnMtc2Nyb2xsZXIge1xuICAgICAgICBtYXgtaGVpZ2h0OiAke0RFRkFVTFRfQ09ORklHLmRyb3Bkb3duSGVpZ2h0UHh9cHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24ge1xuICAgICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS13cy1ib3JkZXItcmFkaXVzKTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgY29sb3I6IHZhcigtLXdzLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3MtaG92ZXItYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWFjdGl2ZS1iZyk7XG4gICAgICAgIG91dGxpbmU6IDFweCBzb2xpZCB2YXIoLS13cy1hY3RpdmUtb3V0bGluZSk7XG4gICAgICAgIG91dGxpbmUtb2Zmc2V0OiAtMXB4O1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLnNlbGVjdGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td3Mtc2VsZWN0ZWQtYmcpO1xuICAgICAgICBjb2xvcjogdmFyKC0td3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcik7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uc2VsZWN0ZWQuYWN0aXZlIHtcbiAgICAgICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLXdzLWFjdGl2ZS1vdXRsaW5lKTtcbiAgICAgICAgb3V0bGluZS1vZmZzZXQ6IC0xcHg7XG4gICAgfVxuXG4gICAgLndvcnNlLXNlbGVjdC1vcHRpb24uZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogdmFyKC0td3MtZGlzYWJsZWQtdGV4dC1jb2xvcik7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdzLWRpc2FibGVkLWJnKTtcbiAgICB9XG5cblxuICAgIC53b3JzZS1zZWxlY3Qtb3B0aW9uLmhpZGRlbiB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLm1hdGNoZXMge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13cy1oaWdobGlnaHQtYmcpO1xuICAgIH1cblxuICAgIC53b3JzZS1zZWxlY3QtdmlzdWFsbHktaGlkZGVuIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMXB4O1xuICAgICAgICBoZWlnaHQ6IDFweDtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgbWFyZ2luOiAtMXB4O1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBjbGlwOiByZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICBib3JkZXI6IDA7XG4gICAgfVxuICAgIGA7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtDb25maWdLZXksIERFRkFVTFRfQ09ORklHLCBTZWxlY3RDb25maWd9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmNvbnN0IGNvbmZpZ0tleXMgPSBPYmplY3Qua2V5cyhERUZBVUxUX0NPTkZJRykgYXMgQ29uZmlnS2V5W107XG5cbmZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW0EtWl0vZywgY2hhcmFjdGVyID0+IGAtJHtjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKX1gKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb25maWdWYWx1ZTxLIGV4dGVuZHMgQ29uZmlnS2V5PihrZXk6IEssIGF0dHI6IHN0cmluZyk6IFNlbGVjdENvbmZpZ1tLXSB7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gREVGQVVMVF9DT05GSUdba2V5XTtcblxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIChhdHRyID09PSAndHJ1ZScpIGFzIFNlbGVjdENvbmZpZ1tLXTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihhdHRyKSBhcyBTZWxlY3RDb25maWdbS107XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHIgYXMgU2VsZWN0Q29uZmlnW0tdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnKHNlbGVjdEVsZW1lbnQ6IEVsZW1lbnQpOiBTZWxlY3RDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZzogU2VsZWN0Q29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWdLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbmZpZ0tleXNbaV07XG4gICAgICAgIGNvbnN0IGRhdGFBdHRyaWJ1dGVOYW1lID0gYGRhdGEtJHt0b0tlYmFiQ2FzZShrZXkpfWA7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBzZWxlY3RFbGVtZW50LmdldEF0dHJpYnV0ZShkYXRhQXR0cmlidXRlTmFtZSk7XG5cbiAgICAgICAgaWYgKGF0dHIgPT09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIChjb25maWcgYXMgUmVjb3JkPENvbmZpZ0tleSwgc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlcj4pW2tleV0gPSBwYXJzZUNvbmZpZ1ZhbHVlKGtleSwgYXR0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuaW1wb3J0IHtXb3JzZVNlbGVjdENvbnRleHR9IGZyb20gXCIuL2ludGVybmFsLXR5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRVc2VMaXN0Ym94TW9kZSh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50LnNpemUgPiAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICByZXR1cm4gd29yc2VTZWxlY3RJbnN0YW5jZS5zZWxlY3RFbGVtZW50Lm11bHRpcGxlO1xufVxuXG4vLyBNYXRjaGVzIHRoZSBjb252ZW50aW9uYWwgSFRNTCBwbGFjZWhvbGRlciBwYXR0ZXJuOiA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQ+TGFiZWw8L29wdGlvbj4uXG4vLyBPcHRpb25zIHRoYXQgYXJlIG5vdCBkaXNhYmxlZCBvciBoYXZlIGEgbm9uLWVtcHR5IHZhbHVlIGFyZSB0cmVhdGVkIGFzIHNlbGVjdGFibGUuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWxlY3RPcHRpb24gIT09IG51bGwgJiYgc2VsZWN0T3B0aW9uLnZhbHVlID09PSAnJyAmJiBzZWxlY3RPcHRpb24uZGlzYWJsZWQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbi8vIFR3byBXZWFrTWFwcyBtYWludGFpbiBhIGJpZGlyZWN0aW9uYWwgbGluayBiZXR3ZWVuIG5hdGl2ZSA8b3B0aW9uPiBlbGVtZW50cyBhbmQgdGhlaXJcbi8vIHJlbmRlcmVkIHdpZGdldCBkaXZzLiBXZWFrTWFwIGtleXMgYWxsb3cgR0MgdG8gcmVjbGFpbSBlbGVtZW50cyByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gd2l0aG91dCByZXF1aXJpbmcgZXhwbGljaXQgY2xlYW51cCBvbiBldmVyeSByZW1vdmFsIHBhdGguXG5jb25zdCBvcHRpb25Ub0RpdiA9IG5ldyBXZWFrTWFwPEhUTUxPcHRpb25FbGVtZW50LCBIVE1MRGl2RWxlbWVudD4oKTtcbmNvbnN0IGRpdlRvT3B0aW9uID0gbmV3IFdlYWtNYXA8SFRNTERpdkVsZW1lbnQsIEhUTUxPcHRpb25FbGVtZW50PigpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsIHdvcnNlT3B0aW9uRWxlbWVudDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBvcHRpb25Ub0Rpdi5zZXQoc2VsZWN0T3B0aW9uLCB3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIGRpdlRvT3B0aW9uLnNldCh3b3JzZU9wdGlvbkVsZW1lbnQsIHNlbGVjdE9wdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmxpbmtPcHRpb24oc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCkge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uRWxlbWVudCA9IG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghd29yc2VPcHRpb25FbGVtZW50KSByZXR1cm47XG5cbiAgICBvcHRpb25Ub0Rpdi5kZWxldGUoc2VsZWN0T3B0aW9uKTtcbiAgICBkaXZUb09wdGlvbi5kZWxldGUod29yc2VPcHRpb25FbGVtZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgcmV0dXJuIG9wdGlvblRvRGl2LmdldChzZWxlY3RPcHRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCh3b3JzZU9wdGlvbkVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgcmV0dXJuIGRpdlRvT3B0aW9uLmdldCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xufSIsICIvLyBDb3B5cmlnaHQgKGMpIDIwMjYgS2V2aW4gTWF0dGhld3Ncbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBMR1BMLTMuMC1vci1sYXRlclxuXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgV29yc2VTZWxlY3RDb250ZXh0IH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgeyBpc011bHRpcGxlU2VsZWN0LCBzaG91bGRVc2VMaXN0Ym94TW9kZSB9IGZyb20gJy4vc2VsZWN0LWhlbHBlcnMnO1xuaW1wb3J0IHsgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uIH0gZnJvbSAnLi9vcHRpb24tbWFwJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbE9wdGlvbkludG9WaWV3KHNlbGVjdE9wdGlvbj86IEhUTUxPcHRpb25FbGVtZW50KSB7XG4gICAgaWYgKCFzZWxlY3RPcHRpb24pIHJldHVybjtcbiAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoc3R5bGVQYXJ0czogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gc3R5bGVQYXJ0cy5sZW5ndGggPiAwID8gYCBzdHlsZT1cIiR7c3R5bGVQYXJ0cy5qb2luKCcgJyl9XCJgIDogJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFdvcnNlU2VsZWN0SGVhZGVyU3R5bGVBdHRyaWJ1dGUod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgY29uc3QgaGVhZGVyU3R5bGVQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmICh3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aCAhPT0gREVGQVVMVF9DT05GSUcud2lkdGgpIHtcbiAgICAgICAgaGVhZGVyU3R5bGVQYXJ0cy5wdXNoKGB3aWR0aDogJHt3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy53aWR0aH07YCk7XG4gICAgfVxuXG4gICAgaWYgKHdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodCAhPT0gREVGQVVMVF9DT05GSUcuaGVpZ2h0KSB7XG4gICAgICAgIGhlYWRlclN0eWxlUGFydHMucHVzaChgaGVpZ2h0OiAke3dvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLmhlaWdodH07YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkU3R5bGVBdHRyaWJ1dGUoaGVhZGVyU3R5bGVQYXJ0cyk7XG59XG5cblxuZnVuY3Rpb24gZXNjYXBlSHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gICAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW9uSWQod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LCBvcHRpb25JbmRleDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIGAke3dvcnNlU2VsZWN0SW5zdGFuY2UuaW5zdGFuY2VJZH0tb3B0aW9uLSR7b3B0aW9uSW5kZXh9YDtcbn1cblxuZnVuY3Rpb24gZ2V0V29yc2VPcHRpb25DbGFzc2VzKHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gWyd3b3JzZS1zZWxlY3Qtb3B0aW9uJ107XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnc2VsZWN0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZU9wdGlvbkh0bWwoXG4gICAgd29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0LFxuICAgIHNlbGVjdE9wdGlvbjogSFRNTE9wdGlvbkVsZW1lbnQsXG4gICAgb3B0aW9uSW5kZXg6IG51bWJlcixcbikge1xuICAgIGNvbnN0IHdvcnNlT3B0aW9uQ2xhc3NlcyA9IGdldFdvcnNlT3B0aW9uQ2xhc3NlcyhzZWxlY3RPcHRpb24pO1xuICAgIGNvbnN0IG9wdGlvblRleHQgPSBzZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPz8gJyc7XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgaWQ9XCIke2dldE9wdGlvbklkKHdvcnNlU2VsZWN0SW5zdGFuY2UsIG9wdGlvbkluZGV4KX1cIlxuICAgICAgICAgY2xhc3M9XCIke3dvcnNlT3B0aW9uQ2xhc3Nlc31cIlxuICAgICAgICAgZGF0YS12YWx1ZT1cIiR7ZXNjYXBlSHRtbChzZWxlY3RPcHRpb24udmFsdWUpfVwiXG4gICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9XCIke3NlbGVjdE9wdGlvbi5zZWxlY3RlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCJcbiAgICAgICAgIGFyaWEtZGlzYWJsZWQ9XCIke3NlbGVjdE9wdGlvbi5kaXNhYmxlZCA/ICd0cnVlJyA6ICdmYWxzZSd9XCI+XG4gICAgICAke2VzY2FwZUh0bWwob3B0aW9uVGV4dCl9XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcnNlT3B0aW9uRWxlbWVudChcbiAgICB3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQsXG4gICAgc2VsZWN0T3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcbiAgICBvcHRpb25JbmRleDogbnVtYmVyLFxuKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KFxuICAgICAgICBjcmVhdGVXb3JzZU9wdGlvbkh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSwgc2VsZWN0T3B0aW9uLCBvcHRpb25JbmRleClcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxEaXZFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VhcmNoSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBpZiAoIXdvcnNlU2VsZWN0SW5zdGFuY2UuY29uZmlnLnNlYXJjaGFibGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1zZWFyY2hcIj5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0XCJcbiAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBsaXN0XCJcbiAgICAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTZWFyY2ggb3B0aW9uc1wiIC8+XG4gICAgPC9kaXY+XG4gICAgYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0YXR1c0h0bWwod29yc2VTZWxlY3RJbnN0YW5jZTogV29yc2VTZWxlY3RDb250ZXh0KSB7XG4gICAgaWYgKCF3b3JzZVNlbGVjdEluc3RhbmNlLmNvbmZpZy5zZWFyY2hhYmxlKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtc3RhdHVzIHdvcnNlLXNlbGVjdC12aXN1YWxseS1oaWRkZW5cIiBcbiAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuICAgIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JzZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlOiBXb3JzZVNlbGVjdENvbnRleHQpIHtcbiAgICBjb25zdCBoZWFkZXJTdHlsZUF0dHJpYnV0ZSA9IGJ1aWxkV29yc2VTZWxlY3RIZWFkZXJTdHlsZUF0dHJpYnV0ZSh3b3JzZVNlbGVjdEluc3RhbmNlKTtcbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gWyd3b3JzZS1zZWxlY3QtY29udGFpbmVyJ107XG5cbiAgICBpZiAoc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdsaXN0Ym94Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzTXVsdGlwbGVTZWxlY3Qod29yc2VTZWxlY3RJbnN0YW5jZSkpIHtcbiAgICAgICAgY29udGFpbmVyQ2xhc3Nlcy5wdXNoKCdtdWx0aXBsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGh0bWxTdHJpbmcgPSBgXG4gICAgPGRpdiBjbGFzcz1cIiR7Y29udGFpbmVyQ2xhc3Nlcy5qb2luKCcgJyl9XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXJcIlxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIndvcnNlLXNlbGVjdC1oZWFkZXItbGFiZWxcIj48L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3b3JzZS1zZWxlY3Qtb3B0aW9uc1wiPlxuICAgICAgICAke2NyZWF0ZVNlYXJjaEh0bWwod29yc2VTZWxlY3RJbnN0YW5jZSl9XG4gICAgICAgICR7Y3JlYXRlU3RhdHVzSHRtbCh3b3JzZVNlbGVjdEluc3RhbmNlKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cIndvcnNlLXNlbGVjdC1vcHRpb25zLXNjcm9sbGVyXCIke2hlYWRlclN0eWxlQXR0cmlidXRlfT48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICBjb25zdCB3b3JzZVNlbGVjdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChcbiAgICAgICAgaHRtbFN0cmluZ1xuICAgICkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBjb25zdCBvcHRpb25zU2Nyb2xsZXJFbGVtZW50ID0gd29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2xpc3Rib3gnKTtcbiAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnRhYkluZGV4ID0gc2hvdWxkVXNlTGlzdGJveE1vZGUod29yc2VTZWxlY3RJbnN0YW5jZSkgPyAwIDogLTE7XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCh3b3JzZVNlbGVjdEluc3RhbmNlKSkge1xuICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBBcnJheS5mcm9tKHdvcnNlU2VsZWN0SW5zdGFuY2Uuc2VsZWN0RWxlbWVudC5vcHRpb25zKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWxlY3RPcHRpb24gPSBzZWxlY3RPcHRpb25zW2ldO1xuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBjcmVhdGVXb3JzZU9wdGlvbkVsZW1lbnQoXG4gICAgICAgICAgICB3b3JzZVNlbGVjdEluc3RhbmNlLFxuICAgICAgICAgICAgc2VsZWN0T3B0aW9uLFxuICAgICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICBsaW5rT3B0aW9uKHNlbGVjdE9wdGlvbiwgd29yc2VPcHRpb25FbGVtZW50KTtcbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5hcHBlbmRDaGlsZCh3b3JzZU9wdGlvbkVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB3b3JzZVNlbGVjdEVsZW1lbnQ7XG59IiwgIi8vIENvcHlyaWdodCAoYykgMjAyNiBLZXZpbiBNYXR0aGV3c1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IExHUEwtMy4wLW9yLWxhdGVyXG5cbmltcG9ydCB7IGdldFdvcnNlT3B0aW9uRWxlbWVudCB9IGZyb20gJy4uL29wdGlvbi1tYXAnO1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hDb250ZXh0IH0gZnJvbSAnLi4vaW50ZXJuYWwtdHlwZXMnO1xuXG5mdW5jdGlvbiBzY3JvbGxGaXJzdFZpc2libGVNYXRjaEludG9WaWV3KGNvbnRleHQ6IFNlYXJjaENvbnRleHQpIHtcbiAgICBjb25zdCB7IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgfSA9IGNvbnRleHQ7XG4gICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgY29uc3QgZmlyc3RNYXRjaCA9IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb24ubWF0Y2hlcycpO1xuICAgIGlmICghKGZpcnN0TWF0Y2ggaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgIGZpcnN0TWF0Y2guc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTZWFyY2hTdGF0dXMoY29udGV4dDogU2VhcmNoQ29udGV4dCkge1xuICAgIGNvbnN0IHsgc3RhdHVzRWxlbWVudCwgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCB9ID0gY29udGV4dDtcbiAgICBpZiAoIShzdGF0dXNFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IGNvbnRleHQuc2VhcmNoVGVybS50cmltKCk7XG5cbiAgICBpZiAoIXNlYXJjaFRlcm0pIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBjb250ZXh0Lmxhc3RTZWFyY2hTdGF0dXNNZXNzYWdlID0gJyc7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2aXNpYmxlUmVzdWx0Q291bnQgPSBBcnJheS5mcm9tKFxuICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uLm1hdGNoZXMnKVxuICAgICkubGVuZ3RoO1xuXG4gICAgY29uc3QgbmV4dE1lc3NhZ2UgPVxuICAgICAgICB2aXNpYmxlUmVzdWx0Q291bnQgPT09IDAgPyAnTm8gcmVzdWx0cyBmb3VuZCcgOlxuICAgICAgICB2aXNpYmxlUmVzdWx0Q291bnQgPT09IDEgPyAnMSByZXN1bHQgYXZhaWxhYmxlJyA6XG4gICAgICAgIGAke3Zpc2libGVSZXN1bHRDb3VudH0gcmVzdWx0cyBhdmFpbGFibGVgO1xuXG4gICAgaWYgKG5leHRNZXNzYWdlID09PSBjb250ZXh0Lmxhc3RTZWFyY2hTdGF0dXNNZXNzYWdlKSByZXR1cm47XG5cbiAgICBjb250ZXh0Lmxhc3RTZWFyY2hTdGF0dXNNZXNzYWdlID0gbmV4dE1lc3NhZ2U7XG4gICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgLy8gRGVmZXIgdGhlIHVwZGF0ZSBieSBvbmUgdGljayBzbyBzY3JlZW4gcmVhZGVycyBhbm5vdW5jZSBhIGNoYW5nZSBldmVuIHdoZW4gdGhlXG4gICAgLy8gbWVzc2FnZSB0ZXh0IGhhcHBlbnMgdG8gYmUgdGhlIHNhbWUgc3RyaW5nIGFzIHRoZSBwcmV2aW91cyBhbm5vdW5jZW1lbnQuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY29udGV4dC5zdGF0dXNFbGVtZW50ID09PSBzdGF0dXNFbGVtZW50KSB7XG4gICAgICAgICAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbmV4dE1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9LCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5U2VhcmNoRmlsdGVyKGNvbnRleHQ6IFNlYXJjaENvbnRleHQpIHtcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gY29udGV4dC5zZWFyY2hUZXJtLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgQXJyYXkuZnJvbShjb250ZXh0LnNlbGVjdEVsZW1lbnQub3B0aW9ucykuZm9yRWFjaChzZWxlY3RPcHRpb24gPT4ge1xuICAgICAgICBjb25zdCB3b3JzZU9wdGlvbkVsZW1lbnQgPSBnZXRXb3JzZU9wdGlvbkVsZW1lbnQoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgaWYgKCEod29yc2VPcHRpb25FbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHNlYXJjaFRlcm0gIT09ICcnICYmIHdvcnNlT3B0aW9uRWxlbWVudC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pO1xuICAgICAgICB3b3JzZU9wdGlvbkVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbWF0Y2hlcycsIG1hdGNoZXMpO1xuICAgIH0pO1xuXG4gICAgdXBkYXRlU2VhcmNoU3RhdHVzKGNvbnRleHQpO1xuICAgIHNjcm9sbEZpcnN0VmlzaWJsZU1hdGNoSW50b1ZpZXcoY29udGV4dCk7XG59XG4iLCAiLy8gQ29weXJpZ2h0IChjKSAyMDI2IEtldmluIE1hdHRoZXdzXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogTEdQTC0zLjAtb3ItbGF0ZXJcblxuLyoqXG4gKiBQcm9ncmVzc2l2ZS1lbmhhbmNlbWVudCB1dGlsaXRpZXMgZm9yIG5hdGl2ZSB7QGxpbmsgSFRNTFNlbGVjdEVsZW1lbnR9IGNvbnRyb2xzLlxuICpcbiAqIEtlZXBzIHRoZSBuYXRpdmUgYDxzZWxlY3Q+YCBhcyBzb3VyY2Ugb2YgdHJ1dGggZm9yIHZhbHVlLCBkaXNhYmxlZCBzdGF0ZSwgYHNpemVgLCBhbmRcbiAqIGBtdWx0aXBsZWAsIHdoaWxlIG1pcnJvcmluZyB0aGF0IHN0YXRlIGludG8gYSBjdXN0b20gRE9NIHN0cnVjdHVyZSB0aGF0IGlzIGVhc2llciB0byBzdHlsZS5cbiAqXG4gKiBXaWRnZXQtc3BlY2lmaWMgYmVoYXZpb3IgdXNlcyBgZGF0YS0qYCBhdHRyaWJ1dGVzIHN1Y2ggYXMgYGRhdGEtc2VhcmNoYWJsZWAgYW5kXG4gKiBgZGF0YS1kcm9wZG93bi1oZWlnaHQtcHhgLCBrZWVwaW5nIHRoZSBwdWJsaWMgQVBJIGFsaWduZWQgd2l0aCBzdGFuZGFyZCBIVE1MLlxuICovXG5pbXBvcnQgeyBERUZBVUxUX0NPTkZJRywgU2VsZWN0Q29uZmlnLCBSb290Tm9kZSwgV29yc2VTZWxlY3RPcHRpb25zIH0gZnJvbSAnLi9pbnRlcm5hbC10eXBlcyc7XG5pbXBvcnQgdHlwZSB7IFdvcnNlU2VsZWN0Q29udGV4dCB9IGZyb20gJy4vaW50ZXJuYWwtdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlQ1NTIH0gZnJvbSAnLi9jc3MnO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgY3JlYXRlV29yc2VPcHRpb25FbGVtZW50LCBjcmVhdGVXb3JzZVNlbGVjdCwgZ2V0T3B0aW9uSWQsIHNjcm9sbE9wdGlvbkludG9WaWV3IH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgZ2V0U2VsZWN0T3B0aW9uRWxlbWVudCwgZ2V0V29yc2VPcHRpb25FbGVtZW50LCBsaW5rT3B0aW9uLCB1bmxpbmtPcHRpb24gfSBmcm9tICcuL29wdGlvbi1tYXAnO1xuaW1wb3J0IHsgaXNQbGFjZWhvbGRlck9wdGlvbiwgc2hvdWxkVXNlTGlzdGJveE1vZGUsIGlzTXVsdGlwbGVTZWxlY3QgfSBmcm9tICcuL3NlbGVjdC1oZWxwZXJzJztcbmltcG9ydCB7IGFwcGx5U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9mZWF0dXJlcy9zZWFyY2gnO1xuXG5jb25zdCBpbnN0YW5jZXMgPSBuZXcgV2Vha01hcDxIVE1MU2VsZWN0RWxlbWVudCwgV29yc2VTZWxlY3Q+KCk7XG5sZXQgbmV4dEluc3RhbmNlSWQgPSAwO1xuXG5jbGFzcyBXb3JzZVNlbGVjdCBpbXBsZW1lbnRzIFdvcnNlU2VsZWN0Q29udGV4dCB7XG4gICAgLy8gVHJhY2tzIGFsbCBtb3VudGVkIGluc3RhbmNlcyBzbyBhIHNpbmdsZSBkb2N1bWVudC1sZXZlbCBwb2ludGVyZG93biBsaXN0ZW5lciBjYW4gY2xvc2UgYW55XG4gICAgLy8gb3BlbiBkcm9wZG93biB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlLCBpbnN0ZWFkIG9mIHJlZ2lzdGVyaW5nIG9uZSBsaXN0ZW5lciBwZXIgaW5zdGFuY2UuXG4gICAgLy8gTm90ZTogYHByaXZhdGVgIGlzIGEgVHlwZVNjcmlwdC1vbmx5IGNvbnN0cmFpbnQgYW5kIGlzIG5vdCBlbmZvcmNlZCBpbiB0aGUgY29tcGlsZWQgb3V0cHV0LlxuICAgIHByaXZhdGUgc3RhdGljIG1vdW50ZWRJbnN0YW5jZXMgPSBuZXcgU2V0PFdvcnNlU2VsZWN0PigpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaGFuZGxlRG9jdW1lbnRQb2ludGVyRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgcmV0dXJuO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3RhbmNlIG9mIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgIGlmIChpbnN0YW5jZS53b3JzZVNlbGVjdEVsZW1lbnQgJiYgIWluc3RhbmNlLndvcnNlU2VsZWN0RWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgY29uZmlnOiBTZWxlY3RDb25maWc7XG4gICAgcm9vdDogUm9vdE5vZGU7XG4gICAgaW5zdGFuY2VJZDogc3RyaW5nO1xuXG4gICAgd29yc2VTZWxlY3RFbGVtZW50PzogSFRNTERpdkVsZW1lbnQ7XG4gICAgaGVhZGVyRWxlbWVudD86IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIG9wdGlvbnNXcmFwcGVyRWxlbWVudD86IEhUTUxEaXZFbGVtZW50O1xuICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBzZWFyY2hJbnB1dEVsZW1lbnQ/OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHN0YXR1c0VsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgICBvcHRpb25PYnNlcnZlcj86IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgICBvblNlbGVjdENoYW5nZT86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyQ2xpY2s/OiBFdmVudExpc3RlbmVyO1xuICAgIG9uSGVhZGVyS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25PcHRpb25zS2V5RG93bj86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25TZWFyY2hJbnB1dD86IEV2ZW50TGlzdGVuZXI7XG4gICAgb25TZWFyY2hLZXlEb3duPzogRXZlbnRMaXN0ZW5lcjtcblxuICAgIG9wZW4gPSBmYWxzZTtcbiAgICBzZWFyY2hUZXJtID0gJyc7XG4gICAgbGFzdFNlYXJjaFN0YXR1c01lc3NhZ2UgPSAnJztcbiAgICBhY3RpdmVPcHRpb24/OiBIVE1MT3B0aW9uRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50LCBjb25maWc6IFBhcnRpYWw8U2VsZWN0Q29uZmlnPiA9IHt9LCByb290OiBSb290Tm9kZSA9IGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCA9IHNlbGVjdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuY29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRywgLi4uY29uZmlnIH07XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJZCA9IGB3cy0keysrbmV4dEluc3RhbmNlSWR9YDtcbiAgICB9XG5cbiAgICAvLyAtLS0gTGlmZWN5Y2xlIC0tLVxuXG4gICAgbW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCkgcmV0dXJuO1xuXG4gICAgICAgIGVuc3VyZVN0eWxlcygpO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gY3JlYXRlV29yc2VTZWxlY3QodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3QtaGVhZGVyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc1dyYXBwZXJFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1vcHRpb25zJykgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc1Njcm9sbGVyRWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtb3B0aW9ucy1zY3JvbGxlcicpIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudCA9IHRoaXMud29yc2VTZWxlY3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b3JzZS1zZWxlY3Qtc2VhcmNoLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zdGF0dXNFbGVtZW50ID0gdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLndvcnNlLXNlbGVjdC1zdGF0dXMnKSBhcyBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuYWRkKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLm9ic2VydmVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLm9wdGlvbk9ic2VydmVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLm9uU2VsZWN0Q2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vblNlbGVjdENoYW5nZSk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zQ2xpY2sgJiYgdGhpcy5vcHRpb25zV3JhcHBlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1dyYXBwZXJFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbk9wdGlvbnNDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uc0NsaWNrID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25IZWFkZXJDbGljayAmJiB0aGlzLmhlYWRlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25IZWFkZXJDbGljayk7XG4gICAgICAgICAgICB0aGlzLm9uSGVhZGVyQ2xpY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vbkhlYWRlcktleURvd24gJiYgdGhpcy5oZWFkZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25PcHRpb25zS2V5RG93biAmJiB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1Njcm9sbGVyRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbk9wdGlvbnNLZXlEb3duKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25zS2V5RG93biA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIFdvcnNlU2VsZWN0Lm1vdW50ZWRJbnN0YW5jZXMuZGVsZXRlKHRoaXMpO1xuICAgICAgICBpZiAoV29yc2VTZWxlY3QubW91bnRlZEluc3RhbmNlcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIFdvcnNlU2VsZWN0LmhhbmRsZURvY3VtZW50UG9pbnRlckRvd24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWFyY2hJbnB1dCAmJiB0aGlzLnNlYXJjaElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLm9uU2VhcmNoSW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaElucHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub25TZWFyY2hLZXlEb3duICYmIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaEtleURvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBBcnJheS5mcm9tKHRoaXMuc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHVubGlua09wdGlvbik7XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQ/LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmhlYWRlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3B0aW9uc1dyYXBwZXJFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9wdGlvbnNTY3JvbGxlckVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnN0YXR1c0VsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0gPSAnJztcbiAgICAgICAgdGhpcy5sYXN0U2VhcmNoU3RhdHVzTWVzc2FnZSA9ICcnO1xuICAgICAgICB0aGlzLmFjdGl2ZU9wdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyAtLS0gU3RhdGUgc3luYyAtLS1cblxuICAgIHN5bmNEaW1lbnNpb25zKCkge1xuICAgICAgICBjb25zdCB7IHdvcnNlU2VsZWN0RWxlbWVudCwgaGVhZGVyRWxlbWVudCwgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCwgc2VsZWN0RWxlbWVudCwgY29uZmlnIH0gPSB0aGlzO1xuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHNlbGVjdEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChjb21wdXRlZFN0eWxlLndpZHRoICYmIGNvbXB1dGVkU3R5bGUud2lkdGggIT09ICdhdXRvJyAmJiBjb21wdXRlZFN0eWxlLndpZHRoICE9PSAnMHB4Jykge1xuICAgICAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LnN0eWxlLndpZHRoID0gY29tcHV0ZWRTdHlsZS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRlckVsZW1lbnQuc3R5bGUuZm9udCA9IGNvbXB1dGVkU3R5bGUuZm9udDtcbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtjb25maWcuZHJvcGRvd25IZWlnaHRQeH1weGA7XG4gICAgfVxuXG4gICAgdXBkYXRlT3BlblN0YXRlKCkge1xuICAgICAgICBpZiAoISh0aGlzLndvcnNlU2VsZWN0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGlzTGlzdGJveE1vZGUgPSBzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKTtcbiAgICAgICAgY29uc3QgaXNPcGVuID0gaXNMaXN0Ym94TW9kZSA/IHRydWUgOiB0aGlzLm9wZW47XG5cbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicsIGlzT3Blbik7XG4gICAgICAgIHRoaXMud29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2xpc3Rib3gnLCBpc0xpc3Rib3hNb2RlKTtcbiAgICAgICAgdGhpcy53b3JzZVNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnbXVsdGlwbGUnLCBpc011bHRpcGxlU2VsZWN0KHRoaXMpKTtcblxuICAgICAgICBpZiAodGhpcy5oZWFkZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBTdHJpbmcoaXNPcGVuKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1Njcm9sbGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgU3RyaW5nKGlzTXVsdGlwbGVTZWxlY3QodGhpcykpKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1Njcm9sbGVyRWxlbWVudC50YWJJbmRleCA9IGlzT3BlbiA/IDAgOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyU3RhdGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3RlZFN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goc2VsZWN0T3B0aW9uID0+IHtcbiAgICAgICAgICAgIGlmICghc2VsZWN0T3B0aW9uLnNlbGVjdGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXNQbGFjZWhvbGRlck9wdGlvbihzZWxlY3RPcHRpb24pKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBlbD8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgeyB3b3JzZVNlbGVjdEVsZW1lbnQsIHNlbGVjdEVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgd29yc2VTZWxlY3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc2VsZWN0RWxlbWVudC5kaXNhYmxlZCk7XG5cbiAgICAgICAgaWYgKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgICAgICAgaGVhZGVyRWxlbWVudC5kaXNhYmxlZCA9IHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIFN0cmluZyhzZWxlY3RFbGVtZW50LmRpc2FibGVkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VhcmNoSW5wdXRFbGVtZW50IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmRpc2FibGVkID0gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGdldFdvcnNlT3B0aW9uRWxlbWVudChzZWxlY3RPcHRpb24pO1xuICAgICAgICAgICAgZWw/LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgc2VsZWN0T3B0aW9uLmRpc2FibGVkKTtcbiAgICAgICAgICAgIGVsPy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnLCBTdHJpbmcoc2VsZWN0T3B0aW9uLmRpc2FibGVkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUhlYWRlclN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IGhlYWRlckVsZW1lbnQsIHNlbGVjdEVsZW1lbnQgfSA9IHRoaXM7XG4gICAgICAgIGlmICghKGhlYWRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICBjb25zdCBsYWJlbEVsID0gaGVhZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcud29yc2Utc2VsZWN0LWhlYWRlci1sYWJlbCcpO1xuICAgICAgICBpZiAoIShsYWJlbEVsIGluc3RhbmNlb2YgSFRNTFNwYW5FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID1cbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zWzBdID8/XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50Lm9wdGlvbnNbc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4XSA/P1xuICAgICAgICAgICAgbnVsbDtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IChpc1BsYWNlaG9sZGVyT3B0aW9uKHNlbGVjdGVkT3B0aW9uKSAmJiB0aGlzLm9wZW4pXG4gICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICA6IHNlbGVjdGVkT3B0aW9uPy50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuXG4gICAgICAgIGxhYmVsRWwudGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICAgICAgaGVhZGVyRWxlbWVudC50aXRsZSA9IGxhYmVsO1xuICAgICAgICBoZWFkZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsID8gYFNlbGVjdGVkOiAke2xhYmVsfWAgOiAnU2VsZWN0IGFuIG9wdGlvbicpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCwgYWN0aXZlT3B0aW9uIH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSB7XG4gICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgZWwuaWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFjdGl2ZU9wdGlvblN0YXRlKCkge1xuICAgICAgICBjb25zdCB7IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQsIGFjdGl2ZU9wdGlvbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIEFycmF5LmZyb20ob3B0aW9uc1Njcm9sbGVyRWxlbWVudC5jaGlsZHJlbikuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChhY3RpdmVPcHRpb24pIHtcbiAgICAgICAgICAgIGdldFdvcnNlT3B0aW9uRWxlbWVudChhY3RpdmVPcHRpb24pPy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN5bmNBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5zeW5jRGltZW5zaW9ucygpO1xuICAgICAgICBhcHBseVNlYXJjaEZpbHRlcih0aGlzKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gT3BlbiAvIGNsb3NlIC0tLVxuXG4gICAgb3BlbkRyb3Bkb3duKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RFbGVtZW50LmRpc2FibGVkKSByZXR1cm47XG4gICAgICAgIGlmIChzaG91bGRVc2VMaXN0Ym94TW9kZSh0aGlzKSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlT3BlblN0YXRlKCk7XG4gICAgfVxuXG4gICAgY2xvc2VEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5vcGVuKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gJyc7XG4gICAgICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVNlYXJjaEZpbHRlcih0aGlzKTtcbiAgICAgICAgdGhpcy51cGRhdGVPcGVuU3RhdGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVEcm9wZG93bigpIHtcbiAgICAgICAgaWYgKHNob3VsZFVzZUxpc3Rib3hNb2RlKHRoaXMpKSByZXR1cm47XG4gICAgICAgIHRoaXMub3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB9XG5cbiAgICBvcGVuRHJvcGRvd25BbmRGb2N1c0xpc3QoKSB7XG4gICAgICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3QgeyBvcHRpb25zU2Nyb2xsZXJFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2Nyb2xsT3B0aW9uSW50b1ZpZXcodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgIH1cblxuICAgIGNsb3NlRHJvcGRvd25BbmRGb2N1c0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICAgIHRoaXMuaGVhZGVyRWxlbWVudD8uZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0gTmF2aWdhdGlvbiAtLS1cblxuICAgIGdldFZpc2libGVFbmFibGVkT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZpbHRlcihvcHQgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdC5kaXNhYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGdldFdvcnNlT3B0aW9uRWxlbWVudChvcHQpIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZU9wdGlvbihzZWxlY3RPcHRpb246IEhUTUxPcHRpb25FbGVtZW50IHwgdW5kZWZpbmVkLCBzY3JvbGwgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlT3B0aW9uID0gc2VsZWN0T3B0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZURlc2NlbmRhbnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVPcHRpb25TdGF0ZSgpO1xuICAgICAgICBpZiAoc2Nyb2xsKSBzY3JvbGxPcHRpb25JbnRvVmlldyhzZWxlY3RPcHRpb24pO1xuICAgIH1cblxuICAgIG1vdmVBY3RpdmVPcHRpb24oZGVsdGE6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRWaXNpYmxlRW5hYmxlZE9wdGlvbnMoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5hY3RpdmVPcHRpb24gPyBvcHRpb25zLmluZGV4T2YodGhpcy5hY3RpdmVPcHRpb24pIDogLTE7XG4gICAgICAgIGNvbnN0IG5leHRJbmRleCA9IGN1cnJlbnRJbmRleCA9PT0gLTFcbiAgICAgICAgICAgID8gKGRlbHRhID49IDAgPyAwIDogb3B0aW9ucy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBNYXRoLm1pbihvcHRpb25zLmxlbmd0aCAtIDEsIGN1cnJlbnRJbmRleCArIGRlbHRhKSk7XG5cbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24ob3B0aW9uc1tuZXh0SW5kZXhdKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlVG9Cb3VuZGFyeShib3VuZGFyeTogJ3N0YXJ0JyB8ICdlbmQnKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldFZpc2libGVFbmFibGVkT3B0aW9ucygpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oYm91bmRhcnkgPT09ICdzdGFydCcgPyBvcHRpb25zWzBdIDogb3B0aW9uc1tvcHRpb25zLmxlbmd0aCAtIDFdKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlSnVtcFNpemUoKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9uc1Njcm9sbGVyRWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEob3B0aW9uc1Njcm9sbGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KSkgcmV0dXJuIDEwO1xuXG4gICAgICAgIGNvbnN0IGZpcnN0T3B0aW9uID0gQXJyYXkuZnJvbShvcHRpb25zU2Nyb2xsZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JzZS1zZWxlY3Qtb3B0aW9uJykpXG4gICAgICAgICAgICAuZmluZChlbCA9PiBlbCBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50KTtcbiAgICAgICAgaWYgKCEoZmlyc3RPcHRpb24gaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybiAxMDtcblxuICAgICAgICBjb25zdCBvcHRpb25IZWlnaHQgPSBmaXJzdE9wdGlvbi5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDEsIE1hdGguZmxvb3Iob3B0aW9uc1Njcm9sbGVyRWxlbWVudC5jbGllbnRIZWlnaHQgLyBvcHRpb25IZWlnaHQpKTtcbiAgICB9XG5cbiAgICBtb3ZlQWN0aXZlQnlQYWdlKGRpcmVjdGlvbjogMSB8IC0xKSB7XG4gICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbih0aGlzLmdldFBhZ2VKdW1wU2l6ZSgpICogZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBjb21taXRBY3RpdmVPcHRpb25TZWxlY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgYWN0aXZlT3B0aW9uLCBzZWxlY3RFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIWFjdGl2ZU9wdGlvbiB8fCBhY3RpdmVPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoc2VsZWN0RWxlbWVudC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgYWN0aXZlT3B0aW9uLnNlbGVjdGVkID0gIWFjdGl2ZU9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IEFycmF5LmZyb20oc2VsZWN0RWxlbWVudC5vcHRpb25zKS5pbmRleE9mKGFjdGl2ZU9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuICAgIH1cblxuICAgIC8vIC0tLSBJbnRlcm5hbCB3aXJpbmcgLS0tXG5cbiAgICAvLyBLZXlib2FyZCBjb250cmFjdHMgZm9yIGhlYWRlciwgbGlzdCwgYW5kIHNlYXJjaCBhcmUga2VwdCB0b2dldGhlciBoZXJlIFx1MjAxNCBzcGxpdHRpbmcgdGhlbVxuICAgIC8vIHdvdWxkIHNjYXR0ZXIgcmVsYXRlZCBrZXkgaGFuZGxpbmcgYWNyb3NzIG11bHRpcGxlIG1ldGhvZHMuIElmIHRoaXMgZ3Jvd3Mgc2lnbmlmaWNhbnRseSxcbiAgICAvLyBjb25zaWRlciBicmVha2luZyBvdXQgcGVyLWNvbXBvbmVudCBoYW5kbGVycy5cbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHsgd29yc2VTZWxlY3RFbGVtZW50LCBzZWxlY3RFbGVtZW50LCBvcHRpb25zV3JhcHBlckVsZW1lbnQsIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQsIGhlYWRlckVsZW1lbnQsIHNlYXJjaElucHV0RWxlbWVudCB9ID0gdGhpcztcblxuICAgICAgICBpZiAoISh3b3JzZVNlbGVjdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEob3B0aW9uc1dyYXBwZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgIGlmICghKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgaWYgKCEoaGVhZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0NsaWNrOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uRWwgPSB0YXJnZXQuY2xvc2VzdCgnLndvcnNlLXNlbGVjdC1vcHRpb24nKTtcbiAgICAgICAgICAgIGlmICghKG9wdGlvbkVsIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnNXcmFwcGVyRWxlbWVudC5jb250YWlucyhvcHRpb25FbCkpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChvcHRpb25FbC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0T3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChvcHRpb25FbCk7XG4gICAgICAgICAgICBpZiAoIXNlbGVjdE9wdGlvbiB8fCBzZWxlY3RPcHRpb24uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24oc2VsZWN0T3B0aW9uLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uLnNlbGVjdGVkID0gIXNlbGVjdE9wdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5zZWxlY3RlZEluZGV4ID0gQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmluZGV4T2Yoc2VsZWN0T3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VsZWN0Q2hhbmdlOiBFdmVudExpc3RlbmVyID0gKCkgPT4gdGhpcy5zeW5jQWxsKCk7XG4gICAgICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2s6IEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cbiAgICAgICAgY29uc3Qgb25IZWFkZXJLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZU9wdGlvbigtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ecm9wZG93bkFuZEZvY3VzTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVCeVBhZ2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duQW5kRm9jdXNIZWFkZXIoKSA6IHRoaXMub3BlbkRyb3Bkb3duQW5kRm9jdXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uT3B0aW9uc0tleURvd246IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEtleWJvYXJkRXZlbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKC0xKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdEFjdGl2ZU9wdGlvblNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdEVsZW1lbnQubXVsdGlwbGUpIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG9uU2VhcmNoSW5wdXQ6IEV2ZW50TGlzdGVuZXIgPSBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXJtID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgYXBwbHlTZWFyY2hGaWx0ZXIodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb25TZWFyY2hLZXlEb3duOiBFdmVudExpc3RlbmVyID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlT3B0aW9uKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVPcHRpb24oLTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBY3RpdmVUb0JvdW5kYXJ5KCdzdGFydCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZVRvQm91bmRhcnkoJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aXZlQnlQYWdlKDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUFjdGl2ZUJ5UGFnZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VEcm9wZG93bkFuZEZvY3VzSGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIG9wdGlvbnNXcmFwcGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uT3B0aW9uc0NsaWNrKTtcbiAgICAgICAgc2VsZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblNlbGVjdENoYW5nZSk7XG4gICAgICAgIGhlYWRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkhlYWRlckNsaWNrKTtcbiAgICAgICAgaGVhZGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25IZWFkZXJLZXlEb3duKTtcbiAgICAgICAgb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25PcHRpb25zS2V5RG93bik7XG5cbiAgICAgICAgaWYgKHNlYXJjaElucHV0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlYXJjaElucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uU2VhcmNoSW5wdXQpO1xuICAgICAgICAgICAgc2VhcmNoSW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblNlYXJjaEtleURvd24pO1xuICAgICAgICAgICAgdGhpcy5vblNlYXJjaElucHV0ID0gb25TZWFyY2hJbnB1dDtcbiAgICAgICAgICAgIHRoaXMub25TZWFyY2hLZXlEb3duID0gb25TZWFyY2hLZXlEb3duO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbk9wdGlvbnNDbGljayA9IG9uT3B0aW9uc0NsaWNrO1xuICAgICAgICB0aGlzLm9uU2VsZWN0Q2hhbmdlID0gb25TZWxlY3RDaGFuZ2U7XG4gICAgICAgIHRoaXMub25IZWFkZXJDbGljayA9IG9uSGVhZGVyQ2xpY2s7XG4gICAgICAgIHRoaXMub25IZWFkZXJLZXlEb3duID0gb25IZWFkZXJLZXlEb3duO1xuICAgICAgICB0aGlzLm9uT3B0aW9uc0tleURvd24gPSBvbk9wdGlvbnNLZXlEb3duO1xuXG4gICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgIH1cblxuICAgIC8vIERPTSBkaWZmaW5nIGlzIGtlcHQgaW5saW5lIGhlcmUgYmVjYXVzZSB0aGUgbXV0YXRpb24gY2FzZXMgYXJlIHRpZ2h0bHkgY291cGxlZCB0byBlYWNoXG4gICAgLy8gb3RoZXIgYW5kIHRoZSBzY3JvbGxlcidzIGNoaWxkIG9yZGVyLiBJZiB0aGlzIGdyb3dzIChlLmcuIG9wdGlvbiBncm91cHMsIHJlb3JkZXJpbmdcbiAgICAvLyBhbmltYXRpb25zKSwgZXh0cmFjdCBpbnRvIGEgZGVkaWNhdGVkIHJlY29uY2lsZXIuXG4gICAgcHJpdmF0ZSBvYnNlcnZlT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgeyBzZWxlY3RFbGVtZW50LCBvcHRpb25zU2Nyb2xsZXJFbGVtZW50IH0gPSB0aGlzO1xuICAgICAgICBpZiAoIShvcHRpb25zU2Nyb2xsZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgbGV0IHNob3VsZFJlYnVpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGVTdGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG11dGF0aW9uIG9mIG11dGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWJ1aWxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlU3RhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRSZWJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShvcHRpb25zU2Nyb2xsZXJFbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlua2VkT3B0aW9uID0gZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGlua2VkT3B0aW9uIHx8ICFBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQub3B0aW9ucykuaW5jbHVkZXMobGlua2VkT3B0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmtlZE9wdGlvbikgdW5saW5rT3B0aW9uKGxpbmtlZE9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShzZWxlY3RFbGVtZW50Lm9wdGlvbnMpLmZvckVhY2goKHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsID0gZ2V0V29yc2VPcHRpb25FbGVtZW50KHNlbGVjdE9wdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gY3JlYXRlV29yc2VPcHRpb25FbGVtZW50KHRoaXMsIHNlbGVjdE9wdGlvbiwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlua09wdGlvbihzZWxlY3RPcHRpb24sIGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gZ2V0T3B0aW9uSWQodGhpcywgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdEluZGV4ID0gb3B0aW9uc1Njcm9sbGVyRWxlbWVudC5jaGlsZHJlbltvcHRpb25JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QXRJbmRleCAhPT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBdEluZGV4ID8gY3VycmVudEF0SW5kZXguYmVmb3JlKGVsKSA6IG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG9wdGlvbnNTY3JvbGxlckVsZW1lbnQuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiAhZ2V0U2VsZWN0T3B0aW9uRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY0FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHNlbGVjdEVsZW1lbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IGZhbHNlLFxuICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZScsICdjbGFzcycsICdkaXNhYmxlZCcsICdtdWx0aXBsZScsICdzaXplJ11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25PYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IHNlbGVjdEVsZW1lbnQsIHdvcnNlU2VsZWN0RWxlbWVudCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCEod29yc2VTZWxlY3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzZWxlY3RFbGVtZW50LmFmdGVyKHdvcnNlU2VsZWN0RWxlbWVudCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEVuaGFuY2VzIGV2ZXJ5IG5hdGl2ZSBgPHNlbGVjdD5gIGVsZW1lbnQgaW5zaWRlIHRoZSBwcm92aWRlZCByb290LlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpcyBzYWZlIHRvIGNhbGwgbXVsdGlwbGUgdGltZXMuIEVhY2ggYDxzZWxlY3Q+YCBpcyBtb3VudGVkIGF0IG1vc3Qgb25jZS5cbiAqIElmIGBvcHRpb25zLm9ic2VydmVgIGlzIHRydWUsIG5ld2x5IGFkZGVkIHNlbGVjdHMgdW5kZXIgdGhlIHJvb3QgYXJlIGVuaGFuY2VkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogUmV0dXJucyBhIGNsZWFudXAgZnVuY3Rpb24gdGhhdCBkaXNjb25uZWN0cyB0aGUgcm9vdCBvYnNlcnZlciBhbmQgZGVzdHJveXMgbW91bnRlZCBpbnN0YW5jZXNcbiAqIHVuZGVyIHRoZSBwcm92aWRlZCByb290LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd29yc2VTZWxlY3Qocm9vdDogUm9vdE5vZGUgPSBkb2N1bWVudCwgb3B0aW9uczogV29yc2VTZWxlY3RPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgICBtb3VudFNlbGVjdHNJblJvb3Qocm9vdCk7XG5cbiAgICBsZXQgcm9vdE9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKG9wdGlvbnMub2JzZXJ2ZSkge1xuICAgICAgICByb290T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbkxpc3QgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udHlwZSAhPT0gJ2NoaWxkTGlzdCcpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbXV0YXRpb24uYWRkZWROb2Rlcy5mb3JFYWNoKGFkZGVkTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGVkTm9kZSBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoYWRkZWROb2RlLCByb290KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkTm9kZS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxTZWxlY3RFbGVtZW50Pignc2VsZWN0JykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VudFNlbGVjdEVsZW1lbnQoZWwsIHJvb3QpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm9vdE9ic2VydmVyLm9ic2VydmUocm9vdCwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgcm9vdE9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG5cbiAgICAgICAgZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdCkuZm9yRWFjaChzZWxlY3RFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VzLmdldChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHJldHVybjtcbiAgICAgICAgICAgIGluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGluc3RhbmNlcy5kZWxldGUoc2VsZWN0RWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVuc3VyZVN0eWxlcygpIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtd29yc2Utc2VsZWN0LXN0eWxlcz1cInRydWVcIl0nKSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXdvcnNlLXNlbGVjdC1zdHlsZXMnLCAndHJ1ZScpO1xuICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNyZWF0ZUNTUygpO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2VsZWN0RWxlbWVudHNJblJvb3Qocm9vdDogUm9vdE5vZGUpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTFNlbGVjdEVsZW1lbnQ+KCdzZWxlY3QnKSk7XG59XG5cbmZ1bmN0aW9uIG1vdW50U2VsZWN0c0luUm9vdChyb290OiBSb290Tm9kZSkge1xuICAgIGdldFNlbGVjdEVsZW1lbnRzSW5Sb290KHJvb3QpLmZvckVhY2goc2VsZWN0RWxlbWVudCA9PiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudCwgcm9vdCkpO1xufVxuXG5mdW5jdGlvbiBtb3VudFNlbGVjdEVsZW1lbnQoc2VsZWN0RWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQsIHJvb3Q6IFJvb3ROb2RlKSB7XG4gICAgaWYgKGluc3RhbmNlcy5nZXQoc2VsZWN0RWxlbWVudCkpIHJldHVybjtcblxuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFdvcnNlU2VsZWN0KHNlbGVjdEVsZW1lbnQsIGdldENvbmZpZyhzZWxlY3RFbGVtZW50KSwgcm9vdCk7XG4gICAgaW5zdGFuY2UubW91bnQoKTtcbiAgICBpbnN0YW5jZXMuc2V0KHNlbGVjdEVsZW1lbnQsIGluc3RhbmNlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFH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