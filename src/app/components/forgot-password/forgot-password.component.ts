import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/forgotPassword';
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string = '';
  successMessage: string;
  IsvalidForm = true;
  loading:  boolean = false;

  constructor(
    private rest: RestApiService,
    private router: Router,
   ) {}
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
          this.loading =  false;
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']);
          }, 3000);
        },
      ).catch(error=>{
        if (error) {
          this.loading = false;
          this.errorMessage = "Email incorrect";
          this.ngOnInit();
        }
      });
    } else {
      this.IsvalidForm = false;
    }
  }
}
