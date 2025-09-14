export class UpdateTransactionUseCase {
    constructor(updateTransactionsRepository) {
        this.updateTransactionsRepository = updateTransactionsRepository
    }
    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction =
            await this.updateTransactionsRepository.execute(
                transactionId,
                updateTransactionParams,
            )
        return updatedTransaction
    }
}
