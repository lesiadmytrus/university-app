import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { filter } from 'rxjs/operators';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public isEdit: boolean;
  countries = ['USA', 'Canada', 'Uk', 'Australia', 'Costa Rica'];
  profileForm = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl(this.countries[3], Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  });

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.route.params.subscribe(params => {
      const studentId = params['id'];
      if (studentId) {
        this.getStudent(studentId);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isEdit = event.url.indexOf('edit') !== -1;
    });
  }

  ngOnInit() {
  }

  add(form: FormGroup): void {
    const student: Student = {...form.value};
    this.studentService.createStudent(student).subscribe(res => {
      this.messagesService.handlerSuccess(res['message']);
      this.router.navigate(['/students']);
    }, error => {
      this.messagesService.handlerError(error.error);
    });
  }

  update(form: FormGroup): void {
    const student: Student = {...form.value};
    this.studentService.update(student).subscribe(res => {
      this.messagesService.handlerSuccess(res['message']);
      this.router.navigate(['/students']);
    }, error => {
      this.messagesService.handlerError(error.error);
    });
  }

  getStudent(studentId: string): void {
    this.studentService.getById(studentId).subscribe((student: Student) => {
      this.profileForm.patchValue({...student});
    });
  }
}
