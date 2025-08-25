import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {


  recipeId: any = ''
  recipe: any = {}
  downloadCount: any = 0


  constructor(private ar: ActivatedRoute, private api: ApiService, private toastr: ToastrService) {
    this.ar.params.subscribe((res: any) => {
      console.log(res);
      this.recipeId = res.rid
      this.getData(this.recipeId)
      this.getCount()
    })
  }



  getData(id: any) {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.recipeDetailsApi(id, header).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipe = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  saveRecipe() {
    const { name, cuisine, image } = this.recipe
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
    this.api.saveRecipeApi({ recipeId: this.recipeId, name, cuisine, image }, header).subscribe({
      next: ((res: any) => {
        this.toastr.success("Recipe Added to Saved List!!")
        console.log((res));
        
      }),
      error: (err: any) => {
        console.log(err);
        if (err.error) {
          this.toastr.error(err.error)
        }
        else {
          this.toastr.warning("Saved Failed.. Something Went Wrong!!")
        }
      }

    })
  }


  handleDownload() {
    const doc = new jsPDF()

    autoTable(doc, {
      head: [['', 'Details']],
      body: [
        ['NAME', this.recipe.name],
        ['MEAL TYPE', this.recipe.mealType.join(",")],
        ['CUISINE', this.recipe.cuisine],
        ['COOKING TIME(in minutes)', this.recipe.cookTimeMinutes],
        ['PREPARATION TIME(in minutes)', this.recipe.prepTimeMinutes],
        ['INGREDIENTS', this.recipe.ingredients.join('\n')],
        ['INSTRUCTIONS', this.recipe.instructions.join('\n')]
      ]
    })

    doc.text(this.recipe.name, 10, 10)
    doc.save(this.recipe.name.replace(" ", "_") + ".pdf")

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })

    this.api.DownloadRecipeApi(this.recipe._id,{recipeName:this.recipe.name}, header).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCount()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  
  getCount() {
    var header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    })
     this.api.getDownloadRecipeApi(this.recipeId, header).subscribe({
      next: (res: any) => {
        console.log(res);
        this.downloadCount = res.count
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

}