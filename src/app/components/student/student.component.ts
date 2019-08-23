import { Component, OnInit, TemplateRef } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessagesService } from '../../services/messages.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { FilterModel } from '../../models/filter.model';
import studentsTableHeaders from '../../components/student/students-table-headers.json';

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
  sortSubject = new BehaviorSubject<{field: string}>({field: ''});
  isLoading = false;
  currentFilterArray: Array<FilterModel> = [];
  headers = studentsTableHeaders.data;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private modalService: BsModalService,
    private messagesService: MessagesService
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

      if (sort.field) {
        query = this.getSortQuery(sort.field);
      }

      const filterQuery = this.getFilterQuery(this.currentFilterArray);
      query = query ? `${query}&${this.getFilterQuery(this.currentFilterArray)}` : filterQuery ? `?${filterQuery}` : '';

      query && this.getStudents(query);
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

  onSortTable(field: string): void {
    this.sortSubject.next({field: field});
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

  onFilterTable(field: string, event): void {
    this.filterSubject.next({field: field, value: event.target.value});
  }

  getFilterArray(newFilter: FilterModel, actualFilterArray: Array<FilterModel>): Array<FilterModel> {
    const filterArray = [...actualFilterArray];
    const fieldPredicate = (item: FilterModel) => item.field === newFilter.field;

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

  getFilterQuery(filterArray: Array<FilterModel>): string {
    const filters: Array<string> = [];
    filterArray.forEach(item => {
      filters.push(`filter=${item.field} ct ${item.value}`);
    });
    
    const query = filters.length ? `${filters.join('&')}` : '';

    return query;
  }

  isShowFilter(field: string): boolean {
    const existFilter = this.currentFilterArray.find(filter => filter.field === field);

    return !!(existFilter && existFilter.value);
  }

  onFilterClear(field: string, filterInput: HTMLInputElement): void {
    filterInput.value = '';
    this.filterSubject.next({field, value: ''});
  }
}
