import { RestApiService } from 'src/app/service/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/user/updateMyPassword';
  updatePasswordForm: FormGroup;
  passwordCurrent: FormControl;
  password: FormControl;
  cnewPassword: FormControl;
  successMessage: string;
  errorMessage: string;
  constructor(private fb: FormBuilder,
    private rest: RestApiService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.updatePasswordForm = new FormGroup({
      'passwordCurrent': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'cnPassword': new FormControl(null, [Validators.required]),
    });
  }
  changePassword(data: any) { // change any to what this post request will return
    console.log(data);
    if(this.updatePasswordForm.controls.password.value === this.updatePasswordForm.controls.cnPassword.value){
    if (data) {
    console.log(this.updatePasswordForm.value)
    this.rest.patch(this.url,this.updatePasswordForm.value).then(data => {
        this.updatePasswordForm.reset();
        this.successMessage = "Change password sucessfully.";
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
          localStorage.removeItem('tokens');
          localStorage.removeItem('user');
        }, 3000);
      },
      err => {

        if (err.error.message) {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      }
    ).catch(error =>{
      this.errorMessage = error.message;
    });
  }}
  else{
    this.errorMessage = 'Mật khẩu không giống';
  }
}

}
