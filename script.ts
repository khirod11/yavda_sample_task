const API_URL = "http://localhost:3000/api/cards";

let cardsContainer = document.getElementById("cards-container") as HTMLElement;
let searchInput = document.getElementById("search") as HTMLInputElement;

type VisualItem = {
  _id: string;
  name: string;
  cardId: string;
  imagePath: string;
  description: string;
};

let allItems: VisualItem[] = [];

function fetchData() {
  fetch(API_URL)
    .then(response => response.json())
    .then((data: VisualItem[]) => {
      allItems = data; 
      showCards(allItems);
    })
    .catch(error => {
      console.log("Error fetching cards:", error);
    });
}

function showCards(items: VisualItem[]) {
  cardsContainer.innerHTML = "";
  items.forEach(item => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.imagePath}" alt="${item.name}">
      <hr>
      <div>${item.name}</div>
      <p>${item.description}</p>
    `;
    cardsContainer.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener("input", function () {
  let text = searchInput.value.toLowerCase();
  let filtered = allItems.filter(item =>
    item.name.toLowerCase().match(text) 
  );
  showCards(filtered);
});

fetchData();
