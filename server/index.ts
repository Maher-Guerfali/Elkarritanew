import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS to allow specific origins (or all, if needed)
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://elkarritanew.vercel.app',
    'elkarritanew-narstvi9k-maherguerfalis-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // or use req.headers.origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  // your handler code
  res.json({ data: 'Hello World' });
};

module.exports = allowCors(handler);

// Launch the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});