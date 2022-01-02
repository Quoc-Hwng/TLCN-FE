import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/user/resetPassword';
  resetPasswordForm: FormGroup;
  password: FormControl;
  successMessage: string;
  errorMessage: string;
  token: string;
  loading: boolean = false;
  constructor(private fb: FormBuilder,
    private rest: RestApiService,
    private dataService: DataService,
    private router: Router, private route: ActivatedRoute,private toastr: ToastrService) {
      this.token = route.snapshot.params['token'];
    }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
      'cnpassword': new FormControl(null, [Validators.required]),
    });
  }
  changePassword(data: any) { // change any to what this post request will return
    this.loading =true;
    if(this.resetPasswordForm.controls.password.value === this.resetPasswordForm.controls.cnpassword.value){
  if (data) {
    console.log(this.resetPasswordForm.value)
    this.rest.patchToken(this.url,this.token,this.resetPasswordForm.value).then(data => {
        this.resetPasswordForm.reset();
        this.loading = false;
        this.successMessage = "Reset password sucessfully.";
        this.toastr.success('Success', this.successMessage);
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
          localStorage.removeItem('tokens');
          localStorage.removeItem('user')
        }, 3000);
      },
      err => {

        if (err.error.message) {
          this.loading = false;
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      }
    );
  }}else{
    this.loading = false;
    this.errorMessage = 'Mật khẩu không khớp';
    this.toastr.error(this.errorMessage);
  }
}

}
