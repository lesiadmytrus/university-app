import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
   private apiURL = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  public createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiURL, student);
  }
}
