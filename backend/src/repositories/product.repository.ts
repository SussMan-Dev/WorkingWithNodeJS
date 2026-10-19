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

const findProductById = async (id: number) =>{
    const product = await prisma.product.findUnique({
        select: {
            productId: true,
            productName: true,
            description: true,
            stockQuantity: true,
            price: true
        },
        where: {
            productId: id
        }
    })
    return product
}

const createProduct = async (productName: string, description: string, stockQuantity: number, price: number) => {
    const product = await prisma.product.create({
        select: {
            productId: true,
            productName: true,
            description: true,
            stockQuantity: true,
            price: true,
        },
        data: {
            productName: productName,
            description: description,
            stockQuantity: stockQuantity,
            price: price
        }
    })
    return product
}

const updateProduct = async (id: number, productName: string, description: string, stockQuantity: number, price: number) => {
    const product = await prisma.product.update({
        select: {
            productId: true,
            productName: true,
            description: true,
            stockQuantity: true,
            price: true,
        },
        where: {
            productId: id
        },
        data: {
            productName: productName,
            description: description,
            stockQuantity: stockQuantity,
            price: price
        }
    })
    return product
}

const deleteProduct = async(id: number) =>{
    const product = await prisma.product.delete({
        where: {
            productId: id
        }
    })
    return product
}

const buyProduct = async (id: number, quantity: number) => {
    const product = await prisma.product.update({
        where: {
            productId: id
        },
        data: {
            stockQuantity: {
                decrement: quantity
            }
        }
    })
    return product
}


export { findAllProducts, findProductByName, findProductById, createProduct, updateProduct , deleteProduct, buyProduct}
