import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the URI from your .env file
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://maher:maher@flaggame.bfukcwx.mongodb.net/?retryWrites=true&w=majority&appName=flaggame";
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Define a Mongoose schema and model for products
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  category: String,
  tags: [String],
  stock: Number,
  isNew: Boolean,
  isFeatured: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', productSchema);

// API endpoint to fetch products by category or new arrivals
app.get('/api/products', async (req, res) => {
  const { category } = req.query;
  let query = {};
  if (category) {
    if (category === 'new-arrivals') {
      query = { isNew: true };
    } else {
      query = { category };
    }
  }
  
  try {
    const products = await ProductModel.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Launch the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});