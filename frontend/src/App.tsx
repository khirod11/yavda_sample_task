import React, { useEffect, useState } from "react";
import { fetchCards, VisualItem } from "./Api";
import "./App.css";
import Card from "./components/Cards";

function App() {
  const [allItems, setAllItems] = useState<VisualItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<VisualItem[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCards()
      .then((data) => {
        setAllItems(data);
        setFilteredItems(data);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  useEffect(() => {
    if (!searchText) {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(
        allItems.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, allItems]);

  return (
    <div className="container">
      <h1>Power BI Custom Visuals Gallery</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Visual"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="cards" id="cards-container">
        {filteredItems.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
