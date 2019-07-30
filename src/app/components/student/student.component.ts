import { Component, OnInit, TemplateRef } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessagesService } from '../../services/messages.service';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

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
  searchTextChanged = new BehaviorSubject<{field: string, value:string}>({field: '', value: ''});
  isLoading = false;

  headElements = [
    { title: '№', fieldName: 'number', sortable: false, filterable: false},
    { title: 'First Name', fieldName: 'firstName', sortable: true, filterable: true },
    { title: 'Last Name', fieldName: 'lastName', sortable: true, filterable: true },
    { title: 'Age', fieldName: 'age', sortable: true, filterable: true },
    { title: 'Birthday', fieldName: 'dateOfBirth', sortable: true, filterable: true },
    { title: 'Gender', fieldName: 'gender', sortable: true, filterable: true },
    { title: 'Email', fieldName: 'email', sortable: true, filterable: true },
    { title: 'Phone Number', fieldName: 'phoneNumber', sortable: true, filterable: true },
    { title: 'Country', fieldName: 'country', sortable: true, filterable: true },
    { title: 'Actions', fieldName: 'actions', sortable: false, filterable: false }
  ];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private modalService: BsModalService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit() {
    this.searchTextChanged.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(filterObj => {
      let query = '';

      if (filterObj.field && filterObj.value) {
        query = `?filter=${filterObj.field} ct ${filterObj.value}`;
      }
      
      this.getStudents(query);
    });

    this.getStudents();
  }

  getStudents(query: string = ''): void {
    this.isLoading = true;
    this.studentService.getAll(query).subscribe(students => {
      this.isLoading = false;
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
    this.isLoading = true;
    this.studentService.delete(this.deleteStudentId).subscribe(res => {
      this.messagesService.handlerSuccess(res['message']);
      this.students.splice(this.students.findIndex(student => student._id === this.deleteStudentId), 1);
      this.dismissModal();      
      this.isLoading = false;
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

  filterTable(event, field: string): void {
    this.searchTextChanged.next({value: event.target.value, field: field});
  }
}
