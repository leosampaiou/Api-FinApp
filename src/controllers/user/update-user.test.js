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
            params: { userId: faker.string.uuid() },
            body: { ...httpRequest.body, allowedFild: 'allowedFild' },
        }

        const result = await sut.execute(httpRequestWithAllowedFild)

        expect(result.statusCode).toBe(400)
    })
})
