import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  modalRef: BsModalRef;
  deleteStudentId: string;

  headElements = ['№', 'First Name', 'Last Name', 'Age', 'Birthday', 'Gender', 'Email', 'Phonenumber', 'Country', 'Actions'];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private modalService: BsModalService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAll().subscribe(students => {
      this.students = students;
    });
  }

  edit(studentId: string): void {
    this.router.navigate([`/students/${studentId}/edit`]);
  }

  openConfirmationModal(template: TemplateRef<any>, id: string): void {
    this.deleteStudentId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: 'static'});
  }

  confirmDeletion(): void {
    this.studentService.delete(this.deleteStudentId).subscribe(res => {
      this.messagesService.handlerSuccess(res['message']);
      this.students.splice(this.students.findIndex(student => student._id === this.deleteStudentId), 1);
      this.dismissModal();
    }, error => {
      this.messagesService.handlerError(error.error);
    });
  }

  dismissModal(): void {
    this.modalRef.hide();
  }
}
