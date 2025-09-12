import {
    genetateRequairedFieldResponse,
    validatedRequiredFields,
    serverError,
    checkIfIdIsValid,
    created,
    genetateInvalidIdResponse,
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    generateInvalidAmountResponse,
    generateInvalidTypeResponse,
} from '../helpers/index.js'

export class CreateTransactionController {
    constructor(createTransactionsUseCase) {
        this.createTransactionsUseCase = createTransactionsUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = ['user_id', 'name', 'date', 'amount', 'type']

            const requiredFieldsValidation = validatedRequiredFields(
                params,
                requireFields,
            )
            if (!requiredFieldsValidation.ok) {
                return genetateRequairedFieldResponse(
                    requiredFieldsValidation.missingField,
                )
            }

            const idIsValid = checkIfIdIsValid(params.user_id)
            if (!idIsValid) {
                return genetateInvalidIdResponse()
            }

            const amauntIsValid = checkIfAmountIsValid(params.amount)
            if (!amauntIsValid) {
                return generateInvalidAmountResponse()
            }

            const type = params.type.toUpperCase().trim()

            const typeIsValid = checkIfTypeIsValid(type)
            if (!typeIsValid) {
                return generateInvalidTypeResponse()
            }
            params.type = type

            const createdTransaction =
                await this.createTransactionsUseCase.execute(params)
            return created(createdTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
