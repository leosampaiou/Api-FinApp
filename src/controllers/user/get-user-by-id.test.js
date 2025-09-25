import { faker } from '@faker-js/faker'
import { GetUserByIdController } from './get-user-by-id'
import { UserNotFoundError } from '../../errors/user'
describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute(user) {
            return user
        }
    }
    const httpRequest = {
        params: { userId: faker.string.uuid() },
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetUserByIdController(getUserByIdUseCase)

        return { sut, getUserByIdUseCase }
    }

    test('should return 200 and successfully get the user', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    test('should return 400 Bad Request if the user ID is invalid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            params: {
                userId: 'invalid_Id',
            },
        })
        expect(result.statusCode).toBe(400)
    })
    test('should return 404 not found if user id does not exist', async () => {
        const { sut, getUserByIdUseCase } = makeSut()

        jest.spyOn(getUserByIdUseCase, 'execute').mockImplementationOnce(() => {
            throw new UserNotFoundError()
        })

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })
    test('should return 500 if getUserByIdUseCase throws', async () => {
        const { sut, getUserByIdUseCase } = makeSut()

        jest.spyOn(getUserByIdUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})
