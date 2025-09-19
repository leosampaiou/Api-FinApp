import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            const deleteUser = await prisma.user.delete({
                where: { id: userId },
            })
            return deleteUser
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
