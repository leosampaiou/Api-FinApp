import { GetUserBalanceController } from './get-user-balance.js'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../../errors/user'

describe('GetUseBalanceController', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.finance.amount()
        }
    }
    const httpRequest = {
        params: { userId: faker.string.uuid() },
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub()
        const sut = new GetUserBalanceController(getUserBalanceUseCase)

        return { sut, getUserBalanceUseCase }
    }

    test('should return 200 and the user balance when the request is successful', async () => {
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
        const { sut, getUserBalanceUseCase } = makeSut()

        jest.spyOn(getUserBalanceUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new UserNotFoundError()
            },
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })
})
