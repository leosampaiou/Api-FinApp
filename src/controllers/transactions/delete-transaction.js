import {
    genetateInvalidIdResponse,
    serverError,
    ok,
    checkIfIdIsValid,
    generateTransactionNotFoundResponse,
} from '../helpers/index.js'

export class deletedTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const id = httpRequest.params.id

            const transactionIdIsValid = checkIfIdIsValid(id)
            if (!transactionIdIsValid) {
                return genetateInvalidIdResponse()
            }
            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(id)

            if (!deletedTransaction) {
                return generateTransactionNotFoundResponse()
            }

            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
