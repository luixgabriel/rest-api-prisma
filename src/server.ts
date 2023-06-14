import express from 'express'
import { config } from 'dotenv'

config()

const app = express()
const port = process.env.PORT

app.listen(port || 3000, () => {
  console.log(`listening on port ${port}`)
})
