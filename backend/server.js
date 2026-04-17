const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-demo";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ Schema (UPDATED)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  gender: String,
  city: String,
  profession: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ✅ API
app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User Saved Successfully ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ Get Users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/', (req, res) => {
  res.send('Backend running 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
