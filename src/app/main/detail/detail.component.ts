import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css','./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product!: Product[];
  Prod: Product;
  products!: Product[];
  btnDisabled= false;
  key='';
  id: any;
  quantity=1;
  quantitys=1;
  url='http://localhost:3000/api/v1/user/product'

  addtocart(item: Product, quantity: number){
    if(quantity === null){
      quantity = 1;
    }
    this.cartService.addfromDetail(item,quantity);
    this.toastr.success('Success', 'Your product has been added to the cart!');
  }

  public totalItems: number = 0;
  constructor(
    private rest:RestApiService,
    private data: DataService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService) {
      this.id = route.snapshot.params['id'];
    }
    search(keys: string){
      if (keys!==''){
        this.key=keys;
        this.ngOnInit();
    }
    }
    Pro: any = [];
    Load(quantitys: number) {
      console.log(quantitys)
      if (quantitys > 0) {
        this.quantity = quantitys;
        this.quantitys = quantitys;
        this.ngOnInit()
      }
    }
  ngOnInit(){
    this.productService.getProById(this.id).subscribe((data:any) =>{
      this.Prod = data.product as Product;
      console.log(this.Prod);
    });
    this.btnDisabled=true;
    if(this.key==''){
      this.rest.get(this.url).then(data=>{
        this.product =( data as {product: Product[]}).product;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }else{
      // this.rest.search(this.url,this.key).then(data=>{
      //   this.product =( data as {product: Product[]}).product;
      //   this.btnDisabled=false;
      // })
      // .catch(error=>{
      //   this.data.error(error['message']);
      // })
    }
  }

}
