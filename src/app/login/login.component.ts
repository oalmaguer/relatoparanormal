import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedUser;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this.http
      .post(`${environment.nodeEndpoint}/user/login`, this.loginForm.value, {
        responseType: 'json',
      })
      .pipe(catchError(async (err) => console.log(err)))
      .subscribe((elem) => {
        if (elem[0].status === 'success') {
          this.loggedUser = elem;
          this.auth.setItem('true');
          Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success',
            timer: 3000,
          });
          setTimeout(() => {
            this.router.navigate([`/`]);
          }, 3000);
        } else {
          this.auth.setItem(null);
          Swal.fire({
            title: 'Error!',
            text: 'Incorrect password or username',
            icon: 'error',
            timer: 5000,
          });
        }
      });
  }
}
