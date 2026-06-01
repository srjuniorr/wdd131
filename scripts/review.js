// WDD 131 - Week 05 - Review Confirmation
// Flavio Dias

// I use localStorage to count how many reviews were sent
// get the number I saved last time, or start on 0 the first time
let reviewCount = Number(localStorage.getItem('reviewCount'));
if (!reviewCount) {
    reviewCount = 0;
}

// add 1 for this review and save it again
reviewCount = reviewCount + 1;
localStorage.setItem('reviewCount', reviewCount);

// put the number on the page
document.getElementById('review-count').textContent = reviewCount;

// the form used GET so all the answers come in the url
// I read them to show a little summary
const data = new URLSearchParams(window.location.search);
const summary = document.getElementById('review-summary');

// small function to add one line to the list
function addLine(label, value) {
    if (value) {
        const li = document.createElement('li');
        li.innerHTML = '<strong>' + label + ':</strong> ' + value;
        summary.appendChild(li);
    }
}

addLine('Product', data.get('product-name'));

let rating = data.get('rating');
if (rating) {
    addLine('Rating', rating + ' star(s)');
}

addLine('Date of Installation', data.get('install-date'));

// the features can be more than one so I join them with commas
const features = data.getAll('features');
if (features.length > 0) {
    addLine('Useful Features', features.join(', '));
}

addLine('Written Review', data.get('review-text'));
addLine('User Name', data.get('user-name'));

// year and last modified date for the footer
const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
