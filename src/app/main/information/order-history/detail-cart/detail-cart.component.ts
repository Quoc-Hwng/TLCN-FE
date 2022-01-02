
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { CartItem } from 'src/app/models/cart';
import { Carts } from 'src/app/models/cart';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent implements OnInit {
  doing= false;
  carts : Carts;
  itemCart: CartItem;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/cart/edit'
  @Input("id")
  Id!: string;

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,private productService: ProductService) {
      this.carts =new Carts;
     }
  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url,this.Id)
      .then(data =>{
        this.doing=false;
        this.carts =(data as {cart: Carts}).cart;
        this.carts.products.forEach(product =>{
          this.productService.getProById(product.product).subscribe((data:any) =>{
            product.productImg = data.product.productImg1;
          })
        })
        console.log(this.carts);
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title', size: "1000px" });
  }
}
