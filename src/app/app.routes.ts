import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'log', component: LoginComponent },
    { path: 'reg', component: RegComponent },
    { path: 'details/:rid', component: RecipeDetailsComponent, canActivate: [authGuard] },
    { path: 'savedlist', component: SavedRecipesComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    {
        path: 'admin', loadChildren: () =>
            import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard]
    }

];