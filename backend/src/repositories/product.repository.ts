import prisma from "../config/db.js";

const getAllProduct = async () => {
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

const getProduct = async (keyword: string) => {
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
export { getAllProduct, getProduct }
