import { faker } from '@faker-js/faker'
import { EmailAlreadyInUseError } from '../../errors/user.js'

import { CreateUserCotroller } from './create-user'

describe('Create user controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const sut = new CreateUserCotroller(createUserUseCase)

        return { sut, createUserUseCase }
    }

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    test('should return 201 and successfully create a new user', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(201)
        expect(result.body).toEqual(httpRequest.body)
    })

    test('should return 400 Bad Request if first_name is missing', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            first_name: undefined,
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 bad request if last_name is missing', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            last_name: undefined,
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 bad request if email is missing', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            email: undefined,
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 bad request if email is not valid', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            email: 'invalid email',
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 bad request if password in missing', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            password: undefined,
        })

        expect(result.statusCode).toBe(400)
    })

    test('should return 400 when password is shorter than 6 characters', async () => {
        const { sut } = makeSut()

        const result = await sut.execute({
            ...httpRequest.body,
            password: { length: 5 },
        })

        expect(result.statusCode).toBe(400)
    })

    test('should call CreateUserUsecase with correct params', async () => {
        const { sut, createUserUseCase } = makeSut()

        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        await sut.execute(httpRequest)

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('should return 500 if CreateUserUseCase throws', async () => {
        const { sut, createUserUseCase } = makeSut()

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(500)
    })

    test('should return 400 if CreateUserUseCase throw EmailAlreadyInUseError', async () => {
        const { sut, createUserUseCase } = makeSut()

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError()
        })

        const result = await sut.execute(httpRequest)

        expect(result.statusCode).toBe(400)
    })
})
