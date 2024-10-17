export default class PropertyCreationRequestDto {
    constructor(
        adress,
        propertyName,
        description,
        numberOfRooms,
        capacity,
        propertyType,
        departement,
        size,
        imageUrls = [],
        contactSlots = [],
        privacyDeclaration = false,
        conciergerieType,
        accommodationType,
        price,
        city,
        numberOfBathrooms,
        numberOfBedrooms
    ) {
        this.adress = adress;
        this.propertyName = propertyName;
        this.description = description;
        this.numberOfRooms = numberOfRooms;
        this.capacity = capacity;
        this.propertyType = propertyType;
        this.departement = departement;
        this.size = size;
        this.imageUrls = imageUrls;
        this.contactSlots = contactSlots;
        this.privacyDeclaration = privacyDeclaration;
        this.conciergerieType = conciergerieType;
        this.accommodationType = accommodationType;
        this.price = price;
        this.city = city;
        this.numberOfBathrooms = numberOfBathrooms;
        this.numberOfBedrooms = numberOfBedrooms;
    }
}
