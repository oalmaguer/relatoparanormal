import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SendStoryService } from '../write-story/send-story.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Relato } from '../interface/story.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  stories: Array<Relato> = [];
  stories$: Observable<any>;
  oliver: string;
  user: any;

  constructor(
    private storyService: SendStoryService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.http
      .get<Relato[]>(`${environment.nodeEndpoint}/relatos/get/all`)
      .subscribe((elem) => {
        //To get last written story first.
        this.stories = elem.reverse();
      });
  }
}
