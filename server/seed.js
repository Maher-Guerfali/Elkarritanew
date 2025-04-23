import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://maher:maher@flaggame.bfukcwx.mongodb.net/?retryWrites=true&w=majority&appName=flaggame";

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

// Define the Product schema and model
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

// Sample product data
const sampleProducts = [
  {
    name: "Futuristic Sneakers",
    description: "Advanced footwear with smart features and futuristic designs",
    price: 129.99,
    images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress"],
    category: "footwear",
    tags: ["sneakers", "smart"],
    stock: 50,
    isNew: false,
    isFeatured: true
  },
  {
    name: "Smart Jacket",
    description: "High-tech jacket with built-in sensors and connectivity",
    price: 299.99,
    images: ["https://images.pexels.com/photos/6347547/pexels-photo-6347547.jpeg?auto=compress"],
    category: "clothing",
    tags: ["jacket", "sensor"],
    stock: 30,
    isNew: false,
    isFeatured: false
  },
  {
    name: "Latest Gadget",
    description: "Innovative gadget with groundbreaking features",
    price: 199.99,
    images: ["https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress"],
    category: "gadgets",
    tags: ["tech", "innovative"],
    stock: 100,
    isNew: true,
    isFeatured: false
  }
];

async function seed() {
  try {
    // Optionally delete all existing products
    await ProductModel.deleteMany({});
    console.log('Old products removed');

    // Insert new sample products
    await ProductModel.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seed();