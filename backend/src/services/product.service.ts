import { findAllProducts, findProductById, findProductByName } from "../repositories/product.repository.js"

const getProducts = async () => {
    return await findAllProducts()
}

const searchProductsByName = async (keyword: string) => {
    return await findProductByName(keyword)
}

const getProductById = async (id: number) => {
    return await findProductById(id)
}

const createProduct = async (productName: string, description: string, stockQuantity: number, price: number) => {
    return await createProduct(productName, description, stockQuantity, price)
}

const updateProductById = async (id: number, productName: string, description: string, stockQuantity: number, price: number) => {
    return await updateProductById(id, productName, description, stockQuantity, price)
}

const deleteProductById = async (id: number) => {
    return await deleteProductById(id)
}

export { getProducts, searchProductsByName, getProductById, createProduct, updateProductById, deleteProductById }
