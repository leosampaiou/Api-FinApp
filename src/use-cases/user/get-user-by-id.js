import { UserNotFoundError } from '../../errors/user'

export class GetUserByIdUseCase {
    constructor(GetUserByEepository) {
        this.GetUserByEepository = GetUserByEepository
    }
    async execute(userId) {
        const user = await this.GetUserByEepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError()
        }
        return user
    }
}
