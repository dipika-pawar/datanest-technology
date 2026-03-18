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

// PROJECT


document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Switch Active Class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Filter Cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // If 'all' is selected or the category matches
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    // Small delay to re-trigger the CSS animation
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });
});


// TECH


document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle Background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = document.getElementById('dn-border-canvas');
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geo = new THREE.BufferGeometry();
    const posArr = new Float32Array(4000 * 3);
    for(let i=0; i < 4000 * 3; i++) { posArr[i] = (Math.random() - 0.5) * 12; }
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.012,
        color: 0x8A2BE2,
        transparent: true,
        opacity: 0.5
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);
    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.0008;
        renderer.render(scene, camera);
    };
    animate();

    // 2. Responsive adjustment
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});


