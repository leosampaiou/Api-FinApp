import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUseParams) {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: updateUseParams,
        })

        return user
    }
}
