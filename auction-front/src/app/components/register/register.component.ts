import { UserService } from './../../services/user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      age: [null, Validators.required],
      phone: [null, [Validators.required, Validators.min(1111111111), Validators.max(9999999999999)]],
      gender: [null, Validators.required],
      location: [null, Validators.required],
      file: [null, Validators.required]
    });
   }


  get name() { return this.signupForm.get('name') }
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get age() { return this.signupForm.get('age') }
  get phone() { return this.signupForm.get('phone') }
  get gender() { return this.signupForm.get('gender') }
  get location() { return this.signupForm.get('location') }
  // get file(){ return this.signupForm.get('file')}
  // set userAvatar(val:any){ this.userAvatar = val; }  

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
    this.service.post('signup', form.value).subscribe(res => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });``
  }

}
