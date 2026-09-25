import type { Express } from "express";
import { handleGetProducts } from "../controllers/product.controller.js";

const registerProductRoute = (app: Express): void => {
    app.get("/api/v1/products", handleGetProducts);
};

export { registerProductRoute };
