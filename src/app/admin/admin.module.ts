import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { UserlistComponent } from './userlist/userlist.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RequestsComponent } from './requests/requests.component';
import { Routes, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';

import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HighchartsChartModule} from 'highcharts-angular'




const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'recipelist', component: RecipelistComponent },
  { path: 'addrecipe', component: AddrecipeComponent },
  { path: 'editrecipe/:rid', component: EditrecipeComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'requests', component: RequestsComponent },
]


@NgModule({
  declarations: [
    DashboardComponent,
    RecipelistComponent,
    AddrecipeComponent,
    EditrecipeComponent,
    UserlistComponent,
    DownloadsComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    RouterLink,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    HighchartsChartModule
    
  ]
})
export class AdminModule { }
