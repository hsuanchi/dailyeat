# 任務名稱：Core Page (Knowledge Base) 優化

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.2

---

## Current HTML Structure
### `post/fish-oil.html`
- H1: 魚油功效總整理：不只降血脂護心！還能改善乾眼、活化大腦、穩定情緒與調節慢性發炎的完整食用指南
- H2: 慢性發炎，是身體無聲的求救訊號。
- H2: 魚油是什麼？EPA 與 DHA 對身體的關鍵作用
  - H3: 自我檢測：誰最需要補充？
  - H3: 失衡的代價：當身體長期「缺油」會怎樣？
  - H3: 為什麼會發生？從「細胞膜硬化」說起
  - H3: 效益：唯一的解藥是「流動性 (Fluidity)」
- H2: 經科學實證的健康功效：Omega-3 的多重效益
  - H3: 降低三酸甘油酯與護心
  - H3: 提升記憶與學習力
  - H3: 慢性發炎調節者
  - H3: 改善乾眼與視網膜健康
  - H3: 對抗憂鬱與焦慮
  - H3: 胎兒大腦奠基石
- H2: 魚油怎麼吃？劑量、時間與飯前飯後完整指南
  - H3: 各族群的建議劑量與比例
  - H3: 黃金服用時間：吸收率差在哪？
- H2: 天然食物 vs. 營養補充品：我需要吃魚油嗎？
- H2: 專業選購標準：如何辨識高品質魚油？
- H2: 進階比較分析：魚油 vs. 磷蝦油 vs. 亞麻籽油
- H2: 魚油的風險與安全注意事項
  - H3: 魚油的常見副作用
- H2: 常見問題與迷思破解 (FAQ)
  - H3: 參考文獻 (Scientific References)
  - H3: 免責聲明

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
