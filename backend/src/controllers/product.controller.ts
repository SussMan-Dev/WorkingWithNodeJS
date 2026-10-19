import { type Request, type Response } from "express";
import { createProduct, deleteProductById, getProductById, getProducts, searchProductsByName, updateProductById } from "../services/product.service.js";

const handleGetProducts = async (req: Request, res: Response) => {
    try {
        const keyword = typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
        const products = keyword ? await searchProductsByName(keyword) : await getProducts();
        return res.status(200).json({ data: products });
    } catch (error) {
        console.error("Unable to get products:", error);
        return res.status(500).json({ message: "Unable to get products" });
    }
};

const handleGetProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ data: product });
    } catch (error) {
        console.error("Unable to get product by id:", error);
        return res.status(500).json({ message: "Unable to get product by id" });
    }
}

const handleCreateProduct = async (req: Request, res: Response) => {
    const { productName, description, stockQuantity, price } = req.body;

    if (!productName || !description || typeof stockQuantity !== "number" || typeof price !== "number") {
        return res.status(400).json({ message: "Invalid product data" });
    }

    try {
        const product = await createProduct(productName, description, stockQuantity, price);
        return res.status(201).json({ data: product });
    } catch (error) {
        console.error("Unable to create product:", error);
        return res.status(500).json({ message: "Unable to create product" });
    }
};

const handleUpdateProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    try{
        const { productName, description, stockQuantity, price } = req.body;
        if (!productName || !description || typeof stockQuantity !== "number" || typeof price !== "number") {
            return res.status(400).json({ message: "Invalid product data" });
        }
        const product = await updateProductById(id, productName, description, stockQuantity, price);
        return res.status(200).json({ data: product });
    }
    catch(error){
        console.error("Unable to update product by id:", error);
        return res.status(500).json({ message: "Unable to update product by id" });
    }
}

const handleDeleteProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    const product = await deleteProductById(id);
    return res.status(200).json({ data: product });
}
export { handleGetProducts, handleGetProductById, handleCreateProduct, handleUpdateProductById, handleDeleteProductById };
