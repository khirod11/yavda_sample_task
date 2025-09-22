const express = require("express");
const mongoose = require("mongoose");
const VisualCards = require("./models/visualCards.model");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GET All Records
app.get("/api/cards", async (req, res) => {
  try {
    const cards = await VisualCards.find({});
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//GET Single Record
app.get("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await VisualCards.findById(id);
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//Create Record
app.post("/api/cards", async (req, res) => {
  try {
    const cards = await VisualCards.create(req.body);
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error inserting card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Update Record
app.put("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await VisualCards.findByIdAndUpdate(id, req.body);
    if (!card) {
      return res
        .status(404)
        .json({ message: `Cannot find any card with ID ${id}` });
    }

    const updatedCard = await VisualCards.findById(id);
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete Record
app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await VisualCards.findByIdAndDelete(id);
    if (!card) {
      return res
        .status(404)
        .json({ message: `Cannot find any card with ID ${id}` });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://khirodnyk11_db_user:Sonusanu%409778@yavdadb.xrnsicw.mongodb.net/?retryWrites=true&w=majority&appName=YavdaDB"
  )
  .then(() => {
    console.log("MongoDB connected"),
      app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
  })
  .catch((err) => console.log("Connection Failed!"));
