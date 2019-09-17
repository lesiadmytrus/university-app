import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { StudentComponent } from '../student/student.component';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Student } from 'src/app/models/student.model';
import { Observable, of, throwError } from 'rxjs';

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

const studentsMock: Student[] = [
  {
    _id: 'a6f75bae-c8bc-11e9-a32f-2a2ae2dbcce4',
    firstName: 'Alan',
    lastName: 'Lastman',
    age: 123,
    email: 'alan@g.com',
    phoneNumber: 123,
    country: 'Italy',
    gender: 'male',
    dateOfBirth: '1896-09-11'
  },
  {
    _id: 'f6acd450-c8c4-11e9-a32f-2a2ae2dbcce4',
    firstName: 'Norman',
    lastName: 'Firstman',
    age: 120,
    email: 'norman@g.com',
    phoneNumber: 1234,
    country: 'France',
    gender: 'male',
    dateOfBirth: '1899-10-29'
  }
];

const emptyMockStudent = new FormGroup({});

const mockStudentId = 'f6acd450-c8c4-11e9-a32f-2a2ae2dbcce4';
const mockSuccessMessage = {
  message: 'Student succesfully created'
};

class MockStudentService {
  createStudent(student: Student): Observable<Object> {
    if (Object.keys(student).length > 0) {
      return of(mockSuccessMessage);
    }

    throwError({ error: 'Something went wrong, please try again later' });
  }

  update(student: Student): Observable<Object> {
    return of(mockSuccessMessage);
  }

  getById(id: string): Observable<Object> {
    return of(mockStudent);
  }
}

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let studentService: MockStudentService;
  let messagesService: MessagesService;

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
          { path: 'students', component: StudentComponent }
        ])
      ],
      providers: [
        { provide: FormGroup, useValue: FormGroup },
        { provide: StudentService, useClass: MockStudentService },
        { provide: MessagesService, useClass: MessagesService }
      ]
    })
      .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(StudentFormComponent);
          component = fixture.componentInstance;
          studentService = new MockStudentService();
          messagesService = TestBed.get(MessagesService);
      });
  }));

  xit('should be created', () => {
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

  describe('AddStudent', () => {
    it('#add should create new student', () => {
      spyOn(messagesService, 'handlerSuccess');
      component.add(mockStudent);
      expect(messagesService.handlerSuccess).toHaveBeenCalledWith(mockSuccessMessage.message);
    });

    it('should check if "gender" is checked', () => {
      component.add(mockStudentWithoutGender);
      expect(component.add).toBeDefined();
    });
  });

  describe('UpdateStudent', () => {
    it('#update should update student', () => {
      spyOn(messagesService, 'handlerSuccess');
      component.update(mockStudent);
      expect(messagesService.handlerSuccess).toHaveBeenCalledWith(mockSuccessMessage.message);
    });
  });

  describe('GetStudent', () => {
    it('#getStudent should get student by id', () => {
      component.getStudent(mockStudentId);
      expect(component.getStudent).toBeDefined();
    });
  });
});
