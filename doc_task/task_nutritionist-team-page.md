# 任務名稱：Dailyeat 營養師團隊介紹頁面建立

**狀態**: `規劃中`
**負責人**: @Antigravity
**預計完成日期**: 2026-02-07
**相關連結**: `post/fish-oil-market-analysis.html` (引用來源)

---

## 1. 任務目標 (Objective)

建立一個專屬的「Dailyeat 營養師團隊」介紹頁面，旨在提升網站的專業權威性 (E-E-A-T)。該頁面將詳細展示團隊中三位營養師的個人資料、專業背景與核心理念，並作為各個測評文章中「專家點評」區塊的信任背書來源。

## 2. 實作策略 (Implementation Strategy)

### 2.1. 內容策略
- **人物設定**: 建立三位具備不同專業領域的營養師（例如：Alice - 婦幼營養、Bob - 運動營養、Carol - 銀髮族/慢病護理）。
- **信任感設計**: 每位營養師需有專業形象照（Avatar）、證照列表、以及一句核心理念（Quote）。
- **連結整合**: 提供該營養師參與過的測評文章列表（如有）。

### 2.2. 技術方案
- **獨立頁面**: 建立 `post/about-nutritionists.html`（暫定）。
- **樣式重用**: 復用 `assets/css/article.css` 與 `assets/css/brand-card.css` 中的卡片與佈局樣式，保持視覺一致性。
- **資料驅動**: 若未來有多個頁面引用，考慮將營養師資料抽取為 JSON/JS 物件。

### 2.3. 檔案結構

```text
post/
├── about-nutritionists.html      (新增：團隊介紹主頁)
└── assets/
    └── css/
        └── nutritionist-page.css (新增：專用樣式，若 article.css 不足)
```

## 3. 任務拆解 (Task Breakdown)

### Phase 1: 營養師資料設定 (Persona)
- [x] **定義營養師 A (Yumi)**: 姓名、頭像、專長、簡介。
- [x] **定義營養師 B (Sophie)**: 姓名、頭像、專長、簡介。
- [x] **定義營養師 C (Shawn)**: 姓名、頭像、專長、簡介。
- [x] **生成素材**: 使用 Placeholder 代替，後續用戶自行補充。

### Phase 2: 頁面開發 (Development)
- [x] 建立 `post/about-nutritionists.html` 基本結構 (Header/Footer/Breadcrumb).
- [x] 實作「團隊 Hero Section」.
- [x] 實作「營養師個人卡片」 (Yumi, Sophie, Shawn).
- [x] RWD 響應式調整.

### Phase 3: 關聯整合 (Integration)
- [x] 確認 `fish-oil-v3-BetterBio-demo.html` 中的「營養師點評」連結至此頁面.
- [ ] 更新 Sitemap (如需要).

## 4. 影響評估 (Impact Assessment)

### Breaking Changes
- **評估**: 無。
- **原因**: 為全新獨立頁面。

## 5. 驗收標準 (Acceptance Criteria)
- [ ] 頁面包含三位營養師的完整介紹。
- [ ] 頭像清晰且風格一致。
- [ ] 手機版瀏覽流暢，無跑版。
