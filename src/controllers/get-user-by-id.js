import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import {
    ok,
    serverError,
    genetateInvalidIdResponse,
    checkIfIdIsValid,
    genetateUserNotFoundResponse,
} from './helpers/index.js'
export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userIdIsValid = checkIfIdIsValid(httpRequest.params.userId)
            if (!userIdIsValid) {
                return genetateInvalidIdResponse()
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return genetateUserNotFoundResponse()
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
