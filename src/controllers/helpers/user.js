import { badRequest, notFound } from './http.js'

export function genetateinvalidPasswordResponse() {
    return badRequest({
        message: 'The password must be at least 6 characters long',
    })
}
export function genetateEmailAlredyInUseResponse() {
    return badRequest({
        message: 'The email is not valid',
    })
}
export function genetateSomeFieldIsNotAlowedResponse() {
    return badRequest({
        message: 'Some field is not alowed',
    })
}

export const genetateUserNotFoundResponse = () => {
    return notFound({
        message: 'User not found',
    })
}
