// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Typing Effect
    const typingSpan = document.querySelector('.typing-text');
    const textArray = [
        'Data Analyst',
        'Machine Learning Enthusiast',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Explorer'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typingSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect after initial delay
    setTimeout(type, 1000);

    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');

                // Animate progress bars if they exist in this revealed element
                const progressBars = element.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width;
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', revealFunction);
    revealFunction(); // Trigger once on load to reveal elements currently in view

    // 6. Active Nav Link Update on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // offset for navbar

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 7. Handle Contact Form Submit via FormSubmit AJAX (Now that email is activated)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => {
                if (key !== '_captcha') {
                    object[key] = value;
                }
            });
            const json = JSON.stringify(object);

            // Send data using Fetch API to FormSubmit AJAX endpoint
            fetch('https://formsubmit.co/ajax/mdkamran7506@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                        btn.style.background = '#10b981'; // Success green
                        btn.style.opacity = '1';
                        contactForm.reset();
                    } else {
                        btn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
                        btn.style.background = '#ef4444'; // Error red
                        btn.style.opacity = '1';
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    btn.innerHTML = 'Error! Try Again <i class="fas fa-times"></i>';
                    btn.style.background = '#ef4444';
                    btn.style.opacity = '1';
                })
                .finally(() => {
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }
    // 8. Certificate Modal Logic
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const closeModal = document.querySelector('.close-modal');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');

    if (certModal && modalImg && closeModal) {
        // Open modal
        viewCertBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const certSrc = btn.getAttribute('data-cert');
                if (certSrc) {
                    modalImg.src = certSrc;
                    certModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close modal
        const closeCertModal = () => {
            certModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            modalImg.src = '';
        };

        closeModal.addEventListener('click', closeCertModal);

        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeCertModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.style.display === 'block') {
                closeCertModal();
            }
        });
    }
});
