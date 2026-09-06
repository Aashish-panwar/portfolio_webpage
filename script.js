document.addEventListener("DOMContentLoaded", () => {
    /* ----------------------------------------------------
       1. Mobile Menu Toggle & Navigation
    ---------------------------------------------------- */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.getElementById('navbar');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* ----------------------------------------------------
       2. Sticky Navbar Glass Effect on Scroll
    ---------------------------------------------------- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------
       3. Typing Effect in Hero Section
    ---------------------------------------------------- */
    const typingText = document.querySelector('.typing-text');
    const words = ["Software Engineer", "Backend Developer", "Java Developer", "Spring Boot Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        // Pause at the end of the word
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } 
        // Pause before typing the next word
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    if(typingText) typeEffect();


    /* ----------------------------------------------------
       4. Scroll Reveal Animations (Intersection Observer)
    ---------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ----------------------------------------------------
       5. Handle Newsletter form submission
    ---------------------------------------------------- */
    const form = document.querySelector('.newsletter form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            if (emailInput) {
                alert(`Awesome! You have subscribed with ${emailInput}. I will be in touch soon.`);
                form.reset();
            }
        });
    }
});
