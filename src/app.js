import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

export default app;