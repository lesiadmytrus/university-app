import { Component, OnInit, TemplateRef } from '@angular/core';
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
  sortOrder = '';
  clickedColumn: string;

  headElements = [
    { title: '№', fieldName: 'number', sortable: false },
    { title: 'First Name', fieldName: 'firstName', sortable: true },
    { title: 'Last Name', fieldName: 'lastName', sortable: true },
    { title: 'Age', fieldName: 'age', sortable: false },
    { title: 'Birthday', fieldName: 'dateOfBirth', sortable: false },
    { title: 'Gender', fieldName: 'gender', sortable: false },
    { title: 'Email', fieldName: 'email', sortable: true },
    { title: 'Phone Number', fieldName: 'phoneNumber', sortable: false },
    { title: 'Country', fieldName: 'country', sortable: true },
    { title: 'Actions', fieldName: 'actions', sortable: false }
  ];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private modalService: BsModalService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(query: string = ''): void {
    this.studentService.getAll(query).subscribe(students => {
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

  sortTable(field: string): void {
    const query = this.getSortQuery(field);

    this.getStudents(query);
  }

  private getSortQuery(field: string): string {
    let query = '';
    
    if (this.clickedColumn === field) {
      this.sortOrder = this.getSortOrder(this.sortOrder);
    } else {
      this.clickedColumn = field;
      this.sortOrder = this.getSortOrder('');
    }
    
    if (this.sortOrder) {
      query = `?sort=${field}:${this.sortOrder}`;
    }

    return query;
  }

  private getSortOrder(currentSortOrder: string): string {
    if (currentSortOrder === 'asc') {
      return 'desc';
    } else if (currentSortOrder === 'desc') {
      return '';
    } else {
      return 'asc';
    }
  }
}
