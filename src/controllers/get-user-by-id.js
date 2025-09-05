import {
    serverError,
    ok,
    notFound,
} from '/home/invictus/Documentos/Projetos/FinApp/Api-FinApp/src/controllers/helper.js'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userIdIsValid = validator.isUUID(httpRequest.params.userId)
            if (!userIdIsValid) {
                return {
                    statusCode: 400,
                    body: { error: 'Invalid user ID format' },
                }
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return notFound({ error: 'User not found' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
