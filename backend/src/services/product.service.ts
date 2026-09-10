import { getAllProduct } from "../repositories/product.repository.js"

const getProducts = async () => {
    return await getAllProduct()
}
export { getProducts }