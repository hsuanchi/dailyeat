# AI Workspace Core Brain (GEMINI)

這是一個專為 AI 協作設計的工作區，用於標準化我們的協作流程，並將現有的專案規範（Frontend Standards, Writing Guide）整合為可執行的 Skills。

## 📚 核心知識庫 (Knowledge Base)

AI 在執行任務前，必須優先參考以下權威文檔：

1.  **前端開發規範** (`README.md`):
    *   **核心原則**: 零建置 (No Build)、原生 JavaScript、Shadow DOM 隔離。
    *   **關鍵技術**: `Getter/Setter` Chainable API, `setDebug(false)` 靜默模式。
2.  **內容與寫作指引** (`doc/writing-guide.md`):
    *   **策略**: Hub-and-Spoke 模型 (Topic Hub -> Nutrient Spoke)。
    *   **風格**: 專業親切 (Mason Style)、E-E-A-T (引用文獻、負面提醒)、禁止 Icon/Emoji。
    *   **結構**: PSMA 模型、Hero Title 堆疊策略。
3.  **UI 元件庫** (`doc/ui-components-library.md`):
    *   標準化 HTML 結構 (Alerts, Cards, Tables, Charts)。
    *   RWD 規範 (`.responsive-table-wrapper`, `scroll-margin-top`)。
4.  **SOP 檢查清單** (`doc/new-page-checklist.md`):
    *   新頁面建立流程 (Metadata, JSON-LD, Sitemap)。

## 📂 資料夾結構 (Directory Structure)

```text
doc/AI_workspace/
├── GEMINI.md                    <-- 核心大腦 (本文件)
├── context/                     <-- 原始素材 (Input)
│   ├── raw_reports/             <-- PDF/Excel 檢驗報告 (SGS/TOTOX)
│   └── branding/                <-- 產品 DM、品牌視覺規範
├── artifacts/                   <-- 半成品與產出 (Output)
│   ├── drafts/                  <-- 文章初稿 (Markdown/HTML)
│   └── visualizations/          <-- 數據圖表、UI Mockup
└── skills/                      <-- 【技能庫】(Action)
    ├── writing/                 <-- 1. 寫作與編輯技能
    │   ├── REF_writing_guide.md <-- [Link] 指向 doc/writing-guide.md
    │   ├── seo_audit.py         <-- 關鍵字與標題結構檢查
    │   └── tone_check.md        <-- 語氣檢查提示詞 (基於 Mason Style)
    ├── ui/                      <-- 2. 介面與視覺化技能
    │   ├── REF_ui_lib.md        <-- [Link] 指向 doc/ui-components-library.md
    │   ├── chart_generator.py   <-- 產生標準化 SVG/Chart.js 代碼
    │   └── shadow_dom_wrap.js   <-- 快速封裝 Shadow DOM 的模板
    └── analysis/                <-- 3. 數據與研究技能
        ├── data_parser.py       <-- 讀取檢驗報告並轉為 JSON
        └── cp_calculator.py     <-- 魚油 CP 值/濃度計算公式
```

## 🚀 標準作業程序 (SOP)

我們採用 **Context + Skill = Artifact** 的工作模式：

1.  **Context (輸入)**: 將資料放入 `context/`。
2.  **Skill (執行)**: 根據任務類型調用 `skills/` 中的腳本或參考對應的 `doc/` 規範。
3.  **Artifact (輸出)**: 產出符合 `README.md` (技術) 與 `writing-guide.md` (內容) 標準的結果至 `artifacts/`。

## 🧠 技能庫詳細清單 (Skill Categories)

### 1. Writing (寫作與編輯)
> 參考: `doc/writing-guide.md`
- **目標**: 產出符合 Hub-and-Spoke 架構且具備 E-E-A-T 的高權重內容。
- **關鍵檢核點**:
    - [ ] H1 標題是否符合「多重價值堆疊」？
    - [ ] 是否包含「白話摘要 (Giveaway Summary)」？
    - [ ] 是否完全移除 Icon/Emoji？
    - [ ] 是否正確使用 LaTeX 語法呈現化學式？

### 2. UI (介面與視覺化)
> 參考: `doc/ui-components-library.md`, `README.md`
- **目標**: 產出零建置、Shadow DOM 隔離且 RWD 友善的 UI。
- **關鍵檢核點**:
    - [ ] **Shadow DOM**: CSS 是否完全隔離？有沒有洩漏到全域？
    - [ ] **No Build**: 是否為原生 JS？(無 React/Vue/Webpack)
    - [ ] **Chainable API**: Setter 是否回傳 `this`？
    - [ ] **RWD**: 表格是否包裹 `.responsive-table-wrapper`？

### 3. Analysis (數據與研究)
- **目標**: 確保數據精確性與來源透明度。
- **關鍵檢核點**:
    - [ ] 檢驗報告數據 (TOTOX, 重金屬) 是否與原始 PDF 一致？
    - [ ] CP 值計算邏輯是否正確？
