import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  regiForm: FormGroup;
  email: string;
  password: string;

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) {
    this.regiForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }
  // On Change event of Toggle Button  
  onChange(event: any) {

  }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm) {
    // console.log(form.value); 
    this.service.authenticateUser('login', form.value).subscribe(res => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
  ngOnInit() {
  }

}
