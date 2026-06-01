/* guide.js — interactive weapons section for the guide page.
   Demonstrates: an array of objects, array methods (filter/map/includes/
   forEach/join), DOM selection + modification, event handling, conditional
   branching, template literals, and localStorage (the saved loadout). */

// Each weapon is an object; the full set is an array.
const weapons = [
  {
    id: "rivers-of-blood",
    name: "Rivers of Blood",
    type: "Bleed",
    img: "images/weapon-rivers-of-blood.webp",
    alt: "Illustration of the Rivers of Blood katana",
    text: "A Dexterity/Arcane katana. Its Corpse Piler skill stacks blood loss fast, and hemorrhage procs tear through the Beast's huge health bar."
  },
  {
    id: "mohgwyn-spear",
    name: "Mohgwyn's Sacred Spear",
    type: "Bleed",
    img: "images/weapon-mohgwyn-spear.webp",
    alt: "Illustration of Mohgwyn's Sacred Spear",
    text: "An Arcane spear whose Bloodboon Ritual deals bleed and ranged blood explosions — great for the Beast's roaming phases."
  },
  {
    id: "bloodhounds-fang",
    name: "Bloodhound's Fang",
    type: "Dexterity",
    img: "images/weapon-bloodhounds-fang.webp",
    alt: "Illustration of the Bloodhound's Fang curved greatsword",
    text: "A Dexterity curved greatsword. Bloodhound's Finesse gives a leaping, evasive attack to chase the Beast and dodge its sweeps."
  },
  {
    id: "moonveil",
    name: "Moonveil",
    type: "Intelligence",
    img: "images/weapon-moonveil.webp",
    alt: "Illustration of the Moonveil katana",
    text: "An Intelligence katana. Transient Moonlight fires a ranged magic blade — perfect for punishing the Beast when it flies away."
  },
  {
    id: "dark-moon-greatsword",
    name: "Dark Moon Greatsword",
    type: "Intelligence",
    img: "images/weapon-dark-moon-greatsword.webp",
    alt: "Illustration of the Dark Moon Greatsword",
    text: "Applies Frostbite and launches ranged moonlight waves. Frost chunks the Beast's health and lowers its resistances."
  },
  {
    id: "blasphemous-blade",
    name: "Blasphemous Blade",
    type: "Faith",
    img: "images/weapon-blasphemous-blade.webp",
    alt: "Illustration of the Blasphemous Blade greatsword",
    text: "A Faith greatsword. Taker's Flames throws a ranged fire wave with strong poise damage — a safe, reliable pick for the long fight."
  },
  {
    id: "giant-crusher",
    name: "Giant-Crusher",
    type: "Strength",
    img: "images/weapon-giant-crusher.webp",
    alt: "Illustration of the Giant-Crusher colossal weapon",
    text: "The heaviest colossal weapon in the game. Massive stance damage staggers the Beast, opening it up for critical hits."
  }
];

const LOADOUT_KEY = "ebc-loadout";

// --- localStorage helpers ---
function getLoadout() {
  const raw = localStorage.getItem(LOADOUT_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function saveLoadout(ids) {
  localStorage.setItem(LOADOUT_KEY, JSON.stringify(ids));
}

// --- rendering ---
function weaponCardHTML(weapon, isSaved) {
  const label = isSaved ? "Saved ✓" : "Save to loadout";
  return `
    <article class="weapon-card">
      <img src="${weapon.img}" alt="${weapon.alt}" width="600" height="600" loading="lazy" decoding="async">
      <span class="weapon-type">${weapon.type}</span>
      <h3>${weapon.name}</h3>
      <p>${weapon.text}</p>
      <button class="save-btn" type="button" data-id="${weapon.id}" aria-pressed="${isSaved}">${label}</button>
    </article>`;
}

function renderWeapons(list) {
  const grid = document.getElementById("weaponGrid");
  if (!grid) {
    return;
  }
  const saved = getLoadout();
  grid.innerHTML = list
    .map((weapon) => weaponCardHTML(weapon, saved.includes(weapon.id)))
    .join("");
}

function renderLoadout() {
  const listEl = document.getElementById("loadoutList");
  if (!listEl) {
    return;
  }
  const saved = getLoadout();
  if (saved.length === 0) {
    listEl.innerHTML = `<li class="loadout-empty">No weapons saved yet — tap "Save to loadout" on a weapon.</li>`;
    return;
  }
  const chosen = weapons.filter((weapon) => saved.includes(weapon.id));
  listEl.innerHTML = chosen.map((weapon) => `<li>${weapon.name}</li>`).join("");
}

// --- filtering ---
function filterWeapons(type) {
  if (type === "all") {
    return weapons;
  }
  return weapons.filter((weapon) => weapon.type === type);
}

function getActiveFilter() {
  const pressed = document.querySelector('.filter-btn[aria-pressed="true"]');
  return pressed ? pressed.dataset.filter : "all";
}

// --- event handlers ---
function handleFilterClick(event) {
  const button = event.target.closest(".filter-btn");
  if (!button) {
    return;
  }
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
  });
  renderWeapons(filterWeapons(button.dataset.filter));
}

function handleGridClick(event) {
  const button = event.target.closest(".save-btn");
  if (!button) {
    return;
  }
  const id = button.dataset.id;
  const saved = getLoadout();
  if (saved.includes(id)) {
    saveLoadout(saved.filter((savedId) => savedId !== id));
  } else {
    saved.push(id);
    saveLoadout(saved);
  }
  renderWeapons(filterWeapons(getActiveFilter()));
  renderLoadout();
}

// --- init ---
function initGuide() {
  const grid = document.getElementById("weaponGrid");
  const filterBar = document.getElementById("filterBar");
  if (!grid || !filterBar) {
    return;
  }
  renderWeapons(weapons);
  renderLoadout();
  filterBar.addEventListener("click", handleFilterClick);
  grid.addEventListener("click", handleGridClick);
}

initGuide();
