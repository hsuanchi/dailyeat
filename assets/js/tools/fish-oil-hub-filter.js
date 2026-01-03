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
                border: 1px solid rgba(45, 55, 72, 0.2);
                background: white;
                color: #2d3748;
                padding: 10px 24px;
                border-radius: 9999px;
                cursor: pointer;
                font-family: 'Noto Sans TC', sans-serif;
                font-size: 0.95em;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s ease;
                letter-spacing: 0.05em;
            ">
                <span class="pill-icon" style="opacity: 0.6;">${this.topics[key].icon}</span>
                ${this.topics[key].label}
            </button>
        `).join('');

        this.hostElement.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; padding: 60px 20px;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h3 style="font-family: 'Noto Serif TC', serif; font-size: 1.8em; color: #2d3748; margin-bottom: 20px; font-weight: 700;">
                        您最想改善什麼問題？
                    </h3>
                    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        ${pillsHtml}
                    </div>
                </div>

                <div id="hub-filter-content" style="min-height: 200px;">
                    <!-- Content will appear here -->
                    <div style="text-align: center; color: #a0aec0; padding-top: 40px; font-size: 0.95em; font-family: 'Noto Serif TC', serif; font-style: italic; opacity: 0.8;">
                        請點擊上方標籤，為您推薦最適合的內容...
                    </div>
                </div>
            </div>
            
            <style>
                .topic-pill:hover {
                    border-color: #ff6b35 !important;
                    color: #ff6b35 !important;
                }
                .topic-pill:hover .pill-icon {
                    opacity: 1 !important;
                }
                .topic-pill.active {
                    background: #2d3748 !important;
                    color: #ffffff !important;
                    border-color: #2d3748 !important;
                }
                .topic-pill.active .pill-icon {
                    opacity: 1 !important;
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
                border: 1px solid rgba(45, 55, 72, 0.1);
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                opacity: 0;
                transform: translateY(10px);
                animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                text-align: left;
                max-width: 800px;
                margin: 0 auto;
            ">
                <h4 style="font-family: 'Noto Serif TC', serif; font-size: 1.5em; color: #2d3748; margin-bottom: 15px; font-weight: 700;">
                    ${data.title}
                </h4>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 25px; font-size: 1.05em;">
                    ${data.desc}
                </p>
                <a href="${data.link}" style="
                    display: inline-flex;
                    align-items: center;
                    color: #ff6b35;
                    font-weight: 700;
                    text-decoration: none;
                    border-bottom: 2px solid transparent;
                    transition: all 0.3s;
                    font-size: 1em;
                "
                onmouseover="this.style.borderBottomColor='#ff6b35'"
                onmouseout="this.style.borderBottomColor='transparent'"
                >
                    ${data.cta} <i class="fas fa-arrow-right" style="font-size: 0.8em; margin-left: 8px;"></i>
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
