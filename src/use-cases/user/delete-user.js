import { UserNotFoundError } from '../../errors/user.js'

export class DeleteUserUseCase {
    constructor(postgresDeleteUserRepository, postgresGetUserByIdRepository) {
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }
    async execute(userId) {
        const user = await this.postgresGetUserByIdRepository.execute(userId)
        if (!user) {
            throw new UserNotFoundError()
        }
        const deleteUser =
            await this.postgresDeleteUserRepository.execute(userId)
        return deleteUser
    }
}
