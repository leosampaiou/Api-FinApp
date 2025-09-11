export class GetUserByIdUseCase {
    constructor(GetUserByEepository) {
        this.GetUserByEepository = GetUserByEepository
    }
    async execute(userId) {
        const user = await this.GetUserByEepository.execute(userId)
        return user
    }
}
