export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }

    async execute(id) {
        const deletedTransaction =
            await this.deleteTransactionRepository.execute(id)
        return deletedTransaction
    }
}
