import 'dotenv/config.js'

import express from 'express'

import {
    makeGetUserController,
    makeCreteUserController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js'

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

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})
