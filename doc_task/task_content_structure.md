# Fish Oil Content Structure Map (目錄結構總覽)

本文件整理目前所有魚油相關網頁的目錄結構，展示內容脈絡與層級關係。
Project Structure (專案結構)

*(From README.md)*

### 內容架構理念 (Hub-and-Spoke)

本專案的內容架構採用「Hub-and-Spoke」（軸心輻射）模型，以建立主題權威性並優化 SEO。

-   **Hub (軸心)**: 為高層次的「主題彙整頁面」（如 `post/fish-oil-hubpage.html`），圍繞特定健康目標提供全面性的指引。
-   **Core (核心)**: 針對該主題的詳盡知識圖譜與核心文章（如 `post/fish-oil.html`）。
-   **Spoke (輻射)**: 為基礎的「元素頁面」或「分眾頁面」，深入探討單一針對性主題（如 `post/doing/fish-oil-groups.html`）。

所有文章都應遵循此模型的內部連結策略。

```
dailyeat/
├── index.html                     # 主頁面文件
├── post/                          # 文章核心目錄
│   ├── fish-oil-hubpage.html      # [Hub] 魚油專題入口 (Editorial Style)
│   ├── fish-oil.html              # [Core] 魚油完整指南 (Article Style)
│   ├── doing/                     # [Work-in-Progress] 進行中/重構中的 Spoke 頁面
│   │   ├── fish-oil-groups.html   # 分眾指南
│   │   ├── fish-oil-tools.html    # 工具箱
│   │   └── ...
│   ├── legacy/                    # [Archive] 舊版或備份檔案
│   │   └── fish-oil_past.html
│   └── [nutrient].html            # 其他核心營養素文章
├── category/                      # 分類頁面
│   ├── archive.html               # 文章總覽
│   ├── tools.html                 # 綜合工具箱
│   └── ...
├── assets/
│   ├── css/
│   │   ├── article.css            # 核心文章樣式
│   │   └── editorial.css          # 專題/雜誌風格樣式
│   └── js/
│       ├── deus-header-component.js # 全站統一 Header
│       └── ...
├── doc/
│   ├── writing-guide.md           # 文章風格指引
│   └── new-page-checklist.md      # 新增頁面檢查清單
├── doc_task/                      # 任務管理目錄
│   ├── todo.md                    # 待辦事項
│   ├── task_archive/              # 歸檔任務
│   └── ...
├── CLAUDE.md                     # 開發規範
└── README.md                     # 本文件
```






## 1. Hub Page (入口與分流)

### [`post/fish-oil-hubpage.html`](file:///c:/Users/烈日千陽/dailyeat/post/fish-oil-hubpage.html)
- **H1**: 【2025 魚油選購聖經】營養師教你識破 5 大行銷術，挑出真正高濃度的實力品牌
- **H2**: 族群分眾指南：針對孕婦、三高、上班族的精準 Omega-3 方案
    - **H3**: 孕媽咪與兒童
    - **H3**: 考生與上班族
    - **H3**: 銀髮族與三高
- **H2**: 深度知識庫
    - **H3**: Omega-3 總論
    - **H3**: 2025 市售評比
    - **H3**: rTG 型態解析
    - **H3**: 產地與來源
    - **H3**: 檢驗與認證
    - **H3**: 常見問題 FAQ
- **H2**: 健康精算師
    - **H3**: 每日劑量試算
    - **H3**: 真實成本計算機

---

## 2. Core Page (核心知識)

### [`post/fish-oil.html`](file:///c:/Users/烈日千陽/dailyeat/post/fish-oil.html)
- **H1**: Omega-3 魚油全指南：從抗發炎機制到全身器官修復的科學實證與食用建議
- **H2**: 慢性發炎與 Omega-3：為什麼魚油是啟動身體修復機制的關鍵？
- **H2**: 魚油的科學實體：EPA 與 DHA 對人體的生物價值
    - **H3**: 自我檢測：誰最需要補充？
    - **H3**: 失衡的代價：當身體長期「缺油」會怎樣？
    - **H3**: 為什麼會發生？從「細胞膜硬化」說起
    - **H3**: 效益：唯一的解藥是「流動性 (Fluidity)」
- **H2**: 經科學實證的健康功效：Omega-3 的多重效益
    - **H3**: 血管清道夫：EPA 降低三酸甘油酯與調節血脂的臨床機制
    - **H3**: 大腦的潤滑劑：DHA 如何優化神經傳導並提升專注力？
    - **H3**: 體內的滅火隊：Omega-3 如何阻斷發炎路徑並改善代謝？
    - **H3**: 數位疲勞的救星：魚油緩解乾眼與保護感光細胞的醫學實證
    - **H3**: 情緒的穩定器：高濃度 EPA 在抗憂鬱與焦慮治療中的角色
    - **H3**: 贏在起跑點：孕期補充 DHA 對胎兒智力與視力的長遠影響
- **H2**: 魚油怎麼吃？劑量、時間與飯前飯後完整指南
    - **H3**: 各族群的建議劑量與比例
    - **H3**: 黃金服用時間：吸收率差在哪？
- **H2**: 天然食物 vs. 營養補充品：我需要吃魚油嗎？
- **H2**: 專業選購標準：如何辨識高品質魚油？
- **H2**: 進階比較分析：魚油 vs. 磷蝦油 vs. 亞麻籽油
- **H2**: 魚油的風險與安全注意事項
    - **H3**: 魚油的常見副作用
- **H2**: 常見問題與迷思破解 (FAQ)
    - **H3**: 參考文獻 (Scientific References)

---

## 3. Verticals (分眾與應用指南)

### [`post/doing/fish-oil-groups.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-groups.html)
- **H1**: 別再亂吃！全族群魚油精準補給手冊：從胎兒發育到銀髮族心血管的 Omega-3 方案
    - **H3**: 一分鐘快速導覽：各族群魚油需求差異表
    - **H3**: 為什麼分眾很重要？
- **H2**: 孕期補充關鍵：DHA 如何影響胎兒大腦發育與產後情緒？
- **H2**: 兒童學習力升級：把握黃金發育期的 Omega-3 營養策略
- **H2**: 考生衝刺必備：高濃度 DHA 如何提升記憶效率與抗疲勞？
- **H2**: 上班族抗壓指南：改善慢性發炎與乾眼症的 EPA+DHA 完美比例
    - **H3**: 1. EPA + DHA 均衡攝取：修正油脂失衡
    - **H3**: 2. 高濃度 rTG 型態：追求效率
    - **H3**: 3. EPA 與情緒穩定
- **H2**: 銀髮族護心計畫：預防心血管疾病與認知退化的魚油食用比例

### [`post/doing/fish-oil-guide.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-guide.html)
- **H1**: 魚油什麼時候吃？飯前還飯後？營養師親授「3不2要」正確吃法與副作用排除
- **H2**: 為什麼我們需要魚油？(現代人的隱形危機)
    - **H3**: 市面上最平淡，卻也最必要的「補丁」
    - **H3**: 一場 20:1 的失衡戰爭
- **H2**: 什麼時候吃？黃金吸收時間
- **H2**: 營養師親授：「3不2要」口訣
- **H2**: 副作用排除大全 (Troubleshooting)
    - **H3**: 為什麼我吃魚油會拉肚子？
- **H2**: 常見問題：冷藏與保存
- **H2**: 延伸閱讀：聰明選購

### [`post/doing/fish-oil-faq.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-faq.html)
- **H1**: 魚油常見問題 (FAQ)：最詳細的補充問答全紀錄
- **H2**: 常見問題：魚油來源、純度與保存的常見迷思
- **H2**: 功效實證：關於降血脂、護眼與抗發炎的科學真相
- **H2**: 進階答疑：魚油要天天吃嗎？劑量過高會怎樣？
- **H2**: 安全與禁忌：與藥物交互作用及特殊族群的食用風險
- **H2**: 族群專屬疑問：孕婦、兒童與素食者的補充建議

---

## 4. Market Review & Tools (評測與工具)

### [`post/doing/fish-oil-market-analysis.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-market-analysis.html)
- **H1**: 【2025 魚油實測】破解 3 大行銷謊言，營養師教你算「真實 CP 值」！
- **H2**: 2025 十大品牌實測數據對比
- **H2**: 避坑指南：揭露那些濃度標示不清的魚油品牌
- **H2**: 專業評測維度：從 TOTOX 新鮮度、rTG 轉化率到重金屬殘留的殘酷測試
    - **H3**: 法則一：濃度是關鍵 (Omega-3 > 80%)
    - **H3**: 法則二：型態決定吸收率 (rTG vs TG vs EE)
    - **H3**: 法則三：看懂原料商 (KD, Vivomega, Solutex)
    - **H3**: 法則四：新鮮度 (TOTOX 指標)
    - **H3**: 法則五：EPA 與 DHA 的黃金比例
- **H2**: 2025 年 Top 10 人氣魚油品牌深度開箱
    - **H3**: 1. 大研生醫 德國頂級魚油 (Daiken)
    - **H3**: 2. Vitabox 挪威高濃度魚油
    - **H3**: 3. 營養師輕食 1000 頂級超臨界魚油
    - **H3**: 4.  Kirkland 科克蘭魚油
    - **H3**: 5. 三得利 (Suntory) DHA&EPA+芝麻明 E
- **H2**: 魚油評比總結與 CP 值精算 (Comparison Matrix)
    - **H3**: 魚油真實 CP 值計算機
- **H2**: 醫學實證與副作用 (PubMed 解析)
- **H2**: 常見問題 FAQ
- **H2**: 延伸閱讀

### [`post/doing/fish-oil-tools.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-tools.html)
- **H1**: 不再被標示欺騙！魚油智慧計算機：30 秒算出濃度、每日所需與品牌 CP 值
- **H2**: 純度與價值分析儀
- **H2**: 個人化魚油挑選器
- **H2**: 市售品牌參數對比：自定義權重找出你的專屬首選
- **H2**: 為什麼這很重要？
    - **H3**: 識破「低濃度」的選購盲點
    - **H3**: 如何解讀 CP 值？

---

## 5. Technical Deep Dives (技術深度解析)

### [`post/doing/fish-oil-structure.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-structure.html)
- **H1**: 魚油型態吸收率真相：rTG、EE、TG 臨床數據對比與真實成本分析
    - **H3**: 你買的是「魚油」還是「昂貴的尿液」？
- **H2**: 從 TG 到 rTG：解析各型態加工流程與人體吸收利用率差異
- **H2**: 吸收率大對決：數字會說話
- **H2**: 破解都市傳說：魚油會溶解保麗龍？
- **H2**: 真實成本計算機：別被低價騙了
    - **H3**: 如何計算「真實 CP 值」？
- **H2**: 下一步：確認品質安全

### [`post/doing/fish-oil-quality.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-quality.html)
- **H1**: 30 秒識破低品質魚油！濃度計算、重金屬檢測與 IFOS 認證完全攻略
    - **H3**: 你吃的魚油，裡面裝的是「寶石」還是「石頭」？
- **H2**: 濃度怎麼算？數學不會騙人
    - **H3**: 真實濃度計算三步驟
- **H2**: 安全來源：為什麼一定要選「小型魚」？
- **H2**: 什麼是 IFOS 五星認證？
- **H2**: 標示陷阱大公開
- **H2**: 下一步：了解不同族群的需求

### [`post/doing/fish-oil-sources.html`](file:///c:/Users/烈日千陽/dailyeat/post/doing/fish-oil-sources.html)
- **H1**: 不再選擇障礙！魚油、藻油、磷蝦油終極評比：素食者、環保與 CP 值的黃金交叉點
    - **H3**: Omega-3 的世界，不只有魚
- **H2**: 三大來源總表大對決
- **H2**: 藻油：素食者的唯一救贖？
- **H2**: 磷蝦油：那個紅色奇蹟是真的嗎？
- **H2**: 常見迷思與環保議題QA
- **H2**: 延伸閱讀

---


