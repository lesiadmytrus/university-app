import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  selectedStudent: Student;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  getStudents(): void {
    this.studentService.getAll()
      .subscribe(students => {
        this.students = students;
    });
  }
}
