import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms'
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {

  regForm:any={}


  constructor(private fb:FormBuilder,private api:ApiService, private router:Router,private toastr:ToastrService){
    this.regForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(8)]]
    })
  }


  handleSubmit(){
    console.log(this.regForm.value);
    
    this.api.userRegApi(this.regForm.value).subscribe({
      next:(res:any)=>{
        // alert("Registration Successfull!!")
        this.toastr.success("Registration Successfull!!")
        this.router.navigateByUrl('/log')
      },
      error:(err:any)=>{
        // alert("Registration Failed!!")
        this.toastr.error("Registration Failed!!")
        console.log(err);
        
      }
    })
  }

}
 