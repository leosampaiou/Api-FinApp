import { CreateUserUseCase } from '../use-cases/create-user.js'
import validator from 'validator'
import { badRequest, created, serverError } from './helper.js'

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

            if (params.password.length < 6) {
                return badRequest({
                    menssage: 'Password must be at least 6 characters long',
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({ menssage: 'Invalid email' })
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            return created({
                menssage: 'User created successfully',
                user: createdUser,
            })
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
