import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth.guard';
import { TestFunctionsComponent } from './test-functions/test-functions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestFunctionsComponent},
  { path: 'posts', component: PostsComponent },
  { path: 'new-post', component: NewPostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
