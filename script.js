/**
 * ANANDHA NURSERY & PRIMARY SCHOOL
 * Melpattampakkam, Cuddalore District, Tamil Nadu – 607104
 * Interactive Frontend Controller (Modern 2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       1. Centralized School Image Configuration
       --------------------------------------------------------------------------
       Leave empty ("") to show high-end designed placeholders.
       Add image URLs when actual school photographs are ready.
       ========================================================================== */
    const schoolImages = {
        hero1: "",
        hero2: "",
        hero3: "",
        hero4: "",
        gallery1: "",
        gallery2: "",
        gallery3: "",
        gallery4: "",
        gallery5: ""
    };

    const galleryCaptions = {
        gallery1: "Campus Life & Celebrations",
        gallery2: "Classroom Learning Moments",
        gallery3: "Creative Arts & Expression",
        gallery4: "Sports & Athletics",
        gallery5: "Special Celebrations"
    };

    // Apply configured images if any exist
    function initConfiguredImages() {
        // Apply Hero images if present
        Object.keys(schoolImages).forEach(key => {
            const url = schoolImages[key];
            if (!url) return;

            if (key.startsWith('hero')) {
                const placeholder = document.querySelector(`.hero-image-placeholder[data-hero-key="${key}"]`);
                if (placeholder) {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = "Anandha Nursery and Primary School Campus";
                    img.className = "hero-bg-img";
                    img.loading = "lazy";
                    placeholder.prepend(img);
                    const tag = placeholder.querySelector('.placeholder-graphic');
                    if (tag) tag.style.display = 'none';
                }
            } else if (key.startsWith('gallery')) {
                const galleryWrapper = document.getElementById(`galleryWrapper${key.replace('gallery', '')}`);
                if (galleryWrapper) {
                    galleryWrapper.innerHTML = `
                        <img src="${url}" alt="${galleryCaptions[key] || 'Anandha School Gallery Photo'}" class="gallery-populated-img" loading="lazy">
                        <div class="gallery-img-overlay">
                            <div>
                                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: 4px;">${galleryCaptions[key] || 'Anandha Moments'}</h4>
                                <span style="font-size: 0.8rem; color: var(--sky-blue); font-weight: 600;">View High Resolution</span>
                            </div>
                        </div>
                    `;
                }
            }
        });
    }

    initConfiguredImages();

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
       4. Hero Carousel System (Smooth, Cinematic, Accessible)
       ========================================================================== */
    const heroCarousel = document.getElementById('heroCarousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval = null;
    const autoPlayDelay = 6000; // 6 seconds

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        progressBars[currentSlide]?.classList.remove('active');

        currentSlide = (index + totalSlides) % totalSlides;

        slides[currentSlide].classList.add('active');
        progressBars[currentSlide]?.classList.add('active');

        if (currentSlideNum) {
            currentSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
        }
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (slides.length > 0) {
        // Controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        // Click on progress bars to jump
        progressBars.forEach((bar, idx) => {
            bar.addEventListener('click', () => {
                goToSlide(idx);
                startAutoPlay();
            });
        });

        // Pause on hover
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', stopAutoPlay);
            heroCarousel.addEventListener('mouseleave', startAutoPlay);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                startAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                startAutoPlay();
            }
        });

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        heroCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 40) {
                if (swipeDistance < 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoPlay();
            }
        }, { passive: true });

        // Start autoplay
        startAutoPlay();
    }

    /* ==========================================================================
       5. Smooth Anchor Scrolling with Precise Offset
       ========================================================================== */
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');

    allInternalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       6. Active Navigation Link on Scroll
       ========================================================================== */
    const navSections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 140;

        navSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

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

    /* ==========================================================================
       8. Lightbox Modal for Gallery Photos
       ========================================================================== */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImageContainer = document.getElementById('lightboxImageContainer');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function openLightbox(galleryKey) {
        const imageUrl = schoolImages[galleryKey];
        const caption = galleryCaptions[galleryKey] || "Anandha Nursery & Primary School";

        lightboxImageContainer.innerHTML = '';

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = caption;
            lightboxImageContainer.appendChild(img);
            lightboxCaption.textContent = caption;
        } else {
            // High quality empty preview message
            lightboxImageContainer.innerHTML = `
                <div class="lightbox-empty-notice">
                    <div class="lightbox-empty-icon">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                    </div>
                    <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 8px;">${caption}</h3>
                    <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; max-width: 440px; margin: 0 auto;">
                        This area is reserved for official photographs from Anandha Nursery and Primary School. Images will be updated here.
                    </p>
                </div>
            `;
            lightboxCaption.textContent = `${caption} — Reserved Photo Frame`;
        }

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        const galleryKey = item.getAttribute('data-gallery-id');
        item.addEventListener('click', () => openLightbox(galleryKey));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(galleryKey);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

});