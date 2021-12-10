import { Component } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listenChanges();
  }

  logout() {
    this.http
      .get(`${environment.nodeEndpoint}/user/logout`)
      .subscribe((data) => {
        console.log(data);
        if (data[0].status == 'success') {
          this.user = null;
          this.auth.setItem(null);
        }
      });
  }

  listenChanges() {
    this.auth.logged$.subscribe((elem) => {
      this.user = elem;
      console.log('alert', elem);
    });
  }
}
