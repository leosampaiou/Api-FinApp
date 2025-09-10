import 'dotenv/config.js'

import express from 'express'

import {
    CreateUserCotroller,
    UpdateUserController,
    GetUserByIdController,
    DeleteUserController,
} from './src/controllers/index.js'
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
} from './src/use-cases/index.js'
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresGetUserByIdRepository,
    PostgresDeleteUserRepository,
} from './src/repositories/postgres/index.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (req, res) => {
    const GetUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const CreateUserRepository = new PostgresCreateUserRepository()

    const createUserUseCase = new CreateUserUseCase(
        GetUserByEmailRepository,
        CreateUserRepository,
    )

    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const response = await createUserCotroller.execute(req)

    res.status(response.statusCode).send(response.body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        postgresGetUserByEmailRepository,
        postgresUpdateUserRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(req)
    res.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(req)
    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new GetUserByIdUseCase(
        postgresDeleteUserRepository,
    )
    const deletedUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deletedUserController.execute(req)
    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000')
})
