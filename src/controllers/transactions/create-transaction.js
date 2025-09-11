import {
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

            for (const field of requireFields) {
                if (
                    !params[field] ||
                    params[field].toString().trim().length === 0
                ) {
                    return badRequest({
                        menssage: `Field ${field} is required`,
                    })
                }
            }

            const idIsValid = checkIfIdIsValid(params.user_id)
            if (!idIsValid) {
                return genetateInvalidIdResponse()
            }

            if (params.amount <= 0) {
                return badRequest({
                    menssage: 'Amount must be greater than zero',
                })
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
