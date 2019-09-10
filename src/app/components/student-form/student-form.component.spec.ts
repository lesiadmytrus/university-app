import { async, ComponentFixture, TestBed, fakeAsync, getTestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router} from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentService } from '../../services/student.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagesService } from 'src/app/services/messages.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { NgZone } from '@angular/core';
import { StudentComponent } from '../student/student.component';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';

const mockStudent = new FormGroup({
  _id: new FormControl(),
  firstName: new FormControl('ghgh', Validators.required),
  lastName: new FormControl('ghmockStudenth', Validators.required),
  email: new FormControl('mockStudenthgfh@ghf.gjff', Validators.required),
  phoneNumber: new FormControl('+45445', Validators.required),
  country: new FormControl('Italy', Validators.required),
  dateOfBirth: new FormControl('2012-12-12', Validators.required),
  gender: new FormControl('male')
});

const mockStudentWithoutGender = new FormGroup({
  firstName: new FormControl('ghgh', Validators.required),
  lastName: new FormControl('ghmockStudenth', Validators.required),
  email: new FormControl('mockStudenthgfh@ghf.gjff', Validators.required),
  phoneNumber: new FormControl('+45445', Validators.required),
  country: new FormControl('Italy', Validators.required),
  dateOfBirth: new FormControl('2012-12-12', Validators.required),
  gender: new FormControl()
});

const student = {
  _id: 'f6acd450-c8c4-11e9-a32f-2a2ae2dbcce4',
  firstName: 'Norman',
  lastName: 'Firstman',
  age: 120,
  email: 'norman@g.com',
  phoneNumber: 1234,
  country: 'France',
  gender: 'male',
  dateOfBirth: '1899-10-29'
};

const mockStudentId = 'f6acd450-c8c4-11e9-a32f-2a2ae2dbcce4';
const message =  'succ';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let studentService: jasmine.SpyObj<StudentService>;
  let toster: jasmine.SpyObj<ToastrService>;
  let router: Router;
  let location: Location;
  let ngZone: NgZone;
  let messagesService: jasmine.SpyObj<MessagesService>;

  beforeEach(async(() => {   
    TestBed.configureTestingModule({
      declarations: [
        StudentFormComponent,
        StudentComponent,
        AgePipe,
        SpinnerComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forRoot([]),
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          // { path: 'students', component: StudentComponent }
        ])
      ],
      providers: [
        { provide: FormGroup, useValue: FormGroup },
        { provide: StudentService, useClass: StudentService }
      ]
    })
      .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(StudentFormComponent);
          component = fixture.componentInstance;
          studentService = TestBed.get(StudentService);
          toster = TestBed.get(ToastrService);
          router = TestBed.get(Router);
          location = TestBed.get(Location);
          ngZone = TestBed.get(NgZone);
          messagesService = TestBed.get(MessagesService);
          // router.initialNavigation();
      });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation form', () => {
    it('should return false if form is empty', () => {
      const form = component.profileForm.valid;
      expect(form).toBeFalsy();
    });

    it('should return false if field "name" is empty', () => {
      const name = component.profileForm.controls['firstName'];
      expect(name.valid).toBeFalsy();
    });

    it('should return true if required', () => {
      const name = component.profileForm.controls['firstName'];
      let errors = name.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('should return true if email is valid', () => {
      let email = component.profileForm.controls['email'];
      let errors = email.errors || {};
      email.setValue('lesiadmytrus@gmail.com');
      expect(errors['pattern']).toBeFalsy();
    });
  });

  describe('CreateNewStudent', () => {
    it('#createStudent should added new student', () => {
      spyOn(studentService, 'createStudent').and.callThrough();
      component.add(mockStudent);
      expect(studentService.createStudent).toHaveBeenCalled();
    });

    it('should check if "gender" is checked', () => {
      spyOn(studentService, 'createStudent').and.callThrough();
      component.add(mockStudentWithoutGender);
      expect(studentService.createStudent).not.toHaveBeenCalled();
    });
  });

  describe('UpdateStudent', () => {
    it('#update should updated student', () => {
      spyOn(studentService, 'update').and.callThrough();
      component.update(mockStudent);
      expect(studentService.update).toHaveBeenCalled();
    });
  });
  
    // it('should navigate', () => {
      // fixture.ngZone.run(() => {
      // spyOn(mockRouterService, 'navigate');
      // component.update(mockStudent);
      // expect(mockRouterService.navigate).toHaveBeenCalledWith('/students');
      // router.navigate(['/students']);
      // expect(location.path()).toBe('/students');
      // let res;
      // let navigateSpy = spyOn(router, 'navigate');
      // expect(navigateSpy).toHaveBeenCalledWith('/students');
      // });
    // });
  //   it('123', () => {
  //     spyOn(toster, 'success').and.callThrough();
  //     messagesService.handlerSuccess(message);
  //     spyOn(studentService, 'update').and.callThrough();
  //     component.update(mockStudent);
  //     expect(studentService.update).toHaveBeenCalled();
  //     expect(toster.success).toHaveBeenCalled();
  // });

  describe('GetStudent', () => {
    it('#getStudent should get student by id', () => {
      spyOn(studentService, 'getById').and.callThrough();
      component.getStudent(mockStudentId);
      expect(studentService.getById).toHaveBeenCalled();
    });
  });
});
