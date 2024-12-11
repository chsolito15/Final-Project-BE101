const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/inventoryDB", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const itemDB = mongoose.model("Item", itemSchema);

module.exports = itemDB;
