import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user'

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
        async execute(userId) {
            return { id: userId }
        }
    }

    const httpRequest = {
        params: { userId: faker.string.uuid() },
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserController(deleteUserUseCase)

        return { sut, deleteUserUseCase }
    }

    test('should return 200 and successfully delete the user', async () => {
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
})
