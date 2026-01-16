/**
 * This script enhances the experience but the site
 * remains fully functional without JavaScript enabled.
 */

(function() {
    'use strict';

    document.documentElement.classList.add('js-enabled');
    document.body.classList.add('js-enabled');

    const initScrollAnimations = () => {
        const fadeElements = document.querySelectorAll('.fade-in');

        if (!fadeElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    };

    const initMobileMenu = () => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!toggle || !navLinks) return;

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');

            toggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    };

    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    };

    const initHeaderScroll = () => {
        const header = document.querySelector('.site-header');

        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        const updateHeader = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 10) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateHeader();
    };

    const initActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        if (!sections.length || !navLinks.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => observer.observe(section));
    };

    const initTypingEffect = () => {
        const heroTitle = document.querySelector('.hero-title .line');

        if (!heroTitle || heroTitle.dataset.typed) return;

        heroTitle.dataset.typed = 'true';
    };

    const initThemeToggle = () => {
        const toggle = document.querySelector('.theme-toggle');
        const root = document.documentElement;

        if (!toggle) return;

        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            root.setAttribute('data-theme', savedTheme);
        }

        const updateAriaLabel = () => {
            const currentTheme = root.getAttribute('data-theme');
            const isDark = currentTheme === 'dark' ||
                (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
            toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        };

        updateAriaLabel();

        toggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            let isDark;
            if (currentTheme) {
                isDark = currentTheme === 'dark';
            } else {
                isDark = systemPrefersDark;
            }

            const newTheme = isDark ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            updateAriaLabel();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (!localStorage.getItem('theme')) {
                updateAriaLabel();
            }
        });
    };

    const init = () => {
        initScrollAnimations();
        initMobileMenu();
        initSmoothScroll();
        initHeaderScroll();
        initActiveSection();
        initTypingEffect();
        initThemeToggle();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
