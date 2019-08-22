import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private auth: AuthService
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.auth.getToken()) {
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
