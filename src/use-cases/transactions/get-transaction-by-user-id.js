import { UserNotFoundError } from '../../errors/user.js'
export class GetTransactionByUserIdUseCase {
    constructor(getUserByIdRepository, getTransactionByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
    }

    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactions =
            await this.getTransactionByUserIdRepository.execute(userId)

        return transactions
    }
}
