var u={searchable:!1,dropdownHeightPx:400,height:"32px",width:"100%"};function F(){return`
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
        --ws-height: ${u.height};
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
        width: ${u.width};
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
        max-height: ${u.dropdownHeightPx}px;
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
    `}var K=Object.keys(u);function V(n){return n.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}function G(n,e){let t=u[n];return typeof t=="boolean"?e==="true":typeof t=="number"?Number(e):e}function B(n){let e={...u};for(let t=0;t<K.length;t++){let o=K[t],s=`data-${V(o)}`,i=n.getAttribute(s);i!==null&&(e[o]=G(o,i))}return e}function m(n){return n.selectElement.size>1}function w(n){return n.selectElement.multiple}function b(n){return n!==null&&n.value===""&&n.disabled}function $(n,e){if(n.size<=1)return null;let o=e.getBoundingClientRect().height*n.size,s=n.parentElement?.getBoundingClientRect().height??1e4;return Math.min(o,s)+"px"}var L=new WeakMap,D=new WeakMap;function x(n,e){L.set(n,e),D.set(e,n)}function T(n){let e=L.get(n);e&&(L.delete(n),D.delete(e))}function v(n){return L.get(n)}function y(n){return D.get(n)}function H(n){if(!n)return;let e=v(n);e instanceof HTMLDivElement&&e.scrollIntoView({block:"nearest"})}function j(n){return n.length>0?` style="${n.join(" ")}"`:""}function Y(n){let e=[];return n.config.width!==u.width&&e.push(`width: ${n.config.width};`),n.config.height!==u.height&&e.push(`height: ${n.config.height};`),j(e)}function N(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function M(n,e){return`${n.instanceId}-option-${e}`}function J(n){let e=["worse-select-option"];return n.disabled&&e.push("disabled"),n.selected&&e.push("selected"),e.join(" ")}function Z(n,e,t){let o=J(e),s=e.textContent??"";return`
    <div id="${M(n,t)}"
         class="${o}"
         data-value="${N(e.value)}"
         role="option"
         aria-selected="${e.selected?"true":"false"}"
         aria-disabled="${e.disabled?"true":"false"}">
      ${N(s)}
    </div>
    `}function A(n,e,t){return document.createRange().createContextualFragment(Z(n,e,t)).firstElementChild}function Q(n){return n.config.searchable?`
    <div class="worse-select-search">
      <input type="text"
             class="worse-select-search-input"
             placeholder="Search list"
             autocomplete="off"
             aria-label="Search options" />
    </div>
    `:""}function X(){return`
    <div class="worse-select-message worse-select-visually-hidden"
         role="status"
         aria-live="polite"
         aria-atomic="true"></div>
    `}function R(n){let e=Y(n),t=["worse-select-container"];m(n)&&t.push("listbox"),w(n)&&t.push("multiple");let o=`
    <div class="${t.join(" ")}">
      <button
        type="button"
        class="worse-select-header"
        aria-haspopup="listbox"
        aria-expanded="false">
        <span class="worse-select-header-label"></span>
      </button>
      <div class="worse-select-options">
        ${Q(n)}
        ${X()}
        <div class="worse-select-options-scroller"${e}></div>
      </div>
    </div>
    `,s=document.createRange().createContextualFragment(o).firstElementChild,i=s.querySelector(".worse-select-options-scroller");i.setAttribute("role","listbox"),i.tabIndex=m(n)?0:-1,w(n)&&i.setAttribute("aria-multiselectable","true");let l=n.selectElement.children,a=[],c={value:0};for(let p=0;p<l.length;p++){let h=l[p];h instanceof HTMLOptGroupElement?a.push(_(n,h,c)):h instanceof HTMLOptionElement&&(a.push(U(n,h,c.value)),c.value++)}return i.append(...a),s}function _(n,e,t){let o=document.createElement("div");o.className="worse-select-optgroup-label",o.textContent=e.label;let i=Array.from(e.getElementsByTagName("option")).map(a=>{let c=U(n,a,t.value);return t.value++,e.disabled&&(c.classList.add("disabled"),c.setAttribute("aria-disabled","true")),c}),l=document.createElement("div");return l.className="worse-select-optgroup"+(e.disabled?" disabled":""),l.setAttribute("role","group"),l.setAttribute("aria-label",e.label),l.append(o,...i),l}function U(n,e,t){let o=A(n,e,t);return x(e,o),o}function C(n,e){let t=e.trim().toLowerCase();if(Array.from(n.optionsListElement.children).forEach(l=>{if(!(l instanceof HTMLDivElement))return;let a=t!==""&&l.textContent.toLowerCase().includes(t);l.classList.toggle("matches",a)}),!t){n.clearMessage();return}let o=n.optionsListElement.querySelectorAll(".worse-select-option.matches").length,s=o===0?"No results found":o===1?"1 result available":`${o} results available`;n.setMessage(s);let i=n.optionsListElement.querySelector(".worse-select-option.matches");i instanceof HTMLDivElement&&i.scrollIntoView({block:"nearest"})}function q(){let n="",e=null;return{name:"search",init(t){e=t;let{searchInputElement:o}=t;o&&t.on(o,"input",s=>{let i=s.target;i instanceof HTMLInputElement&&(n=i.value,C(t,n))})},onSync(){e&&C(e,n)},onClose(){if(!e)return;n="";let{searchInputElement:t}=e;t instanceof HTMLInputElement&&(t.value=""),C(e,"")},destroy(){e=null,n=""}}}var S=new WeakMap,ee=0,d=class d{constructor(e,t={},o=document,s=[]){this.typeAheadText="";this.typeAheadTimeout=1e3;this.open=!1;this.plugins=[];this.pluginListeners=[];this.handleTypeAhead=e=>{if(e.key.length!==1||document.activeElement===this.searchInputElement)return;let t=this.optionsListElement?.children;this.typeAheadText+=e.key;let o=this.typeAheadText.toLowerCase();if(t&&o){let s=Array.from(t).find(i=>i.textContent.trim().toLowerCase().startsWith(o));this.optionsListElement?.querySelector(".active")?.classList.remove("active"),s?.classList.add("active"),s&&s.scrollIntoView({block:"nearest"})}this.typeAheadTimerId&&clearTimeout(this.typeAheadTimerId),this.typeAheadTimerId=setTimeout(()=>{this.typeAheadText=""},this.typeAheadTimeout)};this.selectElement=e,this.config={...u,...t},this.root=o,this.instanceId=`ws-${++ee}`,this.plugins=[...s],this.config.searchable&&!s.some(i=>i.name==="search")&&this.plugins.push(q())}static handleColorSchemeChange(){for(let e of d.mountedInstances)e.updateOpenState()}static handleDocumentPointerDown(e){let t=e.target;if(t instanceof Node)for(let o of d.mountedInstances)o.worseSelectElement&&!o.worseSelectElement.contains(t)&&o.closeDropdown()}mount(){this.worseSelectElement||(ne(),this.worseSelectElement=R(this),this.headerElement=this.worseSelectElement.querySelector(".worse-select-header"),this.dropdownPanelElement=this.worseSelectElement.querySelector(".worse-select-options"),this.optionsListElement=this.worseSelectElement.querySelector(".worse-select-options-scroller"),this.searchInputElement=this.worseSelectElement.querySelector(".worse-select-search-input"),this.messageElement=this.worseSelectElement.querySelector(".worse-select-message"),d.mountedInstances.size===0&&(document.addEventListener("pointerdown",d.handleDocumentPointerDown),d.colorSchemeObserver=new MutationObserver(d.handleColorSchemeChange),d.colorSchemeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["class","style"]})),this.worseSelectElement.addEventListener("keyup",this.handleTypeAhead),d.mountedInstances.add(this),this.render(),this.bindEvents(),this.observeOptions(),this.initPlugins())}destroy(){this.optionObserver?.disconnect(),this.optionObserver=void 0;for(let e of this.plugins)e.destroy?.();for(let{target:e,event:t,handler:o}of this.pluginListeners)e.removeEventListener(t,o);this.pluginListeners=[],this.plugins=[],this.onSelectChange&&(this.selectElement.removeEventListener("change",this.onSelectChange),this.onSelectChange=void 0),this.onOptionsClick&&this.dropdownPanelElement&&(this.dropdownPanelElement.removeEventListener("click",this.onOptionsClick),this.onOptionsClick=void 0),this.onHeaderClick&&this.headerElement&&(this.headerElement.removeEventListener("click",this.onHeaderClick),this.onHeaderClick=void 0),this.onHeaderKeyDown&&this.headerElement&&(this.headerElement.removeEventListener("keydown",this.onHeaderKeyDown),this.onHeaderKeyDown=void 0),this.onOptionsKeyDown&&this.optionsListElement&&(this.optionsListElement.removeEventListener("keydown",this.onOptionsKeyDown),this.onOptionsKeyDown=void 0),this.onSearchKeyDown&&this.searchInputElement&&(this.searchInputElement.removeEventListener("keydown",this.onSearchKeyDown),this.onSearchKeyDown=void 0),this.onListboxFocus&&this.optionsListElement&&(this.optionsListElement.removeEventListener("focus",this.onListboxFocus),this.onListboxFocus=void 0),d.mountedInstances.delete(this),d.mountedInstances.size===0&&(document.removeEventListener("pointerdown",d.handleDocumentPointerDown),d.colorSchemeObserver?.disconnect(),d.colorSchemeObserver=void 0),this.worseSelectElement?.removeEventListener("keyup",this.handleTypeAhead),Array.from(this.selectElement.options).forEach(T),this.worseSelectElement?.remove(),this.selectElement.style.display="",this.worseSelectElement=void 0,this.headerElement=void 0,this.dropdownPanelElement=void 0,this.optionsListElement=void 0,this.searchInputElement=void 0,this.messageElement=void 0,this.open=!1,this.activeOption=void 0}syncDimensions(){let{worseSelectElement:e,headerElement:t,optionsListElement:o,selectElement:s,config:i}=this;if(!(e instanceof HTMLDivElement)||!(t instanceof HTMLButtonElement)||!(o instanceof HTMLDivElement))return;let l=window.getComputedStyle(s);if(l.width&&l.width!=="auto"&&l.width!=="0px"&&(e.style.width=l.width),t.style.font=l.font,m(this)){let a=o.children[0],c=a?$(s,a):null;c&&(o.style.height=c)}else o.style.maxHeight=`${i.dropdownHeightPx}px`}updateOpenState(){if(!(this.worseSelectElement instanceof HTMLDivElement))return;let e=m(this),t=e?!0:this.open,o=getComputedStyle(this.selectElement).colorScheme,s=o==="dark"||o.includes("dark")&&window.matchMedia("(prefers-color-scheme: dark)").matches;this.worseSelectElement.classList.toggle("open",t),this.worseSelectElement.classList.toggle("listbox",e),this.worseSelectElement.classList.toggle("multiple",w(this)),this.worseSelectElement.classList.toggle("dark",s),this.headerElement instanceof HTMLButtonElement&&this.headerElement.setAttribute("aria-expanded",String(t)),this.optionsListElement instanceof HTMLDivElement&&(this.optionsListElement.setAttribute("aria-multiselectable",String(w(this))),this.optionsListElement.tabIndex=t?0:-1),this.updateHeaderState()}updateSelectedState(){let{optionsListElement:e,selectElement:t}=this;e instanceof HTMLDivElement&&(Array.from(e.children).forEach(o=>{o instanceof HTMLDivElement&&(o.classList.remove("selected"),o.setAttribute("aria-selected","false"))}),Array.from(t.options).forEach(o=>{if(!o.selected||b(o))return;let s=v(o);s?.classList.add("selected"),s?.setAttribute("aria-selected","true")}))}updateDisabledState(){let{worseSelectElement:e,selectElement:t,headerElement:o,searchInputElement:s}=this;e instanceof HTMLDivElement&&(e.classList.toggle("disabled",t.disabled),o instanceof HTMLButtonElement&&(o.disabled=t.disabled,o.setAttribute("aria-disabled",String(t.disabled))),s instanceof HTMLInputElement&&(s.disabled=t.disabled),Array.from(t.options).forEach(i=>{let l=v(i),a=i.disabled||i.parentElement instanceof HTMLOptGroupElement&&i.parentElement.disabled;l?.classList.toggle("disabled",a),l?.setAttribute("aria-disabled",String(a))}))}updateHeaderState(){let{headerElement:e,selectElement:t}=this;if(!(e instanceof HTMLButtonElement))return;let o=e.querySelector(".worse-select-header-label");if(!(o instanceof HTMLSpanElement))return;let s=t.selectedOptions[0]??t.options[t.selectedIndex]??null,i=b(s)&&this.open?"":s?.textContent?.trim()||"";o.textContent=i,e.title=i,e.setAttribute("aria-label",i?`Selected: ${i}`:"Select an option")}updateActiveDescendant(){let{optionsListElement:e,activeOption:t}=this;if(!(e instanceof HTMLDivElement))return;if(!t){e.removeAttribute("aria-activedescendant");return}let o=v(t);if(!(o instanceof HTMLDivElement)){e.removeAttribute("aria-activedescendant");return}e.setAttribute("aria-activedescendant",o.id)}updateActiveOptionState(){let{optionsListElement:e,activeOption:t}=this;e instanceof HTMLDivElement&&(Array.from(e.children).forEach(o=>{o instanceof HTMLDivElement&&o.classList.remove("active")}),t&&v(t)?.classList.add("active"))}syncAll(){this.updateSelectedState(),this.updateDisabledState(),this.updateOpenState(),this.syncDimensions();for(let e of this.plugins)e.onSync?.()}setMessage(e){let{messageElement:t}=this;t instanceof HTMLDivElement&&(t.textContent="",window.setTimeout(()=>{this.messageElement===t&&(t.textContent=e)},0))}clearMessage(){this.messageElement instanceof HTMLDivElement&&(this.messageElement.textContent="")}openDropdown(){if(!this.selectElement.disabled&&!m(this)){this.open=!0,this.updateOpenState();for(let e of this.plugins)e.onOpen?.()}}closeDropdown(){if(!m(this)&&this.open){this.open=!1;for(let e of this.plugins)e.onClose?.();this.root.querySelector(".active")?.classList.remove("active"),this.updateOpenState()}}toggleDropdown(){m(this)||(this.open?this.closeDropdown():this.openDropdown())}openDropdownAndFocusList(){this.openDropdown();let{optionsListElement:e}=this;e instanceof HTMLDivElement&&(e.tabIndex=0,e.focus(),H(this.activeOption))}closeDropdownAndFocusHeader(){this.closeDropdown(),this.headerElement?.focus()}getVisibleEnabledOptions(){return Array.from(this.selectElement.options).filter(e=>e.disabled?!1:v(e)instanceof HTMLDivElement)}setActiveOption(e,t=!0){this.activeOption=e,this.updateActiveDescendant(),this.updateActiveOptionState(),t&&H(e)}moveActiveOption(e){let t=this.getVisibleEnabledOptions();if(t.length===0)return;let o=this.activeOption?t.indexOf(this.activeOption):-1,s=o===-1?e>=0?0:t.length-1:Math.max(0,Math.min(t.length-1,o+e));this.setActiveOption(t[s])}moveActiveToBoundary(e){let t=this.getVisibleEnabledOptions();t.length!==0&&this.setActiveOption(e==="start"?t[0]:t[t.length-1])}getPageJumpSize(){let{optionsListElement:e}=this;if(!(e instanceof HTMLDivElement))return 10;let t=Array.from(e.querySelectorAll(".worse-select-option")).find(s=>s instanceof HTMLDivElement);if(!(t instanceof HTMLDivElement))return 10;let o=t.offsetHeight||1;return Math.max(1,Math.floor(e.clientHeight/o))}moveActiveByPage(e){this.moveActiveOption(this.getPageJumpSize()*e)}commitActiveOptionSelection(){let{activeOption:e,selectElement:t}=this;!e||e.disabled||(t.multiple?e.selected=!e.selected:t.selectedIndex=Array.from(t.options).indexOf(e),t.dispatchEvent(new Event("change",{bubbles:!0})))}initPlugins(){if(!(this.headerElement instanceof HTMLButtonElement)||!(this.optionsListElement instanceof HTMLDivElement))return;let e={selectElement:this.selectElement,headerElement:this.headerElement,optionsListElement:this.optionsListElement,searchInputElement:this.searchInputElement,setMessage:t=>this.setMessage(t),clearMessage:()=>this.clearMessage(),on:(t,o,s)=>{t.addEventListener(o,s),this.pluginListeners.push({target:t,event:o,handler:s})}};for(let t of this.plugins)t.init(e)}bindEvents(){let{worseSelectElement:e,selectElement:t,dropdownPanelElement:o,optionsListElement:s,headerElement:i,searchInputElement:l}=this;if(!(e instanceof HTMLDivElement)||!(o instanceof HTMLDivElement)||!(s instanceof HTMLDivElement)||!(i instanceof HTMLButtonElement))return;let a=r=>{let E=r.target;if(!(E instanceof Element))return;let g=E.closest(".worse-select-option");if(!(g instanceof HTMLDivElement)||!o.contains(g)||g.classList.contains("disabled"))return;let f=y(g);!f||f.disabled||(this.setActiveOption(f,!1),t.multiple?f.selected=!f.selected:t.selectedIndex=Array.from(t.options).indexOf(f),t.dispatchEvent(new Event("change",{bubbles:!0})),this.closeDropdown())},c=()=>this.syncAll(),p=()=>this.toggleDropdown(),h=r=>{if(r instanceof KeyboardEvent)switch(r.key){case"ArrowDown":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveOption(1);break;case"ArrowUp":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveOption(-1);break;case"Home":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveToBoundary("start");break;case"End":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveToBoundary("end");break;case"PageDown":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveByPage(1);break;case"PageUp":r.preventDefault(),this.openDropdownAndFocusList(),this.moveActiveByPage(-1);break;case"Enter":case" ":r.preventDefault(),this.open?this.closeDropdownAndFocusHeader():this.openDropdownAndFocusList();break}},P=r=>{if(r instanceof KeyboardEvent)switch(r.key){case"ArrowDown":r.preventDefault(),this.moveActiveOption(1);break;case"ArrowUp":r.preventDefault(),this.moveActiveOption(-1);break;case"Home":r.preventDefault(),this.moveActiveToBoundary("start");break;case"End":r.preventDefault(),this.moveActiveToBoundary("end");break;case"PageDown":r.preventDefault(),this.moveActiveByPage(1);break;case"PageUp":r.preventDefault(),this.moveActiveByPage(-1);break;case"Enter":case" ":r.preventDefault(),this.commitActiveOptionSelection(),t.multiple||this.closeDropdownAndFocusHeader();break;case"Escape":r.preventDefault(),this.closeDropdownAndFocusHeader();break}},I=r=>{if(r instanceof KeyboardEvent)switch(r.key){case"ArrowDown":r.preventDefault(),s.focus(),this.moveActiveOption(1);break;case"ArrowUp":r.preventDefault(),s.focus(),this.moveActiveOption(-1);break;case"Home":r.preventDefault(),s.focus(),this.moveActiveToBoundary("start");break;case"End":r.preventDefault(),s.focus(),this.moveActiveToBoundary("end");break;case"PageDown":r.preventDefault(),s.focus(),this.moveActiveByPage(1);break;case"PageUp":r.preventDefault(),s.focus(),this.moveActiveByPage(-1);break;case"Escape":r.preventDefault(),this.closeDropdownAndFocusHeader();break}};o.addEventListener("click",a),t.addEventListener("change",c),i.addEventListener("click",p),i.addEventListener("keydown",h),s.addEventListener("keydown",P);let W=()=>{if(!m(this)||this.activeOption)return;let r=Array.from(t.options).find(f=>f.selected&&!b(f)),E=this.getVisibleEnabledOptions()[0],g=r??E;g&&this.setActiveOption(g,!0)};s.addEventListener("focus",W),l instanceof HTMLInputElement&&(l.addEventListener("keydown",I),this.onSearchKeyDown=I),this.onOptionsClick=a,this.onSelectChange=c,this.onHeaderClick=p,this.onHeaderKeyDown=h,this.onOptionsKeyDown=P,this.onListboxFocus=W,this.syncAll()}observeOptions(){let{selectElement:e,optionsListElement:t}=this;if(!(t instanceof HTMLDivElement))return;let o=new MutationObserver(s=>{let i=!1,l=!1;for(let a of s)a.type==="childList"&&(i=!0,l=!0),a.type==="attributes"&&(l=!0);i&&(Array.from(t.children).forEach(a=>{if(!(a instanceof HTMLDivElement))return;let c=y(a);(!c||!Array.from(e.options).includes(c))&&(c&&T(c),a.remove())}),Array.from(e.options).forEach((a,c)=>{let p=v(a);p instanceof HTMLDivElement||(p=A(this,a,c),x(a,p)),p.id=M(this,c);let h=t.children[c];h!==p&&(h?h.before(p):t.appendChild(p))}),Array.from(t.children).forEach(a=>{a instanceof HTMLDivElement&&!y(a)&&a.remove()})),l&&this.syncAll()});o.observe(e,{childList:!0,subtree:!1,attributes:!0,attributeFilter:["style","class","disabled","multiple","size"]}),this.optionObserver=o}render(){let{selectElement:e,worseSelectElement:t,optionsListElement:o}=this;t instanceof HTMLDivElement&&(e.style.display="none",e.after(t))}};d.mountedInstances=new Set;var k=d;function te(n=document,e={}){let t=e.plugins??[];oe(n,t);let o;return e.observe&&(o=new MutationObserver(s=>{for(let i of s)i.type==="childList"&&i.addedNodes.forEach(l=>{if(l instanceof Element){if(l instanceof HTMLSelectElement){O(l,n,t);return}l.querySelectorAll("select").forEach(a=>{O(a,n,t)})}})}),o.observe(n,{childList:!0,subtree:!0})),()=>{o?.disconnect(),z(n).forEach(s=>{let i=S.get(s);i&&(i.destroy(),S.delete(s))})}}function ne(){if(document.querySelector('[data-worse-select-styles="true"]'))return;let n=document.createElement("style");n.setAttribute("data-worse-select-styles","true"),n.textContent=F(),document.head.appendChild(n)}function z(n){return Array.from(n.querySelectorAll("select"))}function oe(n,e){z(n).forEach(t=>O(t,n,e))}function O(n,e,t){if(S.get(n))return;let o=new k(n,B(n),e,t);o.mount(),S.set(n,o)}export{te as worseSelect};
