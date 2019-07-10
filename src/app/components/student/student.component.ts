import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  student = Student;
  selectedStudent: Student;
  modalRef: BsModalRef;
  idForDeletion: string;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.getStudents();
  }

  onSelect(student: Student): void {
    this.selectedStudent = student;
  }

  getStudents(): void {
    this.studentService.getAll()
      .subscribe(students => {
        this.students = students;
      });
  }

  edit(studentId: string): void {
    this.router.navigate([`/students/${studentId}/edit`]);
  }

  openConfirmationModal(template: TemplateRef<any>, id: string): void {
    this.idForDeletion = id;
    this.modalRef = this.modalService
      .show(template, {class: 'modal-sm', backdrop: 'static'});
  }

  confirmDeletion(): void {
    this.studentService.delete(this.idForDeletion)
      .subscribe(() => {
        this.students.splice(this.students.findIndex(student => student._id === this.idForDeletion), 1);
        this.dismissModal();
      });
  }

  dismissModal(): void {
    this.modalRef.hide();
  }
}
