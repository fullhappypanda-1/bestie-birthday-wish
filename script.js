document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // AUDIO CONTROL
    // ==========================================

    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    let isPlaying = false;

    if (bgMusic) {
        bgMusic.volume = 0.4;
    }

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {

            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            } else {
                bgMusic.play()
                    .then(() => {
                        musicToggle.classList.add('playing');
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.log("Audio play failed:", error);
                    });
            }

            isPlaying = !isPlaying;
        });
    }


    // ==========================================
    // BACKGROUND PARTICLE SYSTEM
    // ==========================================

    const particlesContainer = document.getElementById('particles');

    const colors = [
        '#ff758c',
        '#c576ff',
        '#769eff',
        '#ffffff'
    ];

    const particleCount = 40;

    if (particlesContainer) {

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

    }

    function createParticle() {

        if (!particlesContainer) return;

        const particle = document.createElement('div');

        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 4 + 2;

        // Random horizontal position
        const xPos = Math.random() * 100;

        // Random animation delay
        const delay = Math.random() * 20;

        // Random animation duration
        const duration = Math.random() * 10 + 10;

        // Random color
        const color =
            colors[Math.floor(Math.random() * colors.length)];

        // Random opacity
        const opacity = Math.random() * 0.4 + 0.1;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${xPos}vw`;

        particle.style.animationDelay = `${delay}s`;

        particle.style.animationDuration = `${duration}s`;

        particle.style.backgroundColor = color;

        particle.style.opacity = opacity;

        particle.style.boxShadow =
            `0 0 ${size * 2}px ${color}`;

        particlesContainer.appendChild(particle);
    }


    // ==========================================
    // BIRTHDAY POP EFFECT
    // ==========================================

    const popContainer =
        document.getElementById('pop-container');


    function createBirthdayPop() {

        if (!popContainer) {
            console.log("pop-container not found");
            return;
        }

        // Birthday symbols
        const symbols = [
            '🌟',
            '✨',
            '⭐',
            '💫',
            '🌸',
            '🌺',
            '🌷',
            '🌼',
            '🦋',
            '🎀'
        ];

        // Number of elements
        const count = 55;


        for (let i = 0; i < count; i++) {

            const element =
                document.createElement('div');

            element.classList.add('pop-element');


            // Random symbol
            element.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];


            // Start around the center
            const startX =
                50 + (Math.random() * 20 - 10);

            const startY =
                50 + (Math.random() * 20 - 10);


            element.style.left =
                `${startX}%`;

            element.style.top =
                `${startY}%`;


            // Random burst direction
            const burstX =
                (Math.random() - 0.5) * 600;

            const burstY =
                (Math.random() - 0.5) * 600;


            // Random floating destination
            const floatX =
                (Math.random() - 0.5) * 1000;

            const floatY =
                -Math.random() * 800 - 100;


            element.style.setProperty(
                '--burst-target',
                `translate(${burstX}px, ${burstY}px)`
            );


            element.style.setProperty(
                '--float-target',
                `translate(${floatX}px, ${floatY}px)`
            );


            // Random size
            const size =
                Math.random() * 22 + 20;

            element.style.fontSize =
                `${size}px`;


            // Random animation delay
            element.style.animationDelay =
                `${Math.random() * 0.7}s`;


            // Random animation duration
            element.style.animationDuration =
                `${Math.random() * 1.5 + 2.5}s`;


            // Add to container
            popContainer.appendChild(element);


            // Remove after animation
            setTimeout(() => {

                element.remove();

            }, 5000);
        }
    }


    // ==========================================
    // OPENING SCREEN
    // ==========================================

    const openBtn =
        document.getElementById('open-btn');

    const openingScreen =
        document.getElementById('opening');

    const mainContent =
        document.getElementById('main-content');


    if (openBtn) {

        openBtn.addEventListener('click', () => {

            // 🌟 Birthday burst
            createBirthdayPop();


            // Fade out opening screen
            if (openingScreen) {

                openingScreen.style.transition =
                    "opacity 1s ease";

                openingScreen.style.opacity = "0";
            }


            // Start music after user interaction
            if (
                !isPlaying &&
                bgMusic
            ) {

                bgMusic.play()
                    .then(() => {

                        isPlaying = true;

                        if (musicToggle) {
                            musicToggle.classList.add(
                                'playing'
                            );
                        }

                    })
                    .catch(error => {

                        console.log(
                            "Audio autoplay prevented:",
                            error
                        );

                    });
            }


            // Show main content
            setTimeout(() => {

                if (openingScreen) {
                    openingScreen.classList.add(
                        'hidden'
                    );
                }

                if (mainContent) {
                    mainContent.classList.remove(
                        'hidden'
                    );
                }


                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'
                });


                // Start scroll animations
                setupIntersectionObserver();

            }, 1000);

        });

    }


    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

    function setupIntersectionObserver() {

        const observerOptions = {

            root: null,

            rootMargin: '0px',

            threshold: 0.15

        };


        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'show-scroll'
                            );


                            // Transition delay
                            const delay =
                                entry.target.style
                                    .getPropertyValue(
                                        '--delay'
                                    );


                            if (delay) {

                                entry.target.style
                                    .transitionDelay =
                                    delay;

                            }


                            // Animate only once
                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                observerOptions
            );


        const hiddenElements =
            document.querySelectorAll(
                '.hidden-scroll'
            );


        hiddenElements.forEach(element => {

            observer.observe(element);

        });

    }


    // ==========================================
    // FINAL SURPRISE
    // ==========================================

    const revealBtn =
        document.getElementById('reveal-btn');

    const preReveal =
        document.getElementById('pre-reveal');

    const postReveal =
        document.getElementById('post-reveal');

    const replayBtn =
        document.getElementById('replay-btn');


    if (revealBtn) {

        revealBtn.addEventListener(
            'click',
            () => {

                // Fade out pre-reveal
                if (preReveal) {

                    preReveal.style.transition =
                        "opacity 0.5s ease";

                    preReveal.style.opacity = "0";

                }


                // Celebration burst
                createBurst();


                // Show final message
                setTimeout(() => {

                    if (preReveal) {

                        preReveal.classList.add(
                            'hidden'
                        );

                    }


                    if (postReveal) {

                        postReveal.classList.remove(
                            'hidden'
                        );

                        postReveal.classList.add(
                            'fade-in'
                        );

                    }

                }, 500);

            }
        );

    }


    // ==========================================
    // FINAL PARTICLE BURST
    // ==========================================

    function createBurst() {

        for (let i = 0; i < 30; i++) {

            const burstParticle =
                document.createElement('div');


            burstParticle.classList.add(
                'particle'
            );


            // Random size
            const size =
                Math.random() * 6 + 3;


            burstParticle.style.width =
                `${size}px`;

            burstParticle.style.height =
                `${size}px`;


            // Start position
            burstParticle.style.left =
                '50vw';

            burstParticle.style.top =
                '80vh';


            // Random color
            const color =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];


            burstParticle.style.backgroundColor =
                color;


            burstParticle.style.boxShadow =
                `0 0 ${size * 2}px ${color}`;


            // Random direction
            const angle =
                Math.random() *
                Math.PI *
                2;


            const velocity =
                Math.random() *
                100 +
                50;


            const tx =
                Math.cos(angle) *
                velocity;


            const ty =
                Math.sin(angle) *
                velocity -
                100;


            // Animate
            burstParticle.animate(

                [
                    {
                        transform:
                            'translate(0, 0) scale(1)',

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(${tx}px, ${ty}px) scale(0)`,

                        opacity: 0
                    }
                ],

                {

                    duration:
                        Math.random() *
                        1000 +
                        1000,

                    easing:
                        'cubic-bezier(0, .9, .57, 1)',

                    fill: 'forwards'

                }

            );


            document.body.appendChild(
                burstParticle
            );


            // Remove
            setTimeout(() => {

                burstParticle.remove();

            }, 2000);

        }

    }


    // ==========================================
    // REPLAY
    // ==========================================

    if (replayBtn) {

        replayBtn.addEventListener(
            'click',
            () => {

                // Scroll to top
                window.scrollTo({

                    top: 0,

                    behavior: 'smooth'

                });


                // Reset after scrolling
                setTimeout(() => {

                    // Hide main content
                    if (mainContent) {

                        mainContent.classList.add(
                            'hidden'
                        );

                    }


                    // Show opening screen
                    if (openingScreen) {

                        openingScreen.classList.remove(
                            'hidden'
                        );

                        openingScreen.style.opacity =
                            "1";

                    }


                    // Reset final reveal
                    if (postReveal) {

                        postReveal.classList.add(
                            'hidden'
                        );

                    }


                    if (preReveal) {

                        preReveal.classList.remove(
                            'hidden'
                        );

                        preReveal.style.opacity =
                            "1";

                    }


                    // Reset scroll animations
                    const elements =
                        document.querySelectorAll(
                            '.show-scroll'
                        );


                    elements.forEach(element => {

                        element.classList.remove(
                            'show-scroll'
                        );

                    });


                    // 🌟 Optional:
                    // Create another birthday burst
                    // when replaying

                }, 1000);

            }
        );

    }

});