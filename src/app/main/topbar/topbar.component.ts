import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  refreshToken='';
  employee:Employee
  url='http://localhost:3000/api/v1/auth/logout'
  public searchTerm : string = '';
  constructor(private cartService: CartService,
     public data: DataService,
    private rest:RestApiService,
    private router: Router) {
    this.data.getProfile();
    this.employee= new Employee
   }
  name = localStorage.getItem('name')
  ngOnInit() {
  }
  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);

  }
  logout(){
    const token = localStorage.getItem('tokens')
    console.log(token)
    console.log(this.refreshToken)
    if(token){
      this.rest.delete(this.url,token).then(data=>{
      localStorage.clear();
      this.router.navigate(['/login']);
      }).catch(error=>{
        localStorage.clear();
      this.router.navigate(['/login']);
      })
    }
  }

}
