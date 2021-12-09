import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interface/user.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  currentUser: any;
  userId: string;
  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = this.router.snapshot.url[1].path;
    this.http
      .get<User>(`${environment.nodeEndpoint}/user/get/${this.userId}`)
      .subscribe((elem) => {
        this.currentUser = elem[0];
      });
  }
}
