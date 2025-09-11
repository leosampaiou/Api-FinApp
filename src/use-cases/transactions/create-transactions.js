import { UserNotFoundError } from '../../errors/user.js'
import { v4 as uuidv4 } from 'uuid'

export class CreateTransactionsUseCase {
    constructor(getUserByIdRepository, createTransactionsRepository) {
        this.getUserByIdRepository = getUserByIdRepository
        this.createTransactionsRepository = createTransactionsRepository
    }
    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id

        const user = this.getUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError(userId)
        }
        const transactionId = uuidv4()
        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        const createdTransaction =
            await this.createTransactionsRepository.execute(transaction)

        return createdTransaction
    }
}
