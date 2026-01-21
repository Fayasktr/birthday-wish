document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    startCakeSequence();
});

function startCakeSequence() {
    const overlay = document.getElementById('intro-overlay');
    const plate = document.querySelector('.cake-plate');
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    const lollipops = document.querySelectorAll('.lollipop');
    const introText = document.querySelector('.intro-text');
    const cakeContainer = document.querySelector('.cake-container');

    // 1. Show intro text
    setTimeout(() => {
        introText.classList.add('show');
    }, 500);

    // 2. Plate appears
    setTimeout(() => {
        plate.classList.add('show');
    }, 1200);

    // 3. Stack layers
    setTimeout(() => { layer1.classList.add('show'); }, 2000);
    setTimeout(() => { layer2.classList.add('show'); }, 2600);
    setTimeout(() => { layer3.classList.add('show'); }, 3200);

    // 4. Candle and Light
    setTimeout(() => { candle.classList.add('show'); }, 4000);
    setTimeout(() => {
        flame.classList.add('lit');
        cakeContainer.classList.add('motion-effect');
    }, 4500);

    // 5. Throw Lollipops
    setTimeout(() => {
        lollipops.forEach((lolly, i) => {
            setTimeout(() => {
                lolly.classList.add('throw');
            }, i * 200);
        });
    }, 5200);

    // 6. Go to next
    setTimeout(() => {
        overlay.classList.add('fade-out');
        // Give the overlay a moment to start fading before starting entrance
        setTimeout(() => {
            initEntrance();
            animateLetters();
        }, 500);
    }, 8500);
}

// Letter Splitting and Animation
function animateLetters() {
    const heading = document.getElementById('animated-heading');
    if (!heading) return;

    const text = heading.innerText;
    heading.innerHTML = ''; // Clear original text
    heading.style.opacity = '1'; // Ensure heading itself is visible
    heading.style.transform = 'translateY(0)';

    // Preserve words for proper wrapping
    const words = text.split(' ');
    words.forEach((word, wIdx) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-span';
        wordSpan.style.display = 'inline-block';

        [...word].forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            wordSpan.appendChild(span);
        });

        heading.appendChild(wordSpan);

        // Add space between words
        if (wIdx < words.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = '&nbsp;';
            space.style.display = 'inline-block';
            heading.appendChild(space);
        }
    });

    const letters = heading.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.classList.add('animate');
        }, index * 40); // Slightly faster staggered delay
    });
}

// Sparkle/Particle Effect
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -0.5 - 0.25; // Floating up
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0) this.y = canvas.height;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(241, 196, 15, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Entrance Animations
function initEntrance() {
    const items = document.querySelectorAll('.hero-content > *:not(#animated-heading)');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 1s ease-out';
        }, 500 + (index * 400));
    });
}

// Scroll Reveal
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));
}

// Environment Aware Redirect
function initDynamicRedirect() {
    const loginLink = document.getElementById('login-link');
    if (!loginLink) return;

    if (window.location.protocol === 'file:') {
        // Fallback for direct file browsing during development
        loginLink.href = 'http://localhost:3030/login';
    } else {
        // Standard relative path for server environments
        loginLink.href = '/login';
    }
}

// Call dynamic redirect setup
document.addEventListener('DOMContentLoaded', initDynamicRedirect);
