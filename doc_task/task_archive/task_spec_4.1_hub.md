# 任務名稱：Hub Page (Command Center) 實作與優化 - V3 原子化規格書

**狀態**: 規劃確認中
**負責人**: @Antigravity
**戰略目標**: 將此頁面打造為「流量轉運站」，透過原子化的功能組件，將模糊的搜尋意圖轉化為精準的深度閱讀點擊。

---

## 1. 原子組件規格 (Atomic Component Specs)

### A1. Hero Section (正面權威引導 - 純文字版)
- [x] **Layout**: 移除圖片，採用置中、精簡的純文字排版，減少視覺干擾。
- [x] **視覺標語 (H1)**: 「魚油怎麼選？別再看無效的罐頭文章。用科學數據，找到真正適合你的 Omega-3 方案。」
- [x] **副標題**: 「我們整理了 2025 最新市場規格與醫學指標，透過 30 秒的智慧測驗，助你避開行銷陷阱，把錢花在刀口上。」
- [x] **Trust Badge**: 維持現有的「醫學審核通過」權威標章。
- [x] **Action**: 移除 Hero CTA 按鈕，引導使用者自然瀏覽下方專題。

### Component A2: Topic Index Grid (精選專題路徑)
- [x] **Core**: `post/fish-oil.html` (Omega-3 基礎知識)
- [x] **Market**: `post/doing/fish-oil-market-analysis.html` (市售評比)
- [x] **Structure**: `post/doing/fish-oil-structure.html` (rTG 深度解析)
- [x] **Sources**: `post/doing/fish-oil-sources.html` (來源與產地)
- [x] **Quality**: `post/doing/fish-oil-quality.html` (檢驗與認證)
- [x] **FAQ**: `post/doing/fish-oil-faq.html` (常見問題)

### Component A3: Dosage Calculator (動態決策工具)
- [x] **Input (輸入)**: 體重 + 改善目標
- [x] **Logic (運算)**: 體重 * 變數 (30~40)
- [x] **Output (產出)**: 顯示建議劑量 + 動態引導連結 (CTA)

### Component A4: Topic Filter (智慧篩選器)
**目的 (Purpose)**: 
解決「資訊過載」問題。讓使用者只看自己感興趣的重點，並提供通往深度內容的捷徑。
**功能 (Function)**:
*   **Filter UI**: 一組 Pill 形狀的 Checkbox (如：🔍 視力保健、🧠 腦力與專注、❤️ 循環健康)。
*   **Content Display**: 
    *   預設隱藏所有摘要卡片。
    *   點擊 Filter 後，動態展開對應的「精華摘要卡片 (Summary Card)」。
*   **Conversion (轉化)**: 
    *   摘要卡片底部必須包含「Strong CTA」，例如：「[閱讀完整的視力保健魚油評測]」，連結至 Market Review 頁面。

---

## 2. 交互與數據追蹤 (Interaction & Analytics)

*   **Click Tracking**: 所有的 CTA 按鈕 (A3 結果按鈕、A4 摘要連結) 需預留 `data-event-category="HubConversion"` 屬性，以便未來埋設 GA4 事件。
*   **Performance**: 工具組件 (A3, A4) 需使用 Vanilla JS 撰寫，避免引入重型框架，確保 Lighthouse 效能分數 > 95。

## 3. 下一步行動
確認此細部規格無誤後，將依序實作 A3 (Calculator) 與 A4 (Filter) 組件。
