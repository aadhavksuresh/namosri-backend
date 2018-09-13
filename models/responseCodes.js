 const responseCodes = {
    ok: 200,
    created: 201,
    nonAuthorized: 203,
    partialContant: 206,
    unAuthorized: 401,
    notFound: 404,
    internalError: 500,
    invalidRequest: 422,
    userAlreadyExists: 800,
    passwordMismatch: 801,
    noUserExists: 802
 }

module.exports = responseCodes;