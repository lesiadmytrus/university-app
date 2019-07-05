import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private apiURL = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  public createStudent(student: Student): Observable<Object> {
    return this.http.post(this.apiURL, student);
  }
}
