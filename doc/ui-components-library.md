# UI 元件程式碼範例庫 (UI Component Library)

這份文件彙整了 `doc/writing-guide.md` 中提到的所有 UI 元件的 HTML 結構範例。請直接複製所需的代碼區塊到文章中使用，並依據需求修改內容。

> **樣式來源**: 所有 CSS 類別皆定義於 `assets/css/article.css`。

---

## 1. 提示框 (Alerts)

用於突顯重要資訊、專家建議或警告。

### 營養師小撇步 (`.alert-tip`)
```html
<div class="alert alert-tip">
  <strong>營養師小撇步：</strong>
  <p>將魚油與含有脂肪的正餐一同服用，是提升其生物利用率的關鍵。</p>
</div>
```

### 營養師提醒 (`.alert-nutritionist`)
```html
<div class="alert alert-nutritionist">
  <strong>營養師提醒：</strong>
  <p>這是一個專業建議，說明了為何這個營養素很重要。</p>
</div>
```

### 醫師警告 (`.alert-doctor`)
```html
<div class="alert alert-doctor">
  <strong>醫師警告：</strong>
  <p>若您正在服用特定藥物，請在補充此營養素前諮詢您的醫師。</p>
</div>
```

---

## 2. 資訊卡片 (Info Cards)

用於並列呈現核心觀點或功效。建議搭配 `.md-grid-2` (兩欄) 或 3、4 欄使用。

```html
<div class="info-cards md-grid-2"> 
  <div class="info-card">
    <h4 class="info-card-title">核心功效一</h4>
    <p class="info-card-desc">說明此功效的詳細內容...</p>
  </div>
  <div class="info-card">
    <h4 class="info-card-title">核心功效二</h4>
    <p class="info-card-desc">說明此功效的詳細內容...</p>
  </div>
</div>
```

### 迷思破解卡片 (`.card-theme-myth`)
特殊主題樣式，用於闢謠。

```html
<div class="info-cards md-grid-4">
  <div class="info-card card-theme-myth">
    <h4 class="info-card-title title-theme-myth">迷思一：喝大骨湯補鈣？</h4>
    <p class="info-card-desc"><strong>事實：</strong>骨頭中的鈣很難溶出...</p>
  </div>
  <!-- ... 其他迷思卡片 ... -->
</div>
```

---

## 3. 需求自我檢測 (Quick Test)

互動式勾選清單，用於讀者自我評估。

```html
<div class="quick-test">
  <h3>Omega-3 需求評估</h3>
  <p>請檢視您的生活與飲食習慣，是否存在以下情況？</p>
  <div class="test-options">
    <label class="test-option">
      <input type="checkbox" name="need-test" />
      <span>經常外食，飲食內容多高油、精緻澱粉</span>
    </label>
    <label class="test-option">
      <input type="checkbox" name="need-test" />
      <span>健檢報告提示三酸甘油酯等指數異常</span>
    </label>
    <!-- ... 其他選項 ... -->
  </div>
  <p style="margin-top: 20px; color: #14532d; font-weight: 600">
    <strong>若符合 2 項以上</strong>，表示補充高品質 Omega-3 可能對您有顯著幫助。
  </p>
</div>
```

---

## 4. 表格 (Tables)

### 基礎比較表格 (`.data-table`)
**注意**：必須包裹在 `.responsive-table-wrapper` 中以支援手機橫向滾動。

```html
<div class="responsive-table-wrapper">
  <table class="data-table">
    <thead>
      <tr><th>排名</th><th>食物項目</th><th>含量 (mg)</th></tr>
    </thead>
    <tbody>
      <tr><td>冠軍</td><td><strong>葵花籽</strong></td><td><strong>36.3</strong></td></tr>
      <tr><td>亞軍</td><td>杏仁</td><td>29.8</td></tr>
    </tbody>
  </table>
</div>
```

### 進階比較表格 (`.comparison-table`)
用於產品或成分的詳細比較，包含推薦標記。容器 `.comparison-table-container` 已內建滾動功能。

```html
<div class="comparison-table-container">
  <table class="comparison-table">
    <thead>
      <tr>
        <th class="comparison-header-main">比較項目</th>
        <th class="comparison-header-option comparison-recommended">
          <div class="option-badge">推薦</div>
          <strong>魚油 (Fish Oil)</strong>
        </th>
        <th class="comparison-header-option"><strong>磷蝦油</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr class="comparison-row">
        <td class="comparison-label">生物利用率</td>
        <td class="comparison-cell comparison-recommended">
            <div class="rating-badge rating-high">高</div>
        </td>
        <td class="comparison-cell">
            <div class="rating-badge rating-very-high">極高</div>
        </td>
      </tr>
      <!-- ... 其他列 ... -->
    </tbody>
  </table>
</div>
```

### 食物排行榜 (`.food-ranking-container`) [新]
用於列出富含特定營養素的食物排名。

```html
<div class="food-ranking-container">
  <h3 class="food-ranking-title">Top 10 鎂含量食物排行榜 (每100g)</h3>
  <ul class="food-ranking-list">
    <li>
      <a href="/food/pumpkin-seeds.html">
        <span>南瓜子</span>
        <span class="food-value">592 mg</span>
      </a>
    </li>
    <li>
      <a href="/food/flaxseeds.html">
        <span>亞麻籽</span>
        <span class="food-value">392 mg</span>
      </a>
    </li>
    <!-- ... 其他項目 ... -->
  </ul>
</div>
```

---

## 5. 專業洞察卡 (Professional Insight Card)

使用 `<details>` 標籤的可折疊深度內容。

```html
<details class="professional-insight-card">
  <summary class="insight-summary">
    <!-- Icon (FontAwesome) -->
    <div class="insight-icon"><i class="fas fa-microscope"></i></div>
    <!-- 標題與預覽 -->
    <div class="insight-header">
      <span class="insight-title">病理機制詳解：動脈粥狀硬化的分子過程</span>
      <span class="insight-preview">這不僅僅是膽固醇堆積，而是一場發炎反應與氧化風暴。</span>
    </div>
    <!-- 箭頭 Icon -->
    <i class="fas fa-chevron-down toggle-icon"></i>
  </summary>
  <div class="insight-content">
    <p>現代病理學已證實...</p>
    <ul>
      <li><strong>1. 內皮功能障礙...</strong></li>
      <li><strong>2. 脂質浸潤與氧化...</strong></li>
    </ul>
  </div>
</details>
```

---

## 6. 視覺化劑量圖 (Dosage Infographic)

呈現建議攝取量與比例。

```html
<div class="dosage-infographic-container">
  <div class="dosage-card">
    <div class="d-card-header">
      <div class="d-card-title">心血管保健</div>
      <div class="d-card-subtitle">三高族群</div>
    </div>
    <div class="dosage-card-dose">1000-2000<span class="unit">mg</span></div>
    
    <!-- 方式 A: 比例條 -->
    <div class="ratio-info">
      <div class="ratio-label">EPA : DHA ≈ 2 : 1</div>
      <div class="ratio-bar">
        <!-- 使用 style 傳遞動態寬度 -->
        <div class="ratio-bar-epa" style="width: 67%"></div>
        <div class="ratio-bar-dha" style="width: 33%"></div>
      </div>
    </div>

    <!-- 方式 B: 數據列表 -->
    <ul class="d-list">
        <li class="d-item"><span class="d-name">男性</span><span class="d-val">400-420 mg</span></li>
        <li class="d-item"><span class="d-name">女性</span><span class="d-val">310-320 mg</span></li>
    </ul>
  </div>
  <!-- ... 其他劑量卡片 ... -->
</div>

<!-- 圖例 (僅用於方式 A) -->
<div class="ratio-legend">
    <div class="legend-item"><span class="legend-dot" style="background-color: var(--primary-color);"></span> EPA</div>
    <div class="legend-item"><span class="legend-dot" style="background-color: #2563eb;"></span> DHA</div>
</div>
```

---

## 7. 流程圖 (Flowchart) [新]

扁平化設計的步驟流程圖。

```html
<div class="flowchart">
  <div class="flow-step">
    <h4>發炎反應</h4>
    <p>血管內皮受損</p>
  </div>
  <div class="flow-arrow">→</div>
  <div class="flow-step">
    <h4>氧化作用</h4>
    <p>LDL 被氧化推積</p>
  </div>
  <div class="flow-arrow">→</div>
  <div class="flow-step">
    <h4>鈣化硬化</h4>
    <p>形成斑塊阻塞血管</p>
  </div>
</div>
```

---

## 8. 系統診斷圖 / 關聯圖 (Debug Map) [新]

用於展示「症狀 -> 原因 -> 解方」的多對多關係網狀圖。

```html
<div class="debug-map">
  <!-- 連線層 (SVG) -->
  <svg class="connections-layer">
    <!-- 路徑範例，需配合 JS 計算座標 -->
    <path d="M..." class="connection" data-from="sym-1" data-to="cause-1"></path>
  </svg>

  <!-- 症狀欄 (Symptoms) -->
  <div class="col-symptom">
    <div class="col-header">症狀 (Symptoms)</div>
    <div class="node-group">
      <div class="node" id="sym-1" data-type="symptom">
        <div><span class="node-icon">🤕</span>經常頭痛</div>
        <span class="node-jump">➜</span>
      </div>
      <!-- ... -->
    </div>
  </div>

  <!-- 原因欄 (Causes) -->
  <div class="col-cause">
    <div class="col-header">可能原因 (Causes)</div>
    <div class="node-group">
      <div class="node" id="cause-1" data-type="cause">
        <div><span class="node-icon">🔻</span>鎂缺乏</div>
        <span class="node-jump">➜</span>
      </div>
      <!-- ... -->
    </div>
  </div>

  <!-- 解方欄 (Solutions) -->
  <div class="col-solution">
    <div class="col-header">建議解方 (Solutions)</div>
    <div class="node-group">
      <div class="node" id="sol-1" data-type="solution">
        <div><span class="node-icon">💊</span>補充鎂</div>
      </div>
      <!-- ... -->
    </div>
  </div>
</div>
```

---

## 9. 步驟指南 (Step Guide)

有順序性的流程指引。

```html
<div class="step-guide-container">
  <h3 class="step-guide-title">選購黃金評估流程</h3>
  <ol class="step-guide">
    <li class="step-guide-item">
      <h4>第一步：檢視濃度</h4>
      <p>選擇 <strong>Omega-3 總濃度 > 85%</strong> 的產品，才能確保效率。</p>
    </li>
    <li class="step-guide-item">
      <h4>第二步：確認新鮮度</h4>
      <p>尋找明確標示 <strong>TOTOX 總氧化值 < 10</strong> 的產品。</p>
    </li>
  </ol>
</div>
```

---

## 10. 正反列表 (Dos & Don'ts)

建議與不建議的對照清單。

```html
<div class="dos-donts-container">
  <div class="do-list">
    <h4><center>專業選購的 checklist</center></h4>
    <ul class="dos-donts-list">
      <li><p><strong>標示透明完整：</strong>應清楚列出 EPA/DHA 含量、來源與 TOTOX 值。</p></li>
    </ul>
  </div>
  <div class="dont-list">
    <h4><center>應警惕的危險信號</center></h4>
    <ul class="dos-donts-list">
      <li><p><strong>模糊的濃度標示：</strong>只寫「魚油 1000mg」，卻對 Omega-3 含量含糊其辭。</p></li>
    </ul>
  </div>
</div>
```

---

## 11. SVG 視覺化圖表

### 圓餅圖 (Donut Chart)
呈現濃度佔比。

```html
<div class="concentration-chart-container">
  <div class="chart-panel">
    <h4>高品質魚油</h4>
    <svg class="donut-chart-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="transparent" stroke="#e5e7eb" stroke-width="10"></circle>
      <circle class="donut-fg" cx="50" cy="50" r="45" fill="transparent" stroke="#ff6b35" stroke-width="10" stroke-linecap="round" transform="rotate(-90 50 50)" style="stroke-dasharray: 282.7; stroke-dashoffset: 42.4;"></circle>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
        <tspan class="chart-text-percent" fill="#166534">> 85%</tspan>
        <tspan x="50%" dy="1.2em" class="chart-text-label">Omega-3</tspan>
      </text>
    </svg>
    <p>每一顆都富含高純度的有效成分，確保每一次補充都高效、純淨。</p>
  </div>
</div>
```

### 長條圖 (Bar Chart)
呈現數值比較。

```html
<div class="absorption-chart-container">
  <h3 class="absorption-chart-title">型態與吸收率效益比較</h3>
  <svg class="absorption-svg" viewBox="0 0 200 150">
    <g>
      <rect x="30" y="80" width="60" height="50" rx="4" fill="#a0aec0"/>
      <text x="60" y="105" class="bar-value">基準</text>
      <text x="60" y="145" class="bar-label">EE 型態</text>
    </g>
    <g>
      <rect x="110" y="22" width="60" height="108" rx="4" fill="#ff6b35"/>
      <text x="140" y="42" class="bar-value">+70%</text>
      <text x="140" y="145" class="bar-label">rTG 型態</text>
    </g>
  </svg>
</div>
```

---

## 12. 文章元素

### 故事引言 (`.story-intro`)
用於文章開頭。

```html
<div class="story-intro">
  <h3>為什麼我們需要談論這個？</h3>
  <p>想像一下，你的血管就像一條繁忙的高速公路...</p>
</div>
```

### 速讀卡片 (`.quick-read-card`)
30秒精華摘要。

```html
<div class="article-content quick-read-card">
  <div class="card-click-hint">點擊展開完整閱讀</div>
  <h2>快速重點整理</h2>
  <ul>
    <li>重點一...</li>
    <li>重點二...</li>
  </ul>
</div>
```

### 常見問題 (FAQ)
互動式問答，點擊標題可展開。

```html
<div class="faq-item">
  <div class="faq-question">Q1: 這個可以長期吃嗎？</div>
  <div class="faq-answer">
    <p><strong>A: 可以...</strong> 只要遵循建議劑量。</p>
  </div>
</div>
```

### 免責聲明 (`.disclaimer`)
頁尾標準聲明。

```html
<section class="disclaimer">
  <div class="disclaimer-content">
    <h3>免責聲明</h3>
    <p>本站內容僅供參考，不應視為醫療建議...</p>
  </div>
</section>
```
