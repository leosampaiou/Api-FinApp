import { UserNotFoundError } from '../../errors/user.js'

export class DeleteUserUseCase {
    constructor(postgresGetUserByIdRepository, postgresDeleteUserRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
        this.postgresDeleteUserRepository = postgresDeleteUserRepository
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
