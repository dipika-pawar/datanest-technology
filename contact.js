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

// Get the current page URL path
const currentPath = window.location.pathname.split("/").pop();

// Loop through all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    // Get the href attribute (e.g., 'about.html')
    const linkPath = link.getAttribute('href');
    
    // If the link path matches the current path, add 'active' class
    if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
        link.classList.add('active');
    }
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

