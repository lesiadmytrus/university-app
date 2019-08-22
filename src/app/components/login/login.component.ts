import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
  }

  onLogInUser(form: FormGroup) {
    const user: User = {...form.value};
    
    this.auth.logInUser(user.email, user.password)
      .subscribe(res => {
        this.router.navigate(['/students']);
        this.messagesService.handlerSuccess(res['message']);
      }, error => {
        this.messagesService.handlerError(error.error);
      });
  }
}
