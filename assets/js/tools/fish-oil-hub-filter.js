class FishOilHubFilter {
    constructor(hostElement) {
        this.hostElement = hostElement;
        this.activeTopic = null;

        this.topics = {
            vision: {
                icon: '👁️',
                label: '視力與乾澀',
                title: '3C族救星：DHA 與葉黃素的黃金組合',
                desc: '研究顯示，每日攝取 600mg DHA 能有效改善淚液分泌與視網膜健康。單吃葉黃素不夠，只需搭配 rTG 魚油效果加倍。',
                link: './doing/fish-oil-groups.html#student',
                cta: '閱讀視力保健指南'
            },
            brain: {
                icon: '🧠',
                label: '腦力與專注',
                title: '考生與高壓族：大腦的神經傳導燃料',
                desc: 'EPA 負責抗發炎（減壓），DHA 負責修補神經（記憶）。了解高濃度 84% 魚油如何幫助你提升工作效率。',
                link: './doing/fish-oil-groups.html#student',
                cta: '閱讀腦力提升方案'
            },
            heart: {
                icon: '❤️',
                label: '循環與三高',
                title: '樂齡循環術：EPA 的血管清道夫角色',
                desc: '對於調節三酸甘油脂，純 EPA 產品被證實比綜合型魚油更有效。注意：服用抗凝血劑者需諮詢醫師。',
                link: './fish-oil-senior.html',
                cta: '閱讀心血管保養指南'
            }
        };
    }

    initialize() {
        this.render();
        this.attachEvents();
    }

    render() {
        if (!this.hostElement) return;

        // Pills HTML
        const pillsHtml = Object.keys(this.topics).map(key => `
            <button class="topic-pill" data-topic="${key}" style="
                border: 1px solid #cbd5e0;
                background: white;
                color: #2d3748;
                padding: 10px 24px;
                border-radius: 50px;
                cursor: pointer;
                font-family: 'Noto Sans TC', sans-serif;
                font-size: 0.95em;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
            ">
                <span>${this.topics[key].icon}</span>
                ${this.topics[key].label}
            </button>
        `).join('');

        this.hostElement.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.4em; color: #0F2C28; margin-bottom: 15px;">
                        您最想改善什麼問題？
                    </h3>
                    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        ${pillsHtml}
                    </div>
                </div>

                <div id="hub-filter-content" style="min-height: 180px;">
                    <!-- Content will appear here -->
                    <div style="text-align: center; color: #a0aec0; padding-top: 40px; font-size: 0.9em; font-style: italic;">
                        點擊上方標籤，查看精華摘要...
                    </div>
                </div>
            </div>
            
            <style>
                .topic-pill:hover {
                    border-color: #C6A87C !important;
                    color: #C6A87C !important;
                }
                .topic-pill.active {
                    background: #0F2C28 !important;
                    color: #F9F8F4 !important;
                    border-color: #0F2C28 !important;
                }
            </style>
        `;
    }

    attachEvents() {
        const pills = this.hostElement.querySelectorAll('.topic-pill');
        const contentArea = this.hostElement.querySelector('#hub-filter-content');

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Toggle active state
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const topicKey = pill.getAttribute('data-topic');
                this.updateContent(contentArea, topicKey);
            });
        });
    }

    updateContent(container, key) {
        const data = this.topics[key];

        container.innerHTML = `
            <div style="
                background: white;
                border-left: 4px solid #C6A87C;
                padding: 30px;
                border-radius: 0 12px 12px 0;
                box-shadow: 0 10px 25px rgba(0,0,0,0.05);
                opacity: 0;
                transform: translateY(10px);
                animation: slideUp 0.4s forwards;
            ">
                <h4 style="font-family: 'Noto Serif TC', serif; font-size: 1.3em; color: #0F2C28; margin-bottom: 15px;">
                    ${data.title}
                </h4>
                <p style="color: #2D5B52; line-height: 1.7; margin-bottom: 25px;">
                    ${data.desc}
                </p>
                <a href="${data.link}" style="
                    display: inline-block;
                    color: #C6A87C;
                    font-weight: 700;
                    text-decoration: none;
                    border-bottom: 2px solid #C6A87C;
                    padding-bottom: 2px;
                    transition: opacity 0.3s;
                ">
                    ${data.cta} <i class="fas fa-arrow-right" style="font-size: 0.8em; margin-left: 5px;"></i>
                </a>
            </div>
            <style>
                @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
            </style>
        `;
    }
}

// Global Export
window.FishOilHubFilter = FishOilHubFilter;
