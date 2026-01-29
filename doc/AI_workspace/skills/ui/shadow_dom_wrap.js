/**
 * Dailyeat Component Template
 * 遵循原則：No Build, Native JS, Shadow DOM Isolation, Chainable API
 */
(function (global) {
    'use strict';

    class DailyeatComponent {
        /**
         * @param {HTMLElement} hostElement - 宿主元素
         */
        constructor(hostElement) {
            if (!hostElement) {
                console.error('[DailyeatComponent] Host element is required');
                return;
            }
            this.hostElement = hostElement;
            
            // 1. 建立 Closed Shadow DOM
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });

            // 2. 初始化設定 (Private Config)
            this._config = {
                debug: false,
                theme: 'light',
                // 自定義參數預設值
            };

            // 3. 狀態管理 (Private State)
            this._state = {
                isInitialized: false
            };
        }

        /**
         * 初始化組件
         * @returns {DailyeatComponent}
         */
        initialize() {
            if (this._state.isInitialized) return this;

            this._log('Initializing component...');
            
            this._createStyles();
            this._createContent();
            this._bindEvents();

            this._state.isInitialized = true;
            return this;
        }

        /**
         * [Private] 建立樣式 (完全隔離)
         */
        _createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    width: 100%;
                    --primary-color: #ff6b35; /* Dailyeat Orange */
                    --text-color: #334155;
                    --bg-color: #ffffff;
                }

                /* RWD 容器 */
                .component-container {
                    font-family: system-ui, -apple-system, sans-serif;
                    box-sizing: border-box;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    /* 防止溢出 */
                    overflow-x: hidden; 
                }

                /* Utils */
                .hidden { display: none !important; }
            `;
            this.shadowRoot.appendChild(style);
        }

        /**
         * [Private] 建立 HTML 結構
         */
        _createContent() {
            const container = document.createElement('div');
            container.className = 'component-container';
            
            // 用戶自定義內容
            container.innerHTML = `
                <div class="content-wrapper">
                    <!-- Component Content Here -->
                </div>
            `;

            this.shadowRoot.appendChild(container);
            this._container = container; 
        }

        /**
         * [Private] 綁定事件
         */
        _bindEvents() {
            // 使用 Arrow Function 確保 this 指向正確
            // this._container.querySelector('.btn').addEventListener('click', () => this._handleClick());
        }

        /**
         * [Private] 內部 Log 機制
         */
        _log(...args) {
            if (this._config.debug) {
                console.log('[DailyeatComponent]', ...args);
            }
        }

        // ==========================================
        // Public API (Chainable Getter/Setter)
        // ==========================================

        /**
         * 設定除錯模式
         * @param {boolean} isDebug 
         * @returns {DailyeatComponent}
         */
        setDebug(isDebug) {
            this._config.debug = Boolean(isDebug);
            return this;
        }

        /**
         * 取得除錯模式狀態
         * @returns {boolean}
         */
        getDebug() {
            return this._config.debug;
        }

        /**
         * 設定主題
         * @param {'light'|'dark'} theme 
         * @returns {DailyeatComponent}
         */
        setTheme(theme) {
            if (['light'|'dark'].includes(theme)) {
                this._config.theme = theme;
                // 可在此處更新 CSS 變數
            }
            return this;
        }

        /**
         * 銷毀組件
         */
        destroy() {
            // 清理事件監聽器等資源
            this.shadowRoot.innerHTML = '';
            this._state.isInitialized = false;
        }
    }

    // 掛載到全域變數
    global.DailyeatTemplateComponent = DailyeatComponent;

})(window);
