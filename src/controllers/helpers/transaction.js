import validator from 'validator'
import { badRequest } from './index.js'

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
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
        menssage:
            'Amount must be a positive number with up to two decimal places',
    })
}

export const generateInvalidTypeResponse = () => {
    return badRequest({
        menssage:
            'Type must be one of the following: EARNING, EXPENSE, INVESTMENT',
    })
}
