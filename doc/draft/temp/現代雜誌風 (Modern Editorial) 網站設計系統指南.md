# **現代雜誌風 (Modern Editorial) 網站設計系統指南**

風格定義：結合傳統出版品的排版美學與現代網頁的流暢互動。強調「權威感」、「有機質感」與「閱讀沉浸感」。  
適用場景：高單價消費品 (D2C)、醫療保健、生活風格品牌、精品電商。

## **1\. 核心視覺支柱 (Visual Pillars)**

要複製這種「看起來很貴」的感覺，必須嚴格遵守以下三大支柱：

### **A. 字體排印學 (Typography Hierarchy)**

這種風格的靈魂在於**襯線體 (Serif)** 與 **無襯線體 (Sans-serif)** 的混搭。

* **標題字 (Headings)**：使用 **Noto Serif TC** (襯線體)。  
  * *特徵*：帶有筆觸的尾端，傳遞經典、學術、歷史感。  
  * *技巧*：大標題的字距要縮小 (tracking-tighter / letter-spacing: \-0.02em)，讓文字看起來更緊湊有力。  
* **內文字 (Body)**：使用 **Noto Sans TC** (無襯線體)。  
  * *特徵*：乾淨好讀，現代感。  
  * *技巧*：保持足夠的行高 (leading-relaxed)，增加閱讀舒適度。  
* **標籤字 (Labels)**：使用 **Sans-serif**，全大寫。  
  * *技巧*：極小的字號 (text-xs) 搭配極寬的字距 (tracking-widest)。這在高級腕錶或香水廣告中非常常見。

### **B. 配色策略 (Color Palette)**

放棄純黑與純白。使用來自大自然的「深色調」與「大地色調」。

| 色彩名稱 | Hex Code | 說明 | Tailwind 設定建議 |
| :---- | :---- | :---- | :---- |
| **Deep Teal (深海綠)** | \#0F2C28 | **主色**。取代純黑色。象徵深海、專業與沉穩。 | colors: { 'brand-dark': '\#0F2C28' } |
| **Warm Sand (暖沙金)** | \#C6A87C | **強調色**。取代鮮黃或鮮紅。低調的奢華感。 | colors: { 'brand-accent': '\#C6A87C' } |
| **Cream Paper (米白紙)** | \#F9F8F4 | **背景色**。取代純白色。模擬高級紙張的質感，減少螢幕刺眼感。 | colors: { 'brand-cream': '\#F9F8F4' } |
| **Forest (森林綠)** | \#2D5B52 | **輔助色**。用於次要文字或 hover 效果。 | colors: { 'brand-green': '\#2D5B52' } |

### **C. 佈局與空間 (Layout & Spacing)**

* **非對稱平衡**：不要把所有東西都置中。嘗試「左文右圖」或交錯排列。  
* **有機幾何**：使用特殊的圓角（如拱門形 rounded-t-\[100px\]），打破網頁方方正正的呆板感。  
* **留白 (Negative Space)**：padding 要敢給。段落間距至少 py-24 (96px)，讓視線呼吸。

## **2\. 關鍵技術實作 (Tailwind CSS & Code Tricks)**

這部分是給開發者的具體執行清單。

### **工具準備**

1. **Framework**: Tailwind CSS (最適合快速調整微細節)。  
2. **Fonts**: Google Fonts 引入 Noto Serif TC (權重 300, 500, 700\) 與 Noto Sans TC。  
3. **Icons**: FontAwesome (使用簡單線條) 或 Heroicons。

### **必學 CSS 效果 (Magic Sauce)**

#### **1\. 圖片揭示效果 (Image Reveal)**

讓圖片看起來像是「呼吸」一樣，而不是死板的 JPG。

/\* 定義慢速過渡 \*/  
.reveal-img {  
    transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1); /\* 貝茲曲線讓動態更優雅 \*/  
}  
/\* Hover 時輕微放大 \*/  
.group:hover .reveal-img {  
    transform: scale(1.05);  
}

#### **2\. 隱藏捲軸的橫向滑動 (Horizontal Scroll)**

用於「精選路徑」區塊，創造類似 Netflix 或 App Store 的滑動體驗。

/\* 隱藏預設捲軸 \*/  
.no-scrollbar::-webkit-scrollbar {  
    display: none;  
}  
.no-scrollbar {  
    \-ms-overflow-style: none; /\* IE and Edge \*/  
    scrollbar-width: none; /\* Firefox \*/  
}  
/\* Tailwind Class 組合 \*/  
/\* flex overflow-x-auto snap-x snap-mandatory \*/

#### **3\. 混合模式 (Blend Modes)**

讓 Navbar 在背景上看起來更自然，像印在紙上一樣。

\<header class="mix-blend-multiply ..."\>   
\<\!-- 這會讓 header 的白色部分變透明，深色部分與背景融合 \--\>

#### **4\. 毛玻璃特效 (Glassmorphism)**

用於圖片上的標籤，增加層次感。

\<div class="bg-white/90 backdrop-blur ..."\>  
\<\!-- /90 代表 90% 不透明度，配合 backdrop-blur 產生模糊 \--\>

## **3\. UI 元件庫清單 (Component Checklist)**

若要建立此風格的頁面，你需要製作以下元件：

### **A. 雜誌封面 Hero (The Editorial Hero)**

* **文字區**：超大襯線標題 \+ 極小的全大寫眉批 (Kicker)。  
* **圖片區**：裁切成特殊形狀（拱門或大圓角）的高畫質情境圖。  
* **連結**：不要用按鈕 (Button)，改用 **帶底線的文字連結 (Text Link)**，例如 border-b border-brand-dark。這更像閱讀體驗而非軟體介面。

### **B. 橫向捲動卡片 (Curated Slider)**

* **容器**：設定為 snap-x，讓滑動時會自動對齊卡片。  
* **卡片**：圖片比例建議 4:5 (肖像模式)。  
* **互動**：滑鼠 hover 時，圖片變亮或稍微放大。

### **C. 極簡列表 (Minimalist List)**

用於評測或目錄。

* **線條**：使用極細的線條 (divide-y divide-brand-dark/10) 分隔項目。  
* **編號**：使用淡色的襯線數字 (01, 02...) 作為裝飾。  
* **留白**：每個項目要有足夠的上下 padding (py-8)。

## **4\. 圖片挑選指南 (Art Direction)**

風格再好的程式碼，配上錯誤的圖片也會毀掉。

* **Do (推薦)**：  
  * **紋理 (Texture)**：海水的波紋、沙子的顆粒、油滴的特寫。  
  * **意象 (Abstract)**：不需要直接放「魚」。放深海的光影、實驗室的玻璃器皿。  
  * **低飽和度**：圖片顏色不要太鮮豔，最好帶一點灰調或藍綠調。  
* **Don't (避免)**：  
  * **去背商品圖**：除非是購物車頁面，否則不要直接放白底的罐子。  
  * **圖庫感太重的人像**：不要放「假笑的握手醫生」。  
  * **高對比鮮豔色**：避免霓虹色系。

## **5\. 快速上手步驟 (Quick Start for Developers)**

1. **設定 Tailwind Config**：直接複製 fish\_oil\_hub\_v3\_editorial.html 中的 tailwind.config script 設定顏色與字體。  
2. **建立全域樣式**：設定 body 背景色為米色 (\#F9F8F4)，文字色為深綠 (\#0F2C28)。  
3. **引入字體**：在 \<head\> 貼上 Google Fonts 連結。  
4. **開始堆疊區塊**：  
   * Hero 區塊 (Grid Layout)  
   * 滑動區塊 (Flex Layout \+ Overflow)  
   * 深色區塊 (Inverted Colors: 深底淺字)  
5. **微調間距**：最後一步檢查所有 margin 和 padding，**把它們加倍**。大多數設計不夠大氣都是因為擠在一起。

**設計師筆記**：這種風格的關鍵是\*\*「克制」\*\*。不要把所有空間填滿，讓留白來說話。這就是「低調奢華」的精髓。