import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  countries = ['USA', 'Canada', 'Uk', 'Australia', 'Costa Rica'];
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl(''),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    country: new FormControl(this.countries[3]),
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

    this.profileForm.reset();
  }
}
