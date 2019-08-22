import { Component } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
        .subscribe(event => {
          this.isLoggedIn = this.auth.isLoggedIn();
        });
    }

  onLogOut(): void {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
