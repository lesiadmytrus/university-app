import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import countries from '../../countries.json';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { MessagesService } from 'src/app/services/messages.service.js';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
	public countries = countries.data;
	public countryDefault = null;
	public passwordPattern = '.{6,12}';

	registrationForm = new FormGroup({
		_id: new FormControl(''),
		firstName: new FormControl('', Validators.required),
		lastName: new FormControl('', Validators.required),
		email: new FormControl('', Validators.required),
		country: new FormControl(this.countryDefault, Validators.required),
		password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
		confirmPassword: new FormControl('', Validators.required)
	});

	constructor(
		private authService: AuthService,
		private messagesService: MessagesService,
		private router: Router
	) { }

	ngOnInit() {
	}

	onRegisterUser(form: FormGroup): void {
		const user: User = {...form.value};

		this.authService.registerUser(user).subscribe(res => {
			this.messagesService.handlerSuccess(res['message']);
			this.router.navigate(['/login']);
		}, error => {
			this.messagesService.handlerError(error.error);
		});
	}
}
