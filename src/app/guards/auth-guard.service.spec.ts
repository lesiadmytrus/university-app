import { async, TestBed } from '@angular/core/testing';
import { AuthGuard } from '../guards/auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgZone } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

class MockRouter {
  navigate(path) {}
}

const mockToken = 'access_token';

describe('AuthGuard ', () => {
  let httpTestingController: HttpTestingController;
  let auth: AuthGuard;
  let authService;
  let router;
  let ngZone: NgZone;
  let next: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthGuard , useClass: AuthGuard  }
      ]
    });

    auth = TestBed.get(AuthGuard);
    httpTestingController = TestBed.get(HttpTestingController);
    ngZone = TestBed.get(NgZone);
  }));

  it('should be created', () => {
    expect(AuthGuard).toBeTruthy();
  });

  describe('AuthGuard', () => {
    it('should return true for a logged in user', () => {
      authService = { getToken: () => mockToken };
      router = new MockRouter();
      auth = new AuthGuard(router, authService);
    
      expect(auth.canActivate(next, state)).toEqual(true);
    });

    it('should navigate to login for a logged out user', () => {
      authService = { getToken: () => {} };
      router = new MockRouter();
      auth = new AuthGuard(router, authService);
      spyOn(router, 'navigate');

      expect(auth.canActivate(next, state)).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
