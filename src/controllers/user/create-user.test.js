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
            first_name: 'leo',
            last_name: 'sampaio',
            email: 'leo@gmail.com',
            password: '123456789',
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
            last_name: 'sampaio',
            email: 'leo@gmail.com',
            password: '123456789',
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if last_name is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: 'leo',
            email: 'leo@gmail.com',
            password: '123456789',
        },
    }

    const result = await createUserCotroller.execute(httpRequest)

    expect(result.statusCode).toBe(400)
})

test('should return 400 bad request if email is missing', async () => {
    const createUserUseCase = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCase)

    const httpRequest = {
        body: {
            first_name: 'leo',
            last_name: 'sampaio',
            password: '123456789',
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
            first_name: 'leo',
            last_name: 'sampaio',
            email: 'leo',
            password: '123456789',
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
            first_name: 'leo',
            last_name: 'sampaio',
            email: 'leo@gmail.com',
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
            first_name: 'leo',
            last_name: 'sampaio',
            email: 'leo@gmail.com',
            password: '123',
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
            first_name: 'leo',
            last_name: 'sampaio',
            email: 'leo@gmail.com',
            password: '123456789',
        },
    }
    const executeSpy = jest.spyOn(createUserUseCase, 'execute')

    await createUserCotroller.execute(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
})
