(function (global) {
    'use strict';

    class FishOilAnalyzer {
        constructor(hostElement) {
            this.hostElement = hostElement;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });
            this._config = {
                debug: false
            };
            this._state = {
                weight: 1000,
                epa: 480,
                dha: 320,
                price: 1500,
                count: 60
            };
        }

        initialize() {
            this._render();
            this._attachEvents();
            this._calculate();
            return this;
        }

        setDebug(debug) { this._config.debug = Boolean(debug); return this; }

        _calculate() {
            const { weight, epa, dha, price, count } = this._state;
            const totalOmega3 = epa + dha;
            const concentration = (totalOmega3 / weight) * 100;
            const totalEffectiveMass = totalOmega3 * count;
            const costPerGram = (price / totalEffectiveMass) * 1000;

            this._updateUI(concentration, costPerGram);
        }

        _getRating(concentration) {
            // Updated colors for Editorial style
            // Gold/Sand for premium, Dark for standard
            if (concentration >= 85) return { text: '頂級 (Excellence)', color: '#C6A87C', badge: '★★★★★' };
            if (concentration >= 80) return { text: '優良 (Good)', color: '#2D5B52', badge: '★★★★' };
            if (concentration >= 50) return { text: '普通 (Average)', color: '#889096', badge: '★★★' };
            return { text: '偏低 (Low)', color: '#A0aec0', badge: '★★' };
        }

        _updateUI(concentration, costPerGram) {
            const root = this.shadowRoot;
            const rating = this._getRating(concentration);

            root.getElementById('result-concen').textContent = `${concentration.toFixed(1)}%`;
            root.getElementById('result-concen-bar').style.width = `${concentration}%`;
            root.getElementById('result-concen-bar').style.backgroundColor = rating.color;

            root.getElementById('result-rating-text').textContent = rating.text;
            root.getElementById('result-rating-text').style.color = rating.color;

            // Badge text
            const badgeEl = root.getElementById('result-badge');
            badgeEl.textContent = rating.badge;
            badgeEl.style.color = rating.color;
            badgeEl.style.backgroundColor = 'transparent';
            badgeEl.style.border = `1px solid ${rating.color}`;

            let cpText = '';
            // CP logic remains same
            if (costPerGram < 15) { cpText = '極高 (Excellent Value)'; }
            else if (costPerGram < 25) { cpText = '合理 (Standard)'; }
            else { cpText = '偏貴 (Premium/High)'; }

            root.getElementById('result-cp').textContent = `$${costPerGram.toFixed(1)}`;
            root.getElementById('result-cp-text').textContent = cpText;
        }

        _attachEvents() {
            ['weight', 'epa', 'dha', 'price', 'count'].forEach(id => {
                this.shadowRoot.getElementById(`in-${id}`).addEventListener('input', (e) => {
                    let val = parseFloat(e.target.value);
                    if (isNaN(val) || val < 0) val = 0;
                    this._state[id] = val;
                    this._calculate();
                });
            });
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
                .analyzer-container {
                    background: #fff;
                    /* Minimal border, elegant shadow */
                    border-top: 4px solid var(--brand-dark); 
                    box-shadow: 0 20px 40px rgba(15, 44, 40, 0.05);
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .header {
                    padding: 40px;
                    text-align: center;
                    background: var(--brand-cream);
                }
                .header h2 { 
                    margin: 0; 
                    font-family: var(--font-serif);
                    font-size: 1.8em;
                    letter-spacing: -0.02em;
                    color: var(--brand-dark);
                }
                .header p { 
                    margin: 15px 0 0; 
                    font-family: var(--font-sans);
                    font-size: 0.95em; 
                    color: var(--brand-green);
                    letter-spacing: 0.05em;
                }

                .content {
                    padding: 50px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    background: #fff;
                }
                
                @media (max-width: 768px) {
                    .content { grid-template-columns: 1fr; padding: 30px; gap: 40px; }
                }

                .input-section {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                .input-group label { 
                    display: block; 
                    font-family: var(--font-sans);
                    font-size: 0.8em; 
                    font-weight: 700;
                    color: var(--brand-dark);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin-bottom: 8px;
                }
                
                .input-row { 
                    display: flex; 
                    align-items: baseline; 
                    gap: 10px; 
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 5px;
                    transition: border-color 0.3s;
                }
                .input-row:focus-within {
                    border-bottom-color: var(--brand-dark);
                }
                
                .input-field {
                    flex: 1;
                    border: none;
                    background: transparent;
                    font-family: var(--font-serif);
                    font-size: 1.2em;
                    color: var(--brand-dark);
                    padding: 5px 0;
                    width: 100%;
                }
                .input-field:focus { outline: none; }
                
                .unit { 
                    font-family: var(--font-sans);
                    color: var(--brand-green);
                    font-size: 0.9em; 
                }

                .results-panel {
                    background: var(--brand-cream);
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                }
                /* Decorative elegant corner */
                .results-panel::after {
                    content: "";
                    position: absolute;
                    top: 20px; right: 20px;
                    width: 40px; height: 40px;
                    border-top: 1px solid var(--brand-accent);
                    border-right: 1px solid var(--brand-accent);
                }
                
                .result-item { margin-bottom: 40px; }
                .result-item:last-child { margin-bottom: 0; }
                
                .result-label { 
                    font-family: var(--font-sans);
                    font-size: 0.8em; 
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: var(--brand-green);
                    margin-bottom: 15px;
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                }
                
                .result-value { 
                    font-family: var(--font-serif);
                    font-size: 3em; 
                    font-weight: 400; 
                    color: var(--brand-dark); 
                    line-height: 1;
                }
                
                .badge { 
                    display: inline-block; 
                    padding: 2px 8px; 
                    font-family: var(--font-sans);
                    font-size: 0.8em; 
                    letter-spacing: 0.1em;
                }
                
                .bar-bg { 
                    height: 2px; 
                    background: #e5e7eb; 
                    margin-top: 20px; 
                    width: 100%;
                }
                .bar-fill { 
                    height: 100%; 
                    background: var(--brand-dark); 
                    width: 0%; 
                    transition: width 1s cubic-bezier(0.19, 1, 0.22, 1); 
                }

                .tips { 
                    padding: 30px 50px; 
                    background: #fff; 
                    border-top: 1px solid #f3f4f6;
                    font-family: var(--font-serif);
                    font-size: 1em; 
                    color: var(--brand-dark); 
                    line-height: 1.8;
                }
                .tips strong { 
                    color: var(--brand-accent);
                    font-family: var(--font-sans);
                    font-size: 0.85em;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    display: block;
                    margin-bottom: 10px;
                }
            `;

            this.shadowRoot.appendChild(style);

            const container = document.createElement('div');
            container.className = 'analyzer-container';
            container.innerHTML = `
                <div class="header">
                    <h2>純度與價值分析儀</h2>
                    <p>SCIENTIFIC PURITY & VALUE ANALYSIS</p>
                </div>
                <div class="content">
                    <div class="input-section">
                        <div class="input-group">
                            <label>每一份重量 (Total Weight)</label>
                            <div class="input-row">
                                <input type="number" id="in-weight" class="input-field" value="1000" min="0" step="10">
                                <span class="unit">mg</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>EPA 含量 (EPA Content)</label>
                            <div class="input-row">
                                <input type="number" id="in-epa" class="input-field" value="480" min="0" step="10">
                                <span class="unit">mg</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>DHA 含量 (DHA Content)</label>
                            <div class="input-row">
                                <input type="number" id="in-dha" class="input-field" value="320" min="0" step="10">
                                <span class="unit">mg</span>
                            </div>
                        </div>
                        <div class="input-group" style="margin-top: 10px;">
                            <label>價格 (Price / Bottle)</label>
                            <div class="input-row">
                                <input type="number" id="in-price" class="input-field" value="1500" min="0" step="100">
                                <span class="unit">TWD</span>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>每瓶顆數 (Count)</label>
                            <div class="input-row">
                                <input type="number" id="in-count" class="input-field" value="60" min="1" step="1">
                                <span class="unit">顆</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="results-panel">
                        <div class="result-item">
                            <div class="result-label">
                                <span>CONCENTRATION</span> 
                                <span id="result-badge" class="badge">★★★★★</span>
                            </div>
                            <div class="result-value" id="result-concen">--%</div>
                            <div style="font-family: var(--font-sans); font-size:0.9em; margin-top:10px; letter-spacing:0.05em;" id="result-rating-text">--</div>
                            <div class="bar-bg"><div class="bar-fill" id="result-concen-bar"></div></div>
                        </div>
                        <div class="result-item">
                            <div class="result-label"><span>COST PER GRAM (OMEGA-3)</span></div>
                            <div class="result-value" id="result-cp">$0</div>
                            <div style="font-family: var(--font-sans); font-size:0.9em; color:var(--brand-green); margin-top:10px;" id="result-cp-text">--</div>
                        </div>
                    </div>
                </div>
                <div class="tips">
                    <strong>Editorial Note</strong>
                    真正的頂級魚油（>85%）不僅僅是數字遊戲，它代表了更純淨的萃取工藝與更少的身體負擔。選擇 rTG 型態，是對身體最溫柔的投資。
                </div>
            `;
            this.shadowRoot.appendChild(container);
        }
    }

    global.FishOilAnalyzer = FishOilAnalyzer;
})(window);
