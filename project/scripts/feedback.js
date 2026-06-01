/* feedback.js — handles the "Share your strategy" form.
   Demonstrates: DOM events, conditional branching, an array of saved
   objects with array methods, template literals, and localStorage. */

const FEEDBACK_KEY = "ebc-feedback";

// --- localStorage helpers ---
function getFeedback() {
  const raw = localStorage.getItem(FEEDBACK_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveFeedback(list) {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list));
}

// Escape user text before putting it into HTML (safe rendering).
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Turn the 1–5 rating into words (conditional branching).
function difficultyLabel(rating) {
  if (rating <= 2) {
    return "a clean run";
  } else if (rating === 3) {
    return "a real fight";
  }
  return "absolutely brutal";
}

// Keep the slider's number label in sync with its value.
function syncRatingOutput() {
  const slider = document.getElementById("fbRating");
  const out = document.getElementById("ratingOut");
  if (slider && out) {
    out.textContent = slider.value;
  }
}

// Build the list of saved strategies.
function renderHistory() {
  const listEl = document.getElementById("feedbackList");
  const countEl = document.getElementById("feedbackCount");
  if (!listEl) {
    return;
  }
  const entries = getFeedback();
  if (countEl) {
    countEl.textContent = `(${entries.length})`;
  }
  if (entries.length === 0) {
    listEl.innerHTML = `<li class="loadout-empty">No strategies yet. Be the first to share one!</li>`;
    return;
  }
  listEl.innerHTML = entries
    .map((entry) => {
      const spoilerTag = entry.spoiler ? " · spoiler-light" : "";
      return `
      <li>
        <p>"${escapeHTML(entry.strategy)}"</p>
        <p class="meta">— ${escapeHTML(entry.name)}, beat it with ${escapeHTML(entry.weapon)} in
          ${entry.attempts} attempt(s); rated ${entry.rating}/5${spoilerTag}.</p>
      </li>`;
    })
    .join("");
}

// Handle the form submission.
function handleSubmit(event) {
  event.preventDefault();

  const entry = {
    name: document.getElementById("fbName").value.trim(),
    email: document.getElementById("fbEmail").value.trim(),
    attempts: Number(document.getElementById("fbAttempts").value),
    weapon: document.getElementById("fbWeapon").value,
    rating: Number(document.getElementById("fbRating").value),
    strategy: document.getElementById("fbStrategy").value.trim(),
    spoiler: document.getElementById("fbSpoiler").checked
  };

  // Save newest first.
  const entries = getFeedback();
  entries.unshift(entry);
  saveFeedback(entries);
  renderHistory();

  // Confirmation message (built only with template literals).
  const tries =
    entry.attempts === 0
      ? "on your very first try — legendary"
      : `in ${entry.attempts} attempt(s)`;
  const message = document.getElementById("formMessage");
  if (message) {
    message.innerHTML = `
      <p><strong>Thanks, ${escapeHTML(entry.name)}!</strong> Your strategy was saved to this browser.</p>
      <p>You beat the Elden Beast ${tries} with <strong>${escapeHTML(entry.weapon)}</strong> and
        called it ${difficultyLabel(entry.rating)} (${entry.rating}/5).</p>`;
  }

  event.target.reset();
  syncRatingOutput();
}

// --- init ---
function initFeedback() {
  const form = document.getElementById("feedbackForm");
  if (!form) {
    return;
  }
  const slider = document.getElementById("fbRating");
  if (slider) {
    slider.addEventListener("input", syncRatingOutput);
  }
  form.addEventListener("submit", handleSubmit);
  syncRatingOutput();
  renderHistory();
}

initFeedback();
