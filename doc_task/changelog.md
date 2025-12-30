# Changelog

## Current Version (Unreleased)
> Base Commit: `94c01c0f2d5176c54e212fa573ebf59caba0f3b8` (Start of Fish Oil Renovation)

自從版本 `94c01c0f` 以來，我們完成了「魚油內容矩陣 (Fish Oil Content Matrix)」的全方位建置與優化。以下是詳細變更清單：

### 1. 核心架構轉型 (Architecture Transformation)
-   **Hub Page 定位重塑**: 將 `post/fish-oil.html` 從單篇長文轉型為「流量入口 (Hub)」。
    -   **移除冗錯內容**: 移除了過時的「市場亂象分析」、「詳細吸收率比較」、「舊版計算機」。
    -   **矩陣導流**: 建立 6 個子題入口 (Spoke Links)，引導讀者深入閱讀特定主題。
-   **建立衛星子頁面 (Spoke Pages)**:
    -   `post/fish-oil-structure.html`: 解析 rTG/TG/EE 型態與破解保麗龍實驗迷思。
    -   `post/fish-oil-quality.html`: 濃度計算教學 (80% vs 30%) 與 IFOS 檢驗指南。
    -   `post/fish-oil-pregnancy-child.html`: 鎖定孕婦/兒童族群，強調重金屬檢驗與安全劑量。
    -   `post/fish-oil-senior.html`: 針對銀髮族，警示抗凝血藥物交互作用。
    -   `post/fish-oil-sources.html`: 魚油 vs 藻油 vs 磷蝦油的全方位素食/葷食比較。
    -   `post/fish-oil-guide.html`: 綜合食用指南（時間點、副作用排除）。

### 2. Hub Page 視覺與體驗升級 (UI/UX Renovation)
-   **功效區塊 (Benefits Section)**:
    -   [NEW] 導入 **Numbered Hero Cards** (編號英雄卡)，將 5 大功效以網格呈現。
    -   [UX] 加入微互動懸停效果 (Hover Effects)，提升質感。
-   **視覺化圖表 (Data Visualization)**:
    -   [NEW] EPA vs DHA 圓餅圖 (心血管 vs 腦部)。
    -   [NEW] 濃度比較環形圖。
    -   [NEW] 吸收率長條圖 (rTG 領先優勢)。
-   **互動元件**:
    -   [NEW] `responsive-table-wrapper`: 自動化處理所有表格的行動版橫向捲動。

### 3. 技術債清理與效能優化 (Refactoring & Performance)
-   **CSS 架構重構**:
    -   [Refactor] 將 `post/fish-oil.html` 中 **1500+ 行 inline CSS** 全數提取。
    -   [Merge] 整合至 `assets/css/article.css`，實現全站樣式共用與快取優化。
    -   [Clean] 確保 `<head>` 區塊乾淨，僅保留關鍵 meta tags 與外部連結。
-   **SEO 與結構化資料 (Schema)**:
    -   [Fix] 移除 Hub Page 上重複的 `WebSite` JSON-LD (全站僅需首頁保留)。
    -   [Refactor] 將 `FAQPage` Schema 遷移至獨立的 FAQ 頁面，避免權重分散。
    -   [Update] 更新 `sitemap.xml` 納入所有新建立的 Spoke Pages。

### 4. 內容修訂 (Content Updates)
-   **FAQ 瘦身**: 將 Hub Page 冗長的 FAQ 區塊替換為指向 `post/fish-oil-faq.html` 的引導卡片。
-   **文字潤飾**: 全面優化標題與內文，使其更符合「解決使用者痛點」的現代文案風格。
