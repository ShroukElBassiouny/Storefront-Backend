import bcrypt from 'bcrypt'
import Client from '../../config'
import dotenv from 'dotenv'
import { Order } from '../orders/ordersmodel'

dotenv.config()

const { SALT_ROUNDS, PEPPER } = process.env

export type User = {
  id?: String
  firstName: String
  lastName: String
  password: String
}

export class UserInStore {
  async addUser(user: User): Promise<User | undefined> {
    const { firstName, lastName, password } = user
    try {
      const conn = await Client.connect()
      const hashPassword = bcrypt.hashSync(
        password + PEPPER!,
        parseInt(SALT_ROUNDS as string, 10)
      )
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES ($1,$2, $3) RETURNING *'
      const result = await conn.query(sql, [firstName, lastName, hashPassword])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (e) {
      console.log(e)
    }
  }

  async listOfAllUsers(): Promise<User[] | undefined> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (e) {
      console.log(e)
    }
  }

  async getUserUsingId(id: String): Promise<User | undefined> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (e) {}
  }

  async authenticate(
    firstName: String,
    password: String
  ): Promise<User | undefined | null> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE firstname=($1)'
      const users = await conn.query(sql, [firstName])
      if (users.rows.length > 0) {
        if (
          await bcrypt.compareSync(password + PEPPER!, users.rows[0].password)
        ) {
          conn.release()
          return users.rows[0]
        }
      }
      conn.release()
      return null
    } catch (e) {
      console.log(e)
    }
  }

  async delete(id: String): Promise<void | undefined> {
    try {
      const conn = await Client.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'
      await conn.query(sql, [id])
      conn.release()
    } catch (e) {
      console.log(e)
    }
  }

  async update(id: String, user: User): Promise<void | undefined> {
    try {
      const conn = await Client.connect()
      const sql = 'UPDATE users SET firstName=($1), lastName=($2) WHERE id=($3)'
      await conn.query(sql, [user.firstName, user.lastName, id])
      conn.release()
    } catch (e) {
      console.log(e)
    }
  }

  async getUsersOrder(userId: String): Promise<Order[] | undefined> {
    const status = 'closed'
    try {
      const conn = await Client.connect()
      const sql =
        'SELECT * FROM orders WHERE user_id=($1) WHERE AND status=($2)'
      const result = await conn.query(sql, [userId, status])
      const orders = result.rows
      conn.release()
      return orders
    } catch (e) {
      console.log(e)
    }
  }
}
