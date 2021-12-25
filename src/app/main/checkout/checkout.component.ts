import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CartItem } from 'src/app/common/cart';
import { Order } from 'src/app/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  getProduct: Product;
  convertedTotalPrice: any;
  orderPayPay: Order;
  public payPalConfig?: IPayPalConfig;
  exchangeD: any;
  url = 'http://localhost:3000/api/v1/cart/add'
  // url1 = 'http://localhost:3000/api/v1/cart/addPayPal'
  url1 = 'http://localhost:3000/api/v1/cart/addPayPal'
  url2 = 'http://localhost:3000/api/v1/admin/product';
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
      console.log(this.grandTotal);
    })
    const exchangeUrl =
            'https://openexchangerates.org/api/latest.json?app_id=1660c56ea4cc47039bcd5513b6c43f1a';
            this.rest.getF(exchangeUrl).then((data:any) => {
               this.exchangeD = data.rates.VND;
            });
  }
  checkOut(){
    const id = localStorage.getItem('id')
    if(id){
      this.idUser=id;
    }
    this.checkout=true;
    this.order.userId = this.idUser
    this.order.stateOrder = 'COD';
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
        this.order.products.forEach(product =>{
          console.log(product.quantity);
          this.rest.getOne(this.url2 +'/edit',product.product).then((data:any) =>{
            console.log(data);
            this.getProduct = data.product as Product;
            this.getProduct.amount = (this.getProduct.amount - product.quantity);
            console.log(this.getProduct.amount);
            this.rest.put(this.url2 +'/edit' ,product.product,this.getProduct).then((data:any) =>{
              console.log(data);
            })
          })
        })
        this.ngOnInit();
        console.log(data);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });
      this.cartService.removeAllCart();
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
    console.log(this.grandTotal);
    this.orderPayPay = this.order;
    this.initConfig();
    //     this.rest.post(this.url1,this.order).then((res:any) => {
    //       console.log(res);
    //     	window.location = res.forwardLink;

    //     //	setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("faild", err);
    //       this.toastr.error("faild");
    // //			setLoading();
    //     });
    }
    private initConfig(): void {
      this.orderPayPay.total = 0;
      this.orderPayPay.products = this.items.map((item:CartItem) =>{
        this.orderPayPay.total += Math.round(item.total/this.exchangeD);
        console.log(item.total);
        return {
          unit_amount:{
            currency_code: 'USD',
            value: Math.round(item.product.priceSale/this.exchangeD).toString(),
          },
          quantity: item.quantity,
          name: item.product.productName
        }
      });
      console.log(this.orderPayPay.total);
      console.log(this.orderPayPay.products);
      this.payPalConfig = {
          currency: 'USD',
          clientId: 'AUwNSEfoyT3YmqhkANrcL9D_nJSh1I5ffjgTuG2mXBKdXOmSZcEFipOOJ9kBiC2Kwr7eU_TkiAyyzvYm',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'USD',
                      value: this.orderPayPay.total.toString(),
                      breakdown: {
                          item_total: {
                              currency_code: 'USD',
                              value: this.orderPayPay.total.toString(),
                          }
                      }
                  },
                  items: this.orderPayPay.products
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then((details:any) => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {

              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //  this.showSuccess = true;
             this.checkOutPayPal();
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
          //    this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
          //    this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
         //     this.resetStatus();
          }
      };
  }
  checkOutPayPal(){
    const id = localStorage.getItem('id')
    if(id){
      this.idUser=id;
    }
    this.checkout=true;
    this.order.userId = this.idUser
    this.order.stateOrder = 'PayPal'
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
        this.order.products.forEach(product =>{
          console.log(product.quantity);
          this.rest.getOne(this.url2 +'/edit',product.product).then((data:any) =>{
            console.log(data);
            this.getProduct = data.product as Product;
            this.getProduct.amount = (this.getProduct.amount - product.quantity);
            console.log(this.getProduct.amount);
            this.rest.put(this.url2 +'/edit' ,product.product,this.getProduct).then((data:any) =>{
              console.log(data);
            })
          })
        })
        this.ngOnInit();
        console.log(data);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });
      this.cartService.removeAllCart();
      this.toastr.success('Success', 'cảm ơn quý khách đã mua hàng của Shop!!');
      this.router.navigate(['/homes'])
  }
}
