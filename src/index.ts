import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'
dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json({ type: 'application/json' }))
app.get('/', (_req: Request, res: Response) => {
  res.send('Storefront API')
})
app.get('/health', (_req: Request, res: Response): void => {
  res.send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  })
})

app.use('/api/store', routes)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
export default app
