import type { Express } from "express";
import { handleCreateProduct, handleDeleteProductById, handleGetProductById, handleGetProducts, handleUpdateProductById } from "../controllers/product.controller.js";

const registerProductRoute = (app: Express): void => {
    app.get("/api/v1/products", handleGetProducts);
    app.get("/api/v1/products/:id", handleGetProductById);
    app.post("/api/v1/products", handleCreateProduct);
    app.patch("/api/v1/products/:id",handleUpdateProductById );
    app.delete("/api/v1/products/:id", handleDeleteProductById);
};

export { registerProductRoute };
