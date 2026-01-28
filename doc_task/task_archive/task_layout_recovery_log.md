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

### 步驟 2：系統性縮排修正 (Systematic Indentation Fix - Manual Approach)

由於自動化腳本或正規表達式 (Regex) 容易因匹配誤差導致結構損壞（例如 Vitabox 案例），最安全且精確的方法是**依據標準階層進行手動修正**。

#### 1. 確立標準縮排階層 (Standard Indentation Hierarchy)
請嚴格遵守以下縮排規則，以確保視覺層級一致：

| 層級 (Level) | 元素範例 (Elements) | 縮排數 (Spaces) | 備註 |
| :--- | :--- | :--- | :--- |
| **Root** | 頁面最外層容器 | 0 - 6 | 視父層級 `.col-lg-8` 而定 |
| **Level 1 (Brand Wrapper)** | `<!-- Brand Comment -->` <br> `<h3 class="review-title">` <br> `<p>` (品牌簡介) <br> `<div class="brand-review-card">` | **8 spaces** | 這是品牌區塊的基準線 |
| **Level 2 (Card Container)** | `<div class="brand-review-header">` <br> `<div class="brand-review-body">` | **10 spaces** | 位於 Card 內部 |
| **Level 3 (Content Block)** | `<div class="review-section-title">` <br> `<table class="review-specs-table">` <br> `<div class="review-position-box">` <br> `<div class="review-rating-box">` <br> `<div class="review-analysis-grid">` <br> **「品牌深度分析」標題與內容** | **12 spaces** | 所有主要內容皆應在此層級 |
| **Level 4 (Inner List/Text)** | `<th>`, `<td>` <br> `<li>` (在 `<ul>` 內) <br> `<p>` (在深度分析內) | **14 - 16 spaces** | 視父容器而定 |

#### 2. 手動修正操作指引 (Manual Fixing SOP)
當發現某個品牌區塊跑版時，請執行以下檢查：

1.  **定位基準線**：找到該品牌的 `<!-- 3.x BrandName -->` 註解與 `<h3>` 標題，確認它們是否為 **8 空格**。
2.  **檢查 Body 容器**：確認 `<div class="brand-review-body">` 是否為 **10 空格**。
3.  **校正內容區塊**：選取所有內容（如「品牌深度分析」章節），使用 `Tab` 或 `Shift + Tab` 將其整體調整至 **12 空格**。
    *   *常見錯誤*：誤將「品牌深度分析」縮排至 8 或 10 空格，導致與其他章節（如「市場定位」）不對齊。
4.  **檢查閉合標籤 (Critical)**：
    *   確認 `brand-review-body` 的結尾 `</div>` 位於 **10 空格**。
    *   確認 `brand-review-card` 的結尾 `</div>` 位於 **8 空格**。
    *   *Vitabox 案例教訓*：若內容縮排正確但仍然跑版，通常是少了一個 `</div>` 或多了一個 `</div>`，導致下一個品牌被「吃」進去。

#### 3. 複製對照法 (Visual Template Matching)
若不確定縮排是否正確，請直接參考 **Sports Research (SR)** 區塊，該區塊結構最為完整且標準：

```html
            <!-- 2. Positioning -->
            <div class="review-section-title">2. 市場定位</div>
            <div class="review-position-box">
              <div class="review-position-box-content">
                <strong>跨境電商的絕對霸主,價格效率屠夫。</strong> 以震撼的成本優勢(娘家的 10 倍、MIHONG 的 1.5 倍價格效率)對本土品牌構成「降維打擊」。專攻追求科學數據與極致 CP
                值的年輕男性與專業人士,是 PTT Fitness 版與 E-shopping 版的不二之選。唯一門檻是海外物流等待期與關稅障礙。
              </div>
            </div>

            <!-- 3. Dailyeat Rating -->
            <div class="review-section-title">3. Dailyeat 推薦程度</div>
            <div class="review-rating-box">
              <div class="rating-score-circle">4.5</div>
              <div class="rating-details">
                <div class="rating-stars">
                  <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                    class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                </div>
                <div class="rating-verdict">
                  <span class="verdict-tag">Dailyeat評價</span>
                  <strong>國際高標,價格屠夫,理性數據派首選。</strong> 若能接受跨境購物門檻,SR
                  在價格效率與原料純度上對本土品牌形成降維打擊。唯一風險是關稅與物流,以及美國規格的巨大膠囊(Horse Pills)對部分使用者的吞嚥挑戰。
                </div>
              </div>
            </div>

            <!-- 品牌深度分析 -->
            <div class="review-section-title" style="margin-top: 40px;">品牌深度分析</div>

            <h4 style="font-size: 1.1em; margin-top: 25px; margin-bottom: 15px; color: #1e293b;">規格驗證與科學解讀 -
              規格破壞者的誕生</h4>
            <p>Sports Research 是 2026 年台灣魚油市場的「規格破壞者」,透過 iHerb 平台直接衝擊本土品牌。</p>
            <ul style="line-height: 1.8; margin-bottom: 20px;">
              <li><strong>Triple Strength 配方：</strong>單顆 1250mg 魚油中含有 <strong style="color: #c2410c;">1040mg
                  Omega-3</strong> (690mg EPA / 260mg DHA),濃度高達 <strong>83%</strong>。</li>
              <li><strong>IFOS 五星認證：</strong>每一批次均公開檢驗報告,透明度滿分。</li>
              <li><strong>原料獨特性：</strong>不同於本土品牌多用混種鯷魚,SR 採用 <strong> Wild Alaska
                  Pollock(阿拉斯加狹鱈)</strong>。單一魚種來源使得溯源管理更為容易,且擁有 <strong style="color: #16a34a;">MSC 永續漁業認證</strong>。
              </li>
              <li><strong>SR-rTG 技術：</strong>雖然標示為 TG,但實為經過再酯化的高濃度 rTG,兼具濃度與吸收。</li>
            </ul>

            <h4 style="font-size: 1.1em; margin-top: 25px; margin-bottom: 15px; color: #1e293b;">價格結構與「降維打擊」經濟效率
            </h4>
            <div class="responsive-table-wrapper">
              <table class="data-table" style="margin-bottom: 20px;">
                <thead>
                  <tr>
                    <th>項目</th>
                    <th>數據</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>市場價格(iHerb)</td>
                    <td>90 粒裝約 USD 18-25 (約 NT$580-870)</td>
                  </tr>
                  <tr>
                    <td><strong>單顆成本</strong></td>
                    <td><strong style="color: #16a34a;">約 NT$9.66</strong></td>
                  </tr>
                  <!-- 省略部分表格內容以從簡，但保持縮排結構 -->
                </tbody>
              </table>
            </div>

            <!-- 省略部分深度分析內容 -->

            <!-- 4. Analysis -->
            <div class="review-section-title">4. 網友評價分析整理</div>
            <div class="review-analysis-grid">
              <div class="analysis-col pros">
                <h5><i class="fas fa-check-circle"></i> 優勢</h5>
                <ul class="analysis-list">
                  <li>83% rTG + IFOS 五星認證,規格完勝同價位競品。</li>
                  <li>價格效率震撼:娘家的 10 倍、MIHONG 的 1.5 倍。</li>
                  <li>單一魚種(阿拉斯加狹鱈)+MSC 認證,溯源管理扎實。</li>
                </ul>
              </div>
              <div class="analysis-col cons">
                <h5><i class="fas fa-exclamation-circle"></i> 劣勢</h5>
                <ul class="analysis-list">
                  <li><strong>關稅障礙:</strong> 台灣海關「半年 6 次、單筆 NT$2,000」免稅額度限制,囤貨困難。</li>
                  <li><strong>物流等待:</strong> 7-14 天配送期,急用者不適合。</li>
                </ul>
              </div>
            </div>
```
