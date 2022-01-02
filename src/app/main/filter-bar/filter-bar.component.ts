import { RestApiService } from './../../service/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

 totalLength: number;
 page:number = 1;
  gender: any;
  status: any;
  selling: any;
  product!: Product;
  products!: Product[];
  price1: number;
  price2: number;
  color: string;
  size: number;
  brand: string;
  sort: string;
  loading: boolean = true;
  rangeValues: number[] = [100000,40000000];
  message ='';

  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/user/product';

  public totalItems: number = 0;
  constructor(
    private rest:RestApiService,
    private data: DataService,
    private route: ActivatedRoute,
    private _router: Router){
    }
    scrollTop(){
      this.loading = false;
      document.documentElement.scrollTop = 0;
    }
    navigateToPrice(){
      this.loading = true;
      document.documentElement.scrollTop = 0
      this._router.navigate([], {
       relativeTo: this.route,
       queryParams: {
         price1 : this.rangeValues[0],
         price2: this.rangeValues[1],

       },
       queryParamsHandling: 'merge',
       skipLocationChange: false
     });
    }
    navigateToFoo(color:string){
      this.loading = true;
      document.documentElement.scrollTop = 0
      this._router.navigate([], {
       relativeTo: this.route,
       queryParams: {
         status : this.status,
         color : color,
       },
       queryParamsHandling: 'merge',
       skipLocationChange: false
     });
    }
    navigateToSize(size: string){
      this.loading = true;
      document.documentElement.scrollTop = 0
      this._router.navigate([], {
       relativeTo: this.route,
       queryParams: {
         size: size,

       },
       queryParamsHandling: 'merge',
       skipLocationChange: false
     });
    }
    navigateToSort(sort: string){
      this.loading = true;
      document.documentElement.scrollTop = 0
      this._router.navigate([], {
       relativeTo: this.route,
       queryParams: {
         sort: sort,
       },
       queryParamsHandling: 'merge',
       skipLocationChange: false
     });
    }
  ngOnInit(){
    this.route.queryParams
    .subscribe(params => { // { orderby: "price" }
      this.status = params.status;
      this.gender = params.gender;
      this.selling = params.selling;
      this.color = params.color;
      this.price1 = params.price1;
      this.price2 = params.price2;
      this.size = params.size;
      this.brand = params.brand;
      this.sort = params.sort;
      if(this.status || this.gender || this.selling || this.brand){this.loading = true;}
      if(!this.status && !this.gender && !this.selling && !this.brand){this.loading = true;}
      this.rest.search(this.url,{status:this.status,gender:this.gender,
                                  color:this.color,selling:this.selling,
                                  price1:this.price1,price2:this.price2,
                                  size: this.size,brand: this.brand, sort: this.sort}).then((data:any)=>{
        this.loading = false;
        this.products =data.data.data as Product[];
        this.page = 1;
        this.totalLength = data.data.data.length;
        if(this.totalLength === 0)
        {
          this.message = "No products found!"
        }
      }) // price
    }
  );

  }
}
