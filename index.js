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


// ======================
// Hero Section
// ======================


const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y;
        this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#92278F'; // Logo Purple
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        
        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(146, 39, 143, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth; canvas.height = innerHeight;
    init();
});

init();
animate();

// Hacker Scramble Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const title = document.querySelector(".dn-title");
window.onload = () => {
    let iteration = 0;
    let interval = setInterval(() => {
        title.innerText = title.innerText.split("").map((letter, index) => {
            if(index < iteration) return title.dataset.value[index];
            return letters[Math.floor(Math.random() * 26)];
        }).join("");
        if(iteration >= title.dataset.value.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
};


// =======================
// About Section
// =======================


document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer सेटअप
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // या सेक्शनमधील सर्व 'dn-reveal' क्लासेसना 'active' करा
                const reveals = entry.target.querySelectorAll('.dn-reveal');
                reveals.forEach(el => el.classList.add('active'));
                
                // अ‍ॅनिमेशन एकदाच व्हावे म्हणून ऑब्झर्वर थांबवा
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // सेक्शन ऑब्झर्व्ह करणे सुरू करा
    const aboutSection = document.querySelector('.datanest-about-section');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// ==========================
// Services Section
// ==========================

// Vanilla-Tilt Script (CDN Load inside JS for easy setup)
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
document.head.appendChild(script);

script.onload = () => {
    // कार्ड्सना ३D टिल्ट इफेक्ट लावणे
    VanillaTilt.init(document.querySelectorAll(".dn-service-card"), {
        max: 20,           // जास्तीत जास्त किती झुकावे (Degree)
        speed: 400,        // अ‍ॅनिमेशनचा वेग
        glare: true,       // काचेचा चमकणारा इफेक्ट (Glare)
        "max-glare": 0.3,  // किती चमक असावी
        gyroscope: true    // मोबाईलवर फोन हलवल्यावरही अ‍ॅनिमेट होईल
    });
};

// Scroll Reveal Logic
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.dn-reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});

// ========================
// Why Choose Us
// ========================

document.addEventListener("DOMContentLoaded", () => {
    const stepObserverOptions = {
        threshold: 0.25
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // कार्ड अ‍ॅक्टिव्हेट करा
                entry.target.classList.add('active');
                // एकदा अ‍ॅनिमेशन झाल्यावर ऑब्झर्वर थांबवा
                stepObserver.unobserve(entry.target);
            }
        });
    }, stepObserverOptions);

    // सर्व स्टेप्सना ऑब्झर्व्ह करणे
    const allSteps = document.querySelectorAll('.dn-step-item');
    allSteps.forEach(step => {
        stepObserver.observe(step);
    });
});

// ======================
// tech-stack
// ======================

document.addEventListener("DOMContentLoaded", () => {
    // तुमच्या टेक्नॉलॉजीची लिस्ट
    const myTags = [
        'HTML', 'CSS', 'JavaScript',
        'React', 'Next.js', 'Java',
        'Spring Boot', 'MySQL', 'AWS',
        'Node.js', 'Python', 'MongoDB',
        'Docker', 'Git', 'Flutter',
        'UI/UX', 'Cloud', 'Azure'
    ];

    // Sphere कन्फिगरेशन
    const tagCloud = TagCloud('.tagcloud', myTags, {
        // Sphere रेडियस (मोबाईल आणि डेस्कटॉपनुसार अ‍ॅडजस्ट)
        radius: window.innerWidth > 768 ? 240 : 160,

        // फिरण्याचा वेग
        maxSpeed: 'fast',
        initSpeed: 'normal',

        // रोटेशनची दिशा (0 = स्वतः फिरणे, 135 = कोनात फिरणे)
        direction: 135,

        // माऊस काढल्यावरही फिरत राहणे
        keep: true
    });

    // रंगांचे व्हेरिएशन (Optional: रँडम कलर्ससाठी)
    const colors = ['#9c27b0', '#c154ff', '#ffffff', '#6a1b9a'];
    document.querySelector('.tagcloud').style.color = colors[Math.floor(Math.random() * colors.length)];
});

// =======================
// testimonials
// =======================

document.addEventListener("DOMContentLoaded", () => {
    const bubbles = document.querySelectorAll('.dn-testi-bubble');

    bubbles.forEach(bubble => {
        // माऊस गेल्यावर रँडमली थोडा टिल्ट इफेक्ट देण्यासाठी
        bubble.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = bubble;
            const { offsetX: x, offsetY: y } = e;
            
            const moveX = (x / width - 0.5) * 20;
            const moveY = (y / height - 0.5) * 20;
            
            bubble.style.transform = `scale(1.1) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
        });

        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    });
});


