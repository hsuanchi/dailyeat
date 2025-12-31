# 任務名稱：Market Review & Tech Analysis (深度評測) 製作

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.5 & 4.4 (Tech)

---

## 1. 任務目標 (Objective)
提供「實驗室等級」的深度解析與產品評測，建立與一般部落客文章的差異化信任感。

## 2. 檔案資訊
- **目標檔案**: 
  - `post/fish-oil-market-analysis.html`
  - `post/doing/fish-oil-structure.html` (rTG)
  - `post/doing/fish-oil-quality.html` (IFOS)
  - `post/doing/fish-oil-sources.html` (Sources)
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Content Specs)

### E1. 編輯部實測 (The Lab Test) - for Market Analysis
- [ ] **剪開膠囊**: 嵌入影片或 GIF，展示不同產品的內容物色澤/流動性。
- [ ] **腥味盲測**: 繪製雷達圖 (腥味、檸檬味、膠囊味)。
- [ ] **顆粒大小**: 製作 "硬幣對比圖" (10元硬幣 vs 膠囊)。

### E2. 一鍵比較表 (Comparison Table)
- [ ] **功能**: 橫向滑動表格 (Responsive Table)。
- [ ] **欄位**: 品牌、型態、濃度 (檢驗值 vs 標示值)、IFOS、單日成本。
- [ ] **Schema**: 注入 Comparison Table Schema。

### D1. 型態結構解析 (`fish-oil-structure.html`)
- [ ] **視覺化**: 繪製生化結構圖 (rTG 三腳架 vs EE 乙基)，解釋生物利用率。
- [ ] **論述**: 用真實成本破解 "EE 很便宜" 的迷思 (吸收率校正後)。

### D2. 品質與檢驗 (`fish-oil-quality.html`)
- [ ] **IFOS 解析**: 詳解五星標準 (氧化數值、重金屬極限)。
- [ ] **計算陷阱**: 教學如何看懂 "每份" vs "每顆" 的濃度標示陷阱。

## 4. 驗收標準
- [ ] 所有圖表 (結構圖、雷達圖) 需風格統一且清晰。
- [ ] 比較表在手機版需可順暢左右滑動。
- [ ] 內容需符合法規，避免過度宣稱療效。
