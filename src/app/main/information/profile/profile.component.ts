import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee'
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  doing=false;
  loading: boolean = true;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/users/detail'
  employee: Employee;
   constructor(
    private rest:RestApiService,
    private data: DataService,private toastr: ToastrService) {
      this.employee= new Employee;
     }
  editId = localStorage.getItem('id');

  ngOnInit() {
    this.doing=true;
    if(this.editId){
      this.rest.getOne(this.url,this.editId)
      .then(data =>{
        this.doing=false;
        console.log(data);
        this.employee =(data as {employee: Employee}).employee;
        this.loading = false;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['Fail'])
      });
    }
  }
  finishAndAlert( message: any){
    this.data.success(message);
    this.ngOnInit();
  }

}
