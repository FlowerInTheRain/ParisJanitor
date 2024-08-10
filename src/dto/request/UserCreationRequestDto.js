export default class UserCreationRequestDto {
    constructor(pseudo, email, password) {
        this.pseudo = pseudo
        this.email = email
        this.password = password
    }
}