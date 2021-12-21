import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ProductService } from '../service/product.service';
import { RestApiService } from '../service/rest-api.service';
import {Product} from './../models/product';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.css']
})
export class BodyHomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/slider_3.jpg?1634203525795`);
  product!: Product[];
  products!: Product[];
  btnDisabled= false;

  url='http://localhost:3000/api/v1/user/product';
  constructor(private rest:RestApiService,
    private data: DataService) { }

  ngOnInit(): void {
    this.btnDisabled=true;
    this.rest.search(this.url,{selling:"News"}).then((data:any)=>{
      this.product = data.data.data as Product[];
      console.log(data);
      this.btnDisabled=false;
    })
    this.rest.search(this.url,{status:'seconhand'}).then((data:any)=>{
      this.products =data.data.data as Product[];
      this.btnDisabled=false;
    })
  }

}
