import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SendStoryService } from './send-story.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Relato } from '../interface/story.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-write-story',
  templateUrl: './write-story.component.html',
  styleUrls: ['./write-story.component.scss'],
})
export class WriteStoryComponent implements OnInit {
  writeForm: FormGroup;
  types: Array<string> = ['Aliens', 'Fantasmas', 'Mutantes'];
  headers = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );
  response: any;
  isLoggedIn;

  constructor(
    private storyService: SendStoryService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.writeForm = new FormGroup({
      author: new FormControl(''),
      story: new FormControl(''),
      type: new FormControl('Aliens'),
    });

    this.auth.logged$.subscribe((elem) => {
      this.isLoggedIn = elem;
    });

    this.onChanges();
  }

  onChanges() {
    this.writeForm.get('author').valueChanges.subscribe((value) => {});

    this.writeForm.get('type').valueChanges.subscribe((value) => {});

    this.writeForm.get('story').valueChanges.subscribe((value) => {});
  }

  onSubmit() {
    //write to database

    this.http
      .post(`${environment.nodeEndpoint}/relatos/add`, this.writeForm.value, {
        responseType: 'json',
      })
      .subscribe(
        (elem) => {
          this.response = elem;
          this.router.navigate([`/post/${this.response._id}`]);
        },
        (err) => console.log(err)
      );
    // this.storyService.stories$.next(this.writeForm.value);
  }
}
