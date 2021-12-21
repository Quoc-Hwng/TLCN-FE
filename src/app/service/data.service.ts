import { RestApiService } from './rest-api.service';
import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ProductService} from 'src/app/service/product.service';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';
  employee!: Employee | null;
  constructor(private router: Router, private rest: RestApiService,private productService: ProductService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  async getProfile(){
    try{
      if (localStorage.getItem('tokens')){
       var token = localStorage.getItem('tokens');
       var id = this.getDecodedAccessToken(token!);
       this.productService.getUserById(id.id).subscribe((data:any) =>{
        this.employee = data.user as Employee;
        console.log(this.employee);
      });
       console.log(id);
     //  this.employee = data.employee;
      }
    }catch(error:any){
      this.error(error);
    }
  }
  error(message: string) {
    this.messageType = 'denger';
    this.message = message;
  }
  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }
  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }
}
