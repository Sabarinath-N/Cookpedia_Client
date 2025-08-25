import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit {


  recipelist:any[]=[]
  keyword:any=''

  constructor(private api:AdminApiService , private toastr:ToastrService , private router:Router){

  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.api.recipeListApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.recipelist=res
      },
      error:(err:any)=>{
        console.log(err)       
      }
    })
  }

  handleDelete(id:any){
    this.api.deleteRecipeApi(id).subscribe({
       next:(res:any)=>{
        this.getData()
      },
      error:(err:any)=>{
        console.log(err)    
        this.toastr.error(err.error?err.error:'Deletion Failed!!')   
      }
    })
  }

  logout(){
      sessionStorage.clear()
      this.toastr.info("Logging Out From Admin Palel!!")
      this.router.navigateByUrl('/')
    }

}
