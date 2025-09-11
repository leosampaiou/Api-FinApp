import { CreateTransactionController } from '../../controllers/index.js'
import { CreateTransactionUseCase } from '../../use-cases/index.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/index.js'

export const makeTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()

    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTransactionRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
