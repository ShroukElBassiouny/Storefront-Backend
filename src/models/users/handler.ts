import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { UserInStore } from './usersmodel'
import { ParametersValidation } from './helpers'

dotenv.config()
const store = new UserInStore()
const { JWT_SECRET } = process.env

export const addUser = async (req: Request, res: Response): Promise<void> => {
  const { user } = req.body
  try {
    if (ParametersValidation(user)) {
      const newUser = await store.addUser(user)
      const token = jwt.sign({ user: newUser }, JWT_SECRET as string)
      res.status(201).json({
        token,
        success: true,
        user: newUser,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid parameters',
      })
    }
  } catch (error) {
    throw new Error(`Unable to create User ${error}`)
  }
}

export const login = async (req: Request, res: Response) => {
  const firstName = req.body.firstName
  const password  = req.body.password
  try {
    const user = await store.authenticate(firstName, password)
    if (user) {
      const token = jwt.sign({ user: user }, JWT_SECRET as string)
      res.status(200).json({
        success: true,
        token,
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'User Does not exist or credentials are invalid',
      })
    }
  } catch (e) {
    throw new Error(`Unable to login ${e}`)
  }
}

export const getUserUsingId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params
  try {
    const user = await store.getUserUsingId(userId)
    if (user?.id) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }
  } catch (e) {
    throw new Error(`Unable to get User ${e}`)
  }
}

export const listOfAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await store.listOfAllUsers()
    res.status(200).json(users)
  } catch (e) {
    throw new Error(`Unable to get all Users ${e}`)
  }
}

export const getCustomerOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params
  try {
    const orders = await store.getUsersOrder(userId)
    res.status(200).json(orders)
  } catch (e) {
    throw new Error(`Unable to get all Orders ${e}`)
  }
}
