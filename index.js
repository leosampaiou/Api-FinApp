import 'dotenv/config.js'

import express from 'express'

import {
    makeGetUserController,
    makeCreteUserController,
    makeUpdateUserController,
    makeDeleteUserController,
    makeTransactionController,
    makeGetTransactionByUserIdController,
} from './src/factories/controllers/index.js'

const app = express()

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const createUserCotroller = makeCreteUserController()
    const response = await createUserCotroller.execute(req)

    res.status(response.statusCode).send(response.body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(req)
    res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserController()
    const { statusCode, body } = await getUserByIdController.execute(req)
    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const deletedUserController = makeDeleteUserController()

    const { statusCode, body } = await deletedUserController.execute(req)
    res.status(statusCode).send(body)
})

app.post('/api/transactions', async (req, res) => {
    const transactionController = makeTransactionController()
    const { statusCode, body } = await transactionController.execute(req)
    res.status(statusCode).send(body)
})

app.get('/api/transactions/', async (req, res) => {
    const getTransactionByUserIdController =
        makeGetTransactionByUserIdController()
    const { statusCode, body } =
        await getTransactionByUserIdController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})
