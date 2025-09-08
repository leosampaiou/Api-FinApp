import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import {
    PostgresGetUserByEmailRepository,
    PostgresCreateUserRepository,
} from '../repositories/postgres/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    async execute(createUsersParams) {
        const userId = uuidv4()

        const hashedPassword = await bcrypt.hash(createUsersParams.password, 10)

        const user = {
            ...createUsersParams,
            id: userId,
            password: hashedPassword,
        }

        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const UserWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUsersParams.email,
            )

        if (UserWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUsersParams.email)
        }

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createdUser = await postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
