# 任務：支柱文章升級計畫 (Pillar Article Upgrade)

**目標**: 將 `post/fish-oil.html` 升級為符合 2026 SEO 戰略的「權威支柱文章」。
**原則**: 保留現有優質內容，僅進行「增補 (Augment)」與「優化 (Optimize)」，不刪除核心資訊。

---

## 1. 現況差距分析 (Gap Analysis)

| 項目 | 現有狀態 (Current) | 目標狀態 (Target) | 差距 (Action) |
| :--- | :--- | :--- | :--- |
| **H1 標題** | 魚油功效總整理... | Omega-3 魚油全指南：8 大功效、副作用與正確吃法 (2026 科學實證版) | **修改**: 更新 H1 與 Meta Title/Desc |
| **核心功效** | 6 大功效 (心,腦,炎,眼,緒,孕) | 8 大功效 (新增: 睡眠, 皮膚/代謝) | **新增**: 補足 2 個高流量功效區塊 |
| **SEO 引用** | 僅文字列表 (Text Only) | 權威連結 (Outbound Links) | **優化**: 將參考文獻加上 `<a>` 連結至 PubMed |
| **FAQ** | 4 題 (變胖, 藻油, 保麗龍, 過期) | 完整 FAQ (新增: 寵物, 腥味, 劑量疑問) | **新增**: 擴充 2-3 題高頻問答 |
| **互動性** | 靜態圖表 | 互動式圖表/檢測 | **優化**: 確認「自我檢測」功能正常，強化視覺回饋 |
| **導流** | 底部有連結卡片 | 頂部/文中 Soft CTAs | **新增**: 在前言加入「快速選購」連結 |

---

## 2. 執行步驟 (Execution Steps)

### Step 1: 戰略標頭優化 (Header Strategy)
*   **Action**:
    *   更新 `<title>` 與 `<h1 class="article-title">`。
    *   更新 `<meta name="description">` 包含新關鍵字 (2026, 8大功效)。
    *   在 Intro 區域加入 **「太長不想看？直接看結論」** 的 Soft CTA，導向：
        *   `#how-to-choose` (怎麼挑)
        *   `review` (推薦清單)

### Step 2: 內容增補 (Content Augmentation)
*   **Action**: 在 `#benefits` 區塊新增兩個 Card：
    *   **Benefit 7: 睡眠品質 (Sleep)** - 關鍵字：`魚油 睡眠`, `睡前吃`。
    *   **Benefit 8: 皮膚健康/代谢 (Skin/Metabolism)** - 關鍵字：`魚油 皮膚`, `抗痘`。
*   **Action**: 在 `#faq` 區塊新增：
    *   **Q: 魚油會有腥味嗎？吃了打嗝怎麼辦？** (解決感官疑慮)
    *   **Q: 家裡的貓狗可以吃我的魚油嗎？** (鎖定 `寵物魚油` 雖然量少但精準)

### Step 3: 信任訊號強化 (Trust Signals)
*   **Action**: 將底部的 Reference 區域重寫。
    *   格式：`[研究標題] - PubMed (2024)` 並加上 `href="..." target="_blank" rel="nofollow noopener"`.
    *   確保至少有 3-5 個權威來源連結。

### Step 4: 技術 SEO 優化 (Technical SEO)
*   **Action**:
    *   檢查既有的 FAQ Schema 是否包含新題目。
    *   確認所有圖片 `<img>` 都有包含關鍵字的 `alt` 屬性。
    *   (Option) 加入 `Breadcrumb` Schema (確認已存在)。

---

## 3. 驗證標準 (Verification)

- [ ] **H1 與 Meta** 必須完全符合新策略。
- [ ] **8 大功效** 必須完整呈現，排版一致。
- [ ] **外部連結** 點擊後必須在新分頁開啟權威網站。
- [ ] **FAQ Schema** 必須包含所有新舊問題。
- [ ] **Mobile View** 檢查新增的卡片在手機版是否跑版。
