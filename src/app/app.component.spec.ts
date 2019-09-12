import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgZone } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
      declarations: [
        AppComponent,
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthService }
      ]
    }).compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
          auth = TestBed.get(AuthService);
          router = TestBed.get(Router);
          ngZone = TestBed.get(NgZone);

          fixture.detectChanges();
        });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('OnLogOut user', () => {
    it('#onLogOut should log out user', () => {
      fixture.ngZone.run(() => {
        spyOn(auth, 'logOut').and.callThrough();
        component.onLogOut();
        expect(auth.logOut).toHaveBeenCalled();
      });
    });

    it('router should navigate to login', () => {
      fixture.ngZone.run(() => {
        let navigateSpy = spyOn(router, 'navigate');
        component.onLogOut();
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
