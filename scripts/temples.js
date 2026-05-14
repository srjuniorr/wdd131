const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.classList.contains('open')) {
        menuToggle.innerHTML = '&times;';
    } else {
        menuToggle.innerHTML = '&#9776;';
    }
});

const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
