import { UserNotFoundError } from '../../errors/user-not-found-error.js'

export class updateTransactionsUseCase {
    constructor(updateTransactionsRepository, getUserByIdRepository) {
        this.updateTransactionsRepository = updateTransactionsRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(updateTransactionParams) {
        const userId = this.getUserByIdRepository.execute(
            updateTransactionParams.user_id,
        )
        if (!userId) {
            throw new UserNotFoundError(userId)
        }
        const updatedTransaction =
            await this.updateTransactionsRepository.execute(
                updateTransactionParams,
            )
        return updatedTransaction
    }
}
