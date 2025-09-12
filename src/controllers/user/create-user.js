import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    badRequest,
    serverError,
    created,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
    genetateinvalidPasswordResponse,
    genetateEmailAlredyInUseResponse,
    validatedRequiredFields,
    genetateRequairedFieldResponse,
} from '../helpers/index.js'

export class CreateUserCotroller {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const requiredFieldsValidation = validatedRequiredFields(
                params,
                requireFields,
            )

            if (!requiredFieldsValidation.ok) {
                return genetateRequairedFieldResponse(
                    requiredFieldsValidation.missingField,
                )
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return genetateinvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return genetateEmailAlredyInUseResponse()
            }

            const createdUser = await this.createUserUseCase.execute(params)

            return created({
                menssage: 'User created successfully',
                user: createdUser,
            })
        } catch (error) {
            console.error(error)
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ menssage: error.message })
            }
            return serverError()
        }
    }
}
