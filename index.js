import 'dotenv/config.js'
import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'
import { CreateUserCotroller } from './src/controllers/create-user.js'

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM usuarios')

    res.send(JSON.stringify(results))
})

app.post('/api/users', async (req, res) => {
    const createUserCotroller = new CreateUserCotroller()

    const response = await createUserCotroller.execute(req)

    res.status(response.statusCode).send(response.body)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})
