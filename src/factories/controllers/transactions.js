import {
    CreateTransactionController,
    GetTransactionByUserIdController,
} from '../../controllers/index.js'
import {
    CreateTransactionsUseCase,
    GetTransactionByUserIdUseCase,
} from '../../use-cases/index.js'
import {
    PostgresCreateTransactionsRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js'

export const makeTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionsRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionsUseCase(
        getUserByIdRepository,
        createTransactionRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionByUserIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionByUserIdRepository()

    const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
        getUserByIdRepository,
        getTransactionByUserIdRepository,
    )

    const getTransactionByUserIdController =
        new GetTransactionByUserIdController(getTransactionByUserIdUseCase)

    return getTransactionByUserIdController
}
