// WDD 131 - Week 05 - Review Confirmation
// Flavio Dias

// keep track of how many reviews were completed using localStorage
// get the number we saved before (or 0 if it is the first time)
let reviewCount = Number(window.localStorage.getItem('reviewCount')) || 0;

// add one for this review and save it again
reviewCount = reviewCount + 1;
window.localStorage.setItem('reviewCount', reviewCount);

// show the counter on the page
document.getElementById('review-count').textContent = reviewCount;

// read the form data from the url (the form used the GET method)
const data = new URLSearchParams(window.location.search);
const summary = document.getElementById('review-summary');

// helper that adds one line to the summary list
function addLine(label, value) {
    if (value) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>' + label + ':</strong> ' + value;
        summary.appendChild(li);
    }
}

addLine('Product', data.get('product-name'));
addLine('Rating', data.get('rating') ? data.get('rating') + ' star(s)' : '');
addLine('Date of Installation', data.get('install-date'));

// the useful features can be more than one, so we join them with commas
const features = data.getAll('features');
if (features.length > 0) {
    addLine('Useful Features', features.join(', '));
}

addLine('Written Review', data.get('review-text'));
addLine('User Name', data.get('user-name'));

// set the year and the last modified date in the footer
const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
