import prisma from "../config/db.js";

const findAllProducts = async () => {
    const products = await prisma.product.findMany(
        {
            select: {
                productId: true,
                productName: true,
                description: true,
                stockQuantity: true,
                price: true
            }
        }
    )
    return products
}

const findProductByName = async (keyword: string) => {
    const product = await prisma.product.findFirst({
        select: {
            productId: true,
            productName: true,
            description: true,
            stockQuantity: true,
            price: true
        },
        where: {
            productName: {
                contains: keyword.trim(),
            },
        }
    })
    return product
}
export { findAllProducts, findProductByName }
