import { Router } from 'express'
import Authenticated from './middlewares/Authenticated'
import Uservalidation from './middlewares/Uservalidation'

import {
  addUser,
  getUserUsingId,
  listOfAllUsers,
  getCustomerOrders,
  login,
} from './models/users'

import {
  addProduct,
  getProductUsingId,
  getListOfAllProducts,
  getTheMostPopularProducts,
} from './models/products'

import { addOrder, getOrder, getOrders, updateOrder } from './models/orders'

const router = Router()

// users
router.post('/users', addUser)
router.post('/login', login)
router.get('/users', Authenticated, listOfAllUsers)
router.get('/users/:userId', Authenticated, getUserUsingId)
router.get('/users/:userId/orders', Authenticated, getCustomerOrders)
router.get('/users/:userId/cart', Authenticated, Uservalidation)

// products
router.post('/products', Authenticated, addProduct)
router.get('/products/:id', getProductUsingId)
router.get('/products/all/most-popular', getTheMostPopularProducts)
router.get('/products', getListOfAllProducts)

// orders
router.post('/orders/:userId', Authenticated, Uservalidation, addOrder)
router.get('/orders/:userId', Authenticated, Uservalidation, getOrders)
router.get('/orders/:userId/:orderId', Authenticated, Uservalidation, getOrder)
router.put(
  '/orders/:userId/:orderId',
  Authenticated,
  Uservalidation,
  updateOrder
)

export default router
