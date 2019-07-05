import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StudentService {
  apiURL = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  public createStudent(student) {
    return this.http.post(this.apiURL, student);
  }
}
