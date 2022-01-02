import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/user/product';
  url1= 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth';

constructor(private httpClient: HttpClient) {

}
getAll(){
  return this.httpClient.get(this.url)
}
getProById(id: any){
  return this.httpClient.get(this.url+'/'+id)
}
getUserById(id: any){
  return  this.httpClient.get(this.url1+'/'+id);
}
getProduct(){
  return this.httpClient.get<any>("https://shopgiay-be-tlcn.herokuapp.com/api/v1/user/product")
  .pipe(map((res:any)=>{
    return res;
  }))
}
}
