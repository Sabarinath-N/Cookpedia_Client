import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  profilePicture:string=""


  constructor(private api:ApiService,private toastr:ToastrService, private router:Router){
    if(sessionStorage.getItem('profile')){
      this.profilePicture=sessionStorage.getItem('profile') || "https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png"
    }
    else{
      this.profilePicture="https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png"
    }
  }


  getFile(event:any){
    const filePointer=event.target.files[0]
    let fr=new FileReader()
    fr.readAsDataURL(filePointer)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profilePicture=event.target.result
      
    }

  }

  handleSubmit(){
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    console.log(header);
    this.api.updateProfile({ profile:this.profilePicture },header).subscribe({
      next:(res:any)=>{
        console.log(res);
        sessionStorage.clear()
        this.toastr.success("Profile Picture Updated!!")
        this.router.navigateByUrl('/')     
      },
      error:(err:any)=>{
        this.toastr.error("Profile Updation Failed!!!")
        console.log(err);        
      }
    })
    
  }

}
