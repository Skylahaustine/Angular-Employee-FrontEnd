import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


const heaader={
  headers:new HttpHeaders({
  'Accept':'application/JSON',
  'Content-Type':'application/JSON',
  Authorization:'Bearer e3c4517737b85b02af0ed7b639cd0b612ff4df434d5d45935ffd396f9222c38d'
})
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
//injecting it from a constructor
  constructor(private http:HttpClient) { }

  //for post
  postEmployee(data:any){

    return this.http.post<any>("https://gorest.co.in/public/v2/users", data, heaader)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  getEmployee(){

    return this.http.get<any>("https://gorest.co.in/public/v2/users")
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  updateEmployee(data:any, id:number){

    return this.http.put<any>("https://gorest.co.in/public/v2/users/"+id, data, heaader)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

deleteEmployee(id:number){

    return this.http.delete<any>("https://gorest.co.in/public/v2/users/"+id, heaader)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

}
