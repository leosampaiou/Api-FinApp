import { badRequest, serverError, ok } from '../helpers/index.js'
import { z, ZodError } from 'zod'

export class GetTransactionByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }

    async execute(httpRequest) {
        try {
            const paramsSchema = z.object({
                userId: z.string().uuid({ message: 'Invalid userId format' }),
            })

            const { userId } = paramsSchema.parse(httpRequest.params)

            const transactions =
                await this.getTransactionByUserIdUseCase.execute(userId)

            return ok(transactions)
        } catch (error) {
            console.error(error)

            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors.map((e) => e.message).join(', '),
                })
            }

            return serverError()
        }
    }
}
