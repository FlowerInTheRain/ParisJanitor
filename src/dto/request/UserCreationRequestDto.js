export default class UserCreationRequestDto {
    constructor(email, password, lastName, firstName, birthday, phoneNumber, region, adresse1, adresse2) {
        this.email = email;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.region = region;
        this.adresse1 = adresse1;
        this.adresse2 = adresse2;
    }
}
