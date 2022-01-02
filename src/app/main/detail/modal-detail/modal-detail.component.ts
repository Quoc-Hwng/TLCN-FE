import { Component, OnInit, Input,TemplateRef} from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.css']
})
export class ModalDetailComponent implements OnInit {

  product!: Product[];
  Prod: Product;
  products!: Product[];
  btnDisabled= false;
  key='';
  @Input() id: any;
  quantity=1;
  quantitys=1;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/user/product'

  public totalItems: number = 0;
  constructor(
    private modelService: NgbModal,
    private cartService: CartService,
    private productService: ProductService,
    private toastr: ToastrService) {
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
    addtocart(item: Product, quantity: number){
      if(quantity === null){
        quantity = 1;
      }else{
        quantity = this.quantity;
      }
      this.cartService.addfromDetail(item,quantity);
      this.toastr.success('Success', 'Your product has been added to the cart!');
    }
    open(content: TemplateRef<any>){
      this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
    }
  ngOnInit(){
    this.productService.getProById(this.id).subscribe((data:any) =>{
      this.Prod = data.product as Product;
      console.log(this.Prod);
    });
    this.btnDisabled=true;
  }

}
