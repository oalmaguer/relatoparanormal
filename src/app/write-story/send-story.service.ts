import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendStoryService {
  currentStory:  Array<any> = [];
  stories$ = new BehaviorSubject<any>([]);

}


