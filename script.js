// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Smooth scroll with progress indicator
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    
    // Update navbar background
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        navbar.style.backdropFilter = 'blur(8px)';
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Enhanced Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function type() {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting && charIndex > 0;
    const shouldWrite = !isDeleting && charIndex < currentWord.length;
    
    if (shouldWrite) {
        typingText.textContent = "I'm a " + currentWord.substring(0, charIndex + 1);
        charIndex++;
    } else if (shouldDelete) {
        typingText.textContent = "I'm a " + currentWord.substring(0, charIndex - 1);
        charIndex--;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation
type();

// Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Height of fixed navbar
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Enhanced scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.skill-card, .project-card');
    const windowHeight = window.innerHeight;
    
    reveals.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            // Add delay based on index for cascade effect
            setTimeout(() => {
                element.classList.add('active');
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Form handling with animation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10B981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        submitButton.textContent = 'Error! Try Again';
        submitButton.style.backgroundColor = '#EF4444';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 2000);
    }
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Add hover effect to social links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
    });
}); 