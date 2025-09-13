import { UserNotFoundError } from '../../errors/user'
import {
    checkIfIdIsValid,
    genetateInvalidIdResponse,
    genetateRequairedFieldResponse,
    genetateUserNotFoundResponse,
    ok,
    serverError,
} from '../helpers/index.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId
            if (!userId) {
                return genetateRequairedFieldResponse('userId')
            }

            const idIsValid = checkIfIdIsValid(userId)
            if (!idIsValid) {
                return genetateInvalidIdResponse()
            }
            const transactions =
                await this.getTransactionByUserIdUseCase.execute({
                    userId,
                })
            return ok(transactions)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return genetateUserNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
