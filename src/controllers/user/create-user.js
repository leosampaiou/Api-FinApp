import { badRequest, created } from '../helpers/index.js'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import { ZodError } from 'zod'
import { createUserSchema } from '../../schema/index.js'
export class CreateUserCotroller {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues?.[0]?.message,
                })
            }

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
        }
    }
}
