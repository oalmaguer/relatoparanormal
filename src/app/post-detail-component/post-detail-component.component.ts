import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Relato } from '../homepage/story.interface'


@Component({
  selector: 'app-post-detail-component',
  templateUrl: './post-detail-component.component.html',
  styleUrls: ['./post-detail-component.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: string;
  currentPost: Relato;

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    //get individual story with the id 
    this.postId = this.router.snapshot.url[1].path;
    this.http.get<Relato>(`${environment.nodeEndpoint}/relatos/get/${this.postId}`)
    .subscribe(elem => {
      this.currentPost = elem[0];
    })
  }

}
