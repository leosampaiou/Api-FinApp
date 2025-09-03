export function badRequest(body) {
    return {
        statusCode: 400,
        body,
    }
}

export function created(body) {
    return {
        statusCode: 201,
        body,
    }
}

export function serverError() {
    return {
        statusCode: 500,
        body: {
            error: 'Internal server error',
        },
    }
}
