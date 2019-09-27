import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ActionsComponent } from '../actions/actions.component';
import studentsTableHeaders from '../../components/student/students-table-headers.json';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  public isLoading = false;
  public headers = studentsTableHeaders;
  public rowData: Student[] = [];
  public gridApi;
  public gridColumnApi;
  public defaultColDef;
  public frameworkComponents;
  public columnDefs = this.headers;

  constructor(
    private studentService: StudentService
  ) {
    this.frameworkComponents = {
      actionItem: ActionsComponent
    };
    this.defaultColDef = {
      autoHeight: true
    };
  }

  ngOnInit() {
    this.getStudents();

    this.studentService.subject.subscribe(students => {
      this.rowData = students;
    });
  }

  getStudents(query: string = ''): void {
    this.isLoading = true;
    this.studentService.getAll(query).subscribe(() => {
      this.isLoading = false;
    });
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }
}
