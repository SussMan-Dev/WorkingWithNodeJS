import { Request, Response } from "express"
import { getProducts } from "../services/product.service.js"
const renderProductList = async (req: Request, res: Response) => {
    // const products = await getProducts()
    // res.render("product/productList", { products })
    console.log("hihi");

}
export { renderProductList }