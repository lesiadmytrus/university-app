import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../app/models/student.model';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class StudentService {

  constructor(
    private http: HttpClient
  ) {}

  createStudent(student) {
    return this.http.post('http://localhost:3000/api/students', student);
  }
}


