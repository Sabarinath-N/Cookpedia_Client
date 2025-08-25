import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {

  userList:any[]=[]


  constructor(private api:AdminApiService , private toastr:ToastrService, private router:Router){}


  ngOnInit(): void {
    this.api.userListApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userList=res
      },
      error:(err:any)=>{
        console.log(err);        
      }
    })
  }

  logout(){
      sessionStorage.clear()
      this.toastr.info("Logging Out From Admin Palel!!")
      this.router.navigateByUrl('/')
    }

}
