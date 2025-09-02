import { PostgresHelper } from '../../db/postgres/helper'

export class postgresCreateUserRepository {
    async execute(createUsersParams) {
        const results = await PostgresHelper.query(
            'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            [
                createUsersParams.id,
                createUsersParams.first_name,
                createUsersParams.last_name,
                createUsersParams.email,
                createUsersParams.password,
            ],
        )
        return results[0]
    }
}
