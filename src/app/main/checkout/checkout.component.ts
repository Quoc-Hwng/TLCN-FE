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
import { Discount } from 'src/app/models/discount';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items : any = [];
  public itemss : any = [];
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
  discount: Discount[];
  iDVC: string = '';
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/cart/add'
  url1 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/discount/voucher'
  url2 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product';
  url3 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/discount/edit'
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
      this.iDVC = '';
    })
    const exchangeUrl =
            'https://openexchangerates.org/api/latest.json?app_id=1660c56ea4cc47039bcd5513b6c43f1a';
            this.rest.getF(exchangeUrl).then((data:any) => {
               this.exchangeD = data.rates.VND;
            });
  }
  Voucher(iDVoucher :any){
    if(iDVoucher === "")
    {this.ngOnInit()}
    else{
    this.itemss = this.items;
    this.rest.getOne(this.url1,iDVoucher).then((data:any) => {
      this.discount = data.discount as Discount[];
      // if(this.discount[0].endDay.getTime() < Date.now.toString())
      console.log(this.discount[0].endDay)
      if(new Date().getTime() - new Date(this.discount[0].endDay).getTime() > 0 || this.discount[0].amount <= 0){
        this.toastr.error('Voucher not exist');
        this.ngOnInit();
        return;
      }
      this.itemss[0].product.priceSale = this.items[0].product.priceSale - this.discount[0].discount;
      this.itemss[0].total = this.items[0].total - this.discount[0].discount;
      this.ngOnInit();
      this.grandTotal = 0;
      this.itemss.map((a:any)=>{
        console.log(a);
        this.grandTotal += a.total;
      })
      this.Total = this.grandTotal+this.core;
      this.iDVC = iDVoucher;
      this.toastr.success('Add voucher success');
      console.log(this.items);
    }).catch((err:any) => {
      this.toastr.error('Voucher not exist')
    })}
  }
  checkOut(){
    if(this.iDVC !== ""){
      this.items = this.itemss;
    }
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
        this.discount[0].amount -=1;
        this.rest.put(this.url3,this.discount[0].id,this.discount[0]).then(data =>{
        })
        this.ngOnInit();
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });
      this.cartService.removeAllCart();
      this.toastr.success('Success', 'Thanks for choosing our products!!');
      this.router.navigate(['/homes'])
  }
  payPal(){
    if(this.iDVC !== ""){
      this.items = this.itemss;
    }
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
    }
    private initConfig(): void {
      this.orderPayPay.total = 0;
      this.orderPayPay.products = this.items.map((item:CartItem) =>{
        this.orderPayPay.total += Math.round(item.product.priceSale/this.exchangeD)*item.quantity;

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
    if(this.iDVC !== ""){
      this.items = this.itemss;
    }
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
        this.discount[0].amount -=1;
        this.rest.put(this.url3,this.discount[0].id,this.discount[0]).then(data =>{
        })
        this.ngOnInit();
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });
      this.cartService.removeAllCart();
      this.toastr.success('Success', 'Thanks for choosing our products!!');
      this.router.navigate(['/homes'])
  }
}
