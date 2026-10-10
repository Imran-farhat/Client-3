/**
 * ANANDHA NURSERY & PRIMARY SCHOOL
 * Melpattampakkam, Cuddalore District, Tamil Nadu – 607104
 * Interactive Frontend Controller (Modern 2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. School Image Configuration (Local Photographs)
       --------------------------------------------------------------------------
       Slide 1: School Main Building — FIRST / default slide
       Slide 2: School Reception — SECOND slide
       Slide 3: Students Group Photo — THIRD slide
       ========================================================================== */
    const heroImages = [
        "school/anandha_school_building_1920x1080.png", // 1. School main building (First / default)
        "school/reception.jpg",       // 2. School reception (Second slide)
        "school/students1.png"        // 3. Students group photo (Third slide)
    ];


    /* ==========================================================================
       2. Sticky & Floating Navbar on Scroll
       ========================================================================== */
    const siteHeader = document.getElementById('siteHeader');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function handleScrollEffects() {
        const currentScroll = window.scrollY;

        // Navbar appearance transition
        if (currentScroll > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }

        // Floating scroll to top button
        if (currentScroll > 450) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       3. Mobile Navigation Drawer
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu(forceClose = false) {
        const isOpen = forceClose ? false : !mobileNav.classList.contains('open');
        
        if (isOpen) {
            mobileNav.classList.add('open');
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileNav.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close when clicking nav items
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(true);
            });
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu(true);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                toggleMobileMenu(true);
            }
        });
    }

    /* ==========================================================================
       4. Hero Carousel — Cinematic Cross-Fade (3 Photographs: 0 -> 1 -> 2 -> 0)
       --------------------------------------------------------------------------
       Slide 1: School Main Building (Default first slide)
       Slide 2: School Reception
       Slide 3: Students Group Photo
       --------------------------------------------------------------------------
       Smooth opacity transition (~1.5s), no slide movement, no empty flash
       ========================================================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const SLIDE_DURATION = 3500; // Balanced & comfortable 3.5 seconds per slide (moderated from 2.5s)
    let currentSlide = 0;
    let carouselTimer = null;

    function showSlide(nextIndex) {
        if (!slides.length) return;
        const prevIndex = currentSlide;
        currentSlide = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, idx) => {
            if (idx === currentSlide) {
                // Incoming slide sits on top and fades in
                slide.style.zIndex = '2';
                slide.classList.add('active');
            } else if (idx === prevIndex) {
                // Outgoing slide sits below while smoothly fading out
                slide.style.zIndex = '1';
                slide.classList.remove('active');
            } else {
                slide.style.zIndex = '0';
                slide.classList.remove('active');
            }
        });
    }

    function advanceSlide() {
        showSlide(currentSlide + 1);
    }

    function startCarousel() {
        if (carouselTimer) clearInterval(carouselTimer);
        carouselTimer = setInterval(advanceSlide, SLIDE_DURATION);
    }

    if (slides.length > 0) {
        // Guarantee slide 0 (School Main Building) is first and visible
        slides.forEach((slide, idx) => {
            if (idx === 0) {
                slide.style.zIndex = '2';
                slide.classList.add('active');
            } else {
                slide.style.zIndex = '0';
                slide.classList.remove('active');
            }
        });
        currentSlide = 0;
        startCarousel();
    }

    /* ==========================================================================
       5. Smooth Anchor Scrolling with Fixed Navbar Offset
       ========================================================================== */
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');

    allInternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const header = document.getElementById('siteHeader');
                const headerHeight = header ? header.offsetHeight : 88;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, '', targetId);
                }
            }
        });
    });

    // Handle initial hash navigation when entering from another page (e.g. index.html#classes)
    if (window.location.hash) {
        const hashTarget = document.querySelector(window.location.hash);
        if (hashTarget) {
            setTimeout(() => {
                const header = document.getElementById('siteHeader');
                const headerHeight = header ? header.offsetHeight : 88;
                const elementPosition = hashTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    /* ==========================================================================
       6. Active Navigation Link on Scroll
       ========================================================================== */
    const navSections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

    function updateActiveNavLink() {
        const header = document.getElementById('siteHeader');
        const headerHeight = header ? header.offsetHeight : 88;
        const scrollPosition = window.scrollY + headerHeight + 50;

        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || href === `index.html#${sectionId}`) {
                        link.classList.add('active');
                    } else if (href.startsWith('#') || href.startsWith('index.html#')) {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();

    /* ==========================================================================
       7. Scroll Reveal Observer (Smooth Staggered Animations)
       ========================================================================== */
    const revealItems = document.querySelectorAll('.reveal-item');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        // Fallback for older browsers
        revealItems.forEach(item => item.classList.add('revealed'));
    }

});