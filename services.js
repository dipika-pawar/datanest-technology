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


// hero


document.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.dn-serv-orb');
    const grid = document.querySelector('.dn-serv-grid-bg');
    
    // Parallax Sensitivity
    const moveX = (window.innerWidth / 2 - e.pageX) / 40;
    const moveY = (window.innerHeight / 2 - e.pageY) / 40;

    if (orb) {
        orb.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
    if (grid) {
        grid.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    }
});


// we offer

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector('.dn-offer-contrast');
    const elements = document.querySelectorAll('.dn-reveal-up');

    // Add initial classes
    elements.forEach(el => el.classList.add('dn-reveal-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger children with a slight stagger
                const children = entry.target.querySelectorAll('.dn-reveal-up');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('dn-active');
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (section) observer.observe(section);
});


document.addEventListener('mousemove', (e) => {
    const stack = document.querySelector('.dn-stack-box');
    if(!stack) return;

    const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 45;

    stack.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

document.addEventListener('mousemove', (e) => {
    const mobileScene = document.querySelector('.dn-mobile-3d-scene');
    if (!mobileScene) return;

    // Parallax Sensitivity
    const xMove = (window.innerWidth / 2 - e.pageX) / 40;
    const yMove = (window.innerHeight / 2 - e.pageY) / 40;

    // Combine original rotation with mouse movement
    mobileScene.style.transform = `rotateX(${15 + yMove}deg) rotateY(${-10 + xMove}deg)`;
});

document.addEventListener('mousemove', (e) => {
    const nodes = document.querySelectorAll('.dn-topo-node');
    if(nodes.length === 0) return;

    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    nodes.forEach((node, index) => {
        const factor = (index + 1) * 0.5;
        node.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});


document.addEventListener('mousemove', (e) => {
    const cloudNodes = document.querySelectorAll('.dn-cloud-node');
    if(cloudNodes.length === 0) return;

    const mouseX = (window.innerWidth / 2 - e.pageX) / 40;
    const mouseY = (window.innerHeight / 2 - e.pageY) / 40;

    cloudNodes.forEach((node, index) => {
        const speed = (index + 1) * 0.4;
        node.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});


document.addEventListener('mousemove', (e) => {
    const artboard = document.querySelector('.dn-ux-artboard');
    const elements = document.querySelectorAll('.dn-ux-element');
    if(!artboard) return;

    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    artboard.style.transform = `translate(${x}px, ${y}px)`;

    elements.forEach((el, index) => {
        const factor = (index + 1) * 1.5;
        el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});


document.addEventListener('mousemove', (e) => {
    const packets = document.querySelectorAll('.dn-api-packet');
    if(packets.length === 0) return;

    // Calculate a speed factor based on mouse movement
    const speed = 2 - (Math.abs(e.movementX) / 100);
    const clampedSpeed = Math.max(0.5, Math.min(2, speed));

    packets.forEach(p => {
        p.style.animationDuration = `${clampedSpeed}s`;
    });
});