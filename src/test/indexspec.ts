import app from '../index'
import supertest from 'supertest'
const request = supertest(app)

describe('Testing API', () => {
  it('should should return a status of 200', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
