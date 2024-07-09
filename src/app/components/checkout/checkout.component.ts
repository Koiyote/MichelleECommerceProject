import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MiscService} from "../../services/misc.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {NoWhitespaceValidator} from "../../validators/no-whitespace-validator";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  countries: Country[] = [];
  constructor(private formBuilder: FormBuilder,
              private miscService: MiscService,
              private cartService: CartService){
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), NoWhitespaceValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    const startMonth: number = new Date().getMonth() + 1;

    this.miscService.getCreditCardMonths(startMonth).subscribe(
      data => {
          this.creditCardMonths = data;
      }
    )

    this.miscService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    this.miscService.getCountries().subscribe(
      data => {
        this.countries = data;

      }
    );


  }
  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    } else{
      console.log('Form is invalid');
    }
  }

  get firstName(){return this.checkoutFormGroup.get('customer.firstName')!;}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName')!;}
  get email(){return this.checkoutFormGroup.get('customer.email')!;}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street')!;}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city')!;}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state')!;}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode')!;}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country')!;}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street')!;}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city')!;}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state')!;}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode')!;}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country')!;}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')!;}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard')!;}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')!;}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')!;}

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      // Bug fix for states
      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // Bug fix for states
      this.billingAddressStates = [];
    }
  }
  handleMonthsAndYears() {
      const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
      const currentYear: number = new Date().getFullYear();

      const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

      let startMonth: number;

      if(currentYear === selectedYear){
        startMonth = new Date().getMonth() + 1;
      } else{
        startMonth = 1;
      }

      this.miscService.getCreditCardMonths(startMonth).subscribe(
        data => {
          this.creditCardMonths = data;
        }
      )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    const countryName = formGroup?.value.country.name;

    this.miscService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          console.log("Retrieved countries:" + JSON.stringify(data))
          this.shippingAddressStates = data;
        } else{
          this.billingAddressStates = data;
        }

      }
    )
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => {
        this.totalPrice = totalPrice;
      }
    );
  }

}
