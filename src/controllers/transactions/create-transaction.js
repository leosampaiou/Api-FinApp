import { generateServerError } from '../../helpers/http-helper.js'
import { badRequest } from '../../helpers/index.js'
import {
    checkIfIdIsValid,
    created,
    genetateInvalidIdResponse,
} from '../helpers'
import validator from 'validator'

export class CreateTransactionController {
    constructor(createTransactionsUseCase) {
        this.createTransactionsUseCase = createTransactionsUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = [
                'id',
                'user_id',
                'name',
                ' transaction_date',
                'amount',
                'type',
            ]

            for (const field of requireFields) {
                if (!params[field] || params[field].length === 0) {
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

            const type = params.type.trim().toUpperCase()

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )
            if (!typeIsValid) {
                return badRequest({
                    menssage:
                        'Type must be one of the following: EARNING, EXPENSE, INVESTMENT',
                })
            }

            const createdTransaction =
                await this.createTransactionsUseCase.execute(...params, type)
            return created(createdTransaction)
        } catch (error) {
            console.error(error)
            return generateServerError()
        }
    }
}
