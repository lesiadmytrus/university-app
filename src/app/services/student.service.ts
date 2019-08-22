import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly apiURL = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {}

  public createStudent(student: Student): Observable<Object> {
    return this.http.post(this.apiURL, student);
  }

  public getAll(query: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiURL}${query}`);
  }

  public getById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiURL}/${id}`);
  }

  public update(student: Student): Observable<Object> {
    return this.http.put(`${this.apiURL}/${student._id}`, student);
  }

  public delete(id: string): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
