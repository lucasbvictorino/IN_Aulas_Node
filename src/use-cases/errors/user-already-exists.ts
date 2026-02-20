export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Já existe um usuário com este username ou email no sistema!')
    }
}