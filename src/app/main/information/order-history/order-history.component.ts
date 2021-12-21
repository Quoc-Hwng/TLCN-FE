import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  doing=false;
  totalLength: number;
  page:number = 1;
  limit: any = 5;
  oder:Order;
  carts!: Order[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/cart/detail';
  url1='http://localhost:3000/api/v1/cart/edit';
  constructor(private rest:RestApiService,
    private data: DataService,private toastr: ToastrService,private productService: ProductService) {
      this.oder= new Order;
     }

  ngOnInit() {
    this.btnDisabled=true;
    const id = localStorage.getItem('id')
    if(id){
      this.rest.getOne(this.url,id).then(data=>{
        console.log(data);
        this.carts =( data as {carts: Order[]}).carts;
        this.totalLength = this.carts.length;
        this.btnDisabled=false;
        this.carts.forEach(order =>{
          order.products.forEach(item =>{
            this.productService.getProById(item.product).subscribe((data:any)=>{
              item.productImg = data.product.productImg1;
              item.productName = data.product.productName;
            })
          })
        })
        console.log(this.carts)
      })
    }
    }
    update(id:string){
      this.doing=true;
      this.oder.state ='cancel'
      this.rest.put(this.url1,id,this.oder)
        .then(data =>{
          this.doing=false;
          this.ngOnInit();
        }).catch(error =>{
          this.doing =false;
          this.data.error(error['message'])
        });
        this.toastr.success('Đơn hàng đã hủy!');
    }
}
