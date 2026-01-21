# 文件目錄

- [文件一: API 文件 (DailyeatHomepage)](api-reference.md)
- [Part 1: 前端開發規範 (Frontend Standards)](#part-1-前端開發規範-frontend-standards)
  - [核心理念：零建置、直接可用](#核心理念零建置直接可用)
  - [程式碼風格](#程式碼風格)
  - [Shadow DOM 封裝要求](#shadow-dom-封裝要求)
  - [JavaScript Class 封裝模式](#javascript-class-封裝模式)
  - [重要開發原則](#重要開發原則)
  - [Getter/Setter 實作檢查清單](#gettersetter-實作檢查清單)
- [Part 2: 工作流與檢查清單 (Workflow & Checklist)](#part-2-工作流與檢查清單-workflow--checklist)
  - [快速檢查清單](#快速檢查清單)
  - [詳細步驟指引 (整合重構計畫)](#詳細步驟指引-整合重構計畫)
- [Part 3: 內容戰略與設計系統 (Content & Design System)](#part-3-內容戰略與設計系統-content--design-system)
  - [第一章：核心原則](#第一章核心原則)
  - [第二章：內容策略與結構](#第二章內容策略與結構)
  - [第三章：技術與格式化規範](#第三章技術與格式化規範)
  - [第五章：資源與範例](#第五章資源與範例)

---

# Dailyeat 專案 - 完整開發指引

這份文件整合了專案的 API 文件、前端開發規範、新頁面建立清單以及文章寫作風格指引，旨在為所有開發與內容創作者提供一套統一、高標準的規範。

---

# 文件一: API 文件 (DailyeatHomepage)

> 🔗 **完整說明文件**：請參考獨立文件 [DailyeatHomepage API 參考手冊](api-reference.md)

---

# Part 1: 前端開發規範 (Frontend Standards)

## 核心理念：零建置、直接可用

**本規範的核心原則是建立完全無需建置過程的 JavaScript 函式庫**

- ✅ **寫完即可用**：程式碼寫完直接就是可部署的最終版本
- ✅ **零工具相依**：不需要 Node.js、npm、webpack、babel 等任何工具
- ✅ **拷貝即部署**：直接將檔案複製到伺服器就能運作
- ✅ **原生相容**：使用純原生 JavaScript，支援 2022 年以來的瀏覽器
- ❌ **絕不使用**：任何需要編譯、轉譯、打包的語法或工具

## 程式碼風格

- 這是一個純原生 JavaScript 前端專案，所有程式碼都應該用原生 JavaScript 撰寫。
- **絕對不使用任何第三方 JavaScript 函式庫或框架**，包括 jQuery、React、Vue 等。
- **不使用 ES Modules (import/export)**，一律使用傳統的 JavaScript 載入方式。
- **所有 JavaScript 檔案都必須可以直接載入使用，絕對不需要任何 build、compile、transpile 等預處理程序**。
- **所有功能都必須用 JavaScript class 封裝**，確保程式碼組織清晰。
- 開發指引 (Development Guidelines) 在產生程式碼時一律要相容於**2022年以來的瀏覽器版本**。
- **所有必要和可選的參數及設定都必須使用 getter 和 setter 方法，並採用可串接的 chainable 模式**。
- **所有 setter 方法都要回傳 this 以支援鏈式呼叫**。
- **關鍵需求：所有 CSS 和 JavaScript 都必須封裝在 Shadow DOM 中以實現完全隔離**。
- **Shadow DOM 封裝：確保樣式和腳本不會與外部頁面產生衝突或洩漏**。
- **嚴格禁止：避免將 CSS 注入到主頁面中**。
- **debug 參數必須遵循 getter/setter + chainable 模式：`.setDebug(true).getDebug()`**。
- **當 debug 為 false 時，不得在 console 輸出任何除錯訊息**。
- **響應式設計 (RWD) 鐵律**：
  - **絕對禁止固定寬度**：所有容器寬度必須使用百分比 (e.g., `100%`) 或 `max-width`。禁止對主容器設定 `min-width`。
  - **內容溢出保護**：所有可能過寬的元素（表格、程式碼區塊、長字串）必須設定 `overflow-x: auto` 或適當的斷行屬性 (`word-break: break-all`)。
  - **全域安全網**：HTML/Body 層級應設定 `overflow-x: hidden` 以防止意外的水平捲動。

## Shadow DOM 封裝要求

**所有 JavaScript 函式庫都必須使用 Shadow DOM 來封裝 CSS 和 JavaScript，確保完全隔離**

### 🔒 Shadow DOM 封裝原則

- **完全隔離**：所有樣式和腳本都必須封裝在 Shadow DOM 內。
- **無外部影響**：Shadow DOM 內的樣式不會影響外部頁面。
- **無外部干擾**：外部頁面的樣式不會影響 Shadow DOM 內容。
- **嚴格禁止 CSS 注入**：絕對不允許將 CSS 注入到主頁面的 `<head>` 或任何外部元素。

### ❌ 禁止的做法

```javascript
// 🚫 絕對不要這樣做 - 不可將 CSS 注入主頁面
document.head.insertAdjacentHTML('beforeend', '<style>...</style>');
document.head.appendChild(styleElement);
document.styleSheets[0].insertRule('...');

// 🚫 不可在主頁面撰寫 style 標籤
const style = document.createElement('style');
document.head.appendChild(style);

// 🚫 不可修改主頁面的現有樣式
document.documentElement.style.setProperty('--custom-color', 'red');
```

### ✅ 正確的做法

```javascript
// ✅ 正確 - 所有 CSS 都在 Shadow DOM 內
createStyles()
{
    const style = document.createElement('style');
    style.textContent = `
        /* 所有樣式都在 Shadow DOM 內，完全隔離 */
        :host { display: block; }
        .component { background: #fff; }
    `;
    this.shadowRoot.appendChild(style); // 只添加到 Shadow DOM
}
```

### 📦 Shadow DOM 實作模式

```javascript
// Shadow DOM 封裝模式
(function (global) {
    'use strict';

    class DailyeatComponentWithShadowDOM {
        constructor(hostElement) {
            // 建立 Shadow DOM
            this.hostElement = hostElement || document.body;
            this.shadowRoot = this.hostElement.attachShadow({mode: 'closed'});

            // 初始化設定
            this._config = {
                debug: false,
                theme: 'default'
            };

            // 初始化組件
            this.initialize();
        }

        initialize() {
            this.createStyles();
            this.createContent();
            this.attachEvents();
        }

        // 建立 Shadow DOM 內的樣式
        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* 所有樣式都在 Shadow DOM 內，完全隔離 */
                :host {
                    display: block;
                    contain: layout style paint;
                }
                
                .component-container {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background: #ffffff;
                    border: 1px solid #e1e5e9;
                    border-radius: 8px;
                    padding: 16px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                /* ... 其他樣式 ... */
                
                /* 主題樣式 */
                :host([theme="dark"]) .component-container {
                    background: #1f2937;
                    border-color: #374151;
                    color: #f9fafb;
                }
            `;
            this.shadowRoot.appendChild(style);
        }

        // ...
        // Getter/Setter 方法（維持 chainable 模式）
        getDebug() {
            return this._config.debug;
        }

        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this; // 支援鏈式呼叫
        }

        getTheme() {
            return this._config.theme;
        }

        setTheme(theme) {
            this._config.theme = theme;
            this.hostElement.setAttribute('theme', theme);
            return this;
        }
        
        // 銷毀組件
        destroy() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = '';
            }
        }
    }

    // 將類別掛載到全域物件
    global.DailyeatComponentWithShadowDOM = DailyeatComponentWithShadowDOM;

})(window);

// 使用範例
const hostElement = document.createElement('div');
document.body.appendChild(hostElement);

const component = new DailyeatComponentWithShadowDOM(hostElement)
    .setTheme('dark')
    .setDebug(true)
    .setHeader('我的 Shadow DOM 組件')
    .setContent('完全隔離的內容，不會受到外部樣式影響');
```

### 📋 Shadow DOM 檢查清單

- [ ] 建立 Closed Shadow DOM
- [ ] 所有 CSS 都在 Shadow DOM 內定義
- [ ] **絕對不將 CSS 注入到主頁面的 `<head>` 或任何外部元素**
- [ ] 使用 `:host` 選擇器
- [ ] 事件處理器在 Shadow DOM 內註冊
- [ ] 維持 getter/setter + chainable API
- [ ] 包含 debug 參數控制
- [ ] 提供 destroy 方法清理資源
- [ ] **驗證無任何 CSS 洩漏到主頁面**

### 📱 RWD 響應式檢查清單
- [ ] **表格檢查**：所有表格是否都已包裹在 `.table-responsive` 容器中？
- [ ] **長字串檢查**：麵包屑 (Breadcrumb) 或 URL 是否過長導致手機版面撐開？必要時請截斷文字。
- [ ] **固定寬度檢查**：確認沒有元件使用固定的 `width` (如 `width: 600px`)，尤其是在 `media query` 之外。
- [ ] **水平溢出測試**：使用手機瀏覽器或開發者工具 (320px 寬度) 測試是否有水平捲軸出現。

### 📊 Console 日誌輸出機制

```javascript
class DailyeatLogger {
    constructor(debugMode = false) {
        this.debugMode = debugMode;
    }

    setDebugMode(enabled) {
        this.debugMode = Boolean(enabled);
        return this;
    }

    log(level, message) {
        // 關鍵：只在 debug 模式或非 debug 等級時輸出
        if (!this.debugMode && level === 'debug') {
            return; // 不輸出 debug 訊息
        }
        // ...
    }

    debug(message) {
        if (this.debugMode) {
            this.log('debug', '🔍 ' + message);
        }
    }
}
```

## JavaScript Class 封裝模式

使用 IIFE 包裝避免全域污染

```javascript
// 使用 IIFE 包裝避免全域污染
(function (global) {
    'use strict';

    /**
     * 基礎服務類別 - 展示完整的 getter/setter chainable 模式
     */
    class DailyeatBaseService {
        constructor() {
            // 內部設定物件
            this._config = {
                apiUrl: null,
                timeout: 5000,
                debug: false,  // 關鍵需求：debug 參數
            };
            // ...
        }

        // =================
        // Getter 方法
        // =================
        getApiUrl() { /* ... */ }
        getDebug() {
            return this._config.debug;
        }
        getConfig() {
            return Object.assign({}, this._config); // 回傳完整設定的副本
        }

        // =================
        // Setter 方法 - 全部支援鏈式呼叫
        // =================
        setApiUrl(url) {
            // ... 驗證 ...
            this._config.apiUrl = url.trim();
            return this; // 支援鏈式呼叫
        }
        setDebug(debug) {
            this._config.debug = Boolean(debug);
            // ...
            return this;
        }

        // 批次設定方法
        setConfig(configObject) {
            // ...
            return this;
        }

        // ...
    }

    // 將類別掛載到全域物件
    global.DailyeatBaseService = DailyeatBaseService;

})(window);

// =================
// 使用範例 - 展示 chainable API
// =================

/*
// 基本鏈式呼叫 - 注意 debug 參數的使用
const service = new DailyeatBaseService()
    .setApiUrl('https://api.example.com')
    .setDebug(true)                 // 啟用除錯模式
    .validate()
    .execute();

// 正式環境使用 - 關閉除錯模式
const service2 = new DailyeatBaseService()
    .setConfig({
        apiUrl: 'https://api.example.com',
        debug: false                // 關閉除錯模式，不輸出 debug 訊息
    })
    .validate()
    .execute();

// 取得設定值 - 包含 debug 狀態
console.log('當前 debug 模式:', service.getDebug());  // 關鍵方法
*/
```

## 重要開發原則

- **確保你用適當的 JavaScript 類別和 IIFE 封裝來隔離程式碼**
- **特別重要：每一次的程式修改都要 100% 避免 breaking changes**
- **確保你寫的任何程式碼都是正式環境可用的**
- **強制要求：所有類別的參數和設定都必須使用 getter/setter 模式**
- **強制要求：所有 setter 方法都必須回傳 this 以支援鏈式呼叫**
- **關鍵需求：所有函式庫都必須包含 debug 參數控制除錯訊息顯示**
- **關鍵需求：debug=false 時絕對不能在 console 輸出除錯訊息**

## Getter/Setter 實作檢查清單

### ✅ 必要檢查項目

- [ ] 每個設定參數都有對應的 getter 和 setter 方法
- [ ] 所有 setter 方法都回傳 `this`
- [ ] 提供 `setConfig(object)` 批次設定方法
- [ ] **必須包含 `setDebug(boolean)` 和 `getDebug()` 方法**
- [ ] **debug 參數必須控制 console 除錯訊息的顯示/隱藏**
- [ ] **必須使用 Shadow DOM 封裝所有 CSS 和 JavaScript**
- [ ] **建立 Closed Shadow DOM（mode: 'closed'）**
- [ ] **絕對不將 CSS 注入到主頁面**
- [ ] **提供 destroy() 方法清理 Shadow DOM 資源**

---

# Part 2: 工作流與檢查清單 (Workflow & Checklist)

當您要為網站新增頁面，或重構舊有頁面以符合最新規範時，請按照以下步驟確保頁面完整且功能統一。

> **文章寫作指引請參考** 文件四 (`doc-4`) - 專注於內容結構、寫作風格、視覺化設計等內容層面

## 快速檢查清單

### 基礎結構

- [ ] 建立/檢查 HTML 檔案 (新頁面複製 `00template.html`)
- [ ] 設定/檢查正確的 `<title>` 與 `<meta>` 標籤
- [ ] 在 `<body>` 加入/檢查 `data-article-id` (需與 `articles-data.js` 對應)

### 組件與功能

- [ ] 加入/檢查 Header/Footer 組件
- [ ] **(新/重構)** 加入/檢查響應式目錄組件 (`ResponsiveTocComponent`) - 見下方詳細步驟
- [ ] **(新/重構)** 加入/檢查智慧推薦文章組件 (`RelatedArticlesComponent`) - 見下方詳細步驟
- [ ] 加入/檢查 GA4 分析組件
- [ ] 加入/檢查進度條、FAQ 等互動功能

### SEO 與結構化資料

- [ ] 設定/檢查 Article, WebSite, BreadcrumbList 的 JSON-LD
- [ ] 確認所有 JSON-LD 資料正確無誤

### 內容品質

- [ ] 檢查文章結構完整性（PSMA + 8個標準章節）- 見文件四
- [ ] 檢查 CSS 元件使用規則 (無行內樣式, Class 正確使用) - 見文件四
- [ ] 檢查視覺化元素（圖表、卡片等）
- [ ] 驗證所有內部連結正常

### 樣式與佈局

- [ ] 檢查全局 RWD 規則是否已應用 (卡片佈局、表格包裹) - 見文件四
- [ ] 驗證錨點連結 (`#hash`) 是否因 Header 遮擋 (需有 `scroll-margin-top`)

### 網站整合

- [ ] **(新頁面)** 更新 `articles-data.js` 中央資料庫
- [ ] **(新頁面)** 在至少 1-2 個舊頁面中，加入指向此 new 頁面的內部連結
- [ ] **(新頁面)** 更新 `sitemap.xml`
- [ ] **最終驗證** (跨瀏覽器、響應式、效能)

## 詳細步驟指引 (整合重構計畫)

### 1. 建立/檢查基本 HTML 結構

**新頁面標準作法：** 複製 `/post/00template.html` 範本檔案。

**重構頁面：** 檢查是否符合範本的基本結構。

### 2. 設定/檢查文章 ID

確保 `<body>` 標籤上已設定 `data-article-id`，且此 ID 與 `articles-data.js` 中的 `id` 完全對應。

```html
<!-- 範例 -->
<body data-article-id="card-vitamin-b">
```

### 3. 設定/檢查組件容器

確保在文章的 HTML 指定位置放置了必要的空的 `<div>` 容器：

- **響應式目錄容器 (Responsive TOC)**:
    - **位置**: 必須放置在 `<main>` 區塊的 `<header>` 標籤後，且位於 `<div class="article-hero">` 之後、`<article class="article-body">` 之前。
    - **程式碼**: `<div id="toc-mobile-target"></div>`
    - **範例**:
      ```html
      </header> <!-- header 結束 -->

      <div id="toc-mobile-target"></div> <!-- TOC 容器在此 -->
          
      <article class="article-body"> <!-- 文章主體開始 -->
      ```
- **智慧推薦文章容器 (Related Articles)**:
    - **位置**: 放在 `</article>` 標籤的**正上方**。
    - **程式碼**: `<div id="related-articles-container"></div>`
    - **重構注意**: 移除此位置原有的任何靜態推薦連結區塊。

### 4. 引入並初始化組件 (含 RWD 修正)

在頁面底部的 `<script>` 區塊，確保已正確引入組件腳本並初始化。

#### 引入腳本 (注意順序)

```html
<!-- 中央資料庫 (必須最先) -->
<script src="../assets/js/articles-data.js"></script> 
<!-- 組件腳本 -->
<script src="../assets/js/related-articles-component.js"></script>
<script src="../assets/js/responsive-toc-component.js"></script>
<!-- 其他組件... -->
```

#### 初始化程式碼 (DOMContentLoaded)

```javascript
document.addEventListener("DOMContentLoaded", function () {
  // --- 其他組件初始化 ---
  // 例如：Header/Footer, GA4 等...

  // --- 初始化智慧推薦組件 ---
  const relatedContainer = document.getElementById("related-articles-container");
  const articleId = document.body.dataset.articleId; 
  // 確保容器存在、組件已載入、資料也已載入
  if (relatedContainer && articleId && window.RelatedArticlesComponent && typeof articlesData !== 'undefined' && typeof topicArticles !== 'undefined') {
    try { // 加入錯誤處理
        new window.RelatedArticlesComponent(relatedContainer, articleId, articlesData, topicArticles).initialize();
    } catch (error) {
        console.error("智慧推薦組件初始化失敗:", error);
    }
  } else {
     // 可選：如果缺少必要元素，輸出警告
     if (!relatedContainer) console.warn("缺少智慧推薦組件容器: #related-articles-container");
     if (!articleId) console.warn("缺少 body[data-article-id]");
     // ... 其他檢查
  }

  // --- 初始化響應式目錄組件 ---
  if (window.ResponsiveTocComponent) {
     try { // 加入錯誤處理
        new window.ResponsiveTocComponent().initialize();
     } catch (error) {
         console.error("響應式目錄組件初始化失敗:", error);
     }
  } else {
      console.warn("響應式目錄組件 (ResponsiveTocComponent) 未載入");
  }

  // --- RWD 初始渲染問題修正 ---
  // 強制觸發 resize 事件，解決 Chrome DevTools 手機模式下的初始渲染問題
  // 延遲觸發以確保佈局穩定
  setTimeout(() => {
     console.log("觸發 resize 事件以修正 RWD 初始渲染...");
     window.dispatchEvent(new Event('resize'));
  }, 100); 

});
```

#### 重構注意：

- 確保舊頁面中若有手動實現類似功能的 JS 程式碼已被移除。
- 檢查 CSS 中是否移除了舊的 `@media (max-width: 1024px)` 中隱藏 sidebar (`display: none`) 的規則，否則新組件無法正常顯示。

### 5. 更新中央資料庫 (`articles-data.js`) - 僅限新頁面

若為新增文章，務必在 `articlesData` (核心營養素) 或 `topicArticles` (主題式) 陣列中，為新文章新增一筆完整的物件資料，特別是 `id`, `link`, `title`, `goals` 等欄位。`goals` 欄位將影響智慧推薦的準確性。

### 6. 目錄 (TOC) 結構與連結修正

- **階層式結構**: 根據文件四規範，為次要章節 (通常是 `<h3>` 對應的連結) 在目錄的 `<a>` 標籤上加上 `.sub-item` class。
- **納入 `<h3>` 標籤**: 確保目錄生成邏輯 (無論是手動或自動) 包含文章中的 `<h3>` 標籤，並套用 `.sub-item` 樣式。
- **錨點連結 CSS**: 檢查全域 CSS 或頁面 `<style>` 中是否包含 `[id] { scroll-margin-top: 100px; }` (或類似數值)，防止標題被固定 Header 遮擋。 (見文件四詳細說明)
- **相關營養素連結**: 目錄中「相關營養素」的連結**必須**指向智慧推薦組件的容器 ID：`href="#related-articles-container"`。

---

# Part 3: 內容戰略與設計系統 (Content & Design System)

這份文件旨在為所有「營養百科」的文章建立一套統一、高標準的風格與結構。遵循此指引將有助於我們產出高品質、風格一致且對讀者極具吸引力的內容。

> **技術檢查清單請參考** 文件三 (`doc-3`) - 專注於 HTML 結構、SEO 設定、組件整合等技術層面

## 第一章：核心原則

### 總體風格與核心理念

文章的整體風格應為**「專業、親切且易於行動」**。我們透過專業的口吻建立權威，同時用生活化的比喻和清晰的視覺設計拉近與讀者的距離，並在文末提供明確的指引。

## 第二章：內容策略與結構

### 內容架構策略：Hub-and-Spoke 模型

為了建立網站的「主題權威 (Topical Authority)」，我們的內容採用「Hub-and-Spoke」（軸心輻射）模型。此策略旨在將獨立的文章頁面整合成一個緊密連結的知識網絡，從而提升 SEO 表現與使用者體驗。

-   **Hub (軸心)**：高層次的「主題彙整頁面」，圍繞一個特定的健康目標（如：心血管健康）。這些頁面是流量的入口和權重分發的核心。
    -   *位置*: `post/topic-*.html`

-   **Spoke (輻射)**：基礎的「元素頁面」，深入探討單一營養素或食物。這些頁面提供深度和專業性。
    -   *位置*: `post/[nutrient].html`, `food/[food-name].html`

#### 內部連結實踐指南 (Internal Linking Strategy)

這是將 Hub-and-Spoke 模型付諸實踐的關鍵。所有作者在撰寫文章時，都必須遵循以下的連結策略：

1.  **原則一：由上而下 (Top-Down Linking)**
    -   **說明**: 在撰寫「主題頁面 (Hub)」時，必須找到所有機會，將內文的關鍵字連結到對應的「元素頁面 (Spoke)」。
    -   **範例**: 在 `topic-cardiovascular-health.html` 中，當提到 Omega-3 的好處時，必須將「Omega-3」或「魚油」文字連結到 `fish-oil.html`。當提到建議食物時，必須將「鮭魚」連結到 `food/salmon.html`。

2.  **原則二：由下而上 (Bottom-Up Linking)**
    -   **說明**: 在撰寫「元素頁面 (Spoke)」時，必須思考此頁面能為哪個「主題頁面 (Hub)」提供支持，並在文章開頭或結尾處連回答該主題頁。
    -   **範例**: 在 `fish-oil.html` 的介紹中，可以加上：「魚油是維持**心血管健康**最重要的營養素之一...」，並將「心血管健康」連結到 `topic-cardiovascular-health.html`。

3.  **原則三：水平連結 (Horizontal Linking)**
    -   **說明**: 在撰寫「元素頁面」時，若提到其他相關的營養素或食物，應建立水平連結。
    -   **範例**: 在 `vitamin-d.html` 頁面中提到「維生素D有助於鈣質吸收」時，應將「鈣質」連結到 `calcium.html` 頁面。

**效益**: 此架構能有效地向搜尋引擎證明我們在特定主題的專業度，並透過連結傳遞頁面權重，同時引導使用者在站內進行深度探索。

### 指導性文章結構 (Recommended Structure)
每篇文章都應**參考**以下標準結構，以確保內容的完整性與核心主題的覆蓋。這是一個**指導性框架而非強制規則**，我們鼓勵在涵蓋核心模組的基礎上，根據主題增加如「快速總覽」、「季節性需求」、「延伸反思」等更具吸引力的章節。
. 頁面標題與導覽 (H1 & Breadcrumb)

1.1 權威型長標題 (H1 Strategy)
核心邏輯： 標題即摘要。H1 必須包含核心關鍵字，並使用「多重價值堆疊」策略，讓讀者一眼看見 4 種以上的具體功效。
撰寫公式：
[核心關鍵字] [強烈動詞/定義]：[功效1]、[功效2]、[功效3]與[功效4]... [目標族群/終極指南]
規範要求：
關鍵字前置： 核心關鍵字（如「鈣片」、「葉黃素」）必須位於標題最前方。
功效堆疊 (Benefit Stacking)： 必須列出 >3 個 具體好處（例：預防骨折、改善抽筋、幫助睡眠）。
長度無上限： 不要縮減標題長度，重點在於資訊密度。
正確範例
鈣片功效總整理：不只補骨預防骨折！還能改善抽筋、幫助睡眠、穩定情緒與調節血壓的完整解析
1.2 麵包屑導覽 (Breadcrumb)
為統一全站結構並優化 SEO，所有文章頁面的麵包屑導覽（Breadcrumb）都必須遵循統一的**「首頁 > 文章標題」**兩層式扁平結構。

#### A. HTML 標準結構
**位置**: `article-hero` 區塊內，`h1` 標籤的上方。
```html
<nav class="breadcrumb">
  <a href="../index.html">首頁</a><span class="separator">/</span><span>{文章完整標題}</span>
</nav>
```

#### B. JSON-LD 標準結構
**位置**: `<head>` 區塊內。
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "營養百科",
    "item": "https://dailyeat.tw/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "{文章完整標題}",
    "item": "{文章絕對網址}"
  }]
}
</script>
```

#### C. 實作細節
- **`{文章完整標題}`**: 必須與頁面的 `<title>` 標籤內容（移除 ` | 營養百科` 後綴）保持一致。
- **`{文章絕對網址}`**: 必須填入該頁面的絕對正規網址（Canonical URL）。
- **一致性**: HTML `<span>` 中的標題文字與 JSON-LD 中 `position: 2` 的 `name` 必須完全相同。

2. 內文核心模組 (Core Content Modules)
建議文章涵蓋以下核心模組，並可彈性調整標題與順序。每個模組對應特定的讀者問題與 UI 元件。
Module 1: 基本資訊與定義
標題： <h2> [營養素]是什麼？
SEO 目的： 爭取 Google 精選摘要 (Featured Snippet) 的定義位置。
內容結構：
<h3> 定義與化學分類 (簡短、權威解釋)。
<h3> 關鍵類型比較 (例：檸檬酸鈣 vs. 碳酸鈣)。

Module 2: 核心功效總覽
標題： <h2> [營養素]對人體有哪些好處？
UI 元件： <div class="info-cards">
SEO 目的： 滿足主要搜尋意圖 (Search Intent)。
規範要求：
必須列出 5~8 點 功效（嚴禁少於 3 點）。
每點功效需附帶機制說明或醫學實證。

Module 3: 攝取量與時間
標題： <h2> 每日建議攝取量與最佳時間
SEO 目的： 回答具體操作 (How-to) 問題，增加長尾關鍵字。
內容結構：
<h3> 官方建議攝取量 (引用 DRIs 標準)。
<h3> 最佳攝取時間 (飯前/飯後/睡前及其原因)。

Module 4: 食物來源
標題： <h2> 哪些天然食物富含[營養素]？
UI 元件： <div class="data-table">
SEO 目的： 增加內容豐富度，提供非補充品的替代方案。
規範要求： 表格需列出食物名稱及每 100g 含量。

Module 5: 缺乏警訊與高風險族群
標題： <h2> 誰最需要補充？[營養素]缺乏的警訊
UI 元件： <div class="risk-group-cards">
SEO 目的： 觸發讀者自我檢測心理，提高轉換動機。
內容結構： 列出具體缺乏症狀（如指甲易斷、嘴角破裂）及高風險族群。

Module 6: 產品挑選指南 (導購核心)
標題： <h2> 如何挑選[營養素]補充品？
UI 元件： <div class="comparison-table"> 或 CheckList
SEO 目的： 展現專業評測能力 (Expertise)，引導購買決策。
內容重點： 劑量、劑型選擇、複方搭配建議、專利原料認證。

Module 7: 風險與禁忌
標題： <h2> [營養素]的副作用與藥物交互作用
SEO 目的： 建立信任感 (Trust)，揭露風險是符合 E-E-A-T 的關鍵。
內容結構：
<h3> 過量攝取的副作用。
<h3> 藥物交互作用 (如：與抗生素、抗凝血劑的衝突)。

Module 8: 常見問題 (FAQ)
標題： <h2> 常見問題
Schema 標記： 需在此區塊實作 FAQPage Schema。
規範要求： 收錄 PAA (People Also Ask) 中最熱門的 3-5 個問題。

Module 9: 延伸閱讀
系統功能： 指向 #related-articles-container
SEO 目的： 增加站內停留時間與頁面權重傳遞。

備註： 所有 CSS Class (.info-cards, .data-table, .risk-group-cards, .comparison-table) 需在前端樣式表中定義對應的響應式設計。
##### 章節開場白原則 (整合 Checklist 強調)


為確保內容流暢易讀，請務必遵循以下原則：
- **豐富引言內容**: 確保每一個 `<h2>` 和 `<h3>` 標籤後，都有一段**內容豐富**的 `<p>` 引言+說明。避免標題後直接就是列表、表格或卡片。
- **強化引導性**: 引言段落應扮演**承上啟下**的角色，為讀者提供必要的背景知識、情境鋪陳，或點出該章節要解決的核心問題，讓讀者更容易進入章節的核心內容。
- **避免生硬陳列**: 嘗試透過更具吸引力的**比喻或提問**來開頭，讓資訊的流動更順暢，提升文章的整體閱讀體驗與專業感。

### 內容與語氣
1.  **專業口吻**：適時使用「**營養師提醒**」、「**醫師警告**」等提示框。
2.  **善用比喻**：例如：*維生素B群是身體的「能量轉換器」。*
3.  **強調重點**：使用 `<strong>` 或 `<span class="highlight-nutrient">` 來凸顯。
4.  **禁止圖示 (Icon) 使用**：**嚴格禁止在文章內使用任何裝飾性圖示（包含 Emoji）**，以確保專業與整潔的視覺風格。

### 5. 內容專業化與優化技巧 (Content Professionalization)

為符合 2026 年 Google E-E-A-T (經驗、專業、權威、信任) 的高標準，請遵循以下原則：

#### A. 提升學術權威感 (Expertise)
-   **LaTeX 提升質感**：生化機制或化學成分建議使用 LaTeX 呈現（如 $EPA (C_{20}H_{30}O_2)$、吸收率公式），大幅提升視覺專業度。
-   **強制引用文獻**：每篇知識文**至少引用 2-3 個權威來源** (PubMed, NIH, REDUCE-IT 試驗等)，並使用腳註或超連結標註。

#### B. 建立信任感 (Trust)
-   **負面提醒 (Negative Disclaimers)**：主動說明「誰不能吃」或「魚油無法取代藥物」。這種「反向操作」能證明我們是客觀的知識提供者，而非單純推銷。

#### C. 資訊增益 (Information Gain)
Google 偏好獨創內容。文章中應包含：
-   **原創圖表**：如「交互作用紅綠燈」、「成本效益對照表」。
-   **獨特觀點**：如結合「中醫血瘀體質」或「台灣氣候保存建議」等在地化/跨領域視角。

#### D. Giveaway Summary (白話摘要)
**[2026 SEO 核心規則]** 嚴格執行：在每個 **H2 標題下方**，必須緊接著一段 **50-80 字** 的 `<p>` 結論摘要，直接回答標題問題。
-   *格式*：「**白話摘要**：(直接回答 + 簡短原因/機制)」。
-   *目的*：搶佔 Google 第 0 位精選摘要 (Featured Snippets)。

#### E. 使用者轉化與商業邏輯 (UX & Business)
-   **轉化漏斗連結**：
    1.  **支柱文章** (流量入口) ➜ 導流至 **SOP**。
    2.  **SOP** (教育選擇) ➜ 導流至 **產品評測**。
    3.  **產品評測** (購買決策) ➜ 導流至 **商品頁**。
-   **分眾 CTA (Call to Action)**：文末提供高價值誘因（如「健康 ROI 計算表」、「檢驗報告查核清單」PDF）以獲取名單。



#### TOC 目錄結構建議 (整合 Checklist 強調)

TOC 現已支援兩層式結構，並應包含 `<h3>` 標籤以提供更詳細的導航。
- **階層式結構**: 在目錄的 `<ul>` 列表中，為屬於子項目 (通常對應 `<h3>`) 的 `<a>` 標籤加上 `sub-item` class。
- **納入 `<h3>` 標籤**: 目錄應包含文章中的 `<h3>` 標籤，並套用 `.sub-item` 樣式。
- **錨點連結修正**:
    - **CSS**: 樣式表中必須包含 `[id] { scroll-margin-top: 100px; }` 規則 (見下方詳細說明)。
    - **連結目標**: 「相關營養素」的目錄連結必須指向 `#related-articles-container`。

```html
<ul class="toc-list">
  <!-- 主項目 (H2) -->
  <li><a href="#problem" class="toc-link">您有這些困擾嗎？（Pain）</a></li>
  <li><a href="#solution" class="toc-link">解方與核心效益（Solution）</a></li>
  
  <!-- 子項目 (H3) -->
  <li><a href="#mechanism" class="toc-link">[營養素]如何運作？</a></li>
  <li><a href="#mechanism-type-a" class="toc-link sub-item">類型 A 的機制</a></li> <!-- 假設有 H3 -->
  <li><a href="#mechanism-type-b" class="toc-link sub-item">類型 B 的機制</a></li> <!-- 假設有 H3 -->

  <li><a href="#related-articles-container" class="toc-link">相關營養素</a></li>
</ul>
```

##### 錨點連結滾動偏移重構說明 (CSS scroll-margin-top)

本節詳細說明為何及如何使用 CSS `scroll-margin-top` 屬性來解決固定 Header 遮擋錨點內容的問題，取代舊有的 JavaScript 解決方案。

1.  **問題背景：Header 遮擋錨點內容**
    當頁面頂部有固定 Header 時，點擊錨點連結會導致目標區塊被 Header 遮擋。
2.  **舊有解決方案（JavaScript 方式）**
    透過 JavaScript 阻止預設行為，計算位置並手動調整滾動偏移。
3.  **新的解決方案（CSS `scroll-margin-top` 方式）**
    使用 CSS `scroll-margin-top` 屬性指示瀏覽器在滾動到錨點時保留頂部空間。
    - **`[id] { scroll-margin-top: 100px; }` 的解釋**：選取所有帶 `id` 的元素，並在其上方保留 100px 的滾動邊距，以避開 Header。
4.  **新方法（CSS）的優勢**
    - **簡潔與易維護**：一行 CSS 取代複雜 JS。
    - **效能更佳**：瀏覽器原生支援，更流暢。
    - **更具彈性**：無需事件監聽，動態內容也有效。
    - **職責分離**：視覺呈現交由 CSS 處理。
5.  **整體修改邏輯與步驟 (Refactor Plan)**
    這次重構旨在將錨點滾動偏移的處理從 JavaScript 轉換為 CSS，提升程式碼品質和可維護性。主要步驟如下：
    1.  **[已完成] 在範本中添加 CSS 規則** (`post/00template.html`):
        - 添加 `[id] { scroll-margin-top: 100px; }` 規則，讓所有文章頁面自動獲得滾動偏移效果。
    2.  **[待執行] 移除各頁面中冗餘的 JavaScript 程式碼** (`post/*.html`):
        - 找出並移除各文章頁面底部 `<script>` 區塊中，用於處理錨點點擊、計算偏移和執行 `window.scrollTo` 或類似平滑滾動功能的 JavaScript 程式碼。
    3.  **[已完成] 移除組件中冗餘的 JavaScript 程式碼** (`assets/js/health-topics-logic.js`):
        - 移除該組件中處理內部錨點跳轉的手動滾動邏輯，確保行為統一由 CSS 控制。


## 第三章：技術與格式化規範

### 格式化與常用 CSS Class

> **重要規則：**
>
> 1.  **優先使用 Class**: 應優先使用功能性或通用的 CSS Class 來定義樣式。
> 2.  **有限度使用行內樣式**: 避免使用 `style="..."` 屬性處理複雜樣式。僅在無法由 Class 控制的**動態樣式**（如由 JS 計算的寬度）或**極個別的單次排版需求**（如 `text-align: center`）時，才可有限度地使用。
> 3.  **禁止裝飾性圖示**: **嚴格禁止在文章內使用任何裝飾性圖示（包含 Emoji）**。
> 4.  **例外：CSS 變數**：唯一允許使用 `style` 屬性的情境，是為了傳遞動態數值給 CSS 變數，例如 `style="--percent: 40%;"`。

#### 1. 提示框 (`.alert`)

**樣式說明**: 提示框透過背景色與邊框顏色區分層級，不使用額外的圖示裝飾。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 提示框](ui-components-library.md#1-提示框-alerts)

#### 2. 資訊卡片 (`.info-cards`)

用於並列呈現核心觀點或功效。**建議每個區塊使用 2-4 張卡片**以獲得最佳視覺平衡。可搭配 `.md-grid-N` 通用類別來控制桌面版的欄數。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 資訊卡片](ui-components-library.md#2-資訊卡片-info-cards)

#### 3. 需求自我檢測 (`.quick-test`)

**[新建議]** 此互動式元件是 `.risk-group-cards` 的**進階替代方案**，透過讓使用者勾選符合的選項，能更有效地引發讀者共鳴，觸發其自我檢測心理。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 需求自我檢測](ui-components-library.md#3-需求自我檢測-quick-test)

#### 4. 比較表格 (`.data-table`)

**大多數情況下**，普通表格都**必須**用 `<div class="responsive-table-wrapper">` 包裹，以確保在行動裝置上可以橫向滾動。

**例外情況**：若表格已置於其他本身就提供滾動功能的容器中（例如 `.comparison-table-container`），則可不必重複包裹。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 表格](ui-components-library.md#4-表格-tables)

#### 5. 進階比較表格 (`.comparison-table`)

外部容器 `.comparison-table-container` 已包含 `overflow-x: auto`，無需再包裹 `.responsive-table-wrapper`。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 進階比較表格](ui-components-library.md#進階比較表格-comparison-table)

#### [新] 可折疊專業洞察卡 (`.professional-insight-card`)
此元件使用 HTML 原生的 `<details>` 與 `<summary>` 標籤，提供一種無需 JavaScript 即可實現的「點擊展開」互動功能。它非常適合用來收納較為深入、專業，但非所有讀者都感興趣的內容（例如：詳細的病理機制、次要的研究數據等）。
- **目的**：在保持主文流程簡潔的同時，提供給想深入了解的讀者一個探索的入口。
- **優點**：原生、輕量、SEO友好。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 專業洞察卡](ui-components-library.md#5-專業洞察卡-professional-insight-card)

#### 6. [新] 視覺化劑量圖 (`.dosage-infographic-container`)
用於以視覺化卡片呈現不同族群的建議劑量與成分比例。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 視覺化劑量圖](ui-components-library.md#6-視覺化劑量圖-dosage-infographic)

#### 7. [新] 步驟指南 (`.step-guide-container`)
用於呈現有順序性的流程，例如產品的挑選步驟，透過視覺化的時間軸引導讀者。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 步驟指南](ui-components-library.md#7-步驟指南-step-guide)

#### 8. [新] 正反列表 (`.dos-donts-container`)
用於清晰地並列呈現「建議做」與「不建議做」的清單，視覺對比強烈。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 正反列表](ui-components-library.md#8-正反列表-dos--donts)

#### 9. [新] SVG 視覺化圖表
透過內嵌 SVG，可以創造更豐富、更具互動性的視覺化圖表，例如圓餅圖或長條圖。

> 📋 **代碼範例**：請參考 [UI 元件庫 - SVG 視覺化圖表](ui-components-library.md#9-svg-視覺化圖表)

#### 10. [新] 食物排行榜 (`.food-ranking-container`)
用於列出富含特定營養素的食物排名，以圖文並茂的方式呈現數值，增加可讀性。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 表格](ui-components-library.md#4-表格-tables)

#### 11. [新] 流程圖 (`.flowchart`)
用於展示病理機制、代謝過程或因果關係的扁平化流程圖。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 流程圖](ui-components-library.md#7-流程圖-flowchart-新)

#### 12. [新] 系統診斷圖 (`.debug-map`)
用於展示「症狀 -> 原因 -> 解方」的多對多關係網狀圖，適合複雜的健康問題分析。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 系統診斷圖](ui-components-library.md#8-系統診斷圖--關聯圖-debug-map-新)

#### 13. [新] 故事引言 (`.story-intro`)
用於文章開頭，透過感性或情境式的故事帶入主題，增加閱讀沉浸感。
**樣式更新**：採用白色卡片設計搭配橘色強調線 (`var(--primary-color)`)，呈現清爽專業的視覺效果。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 文章元素](ui-components-library.md#12-文章元素)

#### 14. [新] 速讀卡片 (`.quick-read-card`)
用於提供長篇文章的「30秒精華摘要」，通常位於文章前段，方便讀者快速掌握重點。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 文章元素](ui-components-library.md#12-文章元素)

#### 15. [新] 免責聲明 (`.disclaimer`)
統一的頁尾免責聲明樣式，確保合規性。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 文章元素](ui-components-library.md#12-文章元素)

#### 16. [新] 內部導覽卡片 (`.nav-link-card`)
用於文章內部的深度導覽連結，區別於普通資訊卡片。具備左側識別條與明確的「閱讀更多」行動呼籲 (CTA)。
- **預設樣式**：橘色識別條 (與主色調一致)
- **變體樣式**：
    - `.variant-blue`：藍色識別條 (適合副作用、機轉等冷靜主題)
    - `.variant-rose`：玫瑰色識別條 (適合女性、警示等主題)

> 📋 **代碼範例**：
```html
<div class="nav-link-cards">
  <a href="./target-page.html" class="nav-link-card">
    <div class="nav-link-title">標題</div>
    <p class="nav-link-desc">描述文字...</p>
    <div class="nav-link-action">閱讀完整指南 <span>&rarr;</span></div>
  </a>
</div>
```

#### 17. 全局響應式設計 (Global RWD) - 整合 Checklist

**目標**: 整合並標準化全站的響應式設計規則，提升在所有裝置上的瀏覽體驗與未來可維護性。

##### 核心 CSS 規則

```css
/* ============================================= */
/* == 全局 RWD 與佈局標準化 (Global RWD)    == */
/* ============================================= */

/* 1. 通用盒模型與文字換行 */
* { box-sizing: border-box; }
p, td, th, li, a { word-break: break-word; }

/* 2. 響應式媒體 */
img, svg { max-width: 100%; height: auto; }

/* 3. 響應式表格容器 */
.responsive-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
}

/* 4. 行動版優先的卡片容器 */
.info-cards, .risk-group-cards {
    display: flex; /* 改用 Flexbox 配合 CSS Grid utility */
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 自動適應 */
    gap: 20px;
    margin: 30px 0;
}

/* 5. 桌面版佈局 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
}
```

##### HTML 實作方式

- **卡片佈局**: 為 `.info-cards` (建議 `.md-grid-2`) 或 `.risk-group-cards` (建議 `.md-grid-3`) 容器加上對應的 Utility Class。
- **表格**: **所有**的普通 `<table class="data-table">` 元素，都**必須**被一個 `<div class="responsive-table-wrapper">` 包裹起來。

##### 執行檢查 (重構時)

- [ ] 檢查所有卡片佈局 (`.info-cards`, `.risk-group-cards`)，移除舊的行內樣式或特定欄數 class，換上標準的 `.md-grid-N` Utility Class。
- [ ] 檢查所有 `<table class="data-table">`，確保都已被 `responsive-table-wrapper` `<div>` 包裹。
- [ ] 在手機模擬器中，檢查頁面，確保卡片佈局正常（手機單欄，桌面多欄）且表格內容可橫向滾動，無頁面級橫向滾動條。

### SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">`。
2.  **JSON-LD 結構化資料**：**此為必填項目**。包含 `Article`, `WebSite`, `BreadcrumbList`。
3.  **全站品牌識別 (Site Name) 設定**。

## 第五章：資源與範例

### 完整範例庫

更多完整範例（如：鈣質文章示範、迷思破解卡片、視覺化圖表等），請直接參考獨立文件：

> 🔗 [UI 元件程式碼範例庫 (ui-components-library.md)](ui-components-library.md)

### CSS 類別快速參考

此處列出規範中提到的所有自訂 CSS 類別，應統一放在全域 CSS 檔案中。

```css
/* 主題 (玫瑰色系) */
.theme-rose { /* --primary-color: #be123c ... */ }

/* 提示框 */
.alert-tip { background: #f0fdf4; color: #14532d; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #991b1b; }

/* 資訊卡片 CSS */
.info-card {
    /* ... */
}

/* 響應式表格 */
.responsive-table-wrapper { /* ... */ }

/* 響應式網格 (桌面版) */
@media (min-width: 768px) {
  .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
  .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
  .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
}

/* 卡片主題 (迷思破解) */
.card-theme-myth { /* ... */ }

/* 新增組件 */
.story-intro { /* ... */ }
.quick-read-card { /* ... */ }
.disclaimer { /* ... */ }
.step-guide-container { /* ... */ }
.dos-donts-container { /* ... */ }
.food-ranking-container { /* ... */ }
.flowchart { /* ... */ }
.debug-map { /* ... */ }
.professional-insight-card { /* ... */ }
.dosage-infographic-container { /* ... */ }

/* 錨點偏移 */
[id] { scroll-margin-top: 100px; }
```

#### 7. [新] 步驟指南 (`.step-guide-container`)
用於呈現有順序性的流程，例如產品的挑選步驟，透過視覺化的時間軸引導讀者。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 步驟指南](ui-components-library.md#7-步驟指南-step-guide)

#### 8. [新] 正反列表 (`.dos-donts-container`)
用於清晰地並列呈現「建議做」與「不建議做」的清單，視覺對比強烈。

> 📋 **代碼範例**：請參考 [UI 元件庫 - 正反列表](ui-components-library.md#8-正反列表-dos--donts)

#### 9. [新] SVG 視覺化圖表
透過內嵌 SVG，可以創造更豐富、更具互動性的視覺化圖表，例如圓餅圖或長條圖。

##### SVG 圓餅圖範例 (`.concentration-chart-container`)
> 📋 **代碼範例**：請參考 [UI 元件庫 - SVG 視覺化圖表](ui-components-library.md#9-svg-視覺化圖表)

</div>



#### 14. 全局響應式設計 (Global RWD) - 整合 Checklist

**目標**: 整合並標準化全站的響應式設計規則，提升在所有裝置上的瀏覽體驗與未來可維護性。

##### 核心 CSS 規則

```css
/* ============================================= */
/* == 全局 RWD 與佈局標準化 (Global RWD)    == */
/* ============================================= */

/* 1. 通用盒模型與文字換行 */
* { box-sizing: border-box; }
p, td, th, li, a { word-break: break-word; }

/* 2. 響應式媒體 */
img, svg { max-width: 100%; height: auto; }

/* 3. 響應式表格容器 */
.responsive-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
}

/* 4. 行動版優先的卡片容器 */
.info-cards, .risk-group-cards {
    display: flex;
    flex-direction: column; /* 手機預設單欄 */
    gap: 20px;
    margin: 40px 0;
}
.info-card, .risk-card { flex: 1; min-width: 250px; }

/* 5. 桌面版佈局 Utility Classes */
@media (min-width: 768px) {
    .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
    .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
    .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
    .md-flex-row { flex-direction: row; } /* (較少用，grid 優先) */
}
```

##### HTML 實作方式

- **卡片佈局**: 為 `.info-cards` (建議 `.md-grid-2`) 或 `.risk-group-cards` (建議 `.md-grid-3`) 容器加上對應的 Utility Class。
- **表格**: **所有**的普通 `<table class="data-table">` 元素，都**必須**被一個 `<div class="responsive-table-wrapper">` 包裹起來。

##### 執行檢查 (重構時)

- [ ] 檢查所有卡片佈局 (`.info-cards`, `.risk-group-cards`)，移除舊的行內樣式或特定欄數 class，換上標準的 `.md-grid-N` Utility Class。
- [ ] 檢查所有 `<table class="data-table">`，確保都已被 `responsive-table-wrapper` `<div>` 包裹。
- [ ] 在手機模擬器中，檢查頁面，確保卡片佈局正常（手機單欄，桌面多欄）且表格內容可橫向滾動，無頁面級橫向滾動條。

### SEO 與 Metadata

這是確保文章能被搜尋引擎正確索引的關鍵步驟。

1.  **基礎 Meta 標籤**：確實填寫 `<title>`、`<meta name="description">`。
2.  **JSON-LD 結構化資料**：**此為必填項目**。包含 `Article`, `WebSite`, `BreadcrumbList`。
    -   **進階 Schema (2026 SEO 必備)**：
        -   **SOP/教學文**：務必部署 `HowTo Schema`，標示步驟圖文。
        -   **產品評測 (Review)**：務必部署 `Product` 與 `Review Schema`，呈現星星評分與價格區間。
        -   **醫療知識 (QA)**：QA 區塊務必部署 `FAQPage Schema`。
3.  **全站品牌識別 (Site Name) 設定**。

## 第五章：資源與範例

### 完整範例庫

更多完整範例（如：鈣質文章示範、迷思破解卡片、視覺化圖表等），請直接參考獨立文件：

> 🔗 [UI 元件程式碼範例庫 (ui-components-library.md)](ui-components-library.md)

### CSS 類別快速參考

此處列出規範中提到的所有自訂 CSS 類別，應統一放在全域 CSS 檔案中。

```css
/* 提示框 */
.alert-tip { background: #fffbeb; color: #b45309; }
.alert-nutritionist { background: #eff6ff; color: #1e40af; }
.alert-doctor { background: #fef2f2; color: #b91c1c; }

/* 資訊卡片 CSS */
.info-card {
    flex: 1; 
    min-width: 280px; 
    max-width: calc(50% - 10px); /* 2 欄 */
    /* ... */
}

/* 風險卡片 */
.risk-card {
     flex: 1; 
     min-width: 250px; 
     max-width: calc(33.333% - 14px); /* 3 欄 */
     /* ... */
}


/* 高亮關鍵字 */
.highlight-nutrient { /* ... */ }

/* 響應式表格 */
.responsive-table-wrapper { /* ... */ }

/* 響應式網格 (桌面版) */
@media (min-width: 768px) {
  .md-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
  .md-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
  .md-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
}

/* 卡片主題 (迷思破解) */
.card-theme-myth { /* ... */ }
.title-theme-myth { /* ... */ }

/* CSS 變數模式 (動態寬度) */
.absorption-bar-fill { width: var(--absorption-percent, 0%); /* ... */ }

/* TOC 子項目 */
a.sub-item { /* ... */ }

/* 錨點偏移 */
[id] { scroll-margin-top: 100px; } /* [修改] 應用於所有帶 ID 的元素 */

/* 新增組件 */
.story-intro { /* ... */ }
.quick-read-card { /* ... */ }
.disclaimer { /* ... */ }
.step-guide-container { /* ... */ }
.dos-donts-container { /* ... */ }
