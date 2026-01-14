# 任務名稱：Core Page (Knowledge Base) 優化

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.2

---

## 1. 任務目標 (Objective)
優化 `fish-oil.html` 作為 SEO 流量承接頁，提供完整且權威的「為什麼」解答，建立讀者信任並引導至分眾頁面。

## 2. 檔案資訊
- **目標檔案**: `post/fish-oil.html`
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Content Specs)

### B1. TL;DR (太長不看摘要)
- [ ] **位置**: 文章標題後，第一段前。
- [ ] **內容**: 列出 3-5 點核心結論 (e.g., "rTG 吸收最好", "濃度 80% 是門檻")。
- [ ] **樣式**: 使用明顯的背景色區塊 (Alert Box)。

### B2. 懸浮目錄 (Sticky TOC)
- [x] **功能**: 左側或右側懸浮，隨捲動固定。
- [x] **互動**: 點擊平滑捲動至對應標題。

### B3. 深度知識模組 (Deep Dive)
- [x] **功效段落**: 檢查並補上 PubMed/JAMA 參考文獻連結。
- [x] **副作用段落**: 誠實揭露 (如：拉肚子、凝血功能影響)，增加可信度。
- [x] **吃法段落**: 明確建議 (隨餐吃)，並解释脂溶性原理。

### B4. 常見問答 (FAQ Module)
- [x] **內容**: 針對 Feature Snippet 設計的 Q&A。
- [x] **技術**: 注入 JSON-LD FAQPage Schema 到 `<head>`。
- [x] **互動**: 使用 `<details>` 與 `<summary>` 標籤實作摺疊效果。

## 4. 驗收標準
- [ ] TL;DR 區塊在手機版不佔據過多首屏空間。
- [x] FAQ 結構化數據通過 Google Rich Results Test。
- [x] 所有引用連結有效。
