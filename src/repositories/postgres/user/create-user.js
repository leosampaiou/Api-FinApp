import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
    async execute(createUsersParams) {
        await PostgresHelper.query(
            'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUsersParams.id,
                createUsersParams.first_name,
                createUsersParams.last_name,
                createUsersParams.email,
                createUsersParams.password,
            ],
        )
        const createdUser = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
            [createUsersParams.id],
        )

        return createdUser[0]
    }
}
