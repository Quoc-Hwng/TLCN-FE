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
  url='http://localhost:3000/api/v1/users/detail'
  emloyee: Employee;
   constructor(
    private rest:RestApiService,
    private data: DataService,private toastr: ToastrService) {
      this.emloyee= new Employee;
     }
  editId = localStorage.getItem('id');

  ngOnInit() {
    this.doing=true;
    if(this.editId){
      this.rest.getOne(this.url,this.editId)
      .then(data =>{
        this.doing=false;
        this.emloyee =(data as {employee: Employee}).employee;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });
    }
  }
  update(){
    this.doing=true;
    if(this.editId){
    this.rest.put(this.url,this.editId,this.emloyee)
      .then(data =>{
        this.doing=false;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
    }
    this.toastr.success('Success');
  }

}
