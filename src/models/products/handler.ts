import { Request, Response } from 'express'
import { ProductStore } from './productsmodel'

const store = new ProductStore()

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product } = req.body
  try {
    const newProduct = await store.addProduct(product)
    res.status(201).json(newProduct)
  } catch (e) {
    console.log(e)
  }
}

export const getProductUsingId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const product = await store.getProductUsingId(id)
    res.status(200).json(product)
  } catch (e) {
    console.log(e)
  }
}

export const getListOfAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query
  let products
  try {
    if (category) {
      products = await store.getProductUsingCategory(category as String)
    } else {
      products = await store.getListOfAllProducts()
    }
    res.status(200).json(products)
  } catch (e) {
    console.log(e)
  }
}

export const getTheMostPopularProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await store.getTheMostPopularProducts()
    res.status(200).json({
      products,
    })
  } catch (e) {
    console.log(e)
  }
}
