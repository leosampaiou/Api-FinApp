import { CreateUserCotroller } from './create-user'

class CreateUserUseCaseStub {
    execute(user) {
        return user
    }
}

test('should return 201 and successfully create a new user', async () => {
    const createUserUseCaseStub = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCaseStub)

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
    expect(result.body).toBe(httpRequest.body)
})

test('should return 400 Bad Request if first_name is missing', async () => {
    const createUserUseCaseStub = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCaseStub)

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
    const createUserUseCaseStub = new CreateUserUseCaseStub()
    const createUserCotroller = new CreateUserCotroller(createUserUseCaseStub)

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
