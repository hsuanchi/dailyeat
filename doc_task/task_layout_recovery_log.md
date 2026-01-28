# HTML 版面崩壞修復與高效編輯紀錄 (Layout Recovery Log)

**日期**: 2026-01-28
**文件**: `post/fish-oil-market-analysis.html`

## 問題描述 (Issue Description)
在進行大規模內容補強（新增品牌深度分析章節）後，`fish-oil-market-analysis.html` 出現嚴重跑版問題：
1.  **左側目錄消失**：頁面側邊欄 (Sidebar) 不見，導致導航功能失效。
2.  **內容層級錯亂**：從 `Costco` 與 `Sports Research` 之後的品牌區塊，縮排層級異常（僅縮排 2 格而非標準的 8-12 格）。
3.  **瀏覽器渲染異常**：部分區塊寬度滿版，未被限制在 `.article-container` 內。

## 根本原因分析 (Root Cause Analysis)

經過排查，問題由兩個核心錯誤導致：

### 1. 致命的結構性錯誤：左側 TOC 消失 (Fatal Structural Error: Missing TOC)
這是用戶反應的「第一個核心錯誤」。
*   **現象**：網頁載入後，原本應固定在左側的目錄導航 (Sidebar) 完全消失，或者被擠到頁面最下方，失去導航功能。
*   **技術原因**：
    1.  在 `Sports Research` 品牌區塊前 (約第 676 行)，出現了一個**多餘的 `</div>` 閉合標籤**。
    2.  這個標籤錯誤地提前閉合了包覆主要內容的 `.col-lg-8` 或 `.row` 容器。
    3.  導致後續所有 HTML 內容（從 Sports Research 開始）脫離了原本的 Grid 佈局系統，瀏覽器將其視為這之後的內容屬於「容器外」的獨立區塊，因此不再受 Sidebar 的並排約束，變成全寬度顯示，進而導致版面崩壞。
*   **修復方法**：刪除該多餘閉合標籤，使 DOM 結構重新正確包覆所有品牌內容。


### 2. 縮排層級不一致 (Inconsistent Indentation)
由於內容是分批插入或由不同工具生成，導致後續品牌的 HTML 縮排完全混亂。
*   **標準縮排**：應為 `8 spaces` (H3, p, card) 到 `12 spaces` (內部元素)。
*   **錯誤縮排**：大量程式碼僅有 `2 spaces` 或 `4 spaces`。
*   雖然 HTML 對縮排不敏感，但這嚴重影響了代碼的可讀性與後續維護，且容易讓人誤判標籤的閉合狀態。

## 解決辦法與修復過程 (Resolution)

### 步驟 1：修復結構性錯誤 (Critical)
刪除 Costco 區塊末尾多餘的 `</div>`，恢復 DOM 結構的完整性。
```diff
              </p>
            </div>
          </details>
        </div>
-  </div>  <!-- 删除此多餘標籤 -->
      </div>
```

### 步驟 2：系統性縮排修正 (Systematic Indentation Fix)
使用正則表達式 (Regex) 進行全文件批量替換，將錯誤縮排統一標準化。

## 高效率手動編寫與修復 SOP (Efficient Manual Editing Guide)

當未來遇到類似的大型 HTML 結構錯亂時，建議依照以下 SOP 進行高效率修復，避免逐行修改的低效地獄。

### 工具準備
*   **編輯器**：VS Code
*   **模式**：開啟「取代」功能 (`Ctrl + H`) -> 啟用「正則表達式」模式 (`Alt + R`，圖示為 `.*`)

### 批量修復指令表 (Regex Cheat Sheet)

請依序執行以下 5 組取代操作，即可瞬間修復 90% 的縮排問題：

| 順序 | 目標元素 | 查找內容 (Regex Find) | 替換內容 (Replace With) | 說明 |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **品牌註解** | `^  <!-- 3\.` | `        <!-- 3.` | 統一品牌分隔線縮排 (8格) |
| **2** | **H3 標題** | `^  <h3 class="review-title"` | `        <h3 class="review-title"` | 統一品牌標題縮排 (8格) |
| **3** | **文字段落** | `^  <p>([^<])` | `        <p>$1` | 統一內文縮排 (8格)，`$1` 保留原內容 |
| **4** | **卡片容器** | `^  <div class="brand-review-card">` | `        <div class="brand-review-card">` | 統一卡片外框縮排 (8格) |
| **5** | **卡片內部容器** | `^    <div class="brand-review-(header\|body)">` | `          <div class="brand-review-$1">` | 統一 Header/Body 容器 (10格) |
| **6** | **內部元件** | `^      <(div\|table\|ul\|details)` | `            <$1` | 修正內層標題/表格/列表 (12格) |
| **7** | **表格行 (TR)** | `^        <tr` | `              <tr` | 修正表格行 (14格) |
| **8** | **表格欄 (TH/TD)** | `^          <(th\|td)` | `                <$1` | 修正表格欄位 (16格) |

### 預防措施 (Prevention)
1.  **使用 `task_boundary`**：在大量編輯前，務必確認任務範圍。
2.  **檢查閉合標籤**：每次插入大型 HTML 區塊後，立即檢查 `</div>` 數量是否平衡。可利用 VS Code 的縮排輔助線或 "Fold/Unfold" 功能快速確認結構。
3.  **複製標準模板**：新增品牌時，不要憑空手寫，請複製一個結構正確的品牌（如 `BetterBio` 區塊）作為模板，再修改內容。

---
**附註**：正確的品牌區塊 HTML 結構參考（以 BetterBio 為標準範例）
```html
        <!-- 3.1 BetterBio -->
        <h3 class="review-title" id="brand-betterbio">好好生醫魚悅魚油 (BetterBio Joy Fish Oil)</h3>
        <p>由醫師、營養師、藥師組成的專業團隊創立的「好好生醫 BetterBio」,推出的魚悅魚油採用挪威百年大廠 VIVO MEGA 原料,擁有高濃度 85% Omega-3 的 rTG
          型態配方。強調「健康好愉悅」的核心理念,專為現代忙碌生活、3C 族群與追求高品質保健食品的消費者設計。</p>
        <div class="brand-review-card">
          <div class="brand-review-header">
            <h3>好好生醫魚悅魚油 85% Omega-3</h3>
            <div class="review-badges">
              <span class="badge badge-rtg">rTG 85%</span>
              <span class="badge badge-ifos">IFOS 5星</span>
              <span class="badge" style="background:#dcfce7;color:#166534;">高EPA配方</span>
            </div>
          </div>

          <div class="brand-review-body">
            <!-- 1. Specs -->
            <div class="review-section-title">1. 產品規格與官方說明</div>
            <table class="review-specs-table">
              <tr>
                <th>產品全名</th>
                <td>魚悅魚油 (膠囊食品) 85% Omega-3 高濃度高EPA 挪威魚油<br>
                  <em style="font-size: 0.9em; color: #64748b;">Joy Fish Oil Concentrate 85% omega-3 rTG Joy Fish Oil
                    with 720 EPA and 240 DHA</em>
                </td>
              </tr>
              <!-- (略: 其他規格欄位, 縮排皆為 14 spaces) -->
            </table>

            <!-- 2. Positioning -->
            <div class="review-section-title">2. 市場定位</div>
            <div class="review-position-box">
              <div class="review-position-box-content">
                <strong>專業團隊研發,高品質首選。</strong>...
              </div>
            </div>

            <!-- 3. Dailyeat Rating -->
            <div class="review-section-title">3. Dailyeat 推薦程度</div>
            <div class="review-rating-box">
              <div class="rating-score-circle">4.5</div>
              <div class="rating-details">
                 <!-- (略) -->
              </div>
            </div>

            <!-- 4. Analysis -->
            <div class="review-section-title">4. 網友評價分析整理</div>
            <div class="review-analysis-grid">
               <!-- (略) -->
            </div>

            <!-- 品牌深度分析 Container -->
            <div class="review-section-title" style="margin-top: 40px;">品牌深度分析</div>
            
            <h4 style="font-size: 1.1em; margin-top: 25px; margin-bottom: 15px; color: #1e293b;">規格驗證...</h4>
            <p>...</p>
            <ul style="line-height: 1.8; margin-bottom: 20px;">
              <li>...</li>
            </ul>

          </div> <!-- End of brand-review-body -->
        </div> <!-- End of brand-review-card -->
```
