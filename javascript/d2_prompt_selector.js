var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const tagConvert = (orgTags) => {
  const conved = { ___: [] };
  function traverse(tags) {
    if (Array.isArray(tags)) {
      conved.___.push(...tags);
      return;
    }
    Object.keys(tags).forEach((key) => {
      const value = tags[key];
      if (typeof value === "string") {
        conved[key] = value;
        return;
      }
      traverse(value);
    });
  }
  traverse(orgTags);
  return conved;
};
const tagSearch = (convedTags, keyword) => {
  const filtered = {};
  convedTags.___.filter((value) => {
    return value.includes(keyword);
  }).forEach((value) => {
    filtered[value] = value;
  });
  Object.keys(convedTags).forEach((key) => {
    if (key === "___")
      return;
    const value = convedTags[key];
    if (key.includes(keyword) || value.includes(keyword)) {
      filtered[key] = value;
    }
  });
  return filtered;
};
const _D2PSSearch = class _D2PSSearch {
  constructor() {
    __publicField(this, "container");
    __publicField(this, "input");
  }
  /**
   * タグ一覧を受け取って検索用に変換
   */
  static setTags(tags) {
    _D2PSSearch.convedTags = tagConvert(tags);
  }
  /**
   * タグ入力コンテナ作成
   */
  createSearchContainer(onSearch) {
    const isRealTime = opts.d2_ps_enable_realtime_search;
    this.input = D2PSElementBuilder.searchInput();
    this.input.addEventListener("keydown", (ev) => {
      var _a;
      if (isRealTime || ev.key === "Enter" || ev.key === "NumpadEnter") {
        onSearch(tagSearch(_D2PSSearch.convedTags, ((_a = this.input) == null ? void 0 : _a.value) || ""));
      }
    });
    this.container = D2PSElementBuilder.searchContainer(this.input, {
      onClick: () => {
        var _a;
        onSearch(tagSearch(_D2PSSearch.convedTags, ((_a = this.input) == null ? void 0 : _a.value) || ""));
      }
    });
    return this.container;
  }
};
__publicField(_D2PSSearch, "ICON", "🔍");
__publicField(_D2PSSearch, "convedTags", { ___: [] });
let D2PSSearch = _D2PSSearch;
class D2PSElementBuilder {
  /**
   * ボタン作成
   * @param {*} text ボタンに表示するテキスト
   * @param {*} param1 サイズ、色の指定
   */
  static baseButton(text, { size = "sm", color = "primary" }) {
    const button = document.createElement("button");
    button.classList.add(
      // gradio 3.16
      `gr-button-${size}`,
      `gr-button-${color}`,
      // gradio 3.22
      size,
      color
    );
    button.textContent = text;
    return button;
  }
  /**
   * タグリストを開くボタン
   */
  static openButton({ onClick = () => {
  } }) {
    const button = D2PSElementBuilder.baseButton("📑Open Tags", {
      size: "sm",
      color: "secondary"
    });
    button.classList.add("d2ps-button", "d2ps-button--open");
    button.addEventListener("click", onClick);
    return button;
  }
  /**
   * 全体を覆うコンテナ
   */
  static psContainer(id = "") {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("d2ps-ps-container", "tabs", "gradio-tabs");
    return container;
  }
  /**
   * ネガティブ送信チェックボックス
   */
  static negativeCheckbox(text, { onChange }) {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("d2ps-checkbox");
    checkbox.addEventListener("change", () => {
      onChange(checkbox.checked);
    });
    const labelText = document.createElement("span");
    labelText.classList.add("d2ps-label__text");
    labelText.textContent = text;
    const label = document.createElement("label");
    label.classList.add("d2ps-label");
    label.appendChild(checkbox);
    label.appendChild(labelText);
    return label;
  }
  /**
   * タブコンテナ
   */
  static tabContainer() {
    const container = document.createElement("div");
    container.classList.add("d2ps-tab-nav", "tab-nav");
    return container;
  }
  /**
   * タブボタン
   */
  static tabButton(text, { onClick = () => {
  } }) {
    const button = D2PSElementBuilder.baseButton(text, {});
    button.addEventListener("click", onClick);
    button.classList.add("d2ps-tab-button");
    return button;
  }
  // /**
  //  * タグのカテゴリ（ファイル単位）を覆うコンテナ
  //  */
  // static categoryContainer(id: string = ''): HTMLElement {
  //     const container = document.createElement('div');
  //     container.id = id;
  //     container.classList.add('d2ps-category-container', 'tabitem', 'gradio-tabitem');
  //     return container;
  // }
  // /**
  //  * グループボタン（ランダムボタン）とタグフィールドを格納する枠
  //  */
  // static groupContainer(): HTMLElement {
  //     const container = document.createElement('div');
  //     container.classList.add('d2ps-group-container');
  //     return container;
  // }
  /**
   * タグボタン、グループを格納する枠
   */
  static tagField() {
    const field = document.createElement("div");
    field.classList.add("d2ps-tag-field");
    return field;
  }
  /**
   * タグボタン
   */
  static tagButton(title, {
    onClick = () => {
    },
    onRightClick = () => {
    },
    onMouseEnter = () => {
    },
    onMouseLeave = () => {
    },
    color = "primary"
  }) {
    const button = D2PSElementBuilder.baseButton(title, { color });
    button.classList.add("d2ps-button", "d2ps-button--tag");
    button.addEventListener("click", onClick);
    button.addEventListener("contextmenu", onRightClick);
    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    return button;
  }
  /**
   * ランダムボタン
   */
  static randomButton(title, { onClick = () => {
  }, onRightClick = () => {
  }, color = "primary" }) {
    const button = D2PSElementBuilder.baseButton(title, { color });
    button.classList.add("d2ps-button", "d2ps-button--random");
    button.addEventListener("click", onClick);
    button.addEventListener("contextmenu", onRightClick);
    return button;
  }
  /**
   * ツールチップ
   */
  static toolTipContainer() {
    const container = document.createElement("div");
    container.classList.add("d2ps-tooltip-container");
    return container;
  }
  /**
   * 検索入力エリア
   */
  static searchContainer(input, { onClick = () => {
  } }) {
    const container = document.createElement("div");
    container.classList.add("d2ps-search-container");
    container.appendChild(input);
    const button = D2PSElementBuilder.baseButton(`${D2PSSearch.ICON} Search`, {
      size: "sm",
      color: "secondary"
    });
    button.classList.add("d2ps-button");
    button.addEventListener("click", onClick);
    container.appendChild(button);
    return container;
  }
  static searchInput() {
    const input = document.createElement("input");
    input.classList.add("d2ps-search-input");
    return input;
  }
}
class D2PSTabButton {
  constructor(id, onClick) {
    __publicField(this, "button");
    __publicField(this, "id");
    this.id = id;
    this.button = D2PSElementBuilder.tabButton(id, {
      onClick: () => {
        onClick(this.id);
      }
    });
  }
  setActive(bool) {
    this.button.setAttribute("data-active", bool ? "true" : "false");
  }
}
class D2PSTabNavi {
  constructor(onChange) {
    __publicField(this, "tabButtons");
    __publicField(this, "activeCategory");
    __publicField(this, "onChange");
    this.onChange = onChange;
    this.tabButtons = [];
    this.activeCategory = "";
  }
  /**
   * タブ切り替えボタンを作る
   */
  createTabNavi(config, tags) {
    const idList = Object.keys(tags);
    const sortItems = Array.from(/* @__PURE__ */ new Set([...config.sort, ...idList]));
    const container = D2PSElementBuilder.tabContainer();
    sortItems.push(D2PSSearch.ICON);
    sortItems.forEach((id) => {
      if (id !== D2PSSearch.ICON && !tags.hasOwnProperty(id))
        return;
      const tabButton = new D2PSTabButton(id, () => {
        this.$_clickTabButton(id);
      });
      this.tabButtons.push(tabButton);
      container.appendChild(tabButton.button);
    });
    this.$_clickTabButton(sortItems[0]);
    return container;
  }
  /**
   * タブボタンがクリックされた
   */
  $_clickTabButton(id) {
    this.activeCategory = id;
    this.tabButtons.forEach((tabButton) => {
      tabButton.setActive(tabButton.id === id);
    });
    this.onChange();
  }
}
const _D2PSToolTip = class _D2PSToolTip {
  /**
   * 初期化 (Inicialización)
   */
  static init() {
    const self = _D2PSToolTip;
    if (document.querySelector(self.CONTAINER_CLASS))
      return;
    
    // Crear el contenedor principal
    self.container = D2PSElementBuilder.toolTipContainer();
    self.container.style.zIndex = "99999";
    self.container.addEventListener("animationend", () => {
      self.container.setAttribute("data-show", "");
    });
    
    // Crear el elemento para el texto
    self.textElement = document.createElement("div");
    self.container.appendChild(self.textElement);
    
    // Crear el elemento para la imagen (oculta por defecto)
    self.imageElement = document.createElement("img");
    self.imageElement.style.display = "none";
    self.imageElement.style.maxWidth = "256px"; // Ajusta el tamaño de la previsualización
    self.imageElement.style.marginTop = "8px";
    self.imageElement.style.borderRadius = "4px";
    
    // Si la imagen falla al cargar (no existe), la ocultamos
    self.imageElement.onerror = function() {
        this.style.display = "none";
    };

    self.container.appendChild(self.imageElement);

    document.body.appendChild(self.container);
  }
  
  /**
   * ツールチップの表示は有効か (Comprobar si está habilitado)
   */
  static get isEnabled() {
    return opts.d2_ps_enable_tooltip;
  }
  
   /**
   * タグを表示 (Mostrar el tooltip con texto y posible imagen)
   */
  static showTip(title, value) {
    const self = _D2PSToolTip;
    if (!self.isEnabled)
      return;
    self.toHide = false;
    
    // 1. Mostrar siempre el texto del prompt
    self.textElement.textContent = value;
    
    // 2. Intentar cargar la imagen usando el TÍTULO (nombre de la categoría/botón)
    const safeImageName = encodeURIComponent(title);
    
    // IMPORTANTE: Verifica que esta ruta coincida con el nombre de tu extensión
    self.imageElement.src = `/file=extensions/neoforge-prompt-selector/tags/${safeImageName}.png`;
    self.imageElement.style.display = "block"; // Se mostrará; si falla, el 'onerror' la oculta
    
    self.container.setAttribute("data-show", "true");
  }
  
  /**
   * 非表示 (Ocultar)
   */
  static hideTip() {
    const self = _D2PSToolTip;
    if (!self.isEnabled)
      return;
    self.toHide = true;
    setTimeout(() => {
      if (!self.toHide)
        return;
      self.container.setAttribute("data-show", "false");
      self.imageElement.style.display = "none"; // Limpiar imagen al ocultar
      self.imageElement.src = "";
    }, 500);
  }
};

__publicField(_D2PSToolTip, "CONTAINER_CLASS", "d2ps-tooltip-container");
__publicField(_D2PSToolTip, "container");
__publicField(_D2PSToolTip, "textElement"); // Nueva propiedad
__publicField(_D2PSToolTip, "imageElement"); // Nueva propiedad
__publicField(_D2PSToolTip, "toHide", false);
let D2PSToolTip = _D2PSToolTip;
class D2PSCategory {
  constructor(categoryId, onClick, onRightClick) {
    __publicField(this, "onClick");
    __publicField(this, "onRightClick");
    __publicField(this, "categoryId", "");
    __publicField(this, "container");
    this.categoryId = categoryId;
    this.onClick = onClick;
    this.onRightClick = onRightClick;
    this.container = D2PSElementBuilder.tagField();
    this.container.style.display = "none";
  }
  /**
   * 検索を作る
   */
  createSearch() {
    this.container.classList.add("d2ps-tag-field--with-random");
    const search = new D2PSSearch();
    const searchContainer = search.createSearchContainer((filtered) => {
      const children = this.container.children;
      if (children.length >= 2) {
        children[1].remove();
      }
      const buttonField = D2PSElementBuilder.tagField();
      this.container.appendChild(buttonField);
      this.$_createButtons(filtered, "").forEach((button) => {
        buttonField.appendChild(button);
      });
    });
    this.container.appendChild(searchContainer);
    return this.container;
  }
  /**
   * カテゴリーを作る
   */
  createCategory(tags) {
    this.$_createButtons(tags, this.categoryId).forEach((button) => {
      this.container.appendChild(button);
    });
    return this.container;
  }
  /**
   * ボタンかフィールドを配列で受け取る
   * @param tags
   * @param prefix 階層テキスト
   * @returns
   */
  $_createButtons(tags, prefix = "") {
    if (Array.isArray(tags)) {
      return tags.map((tag) => {
        return this.$_createTagButton("tag", tag, tag, "secondary");
      });
    }
    return Object.keys(tags).map((key) => {
      const values = tags[key];
      const randomKey = `${prefix}:${key}`;
      if (typeof values === "string") {
        return this.$_createTagButton("tag", key, values, "secondary");
      }
      const field = D2PSElementBuilder.tagField();
      field.classList.add("d2ps-tag-field--with-random");
      field.appendChild(this.$_createTagButton("random", key, `@${randomKey}@`));
      const buttonField = D2PSElementBuilder.tagField();
      field.appendChild(buttonField);
      this.$_createButtons(values, randomKey).forEach((button) => {
        buttonField.appendChild(button);
      });
      return field;
    });
  }
  /**
   * タグボタンを作成
   * @param title ボタンに表示するテキスト
   * @param value プロンプトタグ
   * @param color ボタン色
   * @returns ボタン
   */
  $_createTagButton(type, title, value, color = "primary") {
    const param = {
      onClick: (e) => {
        e.preventDefault();
        this.onClick(value, e.metaKey || e.ctrlKey);
      },
      onRightClick: (e) => {
        e.preventDefault();
        this.onRightClick(value, e.metaKey || e.ctrlKey);
      },
      onMouseEnter: () => {
        // AQUÍ EL CAMBIO: Pasamos el título (para la imagen) y el valor (para el texto)
        D2PSToolTip.showTip(title, value);
      },
      onMouseLeave: () => {
        D2PSToolTip.hideTip();
      },
      color
    };
    if (type === "random") {
      return D2PSElementBuilder.randomButton(title, param);
    } else {
      return D2PSElementBuilder.tagButton(title, param);
    }
  }
}
class D2PSPromptSelectorUnit {
  /**
   * コンストラクタ
   */
  constructor(type = "txt2img") {
    __publicField(this, "AREA_ID_BASE", "d2-prompt-selector-");
    __publicField(this, "type");
    __publicField(this, "visible");
    __publicField(this, "toNegative");
    __publicField(this, "tags");
    __publicField(this, "config");
    __publicField(this, "categories");
    __publicField(this, "tabNavi");
    this.type = type;
    this.visible = false;
    this.toNegative = false;
    this.tags = {};
    this.categories = [];
  }
  /**
   * 表示切り替えボタンなど基本コントローラー作成
   */
  createControl(reloadClick) {
    const button = D2PSElementBuilder.openButton({
      onClick: () => {
        this.changeVisible();
      }
    });
    const reloadButton = gradioApp().getElementById(`d2_ps_reload_button_${this.type}`);
    reloadButton.addEventListener("click", async () => {
      await reloadClick();
    });
    const actionColumn = gradioApp().getElementById(`${this.type}_actions_column`);
    const container = document.createElement("div");
    container.classList.add("d2ps-action-container");
    container.appendChild(button);
    container.appendChild(reloadButton);
    actionColumn.appendChild(container);
  }
  /**
   * 初期化
   */
  init(tags, config) {
    this.tags = tags;
    this.config = config;
    const container = this.$_getContainer();
    if (container != null) {
      container.remove();
      this.categories = [];
    }
    gradioApp().getElementById(`${this.type}_toprow`).after(this.$_render());
  }
  /**
   * 表示状態切り替え
   */
  changeVisible() {
    this.visible = !this.visible;
    this.$_getContainer().style.display = this.visible ? "block" : "none";
  }
  /**
   * タグ全体を格納したコンテナ
   */
  $_getContainer() {
    return gradioApp().querySelector(`#${this.AREA_ID_BASE}${this.type}`);
  }
  /**
   * タグエリア全体を作る
   */
  $_render() {
    const container = D2PSElementBuilder.psContainer(`${this.AREA_ID_BASE}${this.type}`);
    const negativeCheckbox = D2PSElementBuilder.negativeCheckbox(
      "Send to Negative Prompt (Ctrl/Command + Click also works)",
      {
        onChange: (checked) => {
          this.toNegative = checked;
        }
      }
    );
    container.appendChild(negativeCheckbox);
    container.appendChild(this.$_renderTabNavi());
    this.$_renderCategory(container);
    this.$_changeCategory();
    return container;
  }
  /**
   * タブ切り替えを作る
   */
  $_renderTabNavi() {
    this.tabNavi = new D2PSTabNavi(() => {
      this.$_changeCategory();
    });
    return this.tabNavi.createTabNavi(this.config, this.tags);
  }
  /**
   * アクティブカテゴリーを切り替える
   */
  $_changeCategory() {
    this.categories.forEach((category) => {
      if (this.tabNavi.activeCategory === category.categoryId) {
        category.container.style.display = "flex";
      } else {
        category.container.style.display = "none";
      }
    });
  }
  /**
   * タグカテゴリを作る
   */
  $_renderCategory(psContainer) {
    Object.keys(this.tags).forEach((categoryId) => {
      const category = new D2PSCategory(
        categoryId,
        (tag, toNegative = false) => {
          this.$_addTag(tag, toNegative);
        },
        (tag, toNegative = false) => {
          this.$_removeTag(tag, toNegative);
        }
      );
      const categoryContainer2 = category.createCategory(this.tags[categoryId]);
      psContainer.appendChild(categoryContainer2);
      this.categories.push(category);
    });
    const searchCategory = new D2PSCategory(
      "🔍",
      (tag, toNegative = false) => {
        this.$_addTag(tag, toNegative);
      },
      (tag, toNegative = false) => {
        this.$_removeTag(tag, toNegative);
      }
    );
    const categoryContainer = searchCategory.createSearch();
    psContainer.appendChild(categoryContainer);
    this.categories.push(searchCategory);
  }
  /**
   * タグをプロンプトエリアに追加
   */
  $_addTag(tag, toNegative = false) {
    const id = toNegative || this.toNegative ? `${this.type}_neg_prompt` : `${this.type}_prompt`;
    const textarea = gradioApp().getElementById(id).querySelector("textarea");
    if (textarea.value.trim() === "") {
      textarea.value = tag;
    } else if (textarea.value.trim().endsWith(",")) {
      textarea.value += " " + tag;
    } else {
      textarea.value += ", " + tag;
    }
    updateInput(textarea);
  }
  /**
   * タグをプロンプトから削除
   */
  $_removeTag(tag, toNegative = false) {
    const id = toNegative || this.toNegative ? `${this.type}_neg_prompt` : `${this.type}_prompt`;
    const textarea = gradioApp().getElementById(id).querySelector("textarea");
    if (textarea.value.trimStart().startsWith(tag)) {
      const matched = textarea.value.match(new RegExp(`${tag.replace(/[-\/\\^$*+?.()|\[\]{}]/g, "\\$&")},*`));
      textarea.value = textarea.value.replace(matched[0], "").trimStart();
    } else {
      textarea.value = textarea.value.replace(`, ${tag}`, "");
    }
    updateInput(textarea);
  }
}
class D2PSPromptSelector {
  /**
   * コンストラクタ
   */
  constructor() {
    __publicField(this, "tags");
    __publicField(this, "config");
    __publicField(this, "t2iPromptSelector");
    __publicField(this, "i2iPromptSelector");
    this.t2iPromptSelector = new D2PSPromptSelectorUnit("txt2img");
    this.i2iPromptSelector = new D2PSPromptSelectorUnit("img2img");
    this.tags = {};
  }
  /**
   * 表示切り替えボタンなどを作成
   * 再読み込みボタンの動作も指定
   */
  createControl() {
    this.t2iPromptSelector.createControl(() => {
      this.init();
    });
    this.i2iPromptSelector.createControl(() => {
      this.init();
    });
  }
  /**
   * 初期化
   */
  async init() {
    await this.getTags();
    this.t2iPromptSelector.init(this.tags, this.config);
    this.i2iPromptSelector.init(this.tags, this.config);
  }
  /**
   * 表示状態切り替え
   */
  changeVisible() {
    this.t2iPromptSelector.changeVisible();
    this.i2iPromptSelector.changeVisible();
  }
  /**
   * タグファイルをjsonで取得
   * @returns object タグリスト
   */
  async getTags() {
    const response = await fetch(`/d2ps/tags?${(/* @__PURE__ */ new Date()).getTime()}`);
    const tags = await response.json();
    this.config = tags.__config__;
    delete tags["__config__"];
    this.tags = tags;
    D2PSSearch.setTags(tags);
  }
}
const promptSelector = new D2PSPromptSelector();
onOptionsChanged(() => {
  promptSelector.init();
});
onUiLoaded(() => {
  promptSelector.createControl();
  promptSelector.init();
  D2PSToolTip.init();
});
//# sourceMappingURL=d2_prompt_selector.js.map
