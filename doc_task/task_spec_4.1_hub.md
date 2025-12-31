# 任務名稱：Hub Page (Command Center) 實作與優化

**狀態**: `規劃中`
**負責人**: @Antigravity
**來源**: `task_fish-oil-content-matrix.md` Section 4.1

---

## 1. 任務目標 (Objective)
建立「魚油專題首頁 (Hub)」作為知識指揮中心，透過視覺化導引與互動測驗，在 3 秒內完成用戶定向與分流。

## 2. 檔案資訊
- **目標檔案**: `post/fish-oil-hubpage.html`
- **版型架構**: 必須使用 `post/fish-oil.html` 的標準結構 (Header, Progress Bar, Article Container)。
- **樣式依賴**: 
  1. Primary: `assets/css/article.css` (Layout & Shell)
  2. Secondary: `assets/css/editorial.css` (Font & Content Typography)

## 3. 內容規格 (Content Specs)

### A1. Hero Section (視覺聲明)
- [ ] **大標題**: 「魚油怎麼選？別再看無效的罐頭文章。」
- [ ] **副標題**: 「3 分鐘測驗，找到真正適合你的 Omega-3 方案。」
- [ ] **Trust Badge**: 顯示「2025 醫學審核通過」徽章 (需設計 SVG 或圖片)。

### A2. 智慧測驗入口 (Interactive Quiz)
- [ ] **功能**: 一個顯眼的 CTA 區塊或嵌入式 Widget。
- [ ] **文案**: 「不知道從何下手？ ➜ 30秒找到你的命定魚油」。
- [ ] **行為**: 點擊後開啟 Modal 或跳轉至 `tools.html` 的測驗錨點。

### A3. 情境分流網格 (Scenario Grid)
- [ ] **孕婦卡片**: 文案「我需要高 DHA 且無重金屬」 -> 連結至 `post/doing/fish-oil-groups.html#pregnant`
- [ ] **考生/上班族卡片**: 文案「我需要思緒清晰」 -> 連結至 `post/doing/fish-oil-groups.html#student`
- [ ] **銀髮/三高卡片**: 文案「我需要高濃度 EPA 且無抗凝血風險」 -> 連結至 `post/fish-oil-senior.html`

### A4. 決策工具預覽 (Tools Tease)
- [ ] **視覺**: 劑量計算機的 UI 截圖或簡化版圖示。
- [ ] **文案**: 「體重 60kg 每天該吃幾顆？用算的才準。」
- [ ] **連結**: 導向 `post/doing/fish-oil-tools.html`

## 4. 驗收標準
- [ ] Hero 區域視覺強烈，Trust Badge 清晰可見。
- [ ] 所有卡片連結正確對應到子頁面 (即使子頁面尚在開發中)。
- [ ] RWD 手機版顯示正常 (單欄堆疊)。
