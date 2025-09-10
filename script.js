const API_URL = "https://pbivizedit.com/api/visuals";

const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search");

let allItems = [];

function fetchData() {
  fetch(API_URL)
    .then(response => response.json()) 
    .then(data => {
      allItems = data.items;  
      showCards(allItems);    
    })
    .catch(error => {
      console.log("Error fetching cards:", error);
    });
}

function showCards(items) {
  cardsContainer.innerHTML = ""; 
  items.forEach(item => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imagePath}" alt="${item.name}">
      <hr>
      <div>${item.name}</div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener("input", function () {
  let text = searchInput.value.toLowerCase();
  let filtered = allItems.filter(item =>
    item.name.toLowerCase().includes(text)
  );
  showCards(filtered);
});

fetchData();
