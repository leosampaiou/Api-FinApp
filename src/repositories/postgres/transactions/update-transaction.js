import { prisma } from '../../../../prisma/prisma.js'
export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction = prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        })
        return updatedTransaction
    }
}
