import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
// import { AuthGuard } from './core/auth.guard';
import { TestFunctionsComponent } from './test-functions/test-functions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestFunctionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
