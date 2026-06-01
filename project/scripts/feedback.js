// WDD 131 - Final Project - The Elden Beast Codex
// Flavio Dias
// feedback page: saves the strategies with localStorage and lists them

// the strategies already saved (or an empty array on the first visit)
let strategies = JSON.parse(localStorage.getItem('ebc-feedback')) || [];

// get the elements I need to use
const form = document.getElementById('feedback-form');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('rating-value');
const formMessage = document.getElementById('form-message');
const feedbackList = document.getElementById('feedback-list');
const feedbackCount = document.getElementById('feedback-count');

// keep the number next to the slider in sync while it moves
ratingSlider.addEventListener('input', () => {
    ratingValue.textContent = ratingSlider.value;
});

// this function turns the 1-5 rating into words
function difficultyLabel(rating) {
    if (rating <= 2) {
        return 'a clean run';
    }
    if (rating === 3) {
        return 'a real fight';
    }
    return 'absolutely brutal';
}

// this function builds the list of saved strategies
function displayStrategies() {
    feedbackCount.textContent = `(${strategies.length})`;
    feedbackList.innerHTML = '';

    if (strategies.length === 0) {
        feedbackList.innerHTML = `<li class="loadout-empty">No strategies yet. Be the first to share one!</li>`;
        return;
    }

    strategies.forEach((entry) => {
        // the spoiler tag only shows if the box was checked
        let spoilerTag = '';
        if (entry.spoiler) {
            spoilerTag = ' (spoiler-light)';
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <p>"${entry.strategy}"</p>
            <p class="meta">${entry.name} beat it with ${entry.weapon} in ${entry.attempts} attempt(s) and rated it ${entry.rating}/5${spoilerTag}</p>
        `;
        feedbackList.appendChild(li);
    });
}

// when the form is sent I save the strategy and show a thank you message
form.addEventListener('submit', (event) => {
    event.preventDefault(); // dont reload the page

    const entry = {
        name: document.getElementById('user-name').value.trim(),
        email: document.getElementById('user-email').value.trim(),
        attempts: Number(document.getElementById('attempts').value),
        weapon: document.getElementById('weapon').value,
        rating: Number(ratingSlider.value),
        strategy: document.getElementById('strategy').value.trim(),
        spoiler: document.getElementById('spoiler').checked
    };

    // the newest strategy goes first in the list
    strategies.unshift(entry);
    localStorage.setItem('ebc-feedback', JSON.stringify(strategies));
    displayStrategies();

    formMessage.innerHTML = `
        <p><strong>Thanks, ${entry.name}!</strong> Your strategy was saved in this browser.</p>
        <p>You beat the Elden Beast in ${entry.attempts} attempt(s) with ${entry.weapon} and
        called it ${difficultyLabel(entry.rating)} (${entry.rating}/5).</p>
    `;

    form.reset();
    ratingValue.textContent = ratingSlider.value; // back to the default value
});

// show the saved strategies when the page opens
displayStrategies();
