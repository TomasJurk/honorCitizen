import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private _auth: AuthService,
		private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return this.checkLogin();
	}
	checkLogin(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this._auth.isLoggedIn().then(() => {
				resolve(true);
			}).catch(() => {
				this.router.navigate(['/home']);
				reject(false);
			});
		});
	}
}
