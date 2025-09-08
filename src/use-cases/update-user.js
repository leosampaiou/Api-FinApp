import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserRepository } from '../repositories/postgres/index.js'
import bcrypt from 'bcrypt'

export class PostgresUpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const UserWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (UserWithProvidedEmail && UserWithProvidedEmail.id !== userId) {
            throw new EmailAlreadyInUseError(updateUserParams.email)
        }
        const user = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )
            user.password = hashedPassword
        }

        const updateUserRepository = new UpdateUserRepository()

        const updatedUser = await updateUserRepository.execute(userId, user)

        return updatedUser
    }
}
