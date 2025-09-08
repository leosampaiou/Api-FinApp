import { PostgresUpdateUserUseCase } from '../use-cases/update-user.js'
import { ok, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    genetateEmailAlredyInUseResponse,
    genetateInvalidIdResponse,
    genetateinvalidPasswordResponse,
    genetateSomeFieldIsNotAlowedResponse,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    checkIfIdIsValid,
} from './helpers/index.js'

export class UpdateUserController {
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

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return genetateinvalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return genetateEmailAlredyInUseResponse()
                }
            }

            const postgresUpdateUserUseCase = new PostgresUpdateUserUseCase()

            const updatedUser = await postgresUpdateUserUseCase.execute(
                userId,
                params,
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
