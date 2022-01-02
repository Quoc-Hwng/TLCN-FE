import { Component, Input, OnInit,TemplateRef } from '@angular/core';
import { Employee } from 'src/app/models/employee'
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-infor',
  templateUrl: './update-infor.component.html',
  styleUrls: ['./update-infor.component.css']
})
export class UpdateInforComponent implements OnInit {

  @Input() editId: any;
  doing=false;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/users/detail'
  employee: Employee;
  constructor(private rest:RestApiService,
    private data: DataService,private toastr: ToastrService,private modelService: NgbModal) {
      this.employee= new Employee;
    }

  ngOnInit() {
    if(this.editId!==''){
      this.doing=true;
      console.log(this.editId);
      this.rest.getOne(this.url,this.editId)
        .then((data:any) =>{
          console.log(data);
          this.doing=false;
          this.employee =(data.employee as Employee)
        }).catch(error =>{
          this.doing =false;
          this.data.error(error['message'])
        });
      }
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title', size: '1000px'});
  }
  update(){
    this.doing=true;
    if(this.editId){
    this.rest.put(this.url,this.editId,this.employee)
      .then(data =>{
        this.doing=false;
        this.toastr.success('Success');
        this.modelService.dismissAll();
        localStorage.setItem('user',JSON.stringify(this.employee));
        localStorage.setItem('name',this.employee.displayName);
        window.location.reload();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
    }
  }

}
