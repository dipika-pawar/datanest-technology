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


document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector('.dt-hero-content');
    
    // Smooth Entry Animation
    setTimeout(() => {
        heroContent.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
    }, 300);

    // Subtle Mouse Parallax Effect
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.dt-orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});

// map


function startMapClock() {
    const timeDisplay = document.getElementById('map-time');
    setInterval(() => {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('en-GB', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    }, 1000);
}
startMapClock();