import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { STUDENTS } from '../../mock-students';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students = STUDENTS;
  selectedStudent: Student;

  constructor() { }

  ngOnInit() {
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }  
}
