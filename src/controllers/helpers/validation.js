import validator from 'validator'
import { badRequest } from './index.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export function genetateInvalidIdResponse() {
    return badRequest({
        message: 'The provided id is not valid',
    })
}

export function genetateRequairedFieldResponse(field) {
    return badRequest({
        message: `The field ${field} is required`,
    })
}

const checkIfIsString = (value) =>
    typeof value === 'string' || value instanceof String

export const validatedRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], { ignore_whitespace: true })

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }
    return {
        ok: true,
        missingField: undefined,
    }
}
