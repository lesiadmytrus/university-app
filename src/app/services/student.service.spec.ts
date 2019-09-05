import { StudentService } from '../services/student.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Student } from '../models/student.model';

const studentsMock: Student[] = [{
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
}];

const mockCreatedStudent = {
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

const mockUpdatedStudent = {
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

const invalidStudentId = '1e25245a-a32f-2a2ae2dbcce4';
const mockId = 'f6acd450-c8c4-11e9-a32f-2a2ae2dbcce4';

describe('StudentService', () => {
  let httpTestingController: HttpTestingController;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: StudentService, useClass: StudentService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    studentService = TestBed.get(StudentService);
  });

  it('should be created the StudentService', () => {
    expect(studentService).toBeTruthy();
  });

  describe('CreateStudent', () => {
    it('#createStudent should send POST method with JSON response type', () => {
      studentService.createStudent().subscribe(() => {});

      const mockReq = httpTestingController.expectOne(request => {
        return request.method === 'POST';
      });

      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush({});
      httpTestingController.verify();
    });

    it('#createStudent should create student', () => {
      studentService.createStudent().subscribe((student: Student) => {
        expect(student).toEqual(mockCreatedStudent);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return !!request.url.match(/students/);
      });

      mockReq.flush(mockCreatedStudent);
    });
  });

  describe('GetAllStudents', () => {
    it('#getAll should send GET method with JSON response type', () => {
      studentService.getAll().subscribe(() => {});

      const mockReq = httpTestingController.expectOne(request => {
        return request.method === 'GET';
      });

      expect(mockReq.request.responseType).toEqual('json');

      mockReq.flush({});
      httpTestingController.verify();
    });

    it('#getAll should get all students', () => {
      studentService.getAll().subscribe((students: Student[]) => {
        expect(students).toEqual(studentsMock);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return !!request.url.match(/students/);
      });

      mockReq.flush(studentsMock);
    });
  });

  describe('GetStudentById', () => {
    it('#getById should get student with given id', () => {
      studentService.getById(studentsMock[0]._id).subscribe(student => {
        expect(student).toEqual(studentsMock[0]);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return !!request.url.match(/students/);
      });

      mockReq.flush(studentsMock[0]);
    });

    it('#getById should return false with invalid student id', () => {
      studentService.getById(invalidStudentId).subscribe(student => {
        expect(student).not.toEqual(studentsMock[0]);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return !!request.url.match(/students/);
      });

      mockReq.flush(studentsMock[1]);
    });
  });

  describe('UpdateStudent', () => {
    it('#UpdateStudent should update student', () => {
      studentService.update(mockId).subscribe((student: Student) => {
        expect(student).toEqual(mockUpdatedStudent);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return !!request.url.match(/students/);
      });

      mockReq.flush(mockUpdatedStudent);
    });
  });

  describe('DeleteStudent', () => {
    it('#delete should delete student with given id', () => {
      studentService.delete(studentsMock[0]._id).subscribe(response => {
        expect(response).toEqual(studentsMock[1]);
      });

      const mockReq = httpTestingController.expectOne(request => {
        return request.method === 'DELETE';
      });

      mockReq.flush(studentsMock[1]);
      httpTestingController.verify();
    });
  });
});
