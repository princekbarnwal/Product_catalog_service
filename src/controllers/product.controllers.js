import productService from "../services/product.services.js";

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Server Unavailable" });
    }
}

async function getProductById(req, res) {
    try {
        const foundProduct = await productService.getProductById(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(foundProduct);
    } catch (error) {
        res.status(500).json({ error: "Server Unavailable" });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Server Unavailable" });
    }
}

async function updateProduct(req, res) {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Server Unavailable" });
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Unavailable" });
    }
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};