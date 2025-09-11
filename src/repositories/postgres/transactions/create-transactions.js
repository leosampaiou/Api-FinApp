import { PostgresHelper } from '../../helpers/postgres-helper.js'

export class PostgresCreateTransactionsRepository {
    async execute(createTransactionParams) {
        const createTransaction = await PostgresHelper.query(
            'INSERT INTO transaction (id, user_id, name, transaction_date, amount, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.tansaction_date,
                createTransactionParams.amount,
                createTransactionParams.type,
            ],
        )
        return createTransaction[0]
    }
}
