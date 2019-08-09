import { Component, OnInit, TemplateRef } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessagesService } from '../../services/messages.service';
import { debounceTime } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { FilterField } from '../../models/filter.model';

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
  filterSubject = new BehaviorSubject<{field: string, value: string}>({field: '', value: ''});
  sortSubject = new BehaviorSubject<{sortField: string}>({sortField: ''});
  isLoading = false;
  currentFilterArray: Array<FilterField> = [];

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
    const sortStream = this.sortSubject.pipe();
    const filterStream = this.filterSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    );

    combineLatest(sortStream, filterStream).subscribe(combinedSubject => {
      let query = '';
      const [sort, filter] = combinedSubject;
      this.currentFilterArray = this.getFilterArray(filter, this.currentFilterArray);

      if (sort.sortField) {
        query = this.getSortQuery(sort.sortField);
      }

      query = query ? `${query}&${this.setQuery(this.currentFilterArray)}` : `?${this.setQuery(this.currentFilterArray)}`;

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
    const { modalRef } = {...this};
    modalRef.hide();
  }

  sortTable(field: string): void {
    this.sortSubject.next({sortField: field});
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

  filterTable(field: string, event): void {
    this.filterSubject.next({field: field, value: event.target.value});
  }

  getFilterArray(newFilter: FilterField, actualFilterArray: Array<FilterField>): Array<FilterField> {
    let filterArray = [...actualFilterArray];
    const fieldPredicate = (item: FilterField) => item.field === newFilter.field;

    if (filterArray.length === 0) {
      if (newFilter.field && newFilter.value) {
        filterArray.push(newFilter);
        return filterArray;
      } else {
        return filterArray;
      }
    } else {
      const existFilter = filterArray.find(fieldPredicate);

      if (existFilter) {
        const existIndex = filterArray.findIndex(fieldPredicate);

        if (newFilter.field && newFilter.value) {
          filterArray.splice(existIndex, 1);
          filterArray.push(newFilter);
        } else {
          filterArray.splice(existIndex, 1);
        }
      } else {
        filterArray.push(newFilter);
      }

      return filterArray;
    }
  }

  setQuery(filterArray: Array<FilterField>): string {
    const filters: Array<string> = [];
    filterArray.forEach(item => {
      filters.push(`filter=${item.field} ct ${item.value}`);
    });
    
    const query = filters.length ? `${filters.join('&')}` : '';

    return query;
  }

  showInputButton(field: string): boolean {
    const existFilter = this.currentFilterArray.find(filter => filter.field === field);

    return !!(existFilter && existFilter.value);
  }

  deleteInputButton(field: string, filterInput: HTMLInputElement): void {
    filterInput.value = '';
    this.filterSubject.next({field, value: ''});
  }
}
