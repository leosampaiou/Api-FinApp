import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const updateFilds = []
        const updateValues = []

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFilds.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateTransactionParams[key])
        })

        updateValues.push(transactionId)

        const updateQuery = `
                UPDATE transactions
                SET ${updateFilds.join(', ')}
                WHERE id = $${updateValues.length}
                RETURNING * `

        const updatedTransaction = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updatedTransaction[0]
    }
}
