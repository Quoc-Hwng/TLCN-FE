import { Component, OnInit , TemplateRef} from '@angular/core';
import { CartItem } from 'src/app/common/cart';
import { CartService } from 'src/app/service/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public items :  CartItem[] = [];
  public grandTotal !: number;
  addCart = false;
  lengthCart: number = 0;
  confirmMessage = ''
  deleteProduct: any;
  constructor(private cartService: CartService,
    private modalService: NgbModal,) {
    }
  removeItem(item: CartItem){
    this.cartService.removeCartItem(item);
    this.modalService.dismissAll();
  }
  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
      if(this.items !== null){
      this.lengthCart = this.items.length;}
      if(this.items === null)
      {
        this.lengthCart = 0;
      }
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
    }else if(item.quantity === 0){
      this.removeItem(item);
    }
    this.cartService.addtoCart(item.product,item.quantity);
    console.log()
    this.ngOnInit();
  }
  clearCart(){
    this.cartService.removeAllCart();
  }
  confirmDeleteProduct(content:  TemplateRef<any>,item:any){
    this.modalService.open(content,{ariaDescribedBy: 'modal-basic-title'});
    this.deleteProduct = item;
    this.confirmMessage = `Remove product from carts` ;
  }

}
