import { type Request, type Response } from "express";
import { getProducts } from "../services/product.service.js";

const handleGetProducts = async (_req: Request, res: Response) => {
    try {
        const products = await getProducts();
        return res.status(200).json({ data: products });
    } catch (error) {
        console.error("Unable to get products:", error);
        return res.status(500).json({ message: "Unable to get products" });
    }
};

export { handleGetProducts };
