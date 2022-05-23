import { User, UserInStore } from '../../../models/users/usersmodel'

const store = new UserInStore()

const users = [
  {
    firstName: 'User1',
    lastName: 'test1',
    password: 'n500',
  },
  {
    firstName: 'User2',
    lastName: 'test2',
    password: 'n500',
  },
  {
    firstName: 'User3',
    lastName: 'test3',
    password: 'n500',
  },
]

beforeAll(async () => {
  users.forEach(async (user) => await store.addUser(user))
})

describe('User', () => {
  describe('User Methods', () => {
    it('store should be defined', () => {
      expect(store).toBeDefined()
    })

    it('store should be an instance of UserInStore', () => {
      expect(store instanceof UserInStore).toBeTruthy()
    })

    it('store should have a addUser method', () => {
      expect(store.addUser).toBeDefined()
    })

    it('store should have a listOfAllUsers method', () => {
      expect(store.listOfAllUsers).toBeDefined()
    })

    it('store should have a getUserUsingId method', () => {
      expect(store.getUserUsingId).toBeDefined()
    })
  })

  describe('User Model', () => {
    it('should return a single user', async () => {
      const user = await store.getUserUsingId('1')
      expect(user).toBeDefined()
      expect(user?.id).toBeDefined()
      expect(user?.password).toBeDefined()
    })

    it('should return a list of users', async () => {
      const users = await store.listOfAllUsers()
      expect(users).toBeDefined()
      expect(users?.length).toBeGreaterThan(0)
    })

    it('should create a new user', async () => {
      const user = await store.addUser({
        firstName: 'User4',
        lastName: 'test4',
        password: 'n500',
      })
      expect(user).toBeDefined()
      expect(user?.id).toBeDefined()
      expect(user?.password).toBeDefined()
    })

    it('should authenticate a user', async () => {
      const authenticatedUser = await store.authenticate('User4', 'n500')
      expect(authenticatedUser).toBeDefined()
      expect(authenticatedUser?.id).toBeDefined()
      expect(authenticatedUser?.password).toBeDefined()
    })

    it('should not authenticate a user if password is incorrect', async () => {
      const authenticatedUser = await store.authenticate('User4', 'n5001')
      expect(authenticatedUser).toBeNull()
    })
  })
})
