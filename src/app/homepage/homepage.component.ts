import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SendStoryService } from '../write-story/send-story.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Relato } from './story.interface';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  stories: Array<Relato> = [];
  stories$: Observable<any>;
  oliver: string;

  constructor(private storyService: SendStoryService,
            private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Relato[]>(`${environment.nodeEndpoint}/relatos/get/all`)
    .subscribe(elem => {
      console.log(elem);
      this.stories = elem;
    })
  }

  getStory() {
    console.log(this.stories);
  }


}
