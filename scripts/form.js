// WDD 131 - Week 05 - Product Review Form
// Flavio Dias

// this is the product list that came with the assignment
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// I get the select and add one option for each product
const productSelect = document.getElementById('product-name');

products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id; // the value is the id
    option.textContent = product.name; // and it shows the name
    productSelect.appendChild(option);
});

// year and last modified date for the footer
const today = new Date();
document.getElementById('currentyear').innerHTML = today.getFullYear();
document.getElementById('lastModified').innerHTML = 'Last Modification: ' + document.lastModified;
