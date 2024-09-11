export class Address {
  street: String;
  street2: String;
  city: String;
  state: String;
  country: String;
  zipCode: String;

  constructor(street: String,street2: string, city: String, state: string, country: string, zipCode: string) {
    this.street = street;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }
}
