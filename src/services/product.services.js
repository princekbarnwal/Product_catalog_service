import product from "../models/product.js";
import redis from "../config/redis.js";

const CACHE_KEY = "products";
const CACHE_TTL_SECONDS = 900;

async function getAllProducts() {
    const cached = await redis.get(CACHE_KEY);
    if (cached) {
        console.log("Fetching products from Redis");
        return JSON.parse(cached);
    }

    console.log("Fetching products from MongoDB");
    const products = await product.find();
    await redis.set(CACHE_KEY, JSON.stringify(products), "EX", CACHE_TTL_SECONDS);
    return products;
}

async function getProductById(id) {
    return product.findById(id);
}

async function createProduct({ name, price }) {
    const newProduct = await product.create({ name, price });
    await redis.del(CACHE_KEY);
    return newProduct;
}

async function updateProduct(id, { name, price }) {
    const updated = await product.findByIdAndUpdate(id, { name, price }, { new: true });
    if (updated) {
        await redis.del(CACHE_KEY);
    }
    return updated;
}

async function deleteProduct(id) {
    const deleted = await product.findByIdAndDelete(id);
    if (deleted) {
        await redis.del(CACHE_KEY);
    }
    return deleted;
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};