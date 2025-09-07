import { PostgresUpdateUserUseCase } from '../use-cases/update-user.js'
import { badRequest, ok, serverError } from './helper.js'
import validator from 'validator'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body
            const userId = httpRequest.params.userId

            const userIdIsValid = validator.isUUID(userId)
            if (!userIdIsValid) {
                return badRequest({
                    error: 'The provided id is not valid',
                })
            }

            const alowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAlowed = Object.keys(updateUserParams).some(
                (filds) => {
                    return !alowedFields.includes(filds)
                },
            )

            if (someFieldIsNotAlowed) {
                return badRequest({
                    message: 'Some field is not alowed.',
                })
            }

            if (updateUserParams.password) {
                if (updateUserParams.password.length < 6) {
                    return badRequest({
                        menssage: 'Password must be at least 6 characters long',
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email)

                if (!emailIsValid) {
                    return badRequest({ menssage: 'Invalid email' })
                }
            }

            const postgresUpdateUserUseCase = new PostgresUpdateUserUseCase()

            const updatedUser = await postgresUpdateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            return ok(updatedUser)
        } catch (error) {
            console.error(error)
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
