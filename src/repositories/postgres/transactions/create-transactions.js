import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransactionsRepository {
    async execute(createTransactionParams) {
        const createTransaction = await prisma.transaction.create({
            data: {
                name: createTransactionParams.name,
                date: createTransactionParams.date,
                amount: createTransactionParams.amount,
                type: createTransactionParams.type,
                user: {
                    connect: { id: createTransactionParams.user_id },
                },
            },
        })
        return createTransaction
    }
}
