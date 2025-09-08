import {
    serverError,
    ok,
    checkIfIdIsValid,
    genetateInvalidIdResponse,
} from '../helpers/index.js'
import { DeleteUserUseCase } from '../use-cases/index.js'
export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) {
                return genetateInvalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()
            const deletedUser = await deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
