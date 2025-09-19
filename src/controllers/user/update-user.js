import { badRequest, ok, serverError } from '../helpers/http.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    genetateInvalidIdResponse,
    genetateSomeFieldIsNotAlowedResponse,
    checkIfIdIsValid,
} from '../helpers/index.js'
import { updatedUserSchema } from '../../schema/user.js'
import { ZodError } from 'zod'

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const userId = httpRequest.params.userId

            const userIdIsValid = checkIfIdIsValid(userId)
            if (!userIdIsValid) {
                return genetateInvalidIdResponse()
            }

            const alowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAlowed = Object.keys(params).some((filds) => {
                return !alowedFields.includes(filds)
            })

            if (someFieldIsNotAlowed) {
                return genetateSomeFieldIsNotAlowedResponse()
            }

            await updatedUserSchema.parseAsync(params)

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            )

            return ok(updatedUser)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues?.[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return {
                    statusCode: 400,
                    body: { error: error.message },
                }
            }
            return serverError()
        }
    }
}
