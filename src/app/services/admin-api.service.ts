import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  // base_url: string = "http://localhost:3000"
  base_url: string = "https://cookpedia-server-dxow.onrender.com"

  constructor(private http: HttpClient) { }

  getHeader() {
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    return header
  }

  recipeListApi() {
    return this.http.get(`${this.base_url}/allrecipes`)
  }

  userListApi() {
    return this.http.get(`${this.base_url}/userlist`, { headers: this.getHeader() })
  }

  DownloadListApi() {
    return this.http.get(`${this.base_url}/getdownloadlist`, { headers: this.getHeader() })
  }


  getTestimonyRequestApi() {
    return this.http.get(`${this.base_url}/requestlist`, { headers: this.getHeader() })
  }

  updateRequestsApi(id: any, data: any) {
    return this.http.patch(`${this.base_url}/requestupdation/${id}`, data, { headers: this.getHeader() })
  }

  addRecipeApi(data: any) {
    return this.http.post(`${this.base_url}/addrecipe`, data, { headers: this.getHeader() })
  }

  deleteRecipeApi(id: any) {
    return this.http.delete(`${this.base_url}/deleterecipe/${id}`, { headers: this.getHeader() })
  }


  updateRecipeApi(id:any , data: any) {
    return this.http.put(`${this.base_url}/updaterecipe/${id}`, data, { headers: this.getHeader() })
  }





}
