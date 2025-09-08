import { PostgresHelper } from '../../db/postgres/helper'

export class DeleteUserRepository {
    async execute(UserId) {
        const deletedUser = await PostgresHelper.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [UserId],
        )
        return deletedUser[0]
    }
}
