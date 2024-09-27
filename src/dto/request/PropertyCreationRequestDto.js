export default class PropertyCreationRequestDto {
    constructor(
        adress,
        description,
        numberOfRooms,
        capacity,
        propertyType,
        country,
        size,
        imageUrls = [],
        contactSlots = [],
        privacyDeclaration = false,
        conciergerieType,
        accommodationType,
        price,
        city
    ) {
        this.adress = adress;
        this.description = description;
        this.numberOfRooms = numberOfRooms;
        this.capacity = capacity;
        this.propertyType = propertyType;
        this.country = country;
        this.size = size;
        this.imageUrls = imageUrls;
        this.contactSlots = contactSlots;
        this.privacyDeclaration = privacyDeclaration;
        this.conciergerieType = conciergerieType;
        this.accommodationType = accommodationType;
        this.price = price;
        this.city = city;
    }
}
