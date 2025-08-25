import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../Model/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent implements OnInit {
  cuisinelist: any[] = []
  mealTypeList: any[] = []

  mealTypeSet: any[] = []
  instructionSet: any[] = []
  ingredientSet: any[] = []
  recipeData: RecipeModel = {}

  rid: any = ""


  constructor(private api: ApiService, private ar: ActivatedRoute, private admin: AdminApiService, private toastr: ToastrService, private router: Router) {
    this.ar.params.subscribe({
      next: (res: any) => {
        this.rid = res.rid
      }
    })
  }

  ngOnInit(): void {
    this.getData()
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    this.api.recipeDetailsApi(this.rid, header).subscribe({
      next: (res: any) => {
        console.log(res)
        this.recipeData = res
        this.instructionSet = res?.instructions
        this.ingredientSet = res?.ingredients
        this.mealTypeSet = res?.mealType
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }



  getData() {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        res.map((item: any) => item.cuisine).forEach((item: any) => {
          if (!this.cuisinelist.includes(item)) {
            this.cuisinelist.push(item)
          }
        })
        res.map((item: any) => item.mealType).flat().forEach((item: any) => {
          if (!this.mealTypeList.includes(item)) {
            this.mealTypeList.push(item)
          }
        })

      },
      error: (err: any) => {
        console.log(err);

      }
    })

  }

  addInstructions(instructionInput: any) {
    if (instructionInput.value) {
      this.instructionSet?.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructionSet)
    }
  }

  removeInstructions(val: any) {
    if (val) {
      this.instructionSet = this.instructionSet.filter((item: any) => item != val)
    }
  }

  addIngredients(input: any) {
    if (input.value) {
      this.ingredientSet?.push(input.value)
      input.value = ""
      console.log(this.ingredientSet)
    }
  }

  removeIngredients(val: any) {
    if (val) {
      this.ingredientSet = this.ingredientSet.filter((item: any) => item != val)
    }
  }



  handleMealType(event: any) {
    if (event.target.checked) {
      this.mealTypeSet?.push(event.target.name)
    } else {
      this.mealTypeSet = this.mealTypeSet.filter((item: any) => item != event.target.name)
    }
    console.log(this.mealTypeSet)
  }


  handleSubmit() {
    this.recipeData.instructions = this.instructionSet
    this.recipeData.ingredients = this.ingredientSet
    this.recipeData.mealType = this.mealTypeSet

    this.admin.updateRecipeApi(this.rid,this.recipeData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("Recipe Updated!!")
        this.router.navigateByUrl('/admin/recipelist')
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error ? err.error : "Recipe Updation Failed !!")
      }
    })
  }

  logout(){
      sessionStorage.clear()
      this.toastr.info("Logging Out From Admin Palel!!")
      this.router.navigateByUrl('/')
    }

}


