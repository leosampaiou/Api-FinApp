import { userNotFoundResponse } from '../../errors/user.js'
import { v4 as uuidv4 } from 'uuid'

export class CreateTransactionsUseCase {
    constructor(getUserByIdRepository, createTransactionsRepository) {
        this.getUserByIdRepository = getUserByIdRepository
        this.createTransactionsRepository = createTransactionsRepository
    }
    async execute(createTransactionParams) {
        const transactionId = uuidv4()

        const userId = createTransactionParams.user_id

        const user = await this.getUserByIdRepository.getUserById(userId)
        if (!user) {
            throw new userNotFoundResponse(userId)
        }

        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        const createdTransaction =
            await this.createTransactionsRepository.execute(transaction)

        return createdTransaction
    }
}
