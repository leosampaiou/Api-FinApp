import { DeleteTransactionController } from './delete-transaction.js'
import { faker } from '@faker-js/faker'

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub()
        const sut = new DeleteTransactionController(deleteTransactionUseCase)

        return { sut, deleteTransactionUseCase }
    }

    const httpRequest = {
        params: { id: faker.string.uuid() },
    }

    test('should return 200 and successfully delete a transaction', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(200)
    })

    test('should return 400 if transaction id is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({ params: { id: 'invalid_id' } })

        expect(result.statusCode).toBe(400)
    })
    test('should return 404 if transaction is not found', async () => {
        const { sut, deleteTransactionUseCase } = makeSut()
        jest.spyOn(deleteTransactionUseCase, 'execute').mockReturnValueOnce(
            null,
        )

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(404)
    })
})
