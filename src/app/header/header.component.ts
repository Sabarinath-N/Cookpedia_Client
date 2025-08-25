
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

username:string=""

constructor(private router:Router,private toastr:ToastrService){}

ngOnInit(): void {
  if(sessionStorage.getItem('user')){
    this.username=sessionStorage.getItem('user')||""
  }
}

logOut(){
  sessionStorage.clear()
  this.toastr.info('User Logged Out!!')
  this.router.navigateByUrl('/log')
}

}










