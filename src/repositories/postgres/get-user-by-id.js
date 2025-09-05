import { PostgresHelper } from '../../helpers/postgres/postgres-helper.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const user = await PostgresHelper.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [userId],
        )
        return user[0]
    }
}
