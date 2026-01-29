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

### 2.1. 內容策略與規範
- **Trust-First Writing**: 在每個品牌區塊增加「Dailyeat 真實親測體驗」，以第一人稱（我們/我）描述感受。
- **Image Strategy**: 
    - **官方圖**: 提供多張高品質產品圖，並實作**切換/輪播功能**，增加專業感。
    - **實測圖**: 增加多張實拍圖片以提升可信度，**不使用**「編輯部實拍」等額外標籤文字。
- **Data Integrity**: 產品規格表必須呈現完整原文資訊。
- **Deep Dive Analysis**: 必須精簡。使用條列式文字解讀數據（如 TOTOX、價格），**嚴禁使用表格**。
- **No Pros/Cons Table**: 刪除全文中的「優缺點總評比較表」，避免與深度分析內容重複。
- **Community Curation**: 網友評論需手動策展，增加評論數量，並對優點/關鍵字進行**柔性 Highlight (畫重點)**。
- **No Icon Policy**: 全文禁止使用任何 Icon，保持純文字排版質感。

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
依序為每個品牌建立獨立 Demo 頁面，完成內容與圖片優化：

- [ ] **好好生醫 (BetterBio)**:
    - [x] `fish-oil-v3-BetterBio-demo.html` 建立與改名。
    - [x] 內容：精簡化觀點，移除優缺點表。
    - [ ] **Action**: 將完成的 HTML 區塊合併回主文章。

- [ ] **Kirkland (科克蘭)**:
    - [ ] 建立 `post/fish-oil-v3-Kirkland-demo.html` (複製 BetterBio 模板)。
    - [ ] 撰寫：大顆粒吞嚥挑戰 (實測圖)、價格優勢分析。
    - [ ] 合併回主文章。

- [ ] **Sports Research (SR)**:
    - [ ] 建立 `post/fish-oil-v3-SR-demo.html`。
    - [ ] 撰寫：iHerb 跨境購買體驗、高濃度 IFOS 驗證。
    - [ ] 合併回主文章。

- [ ] **大研生醫 (Daiken)**:
    - [ ] 建立 `post/fish-oil-v3-Daiken-demo.html`。
    - [ ] 撰寫：MOMO 通路霸主、與 BetterBio 的規格對決。
    - [ ] 合併回主文章。

- [ ] **其餘品牌 (Batch 1)**:
    - [ ] 三得利 (Suntory)、Vitabox、營養師輕食 -> 建立個別 Demo 並優化。
    
- [ ] **其餘品牌 (Batch 2)**:
    - [ ] 娘家、MIHONG、白蘭氏、BHK's -> 建立個別 Demo 並優化。

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
