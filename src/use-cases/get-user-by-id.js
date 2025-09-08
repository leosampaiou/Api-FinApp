import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const GetUserByEepository = new PostgresGetUserByIdRepository()
        const user = await GetUserByEepository.execute(userId)
        return user
    }
}
