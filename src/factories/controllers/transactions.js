import {
    CreateTransactionController,
    GetTransactionByUserIdController,
    UpdateTransactionController,
    deletedTransactionController,
} from '../../controllers/index.js'
import {
    CreateTransactionsUseCase,
    GetTransactionByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
} from '../../use-cases/index.js'
import {
    PostgresCreateTransactionsRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
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

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository()

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    )

    const deleteTransactionController = new deletedTransactionController(
        deleteTransactionUseCase,
    )
    return deleteTransactionController
}
