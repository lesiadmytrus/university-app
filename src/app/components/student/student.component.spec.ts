import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsDatepickerModule, BsModalService } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentComponent } from './student.component';
import { AgePipe } from '../../pipes/age.pipe';
import { SpinnerComponent } from '../spinner/spinner.component';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../models/student.model';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterModel } from 'src/app/models/filter.model';
import { Observable } from 'rxjs';

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
    value: 'test1'
  }
};

const eventWithEmptyValue = {
  target: {
    value: ''
  }
};

const mockSuccessMessage = {
  message: 'Student succesfully deleted'
};

class MockStudentService {
  getAll(query: Student): Observable<Student[]> {
    return of(studentsMock);
  }

 delete(id: string): Observable<Object> {
    return of(mockSuccessMessage);
  }
}

const mockStudentId = 'a6f75bae-c8bc-11e9-a32f-2a2ae2dbcce4';

const mockNewFilter: FilterModel = {
  field: 'firstName',
  value: 'test'
};

const mockActualFilterArray: FilterModel[] = [
  {
    field: 'lastName',
    value: 'test1'
  },
  {
    field: 'country',
    value: 'test3'
  }
];

const mockEmptyActualFilterArray: FilterModel[] = [
  {
    field: 'lastName',
    value: 'e'
  },
  {
    field: 'firstName',
    value: 'g'
  }
];

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let studentService: MockStudentService;
  let bsModalService: BsModalService;
  let mockSortSubject: BehaviorSubject<object> = new BehaviorSubject<{field: string}>({field: 'firstName'});
  let mockFilterSubject: BehaviorSubject<FilterModel> =
    new BehaviorSubject<{field: string, value: string}>({field: 'lastName', value: event.target.value});
  let mockEmptyfilterSubject: BehaviorSubject<object> =
    new BehaviorSubject<object>({field: 'lastName', value: eventWithEmptyValue.target.value});
  let filterInput: HTMLInputElement;
  let router: Router;

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
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([ ])
      ],
      providers: [
        { provide: FormGroup, useValue: FormGroup },
        { provide: StudentService, useClass: MockStudentService },
        { provide: BsModalService, useClass: BsModalService }
      ]
    })
      .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(StudentComponent);
          component = fixture.componentInstance;
          studentService = new MockStudentService();
          bsModalService = TestBed.get(BsModalService);
          router = TestBed.get(Router);

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

  describe('OpenConfirmationModel', () => {
    it('should open model', () => {
      spyOn(bsModalService, 'show');
      component.openConfirmationModal(fixture.nativeElement, mockStudentId);
      expect(bsModalService.show).toHaveBeenCalled();
    });
  });

  describe('OnSortTable', () => {
    it('#onSortTable should sort data in table', () => {
      const field = 'firstName';
      component.onSortTable(field);

      mockSortSubject.subscribe(sortField => {
        expect(sortField).toEqual({field: 'firstName'});
      });
    });
  });

  describe('OnFilterTable', () => {
    it('#onFilterTable should filter data in table', () => {
      const field = 'lastName';
      component.onFilterTable(field, event);

      mockFilterSubject.subscribe(filter => {
        expect(filter).toEqual({field: 'lastName', value: 'test1'});
      });
    });
  });

  describe('onFilterClear', () => {
    it('#onFilterClear should clear filter field', () => {
      const field = 'lastName';
      filterInput = fixture.nativeElement;
      component.onFilterClear(field, filterInput);
      mockEmptyfilterSubject.subscribe(clear => {
        expect(clear).toEqual({field: 'lastName', value: ''});
      });
    });
  });

  describe('Edit', () => {
    it('#edit should sort be order', () => {
      let navigateSpy = spyOn(router, 'navigate');
      component.edit(mockStudentId);
      expect(navigateSpy).toHaveBeenCalledWith([`/students/${mockStudentId}/edit`]);
    });
  });

  describe('GetFilterArray', () => {
    it('#getFilterArray should filter', () => {
      let result = component.getFilterArray(mockNewFilter, mockActualFilterArray);
      expect(result.length).toEqual(3);
    });

    it('should push new filter', () => {
      let result = component.getFilterArray(mockActualFilterArray[0], mockActualFilterArray);
      expect(result.length).toEqual(2);
    });

    it('should slice', () => {
      const emptyNewFilter: FilterModel = {field: 'firstName', value: ''};
      let result = component.getFilterArray(emptyNewFilter, mockEmptyActualFilterArray);
      expect(result.length).toEqual(1);
    });
  });
});
