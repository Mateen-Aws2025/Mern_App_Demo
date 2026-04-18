const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 🔗 Mongo
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/mern-demo";
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// 👤 User
const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

// 🛍 Product
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});
const Product = mongoose.model("Product", productSchema);

// 🛒 Cart
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    { productId: String, quantity: Number }
  ]
});
const Cart = mongoose.model("Cart", cartSchema);

// 📦 Orders (optional but nice for demo)
const orderSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, quantity: Number }],
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// ================= APIs =================

// Register
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Login (simple)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).send("Invalid credentials");
  res.json(user);
});

// Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Seed products (run once from browser or curl)
app.get('/api/seed', async (req, res) => {
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", price: 50000, image: "https://via.placeholder.com/150" },
    { name: "Phone", price: 20000, image: "https://via.placeholder.com/150" },
    { name: "Headphones", price: 3000, image: "https://via.placeholder.com/150" }
  ]);
  res.send("Seeded");
});

// Add to cart
app.post('/api/cart', async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const existing = cart.items.find(i => i.productId === productId);
  if (existing) existing.quantity += 1;
  else cart.items.push({ productId, quantity: 1 });

  await cart.save();
  res.send("Added to cart");
});

// Get cart
app.get('/api/cart/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

// Checkout → create order
app.post('/api/checkout', async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(400).send("Cart empty");

  const order = new Order({ userId, items: cart.items });
  await order.save();
  await Cart.deleteOne({ userId });

  res.send("Order placed");
});

// Get orders
app.get('/api/orders/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

app.listen(5000, () => console.log("Server running on port 5000"));