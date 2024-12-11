const Item = require("../../models/inventory");

// Search by name
const searchItem = async (req, res) => {
  const { search } = req.query;
  const item = await Item.find({
    $or: [{ name: { $regex: search, $options: "i" } }],
  }).exec();
  res.render("home", { items: item });
};

// filter categories
const filterItem = async (req, res) => {
  const { category: categories = [] } = req.query;
  const checkedCategories = categories;
  const items = await Item.find({ category: { $in: checkedCategories } });
  res.render("home", { items, checkedCategories });
};

// Display Tables list
const items = async (req, res) => {
  const item = await Item.find().exec();
  res.render("home", { items: item });
};

// Add Item form
const addItemForm = async (req, res) => {
  res.render("add-item");
};

// Add Item
const addItem = async (req, res) => {
  const data = req.body;
  let inventory = await new Item({
    name: data.name,
    category: data.category,
    quantity: data.quantity,
    price: data.price,
    description: data.description,
  });
  await inventory.save();
  res.redirect("/");
};

// View Item Form
const viewItem = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id }).exec();
  res.render("view-item", { item });
};

// Update Item form
const updateItemForm = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id).exec();
  res.render("update-item", { item });
};

// Update Item
const updateItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndUpdate(id, { ...req.body });
  res.redirect("/");
};

// Delete Item
const deleteItem = async (req, res) => {
  const id = req.params.id;
  await Item.findByIdAndDelete(id);
  res.redirect("/");
};

module.exports = {
  items,
  addItemForm,
  addItem,
  viewItem,
  updateItemForm,
  updateItem,
  deleteItem,
  searchItem,
  filterItem,
};
