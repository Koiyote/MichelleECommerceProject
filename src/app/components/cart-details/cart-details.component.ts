import {Component, OnInit} from '@angular/core';
import {CartItem} from "../../common/cart";
import {CartService} from "../../services/cart.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartService: CartService, library: FaIconLibrary) {
    library.addIcons(faPlus, faMinus)
  }

  ngOnInit(): void {
    this.listCartDetails()
  }


  private listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(tempCartItem: CartItem) {
    this.cartService.remove(tempCartItem);
  }
}
