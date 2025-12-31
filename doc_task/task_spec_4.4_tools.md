# 任務名稱：Tool Pages (挑選工具箱) 開發

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.4

---

## 1. 任務目標 (Objective)
將抽象的挑選標準轉化為具體的數據計算，提供「個人化」的建議，增加用戶黏著度與分享率。

## 2. 檔案資訊
- **目標檔案**: `post/doing/fish-oil-tools.html`
- **技術需求**: 純 Vanilla JS, Shadow DOM (optional for widgets)
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Content Specs)

### D1. 真實成本計算機 (True Cost Calculator)
- [ ] **邏輯**: 輸入 [價格]、[顆數]、[每顆 Omega-3 濃度%] -> 輸出 **[每毫克 Omega-3 真實單價]**。
- [ ] **目的**: 讓消費者發現 "便宜魚油其實很貴"。

### D2. 每日劑量計算機 (Dosage Calculator)
- [ ] **輸入**: 體重 (kg)、年齡層、健康目標 (一般/積極/懷孕)。
- [ ] **邏輯**: 參照 WHO/GOED 建議標準。
- [ ] **輸出**: 建議每日 EPA+DHA 總毫克數。

### D3. 結果保存與分享
- [ ] **功能**: "Generate My Prescription" 按鈕。
- [ ] **實作**: 使用 HTML5 Canvas 生成包含計算結果的圖片 (JPG/PNG)。
- [ ] **導流**: 圖片上需壓印網站 Logo 與 QR Code。

### D4. 前端效能 (Engineering)
- [ ] **漸進增強**: 頁面載入時不載入 JS，直到捲動至工具區。
- [ ] **防呆機制**: 輸入驗證 (不可小於 0，不可大於合理值)。

## 4. 驗收標準
- [ ] 計算結果準確無誤 (需提供測試案例)。
- [ ] 圖片生成功能在手機瀏覽器可正常運作。
- [ ] Core Web Vitals (LCP/CLS) 不受工具載入影響。
