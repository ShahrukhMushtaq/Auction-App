import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regiForm: FormGroup; 
  Name : String;
  Email:String;
  Password:String; 
  Age:String;
  Phone:Number;
  Gender:String;  
  IsAccepted:Number = 0;

  constructor(private fb: FormBuilder , private service: UserService , private router: Router) {
    // To initialize FormGroup  
    this.regiForm = fb.group({
      'Name' : [null, Validators.required],  
      'Email':[null, Validators.compose([Validators.required,Validators.email])], 
      'Password' : [null, Validators.required],  
      'Age' : [null, Validators.required],  
      'Phone' : [null, Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(13)])],  
      'Gender':[null, Validators.required],
      'IsAccepted':[null]
    });  
   }
   // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  }  
  
  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    console.log(form.value); 
     this.service.post('signup' ,form.value).subscribe(res =>{
       if(res){
          this.router.navigate(['dashboard']);          
       }
     });
  }  

  ngOnInit() {
  }

}
