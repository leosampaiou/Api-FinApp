import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
        const user = await postgresDeleteUserRepository.execute(userId)
        return user
    }
}
