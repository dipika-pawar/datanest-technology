const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked (useful for one-page sections)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// INTRODUCTION
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-visible");
            }
        });
    }, observerOptions);

    // Target both the text and the image box
    const elementsToAnimate = document.querySelectorAll(
        ".dt-intro-text, .dt-intro-image-box"
    );

    elementsToAnimate.forEach((el) => observer.observe(el));
});

// Mission and vision

document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const mvObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get delay from HTML data attribute
                const delay = entry.target.getAttribute('data-delay') || '0s';
                
                // Apply transition delay styles dynamically
                entry.target.style.transitionDelay = delay;
                
                // Trigger the reveal
                entry.target.classList.add("dt-mv-reveal");
                
                // Stop observing once animated
                mvObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target the specific cards
    const mvCards = document.querySelectorAll(".dt-mv-card-dark");
    mvCards.forEach((card) => mvObserver.observe(card));
});

// CEO AND FOUNDER
document.addEventListener("DOMContentLoaded", () => {
    const ceoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ceo-reveal");
                ceoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const ceoCard = document.querySelector(".dt-ceo-card");
    if (ceoCard) ceoObserver.observe(ceoCard);
});

// TEAM SECTION

document.addEventListener("DOMContentLoaded", () => {
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0s';
                entry.target.style.transitionDelay = delay;
                entry.target.classList.add("team-reveal");
                teamObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const teamCards = document.querySelectorAll(".dt-member-card");
    teamCards.forEach((card) => teamObserver.observe(card));
});

// why-section

document.addEventListener("DOMContentLoaded", () => {
    const whyGrid = document.querySelector('.dn-why-grid');
    const whyCards = document.querySelectorAll('.dn-why-card');

    const whyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                whyCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('dn-why-reveal');
                    }, index * 150);
                });
                whyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // CSS for initial state
    whyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });

    // Class to trigger via JS
    const style = document.createElement('style');
    style.innerHTML = `.dn-why-reveal { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    if (whyGrid) whyObserver.observe(whyGrid);
});

// COUNTER

document.addEventListener("DOMContentLoaded", () => {
    const statsContainer = document.querySelector('.dn-stats-grid');
    const numbers = document.querySelectorAll('.dn-stats-number');
    let hasAnimated = false;

    const countTo = (element) => {
        const target = +element.getAttribute('data-target');
        let count = 0;
        const speed = target > 10 ? 40 : 150; // Slower for smaller numbers like "3"

        const update = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                element.innerText = Math.ceil(count);
                setTimeout(update, 20);
            } else {
                element.innerText = target;
            }
        };
        update();
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            numbers.forEach(countTo);
            hasAnimated = true;
        }
    }, { threshold: 0.4 });

    if (statsContainer) observer.observe(statsContainer);
});

// CTA

document.addEventListener("DOMContentLoaded", () => {
    const ctaCard = document.querySelector('.dn-cta-card');
    const glow1 = document.querySelector('.dn-cta-glow-1');
    const glow2 = document.querySelector('.dn-cta-glow-2');

    window.addEventListener('scroll', () => {
        if (!ctaCard) return;
        
        // Get scroll position relative to the CTA section
        const sectionTop = ctaCard.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight && sectionTop > -ctaCard.offsetHeight) {
            const shift = sectionTop * 0.1; // Adjust sensitivity
            glow1.style.transform = `translate(${shift}px, ${shift}px)`;
            glow2.style.transform = `translate(${-shift}px, ${-shift}px)`;
        }
    });
});
