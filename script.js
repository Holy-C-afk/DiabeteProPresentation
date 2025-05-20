// Animation du header au scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animation des éléments au scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Animation des statistiques
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    const value = stat.querySelector('h3');
    const target = parseInt(value.textContent);
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const interval = duration / 50;

    const updateValue = () => {
        current += increment;
        if (current < target) {
            value.textContent = Math.round(current) + (value.textContent.includes('%') ? '%' : '');
            setTimeout(updateValue, interval);
        } else {
            value.textContent = target + (value.textContent.includes('%') ? '%' : '');
        }
    };

    observer.observe(stat);
    stat.addEventListener('mouseenter', updateValue);
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestion de la vidéo de démonstration
const video = document.getElementById('demo-video');
const videoOverlay = document.querySelector('.video-overlay');
const playButton = document.querySelector('.play-button');

playButton.addEventListener('click', () => {
    video.play();
    videoOverlay.classList.add('hidden');
});

video.addEventListener('pause', () => {
    videoOverlay.classList.remove('hidden');
});

video.addEventListener('ended', () => {
    videoOverlay.classList.remove('hidden');
});

// Empêcher la lecture automatique sur mobile
if (window.innerWidth <= 768) {
    video.setAttribute('playsinline', '');
    video.setAttribute('controls', '');
}

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea, .input-group select');
    
    // Animation des labels flottants
    formInputs.forEach(input => {
        // Vérifier si l'input a déjà une valeur au chargement
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }

        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });

    // Validation du formulaire
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(this);
        
        // Validation des champs requis
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.parentElement.classList.add('error');
                
                // Ajouter un message d'erreur
                let errorMessage = input.parentElement.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Ce champ est requis';
                    input.parentElement.appendChild(errorMessage);
                }
            } else {
                input.parentElement.classList.remove('error');
                const errorMessage = input.parentElement.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });

        // Validation de l'email
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.parentElement.classList.add('error');
                let errorMessage = emailInput.parentElement.querySelector('.error-message');
                if (!errorMessage) {
                    errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Veuillez entrer une adresse email valide';
                    emailInput.parentElement.appendChild(errorMessage);
                }
            }
        }

        if (isValid) {
            // Animation du bouton de soumission
            const submitButton = this.querySelector('.submit-button');
            submitButton.innerHTML = `
                <div class="button-icon">
                    <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                Envoi en cours...
            `;
            submitButton.disabled = true;

            // Simuler l'envoi du formulaire (à remplacer par votre logique d'envoi réelle)
            setTimeout(() => {
                submitButton.innerHTML = `
                    <div class="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    Message envoyé !
                `;
                submitButton.classList.add('success');

                // Réinitialiser le formulaire après 2 secondes
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = `
                        <div class="button-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </div>
                        Envoyer le message
                    `;
                    submitButton.classList.remove('success');
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        }
    });

    // Animation des cartes d'information
    const infoCards = document.querySelectorAll('.info-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    infoCards.forEach(card => {
        observer.observe(card);
    });
}); 