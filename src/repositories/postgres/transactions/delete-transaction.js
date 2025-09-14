import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresDeleteTransactionRepository {
    async execute(id) {
        const deleteTransaction = await PostgresHelper.query(
            'DELETE FROM transactions WHERE id = $1 RETURNING *',
            [id],
        )
        return deleteTransaction[0]
    }
}
