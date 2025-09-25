import {
    serverError,
    created,
    badRequest,
    generateUserNotFoundResponse,
} from '../helpers/index.js'
import { createTransactionSchema } from '../../schema/transaction.js'
import { ZodError } from 'zod'
import { UserNotFoundError } from '../../errors/user.js'
export class CreateTransactionController {
    constructor(createTransactionsUseCase) {
        this.createTransactionsUseCase = createTransactionsUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            params.type = params.type.toUpperCase()

            await createTransactionSchema.parseAsync(params)

            const createdTransaction =
                await this.createTransactionsUseCase.execute(params)
            return created(createdTransaction)
        } catch (error) {
            console.error(error)

            if (error instanceof UserNotFoundError) {
                return generateUserNotFoundResponse()
            }

            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues?.[0].message,
                })
            }
            return serverError()
        }
    }
}
