import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'new',
		component: NewPostComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
