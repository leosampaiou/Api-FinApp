import { CreateUserUseCase } from '../use-cases/create-user.js'
import {
    badRequest,
    created,
    serverError,
} from '../controllers/helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    genetateEmailAlredyInUseResponse,
    genetateinvalidPasswordResponse,
} from './helpers/user.js'

export class CreateUserCotroller {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requireFields) {
                if (!params[field] || params[field].length === 0) {
                    return badRequest({
                        menssage: `Field ${field} is required`,
                    })
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return genetateinvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return genetateEmailAlredyInUseResponse()
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            return created({
                menssage: 'User created successfully',
                user: createdUser,
            })
        } catch (error) {
            console.error(error)
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ menssage: error.message })
            }
            return serverError()
        }
    }
}
