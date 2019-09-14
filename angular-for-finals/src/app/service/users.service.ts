import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = 'http://localhost:3000/api/users'
  titlesurl: string = 'http://localhost:3000/api/titles'

  constructor(private http: HttpClient) { }

  getUsers(id = 0): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getTitles(): Observable<any> {
    return this.http.get(this.titlesurl);
  }

  editUser(user: object) {
    return this.http.put(this.url, user);
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

  createUser(user) {
    return this.http.post(this.url, user);
  }

}
