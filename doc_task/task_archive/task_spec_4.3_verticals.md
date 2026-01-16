# 任務名稱：Vertical Pages (分眾深耕) 實作

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.3

---

## Current HTML Structure

### `post/doing/fish-oil-groups.html`
- H1: 人生各階段的 Omega-3 補充指南
  - H3: 一分鐘快速導覽：各族群魚油需求差異表
  - H3: 為什麼分眾很重要？
- H2: 孕婦與哺乳期：寶寶的第一份禮物
- H2: 嬰幼兒與兒童：黃金發育期
- H2: 學生與考生：腦力與視力的雙重挑戰
- H2: 上班族：對抗壓力與慢性發炎
  - H3: 1. EPA + DHA 均衡攝取：修正油脂失衡
  - H3: 2. 高濃度 rTG 型態：追求效率
  - H3: 3. EPA 與情緒穩定
- H2: 銀髮族：心血管與認知循環
- H3: 免責聲明

### `post/doing/fish-oil-faq.html`
- H1: 魚油常見問題 (FAQ)：最詳細的補充問答全紀錄
- H2: A. 魚油基礎知識
- H2: B. 功效與科學解析
- H2: C. 攝取量與服用指南
- H2: D. 安全風險與副作用
- H2: E. 特定族群建議
- H3: 免責聲明

### `post/doing/fish-oil-guide.html`
- H1: 魚油什麼時候吃？飯前還飯後？營養師親授「3不2要」正確吃法與副作用排除
- H2: 0. 為什麼我們需要魚油？(現代人的隱形危機)
  - H3: 市面上最平淡，卻也最必要的「補丁」
  - H3: 一場 20:1 的失衡戰爭
- H2: 1. 什麼時候吃？黃金吸收時間
- H2: 2. 營養師親授：「3不2要」口訣
- H2: 3. 副作用排除大全 (Troubleshooting)
  - H3: 為什麼我吃魚油會拉肚子？
- H2: 常見問題：冷藏與保存
- H2: 延伸閱讀：聰明選購
- H3: 免責聲明

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
- [x] **孕婦區塊**: 製作比較表 (藻油 vs 魚油 EPA/DHA/重金屬)。
- [x] **兒童區塊**: 強調 "去除腥味技術" 與 "顆粒大小" 的評選標準。
- [x] **上班族區塊**: 聚焦腦力 (DHA) 與乾眼 (EPA/DHA) 需求。
- [x] **銀髮區塊 (整併原 `fish-oil-senior.html`)**:
    - [x] **警示卡 (Red Alert)**: 列出抗凝血藥物 (Warfarin/Aspirin) 交互作用警告。
    - [x] **EPA 機制**: 解釋純 EPA 對心血管的效益。
    - [x] **吞嚥友善**: 推薦 "Mini Gels" 或液態劑型。

### C3. 常見問答 (`fish-oil-faq.html`)
- [x] **結構**: 依照 "食用時機", "副作用", "保存" 分類。
- [x] **SEO**: 針對長尾關鍵字優化 (e.g., "魚油過期可以吃嗎")。
- [x] **技術**: 實作 JSON-LD FAQPage Schema。

### C4. 食用指南 (`fish-oil-guide.html`)
- [x] **How-to**: 最佳食用時機與保存方式的標準作業程序 (SOP)。
- [x] **問題排除**: 打嗝魚腥味解法、膠囊沾黏處理法。

## 4. 驗收標準
- [x] 銀髮頁面的警示卡足夠醒目。
- [x] 孕婦頁面的比較表數據正確。
- [x] FAQ 頁面 Schema 驗證通過。
