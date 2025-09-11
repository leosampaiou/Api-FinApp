import { EmailAlreadyInUseError } from '../../errors/user.js'
import bcrypt from 'bcrypt'

export class UpdateUserUseCase {
    constructor(PostgresGetUserByEmailRepository, updateUserRepository) {
        this.postgresGetUserByEmailRepository = PostgresGetUserByEmailRepository
        this.postgresUpdateUserRepository = updateUserRepository
    }
    async execute(userId, updateUserParams) {
        const UserWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
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

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
