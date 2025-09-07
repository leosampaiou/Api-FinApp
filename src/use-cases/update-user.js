import { PostgresGetUserByEmailRepository } from '../repositories/implementations/postgres-get-user-by-email-repository.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { UpdateUserRepository } from '../repositories/postgres/update-user.js'
import bcrypt from 'bcrypt'

export class PostgresUpdateUserUseCase {
    async execute(id, updateUserParams) {
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const UserWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (UserWithProvidedEmail) {
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

        const updatedUser = await updateUserRepository.execute(id, user)

        return updatedUser
    }
}
