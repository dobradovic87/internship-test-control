import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  firebaseURL =
    'https://internship-test-72eaf-default-rtdb.firebaseio.com/users.json';
  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get(this.firebaseURL);
  }
}
