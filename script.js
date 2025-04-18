// Dokument vollständig geladen
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Prüfen, ob ein gespeichertes Theme vorhanden ist
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    
    // Theme-Toggle-Button-Klick-Event
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Scroll-Top-Button
    const scrollTopButton = document.getElementById('scroll-top');
    
    // Scroll-Event, um den Button ein-/auszublenden
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    // Scroll-Top-Button-Klick-Event
    scrollTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Sanftes Scrollen für Navigationselemente
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Nur durchführen, wenn das Ziel existiert
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animiere Elemente beim Eintritt ins Viewport
    const animateElements = document.querySelectorAll('.category-card, .game-card, .testimonial');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Einfacher Slider für die Spielekarten (optional)
    let currentPosition = 0;
    const gamesSlider = document.querySelector('.games-slider');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Slider automatisch alle 5 Sekunden bewegen (nur auf mobilen Geräten)
    if (window.innerWidth < 768) {
        setInterval(() => {
            currentPosition = (currentPosition + 1) % gameCards.length;
            const offset = -currentPosition * gameCards[0].offsetWidth;
            gamesSlider.style.transform = `translateX(${offset}px)`;
        }, 5000);
    }
    
    // CTA-Button-Interaktion
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Hier könnte später eine Anmeldung oder ein Modal geöffnet werden
            if (this.textContent.trim() === 'Jetzt loslegen') {
                alert('Willkommen bei GameZone! Registriere dich, um alle Funktionen zu nutzen.');
            } else if (this.textContent.trim() === 'Entdecken') {
                const category = this.closest('.category-info').querySelector('h3').textContent;
                alert(`Du entdeckst gerade die ${category}-Spiele! Bald verfügbar.`);
            }
        });
    });
    
    // Mobile Navigation (für spätere Implementierung)
    // Hier könnte ein mobiles Menü implementiert werden
    
    // Einfache Suchfunktion vorbereiten (für spätere Implementierung)
    // Hier könnte eine Suchfunktion eingebaut werden
    
    console.log('GameZone Webseite erfolgreich geladen!');
});
