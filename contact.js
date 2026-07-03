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

//=========================
//CONTACT FORM 
//=========================
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    // 1. Loading State
    const submitBtn = this.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.innerText;
    
    submitBtn.disabled = true;
    btnText.innerText = "Processing...";

    // 2. Data Collection 
    // (Selecting by placeholder since IDs are missing in your HTML)
    const formData = {
        full_name: this.querySelector('input[placeholder="Full Name"]').value,
        email: this.querySelector('input[placeholder="Email Address"]').value,
        phone_number: this.querySelector('input[placeholder="Phone Number"]').value,
        subject: this.querySelector('select').value,
        message: this.querySelector('textarea').value
        // Note: 'Company' is optional and not in our current DB schema, 
        // so it is excluded to keep it compatible with your existing backend.
    };

    try {
        // 3. API Request to Visionary/DataNest Backend
        const response = await fetch('http://localhost:5000/api/contact/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        // 4. Handle Success
        if (response.ok && data.success) {
            alert("Sent Successfully! " + data.message);
            this.reset(); // Clear form
        } else {
            alert("Error: " + (data.message || "Something went wrong."));
        }

    } catch (error) {
        console.error("Connection Error:", error);
        alert("Server is offline. Please make sure your Node.js backend is running.");
    } finally {
        // 5. Restore Button
        submitBtn.disabled = false;
        btnText.innerText = originalText;
    }
});