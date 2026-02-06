# 任務名稱：魚油測評文章 V3 內容升級 - 強化信任感與真人體驗

**狀態**: `規劃中`
**負責人**: @Antigravity
**預計完成日期**: 2026-01-29
**相關連結**: `post/fish-oil-market-analysis.html`

---

## 1. 任務目標 (Objective)

將 `fish-oil-market-analysis.html` 從標準 SEO 資訊文章轉型為**權威性真人實測文章**。核心目標是透過「第一人稱視角」、「編輯團隊實測」與「真實社群評價」來建立讀者深度信任，並解決讀者對「業配文」的疑慮。

**關鍵變更點：**
1.  **口吻轉換**：從第三人稱客觀描述轉為第一人稱（我們、我）的體驗分享。
2.  **視覺升級**：全面替換為官方產品高品質圖片，提升專業度。
3.  **真實評價**：手動整理 PTT/Dcard 來源評論，拒絕 AI 模糊摘要。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 內容策略與標準作業規範 (Standard Content SOP)
> **Baseline**: 以 `post/fish-oil-v3-BetterBio-demo.html` 為黃金標準 (Gold Standard)。所有新品牌評測必須嚴格遵守以下結構與順序。

#### A. 區塊結構順序 (Section Order)
每個品牌的 `<div class="brand-review-card">` 內部必須依序包含以下 5 個模組：

1.  **Header (品牌與標章)**
    *   `h3`: 品牌全名 + 產品名稱
    *   `.review-badges`: 必須包含 2-3 個標章 (如 `IFOS 5星`, `rTG 85%`, `高EPA配方`)。
2.  **Body (視覺與規格)**
    *   **Image Switcher**: 必須使用 `image-switcher` 結構。
        *   左側 `main-image-viewport` (3/4 寬度)
        *   右側 `thumbnail-list` (1/4 寬度, 垂直排列, 3-4 張縮圖)
    *   **Spec Table**: 必須包含 5 個固定欄位 (產品全名, 規格/成本, 原料/技術, 內容物, 官方重點)。
3.  **Nutritionist Real Test (營養師親測)**
    *   **Title**: `Dailyeat 營養師實測報告`
    *   **Format**: 使用 `.manual-review-card` 搭配 Flexbox 佈局。
    *   **Components**: 
        *   左側 Avatar Column (頭像 + 職稱)
        *   中間 Content Column (灰底對話框 style, 關鍵字需加上 `.highlight-text` 黃底)
        *   右側 Photo Thumbnail (實測照片 90x90px)
    *   **Quantity**: 3 位營養師 (Yumi/Sophie/Shawn) 分別針對「吞嚥/氣味」、「包裝/體驗」、「數據/CP值」進行評論。
4.  **Rating (Dailyeat 評分)**
    *   **Title**: `Dailyeat 整體推薦程度`
    *   **Format**: `.review-rating-box` (左側分數圓圈 + 右側星級與短評)。
5.  **User Reviews (社群口碑)**
    *   **Title**: `社群網友與電商平台真實心得`
    *   **Format**: `.manual-review-reviews` 包裹多個 `.manual-review-card`。
    *   **Content**: 需手動策展 3 則 (Momo/Shopee/Official/PTT/Dcard)，關鍵字畫重點。
    *   **Source**: 必須標註來源並附上 `查看原文` 連結。

#### B. 寫作與視覺規範 (Style Guide)
- **Trust-First Tone**: 全文維持「第一人稱（我們/我）」視角。
- **No Icons**: 禁止使用 FontAwesome icon 於內文中，保持乾淨。
- **Highlighting**: 使用 `.highlight-text` (黃底) 來強調評論中的正面關鍵字 (如「無腥味」、「好吞」)。
- **Detailed Data**: 規格表中的「內容物」需完整列出膠囊成分 (明膠來源)。

### 2.2. 文章結構 (H1-H4) (略...)

### 2.3. 檔案結構與模組化策略 (New)

為避免 `fish-oil-market-analysis.html` 主檔案過於龐大且難以維護，我們採用 **「分治法 (Divide and Conquer)」** 策略：

1.  **建立獨立 Demo**: 每個品牌先建立獨立的 HTML 檔案（如 `post/fish-oil-v3-Kirkland-demo.html`）。
2.  **局部優化**: 在獨立檔案中完成內容撰寫、圖片輪播與 RWD 測試。
3.  **合併回歸**: 確認無誤後，將 `<div class="brand-review-card">` 完整區塊貼回主文章。

```text
post/
├── fish-oil-v3-BetterBio-demo.html  (已完成/樣板)
├── fish-oil-v3-Kirkland-demo.html   (待建立)
├── fish-oil-v3-SR-demo.html         (待建立)
├── ...
└── fish-oil-market-analysis.html    (最終合併目標)
```

## 3. 任務拆解 (Task Breakdown)

### Phase 1: 架構與口吻重塑
- [ ] **全域口吻調整**: 將全文視角調整為「我們、我」的第一人稱。
- [ ] **Icon 清除**: 移除現有內容中的所有 FontAwesome icon。

### Phase 2: [獨立任務 A] 視覺全面升級
- [x] **官方圖切換功能**: 已在 BetterBio Demo 中完成開發，作為標準與樣板。

### Phase 3: [獨立任務 B] 品牌單頁實測 (Modular Execution)
依序為每個品牌建立獨立 Demo 頁面，每一次執行都必須包含以下 5 大標準模組的建置與填寫：

- [ ] **好好生醫 (BetterBio)**:
    - [x] `fish-oil-v3-BetterBio-demo.html` 建立與改名。
    - [x] **Header**: 品牌標章 (IFOS/rTG/高EPA)。
    - [x] **Body**: 官方圖 Switcher + 5 欄規格表。
    - [x] **Nutritionist**: 3 位營養師實測心得 (吞嚥/包裝/數據)。
    - [x] **Rating/Reviews**: Dailyeat 評分 + 3 則網友真實評論策展。
    - [x] **Action**: 將完成的 HTML 區塊合併回主文章。

- [ ] **Kirkland (科克蘭)**:
    - [x] 建立 `post/fish-oil-v3-Kirkland-demo.html` (複製 BetterBio 模板)。
    - [x] **Header**: 設定品牌標章 (USP/價格霸主)。
    - [x] **Body**: 建立規格表 (注意: 圖片若無可暫缺，保留 placeholder)。
    - [x] **Nutritionist**: 撰寫實測心得 (重點: 大顆粒吞嚥挑戰)。
    - [x] **Rating/Reviews**: 設定評分 (2.5分) + 策展網友評論 (吞嚥困難/便宜)。
    - [x] 合併回主文章。

- [ ] **Sports Research (SR)**:
    - [x] 建立 `post/fish-oil-v3-SR-demo.html`。
    - [x] **Standard Modules**: 依序完成 Header/Body/Nutritionist/Rating/Reviews。
    - [x] **Focus**: iHerb 跨境體驗與 IFOS 認證。
    - [x] 合併回主文章。

- [ ] **大研生醫 (Daiken)**:
    - [ ] 建立 `post/fish-oil-v3-Daiken-demo.html`。
    - [ ] **Standard Modules**: 依序完成 Header/Body/Nutritionist/Rating/Reviews。
    - [ ] **Focus**: Momo 王者與高濃度對決。
    - [ ] 合併回主文章。

- [ ] **其餘品牌 (Batch 1 - Suntory/Vitabox/Dietician)**:
    - [ ] 建立個別 Demo 並實作 5 大標準模組。
    
- [ ] **其餘品牌 (Batch 2 - NiangJia/MIHONG/Brands/BHK's)**:
    - [ ] 建立個別 Demo 並實作 5 大標準模組。

### Phase 4: [獨立任務 C] 網友評論策展 (Highlight)
- [ ] **內容擴充**: 增加 PTT/Dcard/Shopee/Momo 評論數量。
- [ ] **視覺重點**: 對評論中的優點與關鍵體感進行背景色或粗體高亮處理。
- [ ] **超連結來源**: 評論句尾加入「查看原文」縮小版連結。
- [ ] **去 Icon**: 確保評論區塊無使用任何 Icon。

### Phase 5: 最終檢查與發佈
- [ ] **整篇文章潤飾**: 檢查語氣是否連貫、有無錯字。
- [ ] **移動端檢視**: 確保手動加入的大量文字與圖片在手機上閱讀流暢。

## 4. 影響評估 (Impact Assessment)

### Breaking Changes
- **評估**: 無程式碼功能性破壞。
- **注意**: 需注意圖片連結是否有效，避免破圖影響 SEO。

## 5. 驗收標準 (Acceptance Criteria)
- [ ] **視覺**: 所有品牌皆採用「官方圖 + 實測圖」雙圖結構，且無任何 Icon 使用。
- [ ] **口吻**: 全文為一致的第一人稱（我們/我）。
- [ ] **內容**: 產品規格表完整不缺漏，網友評論真實且附帶連結。
- [ ] **體驗**: 針對「好好生醫」等品牌的 1.2cm 膠囊優勢有具體描述。
