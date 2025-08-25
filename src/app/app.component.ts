import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cookspedia';


  constructor(private router:Router){

  }

  hideUpandDown(){
    let hidestatus:boolean=true

    const hiddenRoutes:any=["/log","/reg","/admin","/admin/recipelist","/admin/addrecipe","/admin/editrecipe",
      "/admin/userlist","/admin/downloads","/admin/requests"]
    return hiddenRoutes.includes(this.router.url)
    // hiddenRoutes.forEach((item:any)=>{
    //   if(item.includes(this.router.url)){
    //     hidestatus=true
    //   }
    //   else{
    //     hidestatus=false
    //   }
    // })
    // return hidestatus
  }
}
