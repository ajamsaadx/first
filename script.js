// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.style.display = 'none';
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .project-card, .education-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add active state styling to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(8px, -8px);
    }
`;
document.head.appendChild(style);

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            document.body.appendChild(scrollToTopBtn);
        }
    } else {
        const btn = document.querySelector('.scroll-to-top');
        if (btn) btn.remove();
    }
});

// Add scroll-to-top button styles
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .scroll-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 102, 204, 0.6);
    }
`;
document.head.appendChild(scrollToTopStyle);

// Log initialization
console.log('Portfolio website loaded successfully!');
