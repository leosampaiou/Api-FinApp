import { UserNotFoundError } from '../../errors/user.js'
import {
    serverError,
    ok,
    checkIfIdIsValid,
    generateInvalidIdResponse,
    generateUserNotFoundResponse,
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
                return generateInvalidIdResponse()
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return generateUserNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
