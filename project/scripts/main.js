// WDD 131 - Final Project - The Elden Beast Codex
// Flavio Dias

// the menu button for the mobile view (opens and closes the nav)
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    // change the icon depending if the menu is open or not
    if (mainNav.classList.contains('open')) {
        menuToggle.innerHTML = '&times;';
    } else {
        menuToggle.innerHTML = '&#9776;';
    }
});

// current year for the footer
const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();

// last visit message in the footer, saved with localStorage
const lastVisitEl = document.getElementById('last-visit');
const lastVisit = localStorage.getItem('ebc-last-visit');

if (lastVisit) {
    const when = new Date(lastVisit);
    lastVisitEl.textContent = `Welcome back, Tarnished. Your last visit was ${when.toLocaleDateString()}.`;
} else {
    lastVisitEl.textContent = 'Welcome, Tarnished. This is your first visit to the codex.';
}

// save this visit for the next time
localStorage.setItem('ebc-last-visit', today.toISOString());
