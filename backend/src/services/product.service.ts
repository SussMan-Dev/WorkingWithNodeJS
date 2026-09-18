import { findAllProducts } from "../repositories/product.repository.js"

const getProducts = async () => {
    return await findAllProducts()
}
export { getProducts }
