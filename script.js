// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav links
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const artItems = document.querySelectorAll('.art-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        artItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
    const floatItems = document.querySelectorAll('.float-item');
    
    floatItems.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        item.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Smooth reveal for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Dynamic cursor effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-expanded');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-expanded');
    });
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.transform = `scaleX(${progress / 100})`;
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));

// Gallery Modal
const modal = document.querySelector('.gallery-modal');
const modalImage = modal.querySelector('.modal-image img');
const modalTitle = modal.querySelector('.modal-info h3');
const modalDescription = modal.querySelector('.artwork-description');
const modalDate = modal.querySelector('.artwork-date');
const modalCategory = modal.querySelector('.artwork-category');

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        const artItem = e.target.closest('.art-item');
        const img = artItem.querySelector('img');
        const title = artItem.querySelector('h3').textContent;
        const category = artItem.querySelector('p').textContent;
        const date = artItem.querySelector('.art-date').textContent;

        modalImage.src = img.src;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDate.textContent = date;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// Parallax effect for about image
const aboutImage = document.querySelector('.image-wrapper');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = aboutImage.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    aboutImage.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(20px)
    `;
});

aboutImage.addEventListener('mouseleave', () => {
    aboutImage.style.transform = 'none';
});

// Smooth color transition for floating elements
const createFloatingBubbles = () => {
    const bubbleContainer = document.querySelector('.landing-background');
    const bubbleCount = 6;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'float-item bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        bubbleContainer.appendChild(bubble);
    }
};

// Call this function when the page loads
window.addEventListener('load', createFloatingBubbles);

// Add smooth hover effect for gallery items
document.querySelectorAll('.art-item-inner').forEach(item => {
    item.addEventListener('mouseenter', (e) => {
        const bounds = item.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        item.style.transform = `
            scale(1.02)
            perspective(1000px)
            rotateY(${(mouseX - bounds.width / 2) / 30}deg)
            rotateX(${-(mouseY - bounds.height / 2) / 30}deg)
        `;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotateY(0) rotateX(0)';
    });
});

// Add this CSS for the floating bubbles animation
const style = document.createElement('style');
style.textContent = `
    .bubble {
        animation: float 20s ease-in-out infinite;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(137, 207, 240, 0.1));
        border-radius: 50%;
        pointer-events: none;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-35px) translateX(-15px);
        }
        75% {
            transform: translateY(-20px) translateX(15px);
        }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.art-item-inner img').forEach(img => {
    img.onerror = function() {
        console.error(`Failed to load image: ${img.src}`);
        this.closest('.art-item-inner').classList.add('image-error');
    };
    
    img.onload = function() {
        this.closest('.art-item-inner').classList.remove('loading');
    };
});

window.addEventListener('load', () => {
    document.querySelectorAll('.art-item-inner img').forEach(img => {
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);
            this.closest('.art-item-inner').classList.add('image-error');
        };
        
        img.onload = function() {
            this.closest('.art-item-inner').classList.remove('loading');
        };
    });
});

// Create floating elements
const createFloatingElements = () => {
    const container = document.querySelector('.landing-page');
    const elementsCount = 8;
    
    for (let i = 0; i < elementsCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random size between 50px and 200px
        const size = Math.random() * 150 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay and duration
        element.style.animationDelay = `${Math.random() * 5}s`;
        element.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        container.appendChild(element);
    }
};

// Enhanced page load animations
window.addEventListener('load', () => {
    createFloatingElements();
    
    // Add smooth reveal for all animated elements
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                }
            });
        });
        
        observer.observe(element);
    });
});

// Smooth parallax effect for landing page
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    const logo = document.querySelector('.landing-logo');
    const text = document.querySelector('.landing-text');
    
    logo.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
    text.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add this to your existing styles
const navStyle = document.createElement('style');
navStyle.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(navStyle);

// Initialize tilt effect for specialty items
document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}); 