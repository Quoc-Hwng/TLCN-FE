import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent implements OnInit {

  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/auth/user/registerMail';
  resetPasswordForm: FormGroup;
  password: FormControl;
  successMessage: string;
  errorMessage: string;
  token: string;
  loading: boolean  = false;
  constructor(private fb: FormBuilder,
    private rest: RestApiService,
    private dataService: DataService,
    private router: Router, private route: ActivatedRoute) {
      this.token = route.snapshot.params['token'];
    }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'displayName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
  }
  changePassword(data: any) { // change any to what this post request will return
    this.loading  = true;
  if (data) {
    console.log(this.resetPasswordForm.value)
    this.rest.patchToken(this.url,this.token,this.resetPasswordForm.value).then(data => {
        this.resetPasswordForm.reset();
        this.successMessage = "Register sucessfully.";
        this.loading = false;
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
          localStorage.removeItem('tokens');
        }, 3000);
      },
      err => {

        if (err.error.message) {
          this.loading =  false;
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      }
    );
  }
}

}
