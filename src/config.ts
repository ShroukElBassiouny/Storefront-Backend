import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_DB_TEST,
  NODE_ENV,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env

const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  port: 5432,
})

export default Client
