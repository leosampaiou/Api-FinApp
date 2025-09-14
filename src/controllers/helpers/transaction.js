import validator from 'validator'
import { badRequest } from './index.js'

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') return false
    return validator.isCurrency(amount.toFixed(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const generateInvalidAmountResponse = () => {
    return badRequest({
        menssage: 'Amount must be a valide currency ',
    })
}

export const generateInvalidTypeResponse = () => {
    return badRequest({
        menssage:
            'Type must be one of the following: EARNING, EXPENSE, INVESTMENT',
    })
}

export const generateTransactionNotFoundResponse = () => {
    return {
        statusCode: 404,
        body: { menssage: 'Transaction not found' },
    }
}
