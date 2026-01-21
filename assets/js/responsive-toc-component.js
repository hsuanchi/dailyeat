(function (global) {
    'use strict';

    class ResponsiveTocComponent {
        constructor() {
            this.sidebar = document.getElementById('sidebar');
            this.tocElement = document.querySelector('.toc');
            this.tocTitle = document.querySelector('.toc-title');
            this.mobileTarget = document.getElementById('toc-mobile-target');
            this.breakpoint = 1024;
            this.debouncedMove = this._debounce(this.moveToc.bind(this), 100);
        }

        initialize() {
            if (!this.sidebar || !this.tocElement || !this.mobileTarget || !this.tocTitle) {
                console.warn('Responsive TOC Component: Required elements not found. Aborting.');
                return;
            }

            this.tocTitle.addEventListener('click', this.toggleAccordion.bind(this));
            window.addEventListener('resize', this.debouncedMove);
            this.moveToc();

            // Initialize ScrollSpy
            this.initScrollSpy();
        }

        moveToc() {
            const isMobile = window.innerWidth <= this.breakpoint;

            if (isMobile) {
                if (!this.tocElement.classList.contains('toc-is-mobile')) {
                    this.tocElement.classList.add('toc-is-mobile');
                    this.tocElement.classList.add('open'); // Default to open on mobile
                    this.mobileTarget.appendChild(this.tocElement);
                }
            } else {
                if (this.tocElement.classList.contains('toc-is-mobile')) {
                    this.tocElement.classList.remove('toc-is-mobile');
                    this.tocElement.classList.remove('open'); // Ensure it's closed when moving back
                    this.sidebar.appendChild(this.tocElement);
                }
            }
        }

        toggleAccordion() {
            if (this.tocElement.classList.contains('toc-is-mobile')) {
                this.tocElement.classList.toggle('open');
            }
        }

        initScrollSpy() {
            // Select all H2 and H3 elements within article-body as dragnet targets
            const sections = document.querySelectorAll('.article-body h2, .article-body h3');
            const tocLinks = document.querySelectorAll('.toc-list a');

            if (sections.length === 0 || tocLinks.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '-100px 0px -60% 0px', // Active when element is in top part of view
                threshold: 0
            };

            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remove active class from all links
                        tocLinks.forEach(link => link.classList.remove('active'));

                        // Find the link that corresponds to this section
                        const id = entry.target.getAttribute('id');
                        if (id) {
                            const activeLink = document.querySelector(`.toc-list a[href="#${id}"]`);
                            if (activeLink) {
                                activeLink.classList.add('active');
                                // Optional: Auto-scroll side menu if active item is out of view
                                this.scrollSidebarToActive(activeLink);
                            }
                        }
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            sections.forEach(section => observer.observe(section));
        }

        scrollSidebarToActive(activeLink) {
            if (window.innerWidth <= this.breakpoint) return;

            const sidebarRect = this.sidebar.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            // Simple logic: if active link is close to bottom or top, scroll sidebar
            // Note: Since sidebar is overflow-y: auto, we can manipulate scrollTop

            const relativeTop = linkRect.top - sidebarRect.top;
            const relativeBottom = linkRect.bottom - sidebarRect.top;

            if (relativeTop < 20 || relativeBottom > sidebarRect.height - 20) {
                activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }

        _debounce(func, wait) {
            let timeout;
            return function (...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }
    }

    global.ResponsiveTocComponent = ResponsiveTocComponent;

})(window);