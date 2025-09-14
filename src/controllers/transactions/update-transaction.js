import {
    checkIfIdIsValid,
    genetateInvalidIdResponse,
    serverError,
    genetateSomeFieldIsNotAlowedResponse,
    checkIfAmountIsValid,
    generateInvalidAmountResponse,
    checkIfTypeIsValid,
    generateInvalidTypeResponse,
    ok,
} from '../../controllers/helpers/index.js'

export class updateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const id = httpRequest.params.idd

            const userIdIsValid = checkIfIdIsValid(id)
            if (!userIdIsValid) {
                return genetateInvalidIdResponse()
            }

            const alowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAlowed = Object.keys(params).some((filds) => {
                return !alowedFields.includes(filds)
            })

            if (someFieldIsNotAlowed) {
                return genetateSomeFieldIsNotAlowedResponse()
            }

            if (params.amount) {
                const amauntIsValid = checkIfAmountIsValid(params.amount)
                if (!amauntIsValid) {
                    return generateInvalidAmountResponse()
                }
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type)
                if (!typeIsValid) {
                    return generateInvalidTypeResponse()
                }
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(id, params)
            return ok(updatedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
