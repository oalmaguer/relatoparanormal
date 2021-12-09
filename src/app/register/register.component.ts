import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  createdUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    this.http
      .post(
        `${environment.nodeEndpoint}/user/signup`,
        this.registerForm.value,
        {
          responseType: 'json',
        }
      )
      .subscribe((elem) => {
        console.log(elem);
        if (elem) {
          this.createdUser = elem;
          Swal.fire({
            title: 'Success!',
            text: 'You have been registered, you"ll be redirected soon',
            icon: 'success',
            timer: 3000,
          });
          setTimeout(() => {
            this.router.navigate([`/login`]);
          }, 3000);
        }
      });
  }
}
