import type { Express } from "express";
import { renderProductList } from "../controllers/product.controller.js";
const registerProductRoute = (app: Express): void => {

    app.get("/product", renderProductList)
}
export { registerProductRoute }