import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { CartService } from 'src/app/service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Review } from 'src/app/models/review';


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
  review: any;
  page: number = 1;
  totalLength: number;
  IdUser: string = '';
  comment: Review;
  rate: number = 5;
  UserReview: string = '';
  loading: boolean = true;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/user/product'
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/review'
  url2='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product'

  addtocart(item: Product, quantity: number){
    if(quantity === null){
      quantity = 1;
    }else{quantity = this.quantity}
    console.log(this.quantity);
    console.log(quantity);
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
      this.comment = new Review;
    }
    Pro: any = [];
    Load(quantitys: number) {
      if (quantitys > 0) {
        this.quantity = quantitys;
        this.quantitys = quantitys;
        this.ngOnInit()
      }
    }
  ngOnInit(){
    this.productService.getProById(this.id).subscribe((data:any) =>{
      this.Prod = data.product as Product;
      this.loading = false;
      console.log(this.Prod);
    });
    this.rest.getOne(this.url1,this.id).then((data:any) =>{
      this.review = data.data as Review[];
      this.totalLength = this.review!.length;
      this.review.forEach((item:any)=>{
        this.productService.getUserById(item.user.id).subscribe((user:any) =>{
          item.user.displayName = user.user.displayName;
        })
      })
      console.log(this.review);
  })
  const id = localStorage.getItem('id')
    if(id){
      this.IdUser = id;
    }
 }
 createReview(){
  this.comment!.rating = this.rate;
   this.rest.post(this.url2 + '/' + this.id +'/reviews/' + this.IdUser,this.comment).then(data=>{
     console.log(data);
   })
 }
}
