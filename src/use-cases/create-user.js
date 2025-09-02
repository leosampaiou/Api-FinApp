import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'

export class CreateUserUseCase {
    async execute(createUsersParams) {
        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUsersParams.password, 10)

        const user = {
            id: userId,
            password: hashedPassword,
            first_name: createUsersParams.first_name,
            last_name: createUsersParams.last_name,
            email: createUsersParams.email,
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
