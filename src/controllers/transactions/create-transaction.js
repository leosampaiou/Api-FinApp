import {
    genetateRequairedFieldResponse,
    validatedRequiredFields,
    badRequest,
    serverError,
    checkIfIdIsValid,
    created,
    genetateInvalidIdResponse,
} from '../helpers/index.js'
import validator from 'validator'

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

            const amauntIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                },
            )
            if (!amauntIsValid) {
                return badRequest({ menssage: 'Amount is not valid' })
            }

            const type = params.type.toUpperCase().trim()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )
            if (!typeIsValid) {
                return badRequest({
                    menssage:
                        'Type must be one of the following: EARNING, EXPENSE, INVESTMENT',
                })
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
