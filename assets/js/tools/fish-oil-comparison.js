(function (global) {
    'use strict';

    class FishOilComparison {
        constructor(hostElement) {
            this.hostElement = hostElement;
            this.shadowRoot = this.hostElement.attachShadow({ mode: 'closed' });
            this._config = {
                debug: false
            };
            this._state = {
                filter: 'all'
            };

            this._data = {
                products: [
                    {
                        id: 'fish',
                        name: '深海魚油',
                        eng: 'Fish Oil (rTG)',
                        source: '深海小型魚',
                        type: 'rTG 型',
                        absorption: '極高',
                        vegan: 'NO',
                        cost: '★★★★',
                        note: '黃金標準',
                    },
                    {
                        id: 'algae',
                        name: '微藻油',
                        eng: 'Algae Oil',
                        source: '微藻萃取',
                        type: 'TG 型',
                        absorption: '中等',
                        vegan: 'YES',
                        cost: '★★',
                        note: '純素首選',
                    },
                    {
                        id: 'krill',
                        name: '磷蝦油',
                        eng: 'Krill Oil',
                        source: '南極磷蝦',
                        type: '磷脂質',
                        absorption: '高等',
                        vegan: 'NO',
                        cost: '★',
                        note: '含蝦紅素',
                    }
                ]
            };
        }

        initialize() {
            this._render();
            this._attachEvents();
            return this;
        }

        setDebug(debug) { this._config.debug = Boolean(debug); return this; }

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
                .comp-container {
                    background: transparent;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                
                .controls {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 40px;
                }
                
                .btn-filter {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid transparent;
                    padding: 5px 10px;
                    font-family: var(--font-sans);
                    font-size: 0.9em;
                    color: var(--brand-green);
                    cursor: pointer;
                    transition: all 0.3s;
                    letter-spacing: 0.05em;
                }
                .btn-filter:hover { color: var(--brand-dark); }
                .btn-filter.active {
                    color: var(--brand-dark);
                    border-bottom-color: var(--brand-accent);
                    font-weight: 500;
                }

                .table-responsive {
                    overflow-x: auto;
                    /* Hide scrollbar for editorial feel */
                    scrollbar-width: none; 
                    -ms-overflow-style: none;
                }
                .table-responsive::-webkit-scrollbar { display: none; }

                .comp-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 700px;
                }
                
                .comp-table th {
                    text-align: left;
                    font-family: var(--font-sans);
                    font-size: 0.75em;
                    color: var(--brand-green);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 20px;
                    border-bottom: 2px solid var(--brand-dark);
                }
                
                .comp-table td {
                    padding: 25px 20px;
                    font-family: var(--font-serif);
                    font-size: 1.1em;
                    color: var(--brand-dark);
                    border-bottom: 1px solid rgba(15, 44, 40, 0.1);
                    transition: background 0.3s;
                }

                .product-name {
                    font-size: 1.2em;
                    font-weight: 600;
                }
                .product-eng {
                    display: block;
                    font-family: var(--font-sans);
                    font-size: 0.6em;
                    color: var(--brand-green);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-top: 5px;
                }
                
                .tag-vegan {
                    font-family: var(--font-sans);
                    font-size: 0.7em;
                    padding: 2px 6px;
                    border: 1px solid var(--brand-green);
                    color: var(--brand-green);
                    border-radius: 50px;
                }
                
                .best-choice {
                    background: rgba(198, 168, 124, 0.05); /* Warm Sand tint */
                }
                .best-choice td {
                    color: var(--brand-dark);
                }
                .best-choice .product-name::after {
                    content: "RECOMMENDED";
                    display: block;
                    font-family: var(--font-sans);
                    font-size: 0.4em;
                    color: var(--brand-accent);
                    letter-spacing: 0.1em;
                    margin-top: 5px;
                }
            `;
            this.shadowRoot.appendChild(style);

            const container = document.createElement('div');
            container.className = 'comp-container';
            container.innerHTML = `
                <div class="controls">
                    <button class="btn-filter active" data-filter="all">全部 (All)</button>
                    <button class="btn-filter" data-filter="vegan">素食 (Vegan)</button>
                    <button class="btn-filter" data-filter="absorption">吸收率 (High Absorption)</button>
                    <button class="btn-filter" data-filter="cost">CP 值 (Value)</button>
                </div>
                <div class="table-responsive">
                    <table class="comp-table">
                        <thead>
                            <tr>
                                <th width="25%">Product</th>
                                <th width="15%">Source</th>
                                <th width="15%">Form</th>
                                <th width="15%">Absorption</th>
                                <th width="10%">Vegan</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody id="table-body"></tbody>
                    </table>
                </div>
            `;
            this.shadowRoot.appendChild(container);
            this._renderRows();
        }

        _renderRows() {
            const tbody = this.shadowRoot.getElementById('table-body');
            tbody.innerHTML = '';
            const { filter } = this._state;

            this._data.products.forEach(p => {
                const tr = document.createElement('tr');
                let isBest = false;
                if (filter === 'vegan' && p.id === 'algae') isBest = true;
                if (filter === 'absorption' && p.id === 'fish') isBest = true;
                if (filter === 'cost' && p.id === 'fish') isBest = true;

                if (isBest) tr.className = 'best-choice';

                const veganDisplay = p.vegan === 'YES' ? '<span class="tag-vegan">VEGAN</span>' : 'NO';

                tr.innerHTML = `
                    <td>
                        <span class="product-name">${p.name}</span>
                        <span class="product-eng">${p.eng}</span>
                    </td>
                    <td>${p.source}</td>
                    <td>${p.type}</td>
                    <td>${p.absorption}</td>
                    <td>${veganDisplay}</td>
                    <td style="font-family: var(--font-sans); font-size: 0.9em; color: var(--brand-accent);">${p.note}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        _attachEvents() {
            const btns = this.shadowRoot.querySelectorAll('.btn-filter');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    btns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this._state.filter = e.currentTarget.dataset.filter;
                    this._renderRows();
                });
            });
        }
    }

    global.FishOilComparison = FishOilComparison;
})(window);
