import { TestBed, ComponentFixture, async } from '@angular/core/testing';
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
import { RegistrationComponent } from './registration.component';

const mockUser = new FormGroup({
  firstName: new FormControl('Lesia', Validators.required),
  lastName: new FormControl('Dmytrus', Validators.required),
  email: new FormControl('lesia@gmail.com', Validators.required),
  country: new FormControl('Ukraine', Validators.required),
  password: new FormControl('201212', Validators.required),
  confirmPassword: new FormControl('201212')
});

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent
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
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        auth = TestBed.get(AuthService);

        fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation form', () => {
    it('should return false if form is empty', () => {
      const form = component.registrationForm.valid;
      expect(form).toBeFalsy();
    });

    it('should return false if Firsname is invalid', () => {
      let firsName = component.registrationForm.controls['firstName'];
      let errors = firsName.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should return false if lastName is invalid', () => {
      let lastName = component.registrationForm.controls['lastName'];
      let errors = lastName.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should return false if email is invalid', () => {
      let email = component.registrationForm.controls['email'];
      let errors = email.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should return false if country is invalid', () => {
      let country = component.registrationForm.controls['country'];
      let errors = country.errors || {};
      expect(errors['required']).toBeTruthy();
    });

    it('should return false if password is invalid', () => {
      let password = component.registrationForm.controls['password'];
      let errors = password.errors || {};
      expect(errors['required']).toBeTruthy();
    });
  });

  describe('OnRegisterUser', () => {
    it('#registerUser should register new user', () => {
      spyOn(auth, 'registerUser').and.callThrough();
      component.onRegisterUser(mockUser);
      expect(auth.registerUser).toHaveBeenCalled();
    });
  });
});
