export class Address {
  street: String;
  city: String;
  state: String;
  country: String;
  zipCode: String;

  constructor(street: String, city: String, state: string, country: string, zipCode: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }
}
