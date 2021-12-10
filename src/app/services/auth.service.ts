import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: string;
  logged$ = new BehaviorSubject(this.getItem());

  setItem(value) {
    console.log('hola soy la kim');
    console.log('setitem', value);
    this.logged$.next(value);
    localStorage.setItem('loggedIn', value);
  }

  getItem() {
    return localStorage.getItem('loggedIn');
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  isAuth() {
    this.isLoggedIn = localStorage.getItem('loggedIn');
    return this.isLoggedIn;
  }
}
