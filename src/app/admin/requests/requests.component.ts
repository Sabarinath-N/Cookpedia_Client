import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit {

  requestList: any[] = []

  constructor(private api: AdminApiService, private toastr: ToastrService ,private router:Router) { }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    this.api.getTestimonyRequestApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.requestList = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  updateRequests(id: any, status: any) {
    this.api.updateRequestsApi(id, { status }).subscribe({
      next: (res: any) => {
        this.getData()
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error ? err.error : 'Updation Failed!!')
      }
    })
  }
  logout() {
    sessionStorage.clear()
    this.toastr.info("Logging Out From Admin Palel!!")
    this.router.navigateByUrl('/')
  }
}
