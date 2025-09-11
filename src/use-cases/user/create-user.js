import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresGetUserByEmailRepository,
        postgresCreateUserRepository,
    ) {
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
        this.postgresCreateUserRepository = postgresCreateUserRepository
    }
    async execute(createUsersParams) {
        const userId = uuidv4()
        const hashedPassword = await bcrypt.hash(createUsersParams.password, 10)

        const user = {
            ...createUsersParams,
            id: userId,
            password: hashedPassword,
        }

        const UserWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUsersParams.email,
            )

        if (UserWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUsersParams.email)
        }

        const createdUser =
            await this.postgresCreateUserRepository.execute(user)

        return createdUser
    }
}
