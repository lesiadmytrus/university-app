import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { filter } from 'rxjs/operators';
import { MessagesService } from '../../services/messages.service';
import nations from '../../countries.json';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  public isEdit: boolean;

  public countries = nations.countries;
  public countryDefault = null;

  public emailValidators = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$';
  public phoneValidators = '^\\+[0-9-\\ ]+$';

  profileForm = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailValidators)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneValidators)]),
    country: new FormControl(this.countryDefault, Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('')
  });

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];


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
    if (!form.value.gender) {
      this.messagesService.handlerWarning();
      return;
    }

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
