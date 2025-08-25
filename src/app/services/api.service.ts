import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  // base_url: string = "http://localhost:3000"
  base_url: string = "https://cookpedia-server-dxow.onrender.com"

  constructor(private http: HttpClient) { }

  userRegApi(data: any) {
    return this.http.post(`${this.base_url}/userreg`, data)
  }


  userLoginApi(data: any) {
    return this.http.post(`${this.base_url}/loguser`, data)
  }

  allRecipesApi() {
    return this.http.get(`${this.base_url}/allrecipes`)
  }

  recipeDetailsApi(id: any, header: any) {
    return this.http.get(`${this.base_url}/recipedetails/${id}`, { headers: header })
  }

  saveRecipeApi(data: any, header: any) {
    return this.http.post(`${this.base_url}/saverecipe`, data, { headers: header })
  }

  savedRecipesListApi(header: any) {
    return this.http.get(`${this.base_url}/savedrecipelist`, { headers: header })
  }

  deleteSavedRecipeApi(id: any, header: any) {
    return this.http.delete(`${this.base_url}/deleteSrecipe/${id}`, { headers: header })
  }

  DownloadRecipeApi(id: any,data:any, header: any) {
    return this.http.post(`${this.base_url}/addDownload/${id}`,data, { headers: header })
  }

  getDownloadRecipeApi(id: any, header: any) {
    return this.http.get(`${this.base_url}/getDownloads/${id}`, { headers: header })
  }
  
  updateProfile( data:any,header: any) {
    return this.http.patch(`${this.base_url}/updateprofile`,data, { headers: header })
  }

  addTestimony(data:any){
    return this.http.post(`${this.base_url}/addtestimony`,data)
  }

  getTestimony(){
    return this.http.get(`${this.base_url}/gettestimony`)
  }

}
