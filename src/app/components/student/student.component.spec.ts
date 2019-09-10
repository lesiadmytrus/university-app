import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsDatepickerModule, BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentComponent } from './student.component';
import { AgePipe } from '../../pipes/age.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../models/student.model';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { TemplateRef } from '@angular/core';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve());
}

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

const event = {
  target: {
    value: 'test'
  }
};

// const filterSubject = (field: string, value: any) => of(<{field: string, value: any}>({field: 'lastName', value: event.target.value }));

const stubbedStudentsService = {
  getAll: (query: string) => of(studentsMock),
  delete: (id: string) => of(),
  // sortSubject: (fiels: string) => of({field: 'firstName'})
};

const stubbedModalService = {
  show: (content: string, config: ModalOptions) => void {}
};

const stubbedModalRef = {
  hide: () => null
};

const mockData = {
  field: 'firstName'
};

const mockSuccessMessage = 'You are success!';
const mockErrorMessage = { message: 'It is an error!' };
const mockStudentId = 'a6f75bae-c8bc-11e9-a32f-2a2ae2dbcce4';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let studentService: jasmine.SpyObj<StudentService>;
  let toster: ToastrService;
  let messagesService: MessagesService;
  let bsModalService: BsModalService;
  let sortSubject: BehaviorSubject<object> = new BehaviorSubject<object>({field: 'firsName'});
  let filterSubject: BehaviorSubject<object> = new BehaviorSubject<object>({field: 'lastName', value: event.target.value });
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: FormGroup, useValue: FormGroup },
        { provide: StudentService, useValue: stubbedStudentsService },
        { provide: BsModalService, useClass: BsModalService },
        { provide: ToastrService, useClass: ToastrService },
        { provide: TemplateRef, useClass: TemplateRef }
      ]
    })
      .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(StudentComponent);
          component = fixture.componentInstance;
          studentService = TestBed.get(StudentService);
          bsModalService = TestBed.get(BsModalService);
          messagesService = TestBed.get(MessagesService);
          // bsModalService.hide(1);
          // TestBed.overrideComponent(TestComponent, {
          //   set: {
          //     template: '<ng-template></ng-template>'
          //   }
          // });

          fixture.detectChanges();
        });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('GetAllStudents', () => {
    it('#getAll should get all students', () => {
      const query = '';
      component.getStudents(query);
      expect(component.students).toEqual(studentsMock);
    });

    it('#getAll should set @isLoading "false"', () => {
      const query = '';
      component.getStudents(query);
      expect(component.isLoading).toEqual(false);
    });
  });

  describe('ConfirmDeletation', () => {
    it('#delete should delete student', () => {
      spyOn(studentService, 'delete').and.callThrough();
      component.confirmDeletion();
      expect(studentService.delete).toHaveBeenCalled();
    });

    // it('#dismissModal should close modal window', () => {
      // spyOn(stubbedModalRef, 'hide').and.callThrough();
      // component.dismissModal();
      // expect(stubbedModalService.hide).toHaveBeenCalled();

      // spyOn(component.modalRef, 'hide').and.callThrough();
      // component.dismissModal();
      // expect(component.modalRef.hide).toHaveBeenCalled();
      // expect(component.dismissModal).toHaveBeenCalled();
    // });
  });

  describe('OpenConfirmationModel', () => {
    it('should open model', () => {
      // spyOn(stubbedModalService, 'show').and.returnValue(mockModalRef);
      // component.openConfirmationModal(fixture.nativeElement, mockStudentId);
      // expect(stubbedModalService.show).toHaveBeenCalled();

      spyOn(bsModalService, 'show').and.returnValue(mockModalRef);
      component.openConfirmationModal(fixture.nativeElement, mockStudentId);
      expect(bsModalService.show).toHaveBeenCalled();
    });
  });

  // describe('OnSortTable', () => {
  //   it('#onSortTable should sort data', () => {
  //     const field = 'firstName';
      // const field = 'firstName';
      // spyOn(stubbedStudentsService, 'sortSubject').and.returnValue({field});
      // component.onSortTable(field);
      // sortSubject.subscribe(sortField=> {
      //   console.log('sdrtert',sortSubject);
      //   expect(sortField).toBe({field: 'firstName'});
      //   stubbedStudentsService.sortSubject('firstName');
      // });

  //     spyOn(sortSubject, 'next').and.callThrough();
  //     component.onSortTable(field);
  //     sortSubject.subscribe(sort => {
  //       expect(sortSubject.next).toHaveBeenCalledWith(sort);
  //     });
  //   });
  // });

  // describe('OnFilterTable', () => {
  //   it('#onFilterTable should filter data', () => {
  //     const field = 'lastName';
  //     spyOn(filterSubject, 'next').and.callThrough();
  //     component.onFilterTable(field, event);
      // filterSubject.subscribe((filterData) => {
      //   expect(filterData).toBe({field: 'lastName', event: 'son'});
      //   expect(event).toBe('son');
      // });
    //  expect(filterSubject.next).toHaveBeenCalled();

      // filterSubject.subscribe(filter => {
      //   expect(filter).toEqual({field: 'lastName', value: 'test'});
      // });
    // });
  // });

  fdescribe('onFilter', () => {
    it('should onfilter', () => {
      sortSubject.subscribe(res => expect(res).toEqual(mockData));
      component.onSortTable('firstName');
      sortSubject.next(mockData);
    });
  });
});
