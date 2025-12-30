(function (global) {
    'use strict';

    class FishOilSelector {
        constructor(hostElement) {
            this.hostElement = hostElement;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });
            this._config = {
                debug: false
            };
            this._state = {
                identity: '',
                need: ''
            };

            // Knowledge Base (Same data, just restyled)
            this._recommendations = {
                'pregnant': {
                    desc: '孕媽咪的純淨守護',
                    focus: 'DHA > EPA',
                    ratio: '高 DHA',
                    dosage: '200mg DHA',
                    tips: 'DHA 是寶寶潛能發展的基石。產前一個月請依醫囑調整，或選擇純藻油。',
                    badge: 'PREGNANCY'
                },
                'senior': {
                    desc: '樂齡族的循環保養',
                    focus: 'EPA > DHA',
                    ratio: '高 EPA',
                    dosage: '1000mg ⭐',
                    tips: 'EPA 幫助促進新陳代謝。若有服用抗凝血劑，請務必諮詢醫師。',
                    badge: 'SENIOR CARE'
                },
                'student': {
                    desc: '考生的專注力補給',
                    focus: 'DHA Focus',
                    ratio: '高 DHA',
                    dosage: '500mg+',
                    tips: '閱讀與學習需要大量的 DHA 支持，保持思緒清晰靈活。',
                    badge: 'STUDENT'
                },
                'worker': {
                    desc: '職場菁英的活力來源',
                    focus: 'DHA + EPA',
                    ratio: '均衡 3:2',
                    dosage: '1000mg',
                    tips: '外食族容易攝取過多 Omega-6，平衡發炎反應是關鍵。',
                    badge: 'PROFESSIONAL'
                },
                'adult': {
                    desc: '日常基礎調理',
                    focus: 'Balance',
                    ratio: '均衡型',
                    dosage: '600-1000mg',
                    tips: '飯後食用吸收率最佳。選擇 rTG 型態效果更顯著。',
                    badge: 'DAILY ESSENTIAL'
                }
            };
        }

        initialize() {
            this._render();
            this._attachEvents();
            return this;
        }

        setDebug(debug) { this._config.debug = Boolean(debug); return this; }

        _calculate() {
            const { identity, need } = this._state;
            if (!identity) return;
            const rec = this._recommendations[identity];
            this._updateUI(rec);
        }

        _updateUI(rec) {
            const root = this.shadowRoot;
            const resultPanel = root.getElementById('result-panel');
            const placeholder = root.getElementById('result-placeholder');

            placeholder.style.display = 'none';
            resultPanel.style.display = 'block';
            setTimeout(() => resultPanel.style.opacity = '1', 50);

            root.getElementById('res-badge').textContent = rec.badge;
            root.getElementById('res-desc').textContent = rec.desc;
            root.getElementById('res-focus').textContent = rec.focus;
            root.getElementById('res-ratio').textContent = rec.ratio;
            root.getElementById('res-dosage').textContent = rec.dosage;
            root.getElementById('res-tips').textContent = rec.tips;
        }

        _attachEvents() {
            const root = this.shadowRoot;

            const handleSelect = (groupClass, key) => {
                root.querySelectorAll(groupClass).forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        root.querySelectorAll(groupClass).forEach(b => b.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        this._state[key] = e.currentTarget.dataset.val;
                        this._calculate();
                    });
                });
            };

            handleSelect('.btn-identity', 'identity');
            handleSelect('.btn-need', 'need');
        }

        _render() {
            const style = document.createElement('style');
            style.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@300;400;500;600;700&display=swap');

                :host {
                    display: block;
                    --brand-dark: #0F2C28;
                    --brand-green: #2D5B52;
                    --brand-accent: #C6A87C;
                    --brand-cream: #F9F8F4;
                    --font-serif: 'Noto Serif TC', serif;
                    --font-sans: 'Noto Sans TC', sans-serif;
                    color: var(--brand-dark);
                }
                .selector-container {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    /* Organic rounded shape on top left only */
                    border-top-left-radius: 80px; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                    overflow: hidden;
                    max-width: 900px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 320px;
                }
                
                @media (max-width: 768px) {
                    .selector-container { 
                        grid-template-columns: 1fr; 
                        border-top-left-radius: 40px;
                    }
                }

                .interaction-area {
                    padding: 50px;
                }
                
                .step-group { margin-bottom: 50px; }
                .step-group:last-child { margin-bottom: 0; }

                .step-title {
                    font-family: var(--font-serif);
                    font-size: 1.4em;
                    color: var(--brand-dark);
                    margin-bottom: 25px;
                    display: flex; 
                    align-items: center; 
                    gap: 15px;
                }
                .step-num {
                    font-family: var(--font-sans);
                    font-size: 0.6em;
                    color: var(--brand-accent);
                    border: 1px solid var(--brand-accent);
                    width: 24px; height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .options-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .btn-option {
                    background: transparent;
                    border: 1px solid var(--brand-green);
                    padding: 10px 20px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
                    font-family: var(--font-sans);
                    font-size: 0.95em;
                    color: var(--brand-green);
                    position: relative;
                    overflow: hidden;
                }
                .btn-option:hover {
                    background: var(--brand-cream);
                }
                .btn-option.active {
                    background: var(--brand-dark);
                    color: #fff;
                    border-color: var(--brand-dark);
                    box-shadow: 4px 4px 0 var(--brand-accent);
                    transform: translate(-2px, -2px);
                }

                .recommendation-area {
                    background: var(--brand-dark);
                    color: #fff;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                #result-placeholder {
                    text-align: center;
                    font-family: var(--font-sans);
                    color: rgba(255,255,255,0.4);
                    font-size: 0.9em;
                    letter-spacing: 0.05em;
                }
                
                #result-panel {
                    display: none;
                    opacity: 0;
                    transition: opacity 0.8s ease;
                    width: 100%;
                }

                .rec-card {
                    font-family: var(--font-serif);
                }
                
                .rec-badge {
                    font-family: var(--font-sans);
                    letter-spacing: 0.2em;
                    color: var(--brand-accent);
                    font-size: 0.7em;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    display: block;
                }
                
                .rec-title {
                    font-size: 1.8em;
                    margin-bottom: 30px;
                    line-height: 1.3;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 20px;
                }

                .rec-detail {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    font-family: var(--font-sans);
                    font-size: 0.9em;
                    letter-spacing: 0.05em;
                }
                .rec-detail label { color: rgba(255,255,255,0.5); }
                .rec-detail span { color: #fff; font-weight: 500; text-align: right;}
                
                .rec-tips {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    font-size: 0.9em;
                    color: var(--brand-accent);
                    line-height: 1.6;
                    font-style: italic;
                }
            `;
            this.shadowRoot.appendChild(style);

            const container = document.createElement('div');
            container.className = 'selector-container';
            container.innerHTML = `
                <div class="interaction-area">
                    <div class="step-group">
                        <div class="step-title"><span class="step-num">1</span> 您的身份 (Identity)</div>
                        <div class="options-grid">
                            <div class="btn-option btn-identity" data-val="adult">一般成人</div>
                            <div class="btn-option btn-identity" data-val="worker">上班族</div>
                            <div class="btn-option btn-identity" data-val="pregnant">懷孕/哺乳</div>
                            <div class="btn-option btn-identity" data-val="senior">銀髮長輩</div>
                            <div class="btn-option btn-identity" data-val="student">學生/考生</div>
                        </div>
                    </div>
                    <div class="step-group">
                        <div class="step-title"><span class="step-num">2</span> 保養重點 (Focus)</div>
                        <div class="options-grid">
                            <div class="btn-option btn-need" data-val="general">日常基礎</div>
                            <div class="btn-option btn-need" data-val="eye">晶亮護眼</div>
                            <div class="btn-option btn-need" data-val="brain">思緒清晰</div>
                            <div class="btn-option btn-need" data-val="heart">代謝循環</div>
                        </div>
                    </div>
                </div>
                
                <div class="recommendation-area">
                    <div id="result-placeholder">請完成左側選單<br>以獲取專家建議</div>
                    <div id="result-panel">
                        <div class="rec-card">
                            <span class="rec-badge" id="res-badge">--</span>
                            <div class="rec-title" id="res-desc">--</div>
                            <div class="rec-details-list">
                                <div class="rec-detail">
                                    <label>成分重點</label>
                                    <span id="res-focus">--</span>
                                </div>
                                <div class="rec-detail">
                                    <label>黃金比例</label>
                                    <span id="res-ratio">--</span>
                                </div>
                                <div class="rec-detail">
                                    <label>每日劑量</label>
                                    <span id="res-dosage">--</span>
                                </div>
                            </div>
                            <div class="rec-tips" id="res-tips">--</div>
                        </div>
                    </div>
                </div>
            `;
            this.shadowRoot.appendChild(container);
        }
    }

    global.FishOilSelector = FishOilSelector;
})(window);
