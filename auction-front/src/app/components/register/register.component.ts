import { UserService } from './../../services/user.service';
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      age: [null, Validators.required],
      phone: [null, [Validators.required, Validators.min(1111111111), Validators.max(9999999999999)]],
      gender: [null, Validators.required],
      location: [null, Validators.required],
      userImage: [null, Validators.required]
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.signupForm.get('userImage').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    input.append('name', this.signupForm.get('name').value);
    input.append('email', this.signupForm.get('email').value);
    input.append('password', this.signupForm.get('password').value);
    input.append('age', this.signupForm.get('age').value);
    input.append('phone', this.signupForm.get('phone').value);
    input.append('gender', this.signupForm.get('gender').value);
    input.append('location', this.signupForm.get('location').value);
    input.append('userImage', this.signupForm.get('userImage').value);
    return input;
  }

  onFormSubmit() {

    const formModel = this.prepareSave();
    // console.log(formModel);
    this.service.post('signup', formModel).subscribe(res => {
      if (res) {
        this.router.navigate(['Login']);
      }
    });
  }

}
