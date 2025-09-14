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

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const id = httpRequest.params.id

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
                const type = params.type.toUpperCase().trim()

                const typeIsValid = checkIfTypeIsValid(type)
                if (!typeIsValid) {
                    return generateInvalidTypeResponse()
                }

                params.type = type
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
