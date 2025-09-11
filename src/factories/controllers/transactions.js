import { CreateTransactionController } from '../../controllers/index.js'
import { CreateTransactionsUseCase } from '../../use-cases/index.js'
import { PostgresCreateTransactionsRepository } from '../../repositories/postgres/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/index.js'

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
