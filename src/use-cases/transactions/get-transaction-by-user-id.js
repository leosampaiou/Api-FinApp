import { UserNotFoundError } from '../../errors/index.js'

export class GetTransactionByUserIdRepository {
    constructor(getUserByIdRepository, getTransactionByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
    }
    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId)

        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const transactions =
            await this.getTransactionByUserIdRepository.execute(params.userId)

        return transactions
    }
}
