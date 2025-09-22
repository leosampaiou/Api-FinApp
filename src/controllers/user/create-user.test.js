import { faker } from '@faker-js/faker'
import { EmailAlreadyInUseError } from '../../errors/user.js'

import { CreateUserCotroller } from './create-user'

class CreateUserUseCaseStub {
    execute(user) {
        return user
    }
}

test('should return 201 and successfully create a new user', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

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

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual(httpRequest.body)
})

test('should return 400 Bad Request if first_name is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if last_name is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if email is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if email is not valid', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: 'invalid_email',
            password: faker.internet.password({
                length: 7,
            }),
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if password in missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 when password is shorter than 6 characters', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 4,
            }),
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should call CreateUserUsecase with correct params', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

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
    const executeSpy = jest.spyOn(createUserUseCase, 'execute')

    await createUserCotroller.execute(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
})

test('should return 500 if CreateUserUseCase throws', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

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
    jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
        throw new Error()
    })

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(500)
})

test('should return 400 if CreateUserUseCase throw EmailAlreadyInUseError', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

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
    jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
        throw new EmailAlreadyInUseError()
    })

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})
