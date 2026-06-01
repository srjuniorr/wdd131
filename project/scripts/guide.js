// WDD 131 - Final Project - The Elden Beast Codex
// Flavio Dias
// guide page: weapon list with filters and the loadout saved in localStorage

// my weapon list. each weapon is an object inside this array
const weapons = [
    {
        id: 'rivers-of-blood',
        name: 'Rivers of Blood',
        type: 'Bleed',
        img: 'images/weapon-rivers-of-blood.webp',
        alt: 'Illustration of the Rivers of Blood katana',
        text: 'A Dexterity/Arcane katana. Its Corpse Piler skill stacks blood loss fast, and the bleed procs tear through the Beast\'s huge health bar.'
    },
    {
        id: 'mohgwyn-spear',
        name: 'Mohgwyn\'s Sacred Spear',
        type: 'Bleed',
        img: 'images/weapon-mohgwyn-spear.webp',
        alt: 'Illustration of Mohgwyn\'s Sacred Spear',
        text: 'An Arcane spear. The Bloodboon Ritual skill deals bleed and ranged blood explosions, great for the phases where the Beast roams away.'
    },
    {
        id: 'bloodhounds-fang',
        name: 'Bloodhound\'s Fang',
        type: 'Dexterity',
        img: 'images/weapon-bloodhounds-fang.webp',
        alt: 'Illustration of the Bloodhound\'s Fang curved greatsword',
        text: 'A Dexterity curved greatsword. Bloodhound\'s Finesse gives a leaping, evasive attack to chase the Beast and dodge its sweeps.'
    },
    {
        id: 'moonveil',
        name: 'Moonveil',
        type: 'Intelligence',
        img: 'images/weapon-moonveil.webp',
        alt: 'Illustration of the Moonveil katana',
        text: 'An Intelligence katana. Transient Moonlight fires a ranged magic blade, perfect for punishing the Beast when it flies away.'
    },
    {
        id: 'dark-moon-greatsword',
        name: 'Dark Moon Greatsword',
        type: 'Intelligence',
        img: 'images/weapon-dark-moon-greatsword.webp',
        alt: 'Illustration of the Dark Moon Greatsword',
        text: 'Applies Frostbite and launches ranged moonlight waves. Frost takes big chunks of the Beast\'s health and lowers its resistances.'
    },
    {
        id: 'blasphemous-blade',
        name: 'Blasphemous Blade',
        type: 'Faith',
        img: 'images/weapon-blasphemous-blade.webp',
        alt: 'Illustration of the Blasphemous Blade greatsword',
        text: 'A Faith greatsword. Taker\'s Flames throws a ranged fire wave with strong poise damage, a safe and reliable pick for the long fight.'
    },
    {
        id: 'giant-crusher',
        name: 'Giant-Crusher',
        type: 'Strength',
        img: 'images/weapon-giant-crusher.webp',
        alt: 'Illustration of the Giant-Crusher colossal weapon',
        text: 'The heaviest colossal weapon in the game. Massive stance damage staggers the Beast, opening it up for critical hits.'
    }
];

// the loadout saved in localStorage (just the weapon ids)
let loadout = JSON.parse(localStorage.getItem('ebc-loadout')) || [];

// get the elements I need to use
const weaponGrid = document.getElementById('weapon-grid');
const loadoutList = document.getElementById('loadout-list');
const filterButtons = document.querySelectorAll('.filter-btn');

// I need to remember the filter so the grid redraws right after a save
let currentFilter = 'all';

// this function builds the weapon cards on the page
function displayWeapons(list) {
    weaponGrid.innerHTML = ''; // clean the grid first so the cards dont repeat
    list.forEach((weapon) => {
        // check if this weapon is already in my loadout
        let buttonText = 'Save to loadout';
        let buttonClass = 'save-btn';
        if (loadout.includes(weapon.id)) {
            buttonText = 'Saved!';
            buttonClass = 'save-btn saved';
        }

        const card = document.createElement('article');
        card.classList.add('weapon-card');
        card.innerHTML = `
            <img src="${weapon.img}" alt="${weapon.alt}" loading="lazy" width="600" height="600">
            <span class="weapon-type">${weapon.type}</span>
            <h3>${weapon.name}</h3>
            <p>${weapon.text}</p>
            <button class="${buttonClass}" data-id="${weapon.id}">${buttonText}</button>
        `;
        weaponGrid.appendChild(card);
    });

    addSaveClicks();
}

// this function returns the weapons that match the filter
function filterWeapons(type) {
    if (type === 'all') {
        return weapons;
    }
    return weapons.filter((weapon) => weapon.type === type);
}

// this function shows my saved weapons under the grid
function displayLoadout() {
    loadoutList.innerHTML = '';
    if (loadout.length === 0) {
        loadoutList.innerHTML = `<li class="loadout-empty">No weapons saved yet. Click "Save to loadout" on a weapon.</li>`;
        return;
    }
    const chosen = weapons.filter((weapon) => loadout.includes(weapon.id));
    chosen.forEach((weapon) => {
        const li = document.createElement('li');
        li.textContent = weapon.name;
        loadoutList.appendChild(li);
    });
}

// I add the click to the save buttons after the cards are created
function addSaveClicks() {
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            if (loadout.includes(id)) {
                // it was already saved, so clicking again removes it
                loadout = loadout.filter((savedId) => savedId !== id);
            } else {
                loadout.push(id);
            }
            localStorage.setItem('ebc-loadout', JSON.stringify(loadout));
            displayWeapons(filterWeapons(currentFilter));
            displayLoadout();
        });
    });
}

// when I click a filter button it shows only those weapons
filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;

        // put the active class only on the button I clicked
        filterButtons.forEach((b) => b.classList.remove('active'));
        button.classList.add('active');

        displayWeapons(filterWeapons(currentFilter));
    });
});

// show everything when the page opens
displayWeapons(weapons);
displayLoadout();
