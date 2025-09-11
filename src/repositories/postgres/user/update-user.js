import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(id, updateUseParams) {
        const updateFilds = []
        const updateValues = []

        Object.keys(updateUseParams).forEach((key) => {
            updateFilds.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateUseParams[key])
        })

        updateValues.push(id)

        const updateQuery = `
            UPDATE users
            SET ${updateFilds.join(', ')}
            WHERE id = $${updateValues.length}
            RETURNING * `

        const updatedUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updatedUser[0]
    }
}
