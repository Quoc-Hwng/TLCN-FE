import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/common/cart';
import { Carts } from 'src/app/models/cart';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public items :  CartItem[] = [];
  public grandTotal !: number;
  addCart = false;
  constructor(private cartService: CartService,
    private rest: RestApiService,
    private toastr: ToastrService) {
    }
  removeItem(item: CartItem){
    this.cartService.removeCartItem(item);
  }
  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
      this.grandTotal = this.cartService.getTotalPrice();
      console.log(this.items);
    })
  }
  addQuantity(item: CartItem){
    if(item.quantity === null)
    {
      return;
    }
    item.quantity+=1;
   this.cartService.addtoCart(item.product,item.quantity);

   this.ngOnInit();
  }
  subQuantity(item: CartItem){
    if(item.quantity === 1 || item.quantity === null || item.quantity <= 0)
    {
      return;
    }
    else
      item.quantity-=1;
      this.cartService.addtoCart(item.product,item.quantity);
      this.ngOnInit();
  }
  changeQuantity(item: CartItem){
    console.log(item);
    if(item.quantity === null)
    {
      item.quantity = 1;
      return;
    }
    this.cartService.addtoCart(item.product,item.quantity);
    console.log()
    this.ngOnInit();
  }
  clearCart(){
    this.cartService.removeAllCart();
  }

}
