import express from 'express'
import { config } from 'dotenv'
import UserRoutes from '../src/routes/users-routes'

config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/', UserRoutes)

app.listen(port || 3000, () => {
  console.log(`listening on port ${port}`)
})
