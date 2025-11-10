document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('code-input');
    const flowerContainer = document.getElementById('flower-container');
    const flower = document.querySelector('.flower');
    const petals = document.querySelectorAll('.petal');
    const targetCode = 'fati';
    let currentInput = '';
    let isFlowerGrown = false;
    
    // Set initial styles
    flowerContainer.style.opacity = '1';
    
    // Set up petal rotations in a perfect circle
    function setupPetals() {
        const radius = 60; // Distance from center
        petals.forEach((petal, index) => {
            const rotation = (360 / petals.length) * index;
            petal.style.setProperty('--rotation', `${rotation}deg`);
            
            // Initial position (before animation)
            petal.style.transform = `rotate(${rotation}deg) translateY(0) scale(0.5)`;
        });
    }
    
    // Initialize the flower
    function initFlower() {
        setupPetals();
        flowerContainer.style.opacity = '1';
        flowerContainer.style.display = 'block';
    }
    
    // Initialize when the page loads
    initFlower();

    // Messages to show when bubbles are popped
    const messages = [
        "You're Chmicha, and I'm Qamar 🌙💞",
        "I'm always with you, no matter what happens 🤝💖",
        "You are the star of my life ⭐🌌",
        "You make me happy every day 😊💫",
        "You are my favorite person 🥰💐",
        "I'm hungry, hahahahaha 🤣🍔",
        "I don't care if I live only 60 years or less — I just want to spend them with you ❤️‍🔥⌛",
        "The universe can't take away my admiration for you 🌍💘",
        "You're the light 🔥✨",
        "Your heart is the reason I'm alive today 💓🌅",
        "You saved me 🙏💖",
        "I wish I could make you happy every day 🌈💞"
    ];

    // Create a new bubble
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Random horizontal position within the center 60% of the screen
        const leftPos = 20 + Math.random() * 60;
        
        // Larger size between 60px and 100px
        const size = 60 + Math.random() * 40;
        
        // Random animation duration between 5s and 15s
        const duration = 5 + Math.random() * 10;
        
        // Random delay before starting animation (0-5s)
        const delay = Math.random() * 5;
        
        // Set bubble styles
        bubble.style.left = `${leftPos}%`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.fontSize = `${size * 0.4}px`;  // Scale emoji size with bubble
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Add a random emoji to the bubble
        const emojis = ['💭', '💬', '💭', '💬', '✨', '💕', '🌸', '💮', '🏵️', '🌼'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        bubble.textContent = randomEmoji;
        
        // Add click event to pop the bubble
        bubble.addEventListener('click', (e) => {
            e.stopPropagation();
            popBubble(bubble);
        });
        
        // Add to container
        document.getElementById('bubbles-container').appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Pop a bubble and show message
    function popBubble(bubble) {
        if (bubble.classList.contains('popped')) return;
        
        // Mark as popped
        bubble.classList.add('popped');
        
        // Show random message
        showRandomMessage();
        
        // Remove bubble after pop animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 500);
    }

    // Show a random message
    function showRandomMessage() {
        const messageDisplay = document.getElementById('message-display');
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        messageDisplay.textContent = randomMessage;
        messageDisplay.classList.add('show');
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageDisplay.classList.remove('show');
        }, 3000);
    }

    // Create bubbles periodically
    function startBubbles() {
        // Initial bubbles
        for (let i = 0; i < 5; i++) {
            setTimeout(createBubble, i * 1000);
        }
        
        // Continue creating bubbles
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to create a new bubble
                createBubble();
            }
        }, 2000);
    }

    // Bubbles will be started manually after the flower grows

    // Initialize particles.js for the animated background
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Toggle flower growth
    function toggleFlower() {
        if (!isFlowerGrown) {
            flower.classList.add('grow');
            isFlowerGrown = true;
            
            // Start particle animation
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: { enable: true, mode: 'repulse' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            }
        } else {
            flower.classList.remove('grow');
            isFlowerGrown = false;
        }
    }
    
    // Handle input
    input.addEventListener('input', (e) => {
        currentInput = e.target.value.toLowerCase();
        
        if (currentInput === targetCode) {
            input.classList.add('hidden');
            flowerContainer.classList.remove('hidden');
            flowerContainer.style.display = 'block';
            flowerContainer.style.opacity = '1';
            
            // Force reflow to ensure the transition starts
            void flowerContainer.offsetWidth;
            
            // Add grow class to start the animation
            flower.classList.add('grow');
            isFlowerGrown = true;
            
            // Start bubbles after a short delay
            setTimeout(() => {
                startBubbles();
            }, 500);
            
            // Initialize particles
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: '#ffffff' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#ffffff',
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: { enable: true, mode: 'repulse' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            }
        } else if (!targetCode.startsWith(currentInput)) {
            currentInput = '';
            e.target.value = '';
        }
    });
    flowerContainer.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Tilt effect for 3D perspective
        this.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
        
        // Slight color shift on hover
        document.body.style.background = `linear-gradient(
            45deg, 
            hsl(${200 + x * 20}, 90%, 90%), 
            hsl(${300 + y * 20}, 90%, 90%), 
            hsl(${50 + x * 20}, 90%, 90%), 
            hsl(${150 + y * 20}, 90%, 90%)
        )`;
    });
    
    flowerContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        document.body.style.background = 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)';
    });

    // Focus the input field on page load
    codeInput.focus();
});
