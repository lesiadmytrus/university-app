import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';







@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly apiURL = 'http://localhost:3000/api/auth';

	constructor(private http: HttpClient) { }

	public registerUser(user: User): Observable<Object> {
		return this.http.post(`${this.apiURL}/register`, user);
	}

	public logInUser(email: string, password: string): Observable<{access_token: string}> {
		return this.http.post<{access_token: string}>(`${this.apiURL}/login`, { email, password })
			.pipe(
				tap(res => {
					this.setToken(res.access_token);
				})
			);
	}


	//set token to localStorage

	public setToken(token: string) {
		localStorage.setItem('access_token', token);
	}


	//get token from localStorage

	public getToken() {
		return localStorage.getItem('access_token');
	}

	public isLoggedIn() {
		return !!this.getToken();
	}

	public logOut(): void {
		localStorage.removeItem('access_token');
	}
}
