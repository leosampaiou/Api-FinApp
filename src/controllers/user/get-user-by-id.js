import { UserNotFoundError } from '../../errors/user.js'
import {
    ok,
    serverError,
    generateInvalidIdResponse,
    checkIfIdIsValid,
    generateUserNotFoundResponse,
} from '../helpers/index.js'
export class GetUserByIdController {
    constructor(GetUserByIdUseCase) {
        this.GetUserByIdUseCase = GetUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userIdIsValid = checkIfIdIsValid(httpRequest.params.userId)
            if (!userIdIsValid) {
                return generateInvalidIdResponse()
            }

            const user = await this.GetUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return ok(user)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return generateUserNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
