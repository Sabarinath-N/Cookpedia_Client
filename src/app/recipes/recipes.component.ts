import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import { FilterPipe } from '../pipes/filter-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [FormsModule, SearchPipe, FilterPipe, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  allRecipes: any = []
  cuisinelist: any = []
  mealTypeList: any = []
  keyword: any = ""
  filterKey: any = ""
  filterType: any = ""


  constructor(private api: ApiService) { }



  ngOnInit(): void {
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecipes = res
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

        // console.log(this.mealTypeList);


        // console.log(this.cuisinelist);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }


  filterHandler(key: any, type: any) {
    this.filterKey = key
    this.filterType = type
  }

}