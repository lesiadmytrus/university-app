import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

const mockUser = new FormGroup({
  email: new FormControl('lesiadmytrus@gmail.com', Validators.required),
  password: new FormControl('1234567', Validators.required)
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: FormGroup, useValue: FormGroup },
        { provide: AuthService, useClass: AuthService }
      ]
    })
      .compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation form', () => {
    it('should return false if form is empty', () => {
      const form = component.loginForm.valid;
      expect(form).toBeFalsy();
    });

    it('should return false if email is invalid', () => {
      let email = component.loginForm.controls['email'];
      let errors = email.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should logged in a user', () => {
      auth = TestBed.get(AuthService);
      spyOn(auth, 'logInUser').and.callThrough();
      component.onLogInUser(mockUser);
      expect(auth.logInUser).toHaveBeenCalled();
    });
  });
});
