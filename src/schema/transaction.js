import z from 'zod'
import validator from 'validator'

export const createTransactionSchema = z.object({
    user_id: z.uuid(),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
    date: z.iso.datetime(),
    amount: z
        .number({
            message: 'Amount must be a number',
        })
        .min(1, {
            message: 'Amount must be greater than 0',
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: '.',
            }),
        ),
})

export const updateTransactionSchema = createTransactionSchema.partial()
