import supertest from 'supertest'
import app from '../../../index'

const request = supertest(app)

const BASE_URL = '/api/store/'

let token: String
let secondToken: String
let product: Object
let user: Object

beforeAll(async () => {
  const url = BASE_URL + 'users'
  const response = await request.post(url).send({
    user: {
      firstName: 'order',
      lastName: 'User',
      password: 'pass-word',
    },
  })
  token = response.body.token
  user = response.body.user

  const productUrl = BASE_URL + 'products'
  const responseProduct = await request
    .post(productUrl)
    .set('Authorization', `Bearer ${token}`)
    .send({
      product: {
        name: 'camera',
        price: 3000,
        category: 'electronics',
      },
    })
  product = responseProduct.body

  const secondUser = await request.post(url).send({
    user: {
      firstName: 'Second',
      lastName: 'User',
      password: 'pass-word',
    },
  })
  secondToken = secondUser.body.token
})

describe('Order Routes', () => {
  describe('/POST', () => {
    it('should create a new order', async () => {
      // @ts-ignore
      const userId = user.id
      const url = BASE_URL + `orders/${userId}`
      // @ts-ignore
      const productId = product.id
      const response = await request
        .post(url)
        .set('Authorization', `Bearer ${token}`)
        .send({
          order: {
            orderItems: [
              {
                productId: productId,
                quantity: 0,
              },
            ],
          },
        })
      expect(response.body.status).toBe('open')
      expect(response.body.user_id).toBeDefined()
      expect(response.body.items).toBeDefined()
      expect(response.status).toBe(201)
    })

    it('should fail if the token does not belong to the user', async () => {
      // @ts-ignore
      const userId = user.id
      const url = BASE_URL + `orders/${userId}`
      // @ts-ignore
      const productId = product.id
      const response = await request
        .post(url)
        .set('Authorization', `Bearer ${secondToken}`)
        .send({
          order: {
            orderItems: [
              {
                productId: productId,
                quantity: 0,
              },
            ],
          },
        })
      expect(response.body.message).toBe('User id does not match!')
      expect(response.status).toBe(401)
    })
  })

  describe('/GET', () => {
    it("should get user's orders", async () => {
      // @ts-ignore
      const userId = user.id
      const url = BASE_URL + `orders/${userId}`
      const response = await request
        .get(url)
        .set('Authorization', `Bearer ${token}`)
      const order = response.body[0]
      expect(order.status).toBe('open')
      expect(order.user_id).toBeDefined()
      expect(response.status).toBe(200)
    })

    it('should not get an order if the user does not match', async () => {
      // @ts-ignore
      const userId = user.id
      const url = BASE_URL + `orders/${userId}`
      const response = await request
        .get(url)
        .set('Authorization', `Bearer ${secondToken}`)
      expect(response.body.message).toBe('User id does not match!')
      expect(response.status).toBe(401)
    })
  })
})
