# 任務：桌面版懸浮同步目錄 (Sticky & Sync TOC)

## 目標
在桌面版瀏覽時，實現左側目錄 (TOC) 「懸浮固定 (Sticky)」的效果，並隨使用者捲動閱讀進度，「同步高亮」當前章節。

## 現狀分析
- **CSS**: `assets/css/article.css` 中似乎已有 `.sidebar { position: sticky; }` 的設定，需確認為何未生效或不當。
- **JS**: `responsive-toc-component.js` 目前僅處理 RWD 移動 (Mobile/Desktop 切換) 與手風琴開關，**缺失 ScrollSpy (捲動監聽) 功能**。

## 執行步驟

### 1. 診斷與修復 CSS (Layout & Sticky)
- [x] **檢查容器結構**：已將 `.article-container` 改為 `display: flex; align-items: flex-start;` 以確保側邊欄高度獨立。
- [x] **檢查溢出屬性**：已移除 `body` 與 `html` 的 global `overflow-x: hidden` 設定。
    > **Status**: 使用者回報失敗。主因可能為：
    > 1. 隱藏的父層 overflow 設定 (Hidden Parent Overflow)。
    > 2. 瀏覽器或裝置特定的 Rendering Context 問題。
    > 3. 行內樣式 (Inline Styles) 干擾。
- [x] **調整 Sticky 參數**：`top` 已設為 `120px`，`max-height` 設為 `calc(100vh - 140px)`。

### 2. 實作 ScrollSpy 同步功能 (JavaScript)
- [x] **實作 IntersectionObserver**：`responsive-toc-component.js` 已新增 `initScrollSpy` 功能。
- [x] **雙向綁定邏輯**：已實作 active class 切換與側邊欄自動捲動。

### 3. 優化當前狀態樣式 (CSS)
- [x] **Active 樣式設計**：已增強 `.toc-list a.active` 視覺與縮排效果。

### 4. 驗證與測試
- [ ] **桌面版測試**：目前回報失敗 (Failed)，暫停執行。
- [ ] **手機版測試**：RWD 行為尚待確認。

## 異常排查紀錄 (Troubleshooting Log)
**狀態**: ⛔ 暫停 (On Hold) - 無法實現 Sticky 效果
**日期**: 2026-01-21

### 已嘗試的修復 (Attempted Fixes)
1.  **Layout 轉換**: `grid` -> `flex` (確保 `.article-container` 不會強制拉伸 sidebar 高度)。
2.  **移除 Overflow**: 移除了 `html` 與 `body` 的 `overflow-x: hidden` (最常見的 sticky 殺手)。
3.  **Inline Style 清理**: 註解掉了 `post/fish-oil.html` header 中針對 mobile 的 inline style (原本含有 `!important` 的 overflow 設定)。

### 疑難焦點與可能原因 (Possible Root Causes)
雖然程式碼面上看起來符合 `position: sticky` 的所有規範，但瀏覽器實測仍失效。可能原因如下：

1.  **隱藏的 Overflow 父層**: 
    - 除了 `html/body`，可能還有其他 wrapper (如 `#header-component` 或其他動態注入的 div) 擁有 `overflow: hidden/auto/scroll` 屬性。
    - **Sticky 原理**: 只要任何一個祖先元素限制了滾動 (scroll context)，sticky 就會失效（變回 relative 或 static）。

2.  **高度問題 (Height Issue)**:
    - 若 `align-items: flex-start` 未生效，或者 `.sidebar` 的高度因為內容較少而等於或是超過了父容器的高度，sticky 就沒有「滑動空間」。
    - **檢查點**: 需確認 `.sidebar` computed height < `.article-container` computed height。

3.  **瀏覽器/環境特例**:
    - 某些瀏覽器插件或特定的 User Agent stylesheet 可能干擾。

### 後續建議 (Next Steps when Resuming)
若未來要重啟此任務，建議直接進行「手術式排查」：
1.  **使用 F12 Computed**: 逐層檢查 `.sidebar` 的所有父元素，尋找 `overflow: hidden`。
2.  **最小化重現 (Minimal HTML/CSS)**: 建立一個乾淨的 `test_sticky.html`，只保留 `.article-container` 結構，確認是否能運作。
    - 若能運作 -> 代表是用戶專案中其他 CSS (如 Tailwind reset 等) 造成的污染。
    - 若不能運作 -> 代表基本的 Layout 結構有誤。
