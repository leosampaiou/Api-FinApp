import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const CreateTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(CreateTransactionUseCase)

        return { sut, CreateTransactionUseCase }
    }

    const type = ['EARNING', 'EXPENSE', 'INVESTMENT']

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.finance.transactionDescription(),
            type: faker.helpers.arrayElement(type),
            amount: +faker.finance.amount({ min: 1, dec: 2 }),
            date: faker.date.anytime().toISOString(),
        },
    }

    test('should return 201 and successfully create a new transaction', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })
})
