# 任務名稱：Tool Pages (挑選工具箱) 開發

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.4 & `task_fish-oil-tools-planning.md`

---

## 1. 任務目標 (Objective)
設計一系列**「SEO 流量磁鐵」型**的網頁工具。
目標不僅是實用，更要**最大化自然搜尋流量**，攔截長尾關鍵字（如：攝取量、交互作用）與**高價值的「品牌關鍵字」**（如：某某牌魚油濃度、CP值）。

## 2. 檔案資訊
- **目標檔案**: `post/doing/fish-oil-tools.html`
- **技術需求**: 純原生 JavaScript (Vanilla JS), Shadow DOM (Mode: Closed) 封裝。
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Core Tools Specs)

### D1. 魚油「純度與價值」分析儀 (Purity & Value Analyzer)
> *SEO 目標: 鎖定「某品牌魚油濃度」、「魚油CP值計算」*

- [ ] **輸入**:
  - 每顆膠囊重量 (mg)
  - 總 Omega-3 / EPA / DHA 含量 (mg)
  - 價格 (元) / 總顆數
- [ ] **邏輯**:
  - **濃度計算**: (Omega-3 ÷ 膠囊重) * 100%。 (評級: >85% 為優, >80% 為良, <50% 為劣)
  - **真實單價**: (總價格 ÷ 總顆數 ÷ 每顆Omega-3毫克數) = **[每 1000mg 真實花費]**。
- [ ] **UI 設計**: 
  - 簡單直覺的輸入框，讓使用者看著瓶身就能填。
  - **結果卡片**: 使用正面視覺回饋 (5星評級、獎章動畫)。

### D2. 個人化魚油挑選器 (Smart Selector)
> *SEO 目標: 鎖定「孕婦魚油推薦」、「考生魚油劑量」等族群+需求字*

- [ ] **輸入**: 
  - 身份 (孕婦/銀髮/上班族/學生)
  - 核心需求 (護眼/護心/幫助入睡/其他)
  - 體重 (kg)
- [ ] **邏輯**: 參照 WHO/GOED 建議標準，動態生成建議。
  - **孕婦**: 優先推薦 DHA 高佔比，強調 300mg DHA。
  - **銀髮**: 優先推薦純 EPA 或 EPA:DHA > 2:1。
- [ ] **輸出**: 「你的每日建議處方」卡片 (建議總劑量 mg + 膠囊數)。

### D3. 魚油 vs 藻油 vs 磷蝦油 終極比較表 (Interactive Comparison)
> *SEO 目標: 鎖定「素食魚油」、「磷蝦油比較」*

- [ ] **功能**: 互動式開關 (Switch)，動態顯示比較。
  - [x] 素食者 -> 顯示「裂壺藻油」
  - [x] 重視吸收 -> 顯示「磷蝦油 (磷脂質)」 vs 「rTG 魚油」
- [ ] **呈現**: 橫向捲動比較表 (Component-based)。 

### D4. 結果保存與分享 (Viral Loop)
- [ ] **功能**: "Generate My Prescription" 按鈕。
- [ ] **實作**: 使用 HTML5 Canvas 生成包含計算結果的圖片 (JPG/PNG)。
- [ ] **導流**: 圖片上需壓印網站 Logo 與 QR Code 回到工具頁。

## 4. 工程與 SEO 規範 (Engineering)

### 4.1 Shadow DOM 封裝
- 所有工具邏輯封裝於 `assets/js/tools/fish-oil-analyzer.js` 等獨立檔案。
- 使用 `attachShadow({mode: 'closed'})` 確保樣式不被全域污染。

### 4.2 SEO 關鍵字佈局
- 雖然工具在 Shadow DOM 內，但需確保 **外部容器 (Light DOM)** 包含豐富的引導文案。
- **周邊文案**: 在工具上方撰寫「如何計算濃度？」、「為什麼 rTG 比較貴？」等 H2/H3 段落。

## 5. 驗收標準
- [ ] 計算結果準確無誤 (需提供 3 組測試案例)。
- [ ] 手機版輸入體驗良好 (Input type="number")。
- [ ] 圖片生成功能在手機瀏覽器 (Safari/Chrome) 可正常運作。
- [ ] Core Web Vitals (LCP/CLS) 不受工具載入影響。
