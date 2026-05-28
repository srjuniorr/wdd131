// WDD 131 - Week 04 - Filtered Temples
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

// my temples array. the first 7 came from the assignment
// and I added 3 more (Salt Lake, Sao Paulo and Tokyo)
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // these 3 are the ones I added
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "images/salt-lake.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "images/sao-paulo.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "images/tokyo.jpg"
    }
];

// get the elements I need to use
const album = document.getElementById('album');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('#main-nav a');

// this function builds the temple cards on the page
function displayTemples(list) {
    album.innerHTML = ''; // clean the album first so the cards dont repeat
    list.forEach((temple) => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
            <figcaption>
                <h2>${temple.templeName}</h2>
                <p><span class="label">Location:</span> ${temple.location}</p>
                <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
                <p><span class="label">Size:</span> ${temple.area} sq ft</p>
            </figcaption>
        `;
        album.appendChild(figure);
    });
}

// this function returns the temples for each filter
function filterTemples(filter) {
    if (filter === 'old') {
        // built before 1900
        return temples.filter((t) => parseInt(t.dedicated) < 1900);
    }
    if (filter === 'new') {
        // built after 2000
        return temples.filter((t) => parseInt(t.dedicated) > 2000);
    }
    if (filter === 'large') {
        // bigger than 90000 sq ft
        return temples.filter((t) => t.area > 90000);
    }
    if (filter === 'small') {
        // smaller than 10000 sq ft
        return temples.filter((t) => t.area < 10000);
    }
    // home shows all the temples
    return temples;
}

// when I click a menu link it filters and shows the temples
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;

        // put the active class only on the link I clicked
        navLinks.forEach((a) => a.classList.remove('active'));
        link.classList.add('active');

        // change the title to the filter name
        pageTitle.textContent = link.textContent;

        // show the temples for that filter
        const filtered = filterTemples(filter);
        displayTemples(filtered);

        // close the menu on mobile after I click
        if (mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            menuToggle.innerHTML = '&#9776;';
        }
    });
});

// show all the temples when the page opens
displayTemples(temples);

// set the year and the last modified date in the footer
const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
