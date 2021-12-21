import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/common/cart';
import { Order } from 'src/app/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items : any = [];
  public grandTotal !: number;
  public Total !: number;
  order: Order;
  idUser='';
  core=30000;
  checkout = false;
  url = 'http://localhost:3000/api/v1/cart/add'
  url1 = 'http://localhost:3000/api/v1/cart/addPayPal'

  constructor(private cartService: CartService,
    private data: DataService,
    private rest: RestApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
      this.order = new Order;
    }

    public infocheckout = this.fb.group({
      "displayName":["",[Validators.required,Validators.minLength(2)]],
      "email":["",[Validators.required]],
      "phone":["",[Validators.required,Validators.min(0)]],
      "address":["",[Validators.required]],
      "country":["",[Validators.required]],
      "city":["",[Validators.required]],
     })

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.Total = this.cartService.getTotalPrice()+this.core;
      console.log(this.items);
    })
  }
  checkOut(){
    const id = localStorage.getItem('id')
    if(id){
      this.idUser=id;
    }
    this.checkout=true;
    this.order.userId = this.idUser
    this.order.products = this.items.map((item:CartItem) =>{
      return {
        product: item.product.id,
        quantity: item.quantity,
        productCode: item.product.productCode,
        productName: item.product.productName,
        colour: item.product.colour,
        size: item.product.size,
        price: item.product.price,
        Total:item.total

      }
    });
    this.order.total = this.grandTotal;
    console.log(this.order);
    this.rest.post(this.url,this.order)
      .then(data =>{
        this.checkout=false;
        this.data.success('Success');
        this.ngOnInit();
        console.log(data);
        this.order.stateOrder = 'COD';
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });
      localStorage.clear();
      this.toastr.success('Success', 'cảm ơn quý khách đã mua hàng của Shop!!');
      this.router.navigate(['/homes'])
  }
  payPal(){
    //	setLoading(true);
    const id = localStorage.getItem('id')
    if(id){
      this.idUser=id;
    }
    this.checkout=true;
    this.order.userId = this.idUser
    this.order.products = this.items.map((item:CartItem) =>{
      return {
        product: item.product.id,
        quantity: item.quantity,
        productCode: item.product.productCode,
        productName: item.product.productName,
        colour: item.product.colour,
        size: item.product.size,
        price: item.product.price,
        Total:item.total

      }
    });
    this.order.total = this.grandTotal;
        this.rest.post(this.url1,this.order).then((res:any) => {
          console.log(res);
        	window.location = res.forwardLink;

        //	setLoading(false);
        })
        .catch((err) => {
          console.log("faild", err);
          this.toastr.error("faild");
    //			setLoading();
        });
    }
}
