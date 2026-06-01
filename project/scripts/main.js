/* main.js — shared behaviour for every page of The Elden Beast Codex.
   Handles the footer year, the mobile navigation toggle, and a
   "last visit" greeting stored in localStorage. */

// Show the current year in the footer.
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Toggle the mobile navigation menu open/closed.
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  if (!toggle || !nav) {
    return;
  }
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Greet returning visitors and remember this visit (localStorage).
function showLastVisit() {
  const el = document.getElementById("lastVisit");
  if (!el) {
    return;
  }
  const previous = localStorage.getItem("ebc-last-visit");
  if (previous) {
    const when = new Date(previous);
    el.textContent = `Welcome back, Tarnished. Your last visit was ${when.toLocaleDateString()} at ${when.toLocaleTimeString()}.`;
  } else {
    el.textContent = "Welcome, Tarnished — this is your first visit to the codex.";
  }
  localStorage.setItem("ebc-last-visit", new Date().toISOString());
}

setFooterYear();
initNavToggle();
showLastVisit();
