import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction'
import { UserNotFoundError } from '../../errors/user.js'

describe('CreateTransactionController', () => {
    class CreateTransactionUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)

        return { sut, createTransactionUseCase }
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

    test('should return 404 not found if user id does not exist', async () => {
        const { sut, createTransactionUseCase } = makeSut()

        jest.spyOn(createTransactionUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new UserNotFoundError()
            },
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })

    test('should return 400 if transaction type is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            body: { ...httpRequest.body, type: 'invalid_type' },
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 if date is not ISO date time format', async () => {
        const { sut } = makeSut()
        const result = await sut.execute({
            body: { ...httpRequest.body, date: faker.date.anytime() },
        })

        expect(result.statusCode).toBe(400)
    })
    test('should return 400 if amount is not a number', async () => {
        const { sut } = makeSut()
        const result = await sut.execute({
            body: { ...httpRequest.body, amount: faker.finance.amount() },
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 500 if createTransactionUseCase throws', async () => {
        const { sut, createTransactionUseCase } = makeSut()

        jest.spyOn(createTransactionUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })
})
