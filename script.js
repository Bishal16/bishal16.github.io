const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observerOptions = { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);
sections.forEach(section => observer.observe(section));

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .publication-card');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
};
document.addEventListener('DOMContentLoaded', animateOnScroll);

const logo = document.querySelector('.nav-logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return 'light'; // Default to light
}

// Initialize theme
setTheme(getTheme());

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

console.log('%c Mahathir Bishal', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c Backend Engineer | Java & Spring Boot Specialist', 'color: #10b981; font-size: 14px;');

// Bouncing Blobs Animation
const heroBlobs = document.querySelector('.hero-blobs');
if (heroBlobs) {
    const blobs = document.querySelectorAll('.blob');
    const blobData = [];

    // Initialize each blob with random position and velocity
    blobs.forEach((blob, index) => {
        const rect = heroBlobs.getBoundingClientRect();
        const blobSize = blob.offsetWidth;

        blobData.push({
            x: Math.random() * (rect.width - blobSize),
            y: Math.random() * (rect.height - blobSize),
            vx: (Math.random() - 0.5) * 0.8 + (index === 0 ? 0.5 : index === 1 ? -0.4 : 0.3),
            vy: (Math.random() - 0.5) * 0.8 + (index === 0 ? 0.3 : index === 1 ? 0.4 : -0.35),
            size: blobSize
        });
    });

    function animateBlobs() {
        const rect = heroBlobs.getBoundingClientRect();

        blobs.forEach((blob, index) => {
            const data = blobData[index];

            // Update position
            data.x += data.vx;
            data.y += data.vy;

            // Bounce off walls
            if (data.x <= -data.size * 0.3) {
                data.x = -data.size * 0.3;
                data.vx *= -1;
            }
            if (data.x >= rect.width - data.size * 0.7) {
                data.x = rect.width - data.size * 0.7;
                data.vx *= -1;
            }
            if (data.y <= -data.size * 0.3) {
                data.y = -data.size * 0.3;
                data.vy *= -1;
            }
            if (data.y >= rect.height - data.size * 0.7) {
                data.y = rect.height - data.size * 0.7;
                data.vy *= -1;
            }

            // Apply position
            blob.style.transform = `translate(${data.x}px, ${data.y}px)`;
        });

        requestAnimationFrame(animateBlobs);
    }

    animateBlobs();
}
