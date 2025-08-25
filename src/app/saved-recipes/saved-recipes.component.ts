import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent implements OnInit {


  savedList: any = []

  constructor(private api: ApiService , private toastr:ToastrService) { }

  ngOnInit(): void {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.savedRecipesListApi(header).subscribe({
      next: (res: any) => {
        console.log(res);
        this.savedList = res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }


  handleDelete(id:any){
    const header= new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.deleteSavedRecipeApi(id,header).subscribe({
      next:(res:any)=>{
        this.ngOnInit()
      },
      error:(err:any)=>{
        console.log(err);
        this.toastr.error("Deletion Failed !! Some Thing Went Wrong!!   ")       
      }
    })
  }
}
