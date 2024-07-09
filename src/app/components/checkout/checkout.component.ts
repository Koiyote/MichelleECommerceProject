import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MiscService } from '../../services/misc.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { NoWhitespaceValidator } from '../../validators/no-whitespace-validator';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { Address } from '../../common/address';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
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

  constructor(
    private formBuilder: FormBuilder,
    private miscService: MiscService,
    private cartService: CartService,
    private router: Router,
    private checkoutService: CheckoutService,
    private cdr: ChangeDetectorRef
  ) {
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
    );

    this.miscService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    this.miscService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // Orders
    let order = new Order(this.totalQuantity, this.totalPrice);

    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // Get values from the form
    const customer = this.checkoutFormGroup.controls['customer'].value;
    const shippingAddressFormValue = this.checkoutFormGroup.controls['shippingAddress'].value;
    const billingAddressFormValue = this.checkoutFormGroup.controls['billingAddress'].value;

    // Create Address objects for shipping and billing
    let shippingAddress = new Address(
      shippingAddressFormValue.street,
      shippingAddressFormValue.city,
      shippingAddressFormValue.state.name,
      shippingAddressFormValue.country.name,
      shippingAddressFormValue.zipCode
    );

    let billingAddress = new Address(
      billingAddressFormValue.street,
      billingAddressFormValue.city,
      billingAddressFormValue.state.name,
      billingAddressFormValue.country.name,
      billingAddressFormValue.zipCode
    );

    // Create Purchase object
    let purchase = new Purchase(
      customer,
      shippingAddress,
      billingAddress,
      order,
      orderItems
    );

    // Checkout Service
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
        this.resetCart();
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup.get('customer.email')!; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')!; }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country')!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')!; }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType')!; }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')!; }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')!; }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')!; }

  copyShippingAddressToBillingAddress(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Copy all the fields from shippingAddress to billingAddress using patchValue
      this.checkoutFormGroup.controls['billingAddress'].patchValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      // Manually set the state dropdown value
      const shippingState = this.checkoutFormGroup.get('shippingAddress.state')?.value;
      this.checkoutFormGroup.get('billingAddress.state')?.setValue(shippingState);

      // Log the state values for debugging
      console.log('Copied State:', shippingState);
      console.log('Updated Billing State:', this.checkoutFormGroup.get('billingAddress.state')?.value);

      // Bug fix for states: Manually update the state dropdown values
      this.billingAddressStates = [...this.shippingAddressStates];

      // Manually trigger change detection
      this.cdr.detectChanges();
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

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.miscService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    const countryName = formGroup?.value.country.name;

    this.miscService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          console.log("Retrieved states: " + JSON.stringify(data));
          this.shippingAddressStates = data;
        }
        if(formGroupName === 'billingAddress'){
          this.billingAddressStates = data;
        }
      }
    );
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }
}
