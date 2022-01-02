import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employee: Employee;
  saving= false;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/user/registers'
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  loading:  boolean = false;

  constructor(
    private rest: RestApiService,
    private router: Router,
   ) {

  }
  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form:any) {
    this.loading = true;
    var email = form.value;
    if (form) {
      this.IsvalidForm = true;
      console.log(email)
      this.rest.post(this.url,email).then(data => {
          this.RequestResetForm.reset();
          this.loading = false;
          this.successMessage = "Register link send to email sucessfully.";
          console.log(email);
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']);
          }, 3000);
        },
        err => {

          if (err.error.message) {
            this.loading = false;
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}
