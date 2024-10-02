document.addEventListener('DOMContentLoaded', () => {
    // Logo Animation
    const logo = document.getElementById('animated-logo');
    logo.style.opacity = 0;
    logo.animate([
        { opacity: 0, transform: 'scale(0.9)' },
        { opacity: 1, transform: 'scale(1)' }
    ], {
        duration: 1500,
        fill: 'forwards',
        easing: 'ease-out'
    });

    // Add subtle pulsing animation after the initial reveal
    setTimeout(() => {
        logo.style.animation = 'pulse 2s infinite';
    }, 1500);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.fullpage-section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Handle form submission (placeholder functionality)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted! (This is a placeholder action)');
            form.reset();
        });
    }

    // Hide/show header on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            document.querySelector('header').style.top = '-60px'; // Adjust based on your header height
        } else {
            // Scrolling up
            document.querySelector('header').style.top = '0';
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);

    // Typing effect for About section
    const aboutText = `Welcome to MinArt, where creativity and imagination take center stage. I am an artist currently living in Erzurum, Turkey, dedicated to designing characters, objects, and places that blend the extraordinary with the everyday. My artistic vision leans toward the surreal—creating worlds and figures that bend reality, provoke thought, and evoke a sense of wonder. My passion lies in exploring the boundaries of what's real and what's possible. I love to create characters with unexpected features, environments that defy the conventional, and objects that hold deeper meanings, all to spark curiosity and engage viewers. Each of my designs is an invitation into a dreamlike realm where the rules of reality are fluid, and creativity knows no bounds. Currently, I am focused on character and world design, with a particular interest in the game industry. I am eager to collaborate with game companies, developers, and storytellers who wish to build captivating, surreal experiences. I aim to create characters that are unique and memorable, objects that add depth to gameplay, and immersive places that players will want to explore endlessly. If you're interested in working with an artist who brings a surreal, imaginative twist to visual storytelling, I'd love to collaborate. Whether it's breathing life into a character, designing unique elements for gameplay, or building entire worlds, I am excited to contribute to projects that push creative boundaries and engage audiences in unexpected ways. Feel free to explore my gallery and see examples of my work. Don't hesitate to get in touch if you're looking for a partner to create something truly extraordinary. Together, we can build experiences that transport people to fascinating, otherworldly places.`;

    const typedTextElement = document.getElementById('typed-text');
    let index = 0;

    function typeText() {
        if (index < aboutText.length) {
            typedTextElement.textContent += aboutText.charAt(index);
            index++;
            setTimeout(typeText, 20); // Adjust typing speed here
        }
    }

    // Start typing when About section is in view
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) {
                typeText();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);
});