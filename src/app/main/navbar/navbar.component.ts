import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CartItem } from 'src/app/common/cart';
import { CartService } from 'src/app/service/cart.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public status : string = '';
  public gender : string = '';
  public selling : string = '';
  cart:  CartItem[] = [];
  totalItem: number = 0;
  brands!: Brand[];
  public brand : string = '';
  url='http://localhost:3000/api/v1/admin/brand/list'

  constructor(private route: ActivatedRoute,
    private _router: Router,
    private cartService: CartService,
    private rest:RestApiService) { }

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe((res: any)=>{
      this.cart = res;
      if(this.cart !== null) {
      this.totalItem = this.cart.length;}
    })
    this.rest.get(this.url).then(data=>{
      this.brands =( data as {brands: Brand[]}).brands;
      console.log(this.brands);
    })
  }
  navigateToFoo(filter: string){
    if(filter === 'new' || filter === 'seconhand'){
      this.status =  filter;
      this.gender = '';
      this.selling = '';
      this.brand = '';
    }else if(filter === 'nam' || filter === 'nu'){
      this.gender = filter;
      this.status = '';
      this.selling = '';
      this.brand = '';
    }
    else if(filter === 'sale'){
      this.selling = filter;
      this.gender = '';
      this.status = '';
      this.brand = '';
    }
    else{
      this.brand = filter;
      this.gender = '';
      this.status = '';
      this.selling = '';
    }

    this._router.navigate(['/homes'], {
     relativeTo: this.route,
     queryParams: {
       status : this.status,
       gender : this.gender,
       selling: this.selling,
       brand: this.brand,
     },
     queryParamsHandling: 'merge',
     skipLocationChange: false
   });
  }
}
