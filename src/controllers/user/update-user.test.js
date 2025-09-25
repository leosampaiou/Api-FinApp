import { faker } from '@faker-js/faker'
import { UpdateUserController } from './update-user'

describe('UpdadeUserController', () => {
    class UpdadeUserUseCaseStub {
        async execute(user) {
            return user
        }
    }
    const httpRequest = {
        params: { userId: faker.string.uuid() },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdadeUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)

        return { sut, updateUserUseCase }
    }

    test('should return 200 and successfully update a user', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    test('should return 400 Bad Request if request contains a field that is not allowed', async () => {
        const { sut } = makeSut()

        const httpRequestWithAllowedFild = {
            params: httpRequest.params,
            body: { ...httpRequest.body, allowedFild: 'allowedFild' },
        }

        const result = await sut.execute(httpRequestWithAllowedFild)

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 Bad Request if invalid email is provided', async () => {
        const { sut } = makeSut()

        const httpRequestWithInvalidEmail = {
            params: httpRequest.params,
            body: { ...httpRequest.body, email: 'invalid_email' },
        }

        const result = await sut.execute(httpRequestWithInvalidEmail)

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 Bad Request if invalid password is provided', async () => {
        const { sut } = makeSut()

        const httpRequestWithInvalidPassword = {
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({ length: 5 }),
            },
        }

        const result = await sut.execute(httpRequestWithInvalidPassword)

        expect(result.statusCode).toBe(400)
    })
})
