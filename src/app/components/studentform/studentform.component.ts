import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.scss']
})
export class StudentformComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    country: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl('') 
  });

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  add() {
    const student = {...this.profileForm.value};
    this.studentService.createStudent(student)
      .subscribe();
  }
}
