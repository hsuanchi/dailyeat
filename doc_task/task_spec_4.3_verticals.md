# 任務名稱：Vertical Pages (分眾深耕) 實作

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.3

---

## 1. 任務目標 (Objective)
針對特定族群 (孕婦、銀髮、長尾搜尋者) 提供不可替代的精準建議與解決方案。

## 2. 檔案資訊
- **目標檔案**: 
  - `post/doing/fish-oil-groups.html`
  - `post/doing/fish-oil-senior.html`
  - `post/doing/fish-oil-faq.html`
  - `post/doing/fish-oil-guide.html`
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Content Specs)

### C1. 分眾總覽 (`fish-oil-groups.html`)
- [ ] **孕婦區塊**: 製作比較表 (藻油 vs 魚油 EPA/DHA/重金屬)。
- [ ] **兒童區塊**: 強調 "去除腥味技術" 與 "顆粒大小" 的評選標準。
- [ ] **上班族區塊**: 聚焦腦力 (DHA) 與乾眼 (EPA/DHA) 需求。

### C2. 銀髮心血管專區 (`fish-oil-senior.html`)
- [ ] **警示卡 (Red Alert)**: 紅色區塊，列出抗凝血藥物 (Warfarin/Aspirin) 交互作用警告。
- [ ] **EPA 機制**: 引用 JELIS 研究圖表，解釋純 EPA 對心血管的效益。
- [ ] **吞嚥友善**: 推薦 "Mini Gels" 或液態劑型。

### C3. 常見問答 (`fish-oil-faq.html`)
- [ ] **結構**: 依照 "食用時機", "副作用", "保存" 分類。
- [ ] **SEO**: 針對長尾關鍵字優化 (e.g., "魚油過期可以吃嗎")。
- [ ] **技術**: 實作 JSON-LD FAQPage Schema。

### C4. 食用指南 (`fish-oil-guide.html`)
- [ ] **How-to**: 最佳食用時機與保存方式的標準作業程序 (SOP)。
- [ ] **問題排除**: 打嗝魚腥味解法、膠囊沾黏處理法。

## 4. 驗收標準
- [ ] 銀髮頁面的警示卡足夠醒目。
- [ ] 孕婦頁面的比較表數據正確。
- [ ] FAQ 頁面 Schema 驗證通過。
