import 'dotenv/config.js'

import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'
import {
    CreateUserCotroller,
    UpdateUserController,
    GetUserByIdController,
} from './src/controllers/index.js'

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users')

    res.send(JSON.stringify(results))
})

app.post('/api/users', async (req, res) => {
    const createUserCotroller = new CreateUserCotroller()

    const response = await createUserCotroller.execute(req)

    res.status(response.statusCode).send(response.body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(req)
    res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})
