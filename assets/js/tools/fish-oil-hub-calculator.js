class FishOilHubCalculator {
    constructor(hostElement) {
        this.hostElement = hostElement;
        this._config = {
            minWeight: 10,
            maxWeight: 150,
            defaultWeight: 60
        };
        this.state = {
            weight: 60,
            goal: 'general' // general, pregnant, cardio, brain
        };
    }

    initialize() {
        this.render();
        this.attachEvents();
    }

    render() {
        if (!this.hostElement) return;

        this.hostElement.innerHTML = `
            <div style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.5em; color: #0F2C28; margin-bottom: 10px;">
                        <i class="fas fa-calculator" style="color: #C6A87C; margin-right: 10px;"></i>
                        Omega-3 劑量試算
                    </h3>
                    <p style="color: #2D5B52; font-size: 0.95em;">輸入條件，立即獲得專家建議劑量。</p>
                </div>

                <div style="display: grid; gap: 20px;">
                    <!-- Input: Weight -->
                    <div>
                        <label style="display: block; font-weight: 600; color: #0F2C28; margin-bottom: 8px;">您的體重 (kg)</label>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="range" id="hub-calc-weight" min="10" max="150" value="60" 
                                style="flex: 1; accent-color: #C6A87C; cursor: pointer;">
                            <span id="hub-calc-weight-val" style="font-weight: 700; color: #0F2C28; min-width: 40px;">60</span>
                        </div>
                    </div>

                    <!-- Input: Goal -->
                    <div>
                        <label style="display: block; font-weight: 600; color: #0F2C28; margin-bottom: 8px;">主要補充目標</label>
                        <select id="hub-calc-goal" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #cbd5e0; background: #f7fafc; font-family: 'Noto Sans TC', sans-serif;">
                            <option value="general">一般日常保養</option>
                            <option value="pregnant">懷孕/哺乳期</option>
                            <option value="cardio">心血管/三高循環</option>
                            <option value="brain">考生/腦力專注</option>
                        </select>
                    </div>

                    <!-- Output Area -->
                    <div id="hub-calc-result" style="background: #0F2C28; color: #F9F8F4; padding: 20px; border-radius: 12px; margin-top: 10px; display: none; animation: fadeIn 0.3s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <span style="opacity: 0.8; font-size: 0.9em;">建議每日攝取量</span>
                            <span id="hub-calc-dosage" style="font-size: 1.5em; font-weight: 700; color: #C6A87C;">1800 mg</span>
                        </div>
                        <div id="hub-calc-cta"></div>
                    </div>

                    <button id="hub-calc-btn" style="width: 100%; padding: 14px; background: #C6A87C; color: white; font-weight: 700; border: none; border-radius: 50px; cursor: pointer; transition: background 0.3s;">
                        開始計算
                    </button>
                </div>
            </div>
            
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            </style>
        `;
    }

    attachEvents() {
        const weightInput = this.hostElement.querySelector('#hub-calc-weight');
        const weightVal = this.hostElement.querySelector('#hub-calc-weight-val');
        const goalInput = this.hostElement.querySelector('#hub-calc-goal');
        const calcBtn = this.hostElement.querySelector('#hub-calc-btn');
        const resultArea = this.hostElement.querySelector('#hub-calc-result');

        weightInput.addEventListener('input', (e) => {
            this.state.weight = parseInt(e.target.value);
            weightVal.textContent = this.state.weight;
        });

        goalInput.addEventListener('change', (e) => {
            this.state.goal = e.target.value;
        });

        calcBtn.addEventListener('click', () => {
            this.calculate();
            resultArea.style.display = 'block';
        });
    }

    calculate() {
        const weight = this.state.weight;
        const goal = this.state.goal;

        let multiplier = 30; // base (general)
        let link = '#';
        let linkText = '查看適合您的產品';

        // Logic based on V3 Spec
        switch (goal) {
            case 'pregnant':
                multiplier = 35; // slightly higher
                link = './doing/fish-oil-groups.html#pregnant';
                linkText = '查看孕期藻油評測 →';
                break;
            case 'cardio':
                multiplier = 40; // high dose EPA
                link = './fish-oil-senior.html';
                linkText = '閱讀銀髮族循環指南 →';
                break;
            case 'brain':
                multiplier = 35;
                link = './doing/fish-oil-groups.html#student';
                linkText = '查看提升專注力方案 →';
                break;
            default: // general
                multiplier = 30;
                link = './doing/fish-oil-market-analysis.html';
                linkText = '查看 2025 綜合評比 →';
        }

        const dosage = weight * multiplier;
        const dosageEl = this.hostElement.querySelector('#hub-calc-dosage');
        const ctaEl = this.hostElement.querySelector('#hub-calc-cta');

        dosageEl.textContent = `${dosage} mg`;

        ctaEl.innerHTML = `
            <a href="${link}" style="display: block; text-align: center; color: white; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; text-decoration: none; font-size: 0.9em; transition: background 0.3s;">
                ${linkText}
            </a>
        `;
    }
}

// Global Export
window.FishOilHubCalculator = FishOilHubCalculator;
