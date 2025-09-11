import {
    serverError,
    ok,
    checkIfIdIsValid,
    genetateInvalidIdResponse,
    genetateUserNotFoundResponse,
} from '../helpers/index.js'
export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) {
                return genetateInvalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return genetateUserNotFoundResponse()
            }

            return ok(deletedUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
