import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalanceUseCase {
    constructor(GetUserByIdRepository, GetUserBalanceRepository) {
        this.GetUserBalanceRepository = GetUserBalanceRepository
        this.GetUserByIdRepository = GetUserByIdRepository
    }
    async execute(params) {
        const userId = params.userId
        const user = await this.GetUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.GetUserBalanceRepository.execute(userId)
        return balance
    }
}
