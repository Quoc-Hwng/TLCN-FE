import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Order } from 'src/app/models/order';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  doing=false;
  order: Order;
  Id = '';
  messageError = '';
  url1='http://localhost:3000/api/v1/cart';
  constructor(
    private rest : RestApiService,
    private productService: ProductService,
    private data: DataService,
  ) { }

  ngOnInit() {
    this.rest.getOne(this.url1,this.Id)
    .then((data:any) => {
      this.doing=true;
      this.order = data.cart as Order;
      this.order.products.forEach(item =>{
        this.productService.getProById(item.product).subscribe((data:any)=>{
          item.name = data.product.productName;
          item.size = data.product.size;
          item.image = data.product.productImg1;
          item.price = data.product.price;
          item.totalP = data.product.price * item.quantity;
        })
      })
      console.log(data);
      this.messageError = "";
    }).catch(error =>{
      this.doing =false;
      this.data.error(error['message'])
    });

  }
  ViewBill(Id:any){
    if(Id === '' || this.doing === false)
    {
      this.messageError = 'Không tìm thấy đơn hàng của bạn';
      this.ngOnInit();
    }else{
    this.ngOnInit();
    this.messageError='';
    }
  }
  update(){
    this.doing=true;
    this.order.state = 'Cancel';
    this.rest.put(this.url1 +'/edit',this.Id,this.order)
      .then(data =>{
        this.doing=false;
        this.ngOnInit();
        console.log(data);
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
