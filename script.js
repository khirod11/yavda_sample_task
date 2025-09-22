var API_URL = "http://localhost:3000/api/cards";
var cardsContainer = document.getElementById("cards-container");
var searchInput = document.getElementById("search");
var allItems = [];
function fetchData() {
    fetch(API_URL)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        allItems = data;
        showCards(allItems);
    })
        .catch(function (error) {
        console.log("Error fetching cards:", error);
    });
}
function showCards(items) {
    cardsContainer.innerHTML = "";
    items.forEach(function (item) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = "\n      <img src=\"".concat(item.imagePath, "\" alt=\"").concat(item.name, "\">\n      <hr>\n      <div>").concat(item.name, "</div>\n      <p>").concat(item.description, "</p>\n    ");
        cardsContainer.appendChild(card);
    });
}
// Search filter
searchInput.addEventListener("input", function () {
    var text = searchInput.value.toLowerCase();
    var filtered = allItems.filter(function (item) {
        return item.name.toLowerCase().match(text);
    });
    showCards(filtered);
});
fetchData();
