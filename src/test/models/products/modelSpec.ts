import { ProductStore } from '../../../models/products/productsmodel'

const store = new ProductStore()

const products = [
  {
    name: 'Product1',
    price: '10',
    category: 'Category1',
  },
  {
    name: 'Product2',
    price: '10',
    category: 'Category1',
  },
  {
    name: 'Product3',
    price: '10',
    category: 'Category2',
  },
]

beforeAll(async () => {
  products.forEach(async (product) => {
    await store.addProduct(product)
  })
})

describe('Product Store', () => {
  describe('Model Actions', () => {
    it('should return a list of products', async () => {
      const products = await store.getListOfAllProducts()
      expect(products).toBeDefined()
      expect(products?.length).toBeGreaterThan(0)
    })

    it('should get product by category', async () => {
      const productsByCategory = await store.getProductUsingCategory(
        'Category2'
      )
      expect(productsByCategory).toBeDefined()
      expect(productsByCategory?.length).toBeGreaterThan(0)
    })

    it('should get product by id', async () => {
      const product = await store.getProductUsingId('1')
      expect(product).toBeDefined()
      expect(product?.name).toBeDefined()
      expect(product?.price).toBeDefined()
      expect(product?.category).toBeDefined()
    })

    it('should get most popular products', async () => {
      const products = await store.getTheMostPopularProducts()
      expect(products).toBeDefined()
      expect(products?.length).toBeGreaterThan(0)
    })
  })

  describe('Mehods', () => {
    it('store should be defined', () => {
      expect(store).toBeDefined()
    })

    it('store should be an instance of UserInStore', () => {
      expect(store instanceof ProductStore).toBeTruthy()
    })

    it('store should have a addProduct method', () => {
      expect(store.addProduct).toBeDefined()
    })

    it('store should have a getListOfAllProducts method', () => {
      expect(store.getListOfAllProducts).toBeDefined()
    })

    it('store should have a getProductUsingId method', () => {
      expect(store.getProductUsingId).toBeDefined()
    })
  })
})
