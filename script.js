// ===== SET CURRENT YEAR IN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MOBILE MENU TOGGLE =====
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe glass-cards and plan-cards that aren't already animated by Tailwind
document.querySelectorAll('.glass-card, .plan-card').forEach(el => {
    // Only apply if it doesn't already have a Tailwind animation class
    if (!el.classList.contains('animate-slide-up')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    }
});

// ===== WHATSAPP NUMBER PLACEHOLDER =====
// SEARCH FOR: 2348000000000
// REPLACE WITH: your actual WhatsApp number (e.g., 2348123456789)
// Appears in all WhatsApp links throughout the HTML