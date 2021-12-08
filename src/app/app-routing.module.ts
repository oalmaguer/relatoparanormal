import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PostDetailComponent } from './post-detail-component/post-detail-component.component';
import { WriteStoryComponent } from './write-story/write-story.component';

const routes: Routes = [
  {
  path: '',
  component: HomepageComponent,
  },
  {
  path: 'post/:id',
  component: PostDetailComponent,
  },
  {
  path: 'write',
  component: WriteStoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
