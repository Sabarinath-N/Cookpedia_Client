import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.css'
})
export class DownloadsComponent implements OnInit {


  downloadList:any[]=[]

  constructor(private api:AdminApiService , private toastr:ToastrService, private router:Router){}

  ngOnInit(): void {
    
    this.api.DownloadListApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.downloadList=res
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
