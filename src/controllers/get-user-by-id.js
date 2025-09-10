import {
    ok,
    serverError,
    genetateInvalidIdResponse,
    checkIfIdIsValid,
    genetateUserNotFoundResponse,
} from './helpers/index.js'
export class GetUserByIdController {
    constructor(GetUserByIdUseCase) {
        this.GetUserByIdUseCase = GetUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userIdIsValid = checkIfIdIsValid(httpRequest.params.userId)
            if (!userIdIsValid) {
                return genetateInvalidIdResponse()
            }

            const user = await this.GetUserByIdUseCase.execute(
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
