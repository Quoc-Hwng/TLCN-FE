import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : CartItem[] =[];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");


  constructor() {
   // this.cartItemList = JSON.parse(localStorage.getItem('myData')!);
   var temp = JSON.parse(localStorage.getItem('myData')!);
   if(temp === null)
   {
    const jsonData = JSON.stringify(this.cartItemList)
    localStorage.setItem('myData', jsonData)
   }else{
    this.cartItemList = JSON.parse(localStorage.getItem('myData')!);
   }
  }
  getProducts(){
    const dataCart = JSON.parse(localStorage.getItem('myData')!);
    this.productList.next(dataCart);
    return this.productList.asObservable();
  }

  setProduct(product : Product){
    this.cartItemList.push(new CartItem(product,1));
    this.productList.next(product);
  }
  addtoCart(product : Product, quantity: number){
    if(this.cartItemList.filter(item => item.product.id === product.id).length > 0)
    {
      this.cartItemList.find(item => item.product.id === product.id)!.quantity=quantity;
      this.cartItemList.find(item => item.product.id === product.id)!.total=quantity * product.price;
    }
    else{
    this.cartItemList.push(new CartItem(product,quantity));
    this.productList.next(this.cartItemList);
    }
    this.getTotalPrice();
    console.log(this.cartItemList);
    const jsonData = JSON.stringify(this.cartItemList)
    localStorage.setItem('myData', jsonData)
  }
  addfromDetail(product : Product, quantity: number){
    if(this.cartItemList.filter(item => item.product.id === product.id).length > 0)
    {
      this.cartItemList.find(item => item.product.id === product.id)!.quantity+=quantity;
      this.cartItemList.find(item => item.product.id === product.id)!.total+=quantity * product.price;
    }
    else{
    this.cartItemList.push(new CartItem(product,quantity));
    this.productList.next(this.cartItemList);
    }
    this.getTotalPrice();
    console.log(this.cartItemList);
    const jsonData = JSON.stringify(this.cartItemList)
    localStorage.setItem('myData', jsonData)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
    const jsonData = JSON.stringify(this.cartItemList);
    localStorage.setItem('myData', jsonData)
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    localStorage.removeItem('myData');
  }

}
