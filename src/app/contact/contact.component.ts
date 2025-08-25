import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  constructor(private api:ApiService,private toastr:ToastrService, private router:Router){}

  handleSubmit(data:any){

    console.log(data);
    this.api.addTestimony(data).subscribe({
      next:(res:any)=>{
        this.toastr.success("Testimony Added")
        this.router.navigateByUrl('/')      
      },
      error:(err:any)=>{
        this.toastr.error(err.error?err.error:"Adding Failed!!")
      }
    })
  }
}
