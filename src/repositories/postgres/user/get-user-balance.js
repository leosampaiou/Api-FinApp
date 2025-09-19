import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const {
            _sum: { amount: totalExpenses },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: { amount: true },
        })

        const {
            _sum: { amount: totalEarnings },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: { amount: true },
        })

        const {
            _sum: { amount: totalInvestment },
        } = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: { amount: true },
        })

        const _totalExpenses = totalExpenses || 0

        const _totalEarnings = totalEarnings || 0

        const _totalInvestment = totalInvestment || 0

        const balance = _totalEarnings - _totalExpenses - _totalInvestment
        return {
            Earnings: _totalEarnings,
            Expenses: _totalExpenses,
            Investment: _totalInvestment,
            Balance: balance,
        }
    }
}
