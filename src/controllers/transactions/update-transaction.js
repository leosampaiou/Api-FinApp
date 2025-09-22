import { ZodError } from 'zod'
import {
    checkIfIdIsValid,
    generateInvalidIdResponse,
    serverError,
    generateSomeFieldIsNotAlowedResponse,
    ok,
    badRequest,
} from '../../controllers/helpers/index.js'
import { updateTransactionSchema } from '../../schema/index.js'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            params.type = params.type.toUpperCase()
            const id = httpRequest.params.id

            const userIdIsValid = checkIfIdIsValid(id)
            if (!userIdIsValid) {
                return generateInvalidIdResponse()
            }

            const alowedFields = ['name', 'date', 'amount', 'type']

            const someFieldIsNotAlowed = Object.keys(params).some((filds) => {
                return !alowedFields.includes(filds)
            })

            if (someFieldIsNotAlowed) {
                return generateSomeFieldIsNotAlowedResponse()
            }

            await updateTransactionSchema.parseAsync(params)

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(id, params)
            return ok(updatedTransaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues?.[0].message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
