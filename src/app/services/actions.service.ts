import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MessagesService } from './messages.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  deleteStudentId: string;
  modalRef: BsModalRef;
  public isLoading = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private messagesService: MessagesService,
    private studentService: StudentService
  ) { }

  public edit(studentId: string): void {
    this.router.navigate([`/students/${studentId}/edit`]);
  }

  public openConfirmationModal(template: TemplateRef<any>, id: string): void {
    this.deleteStudentId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: 'static'});
  }

  confirmDelete(): void {
    this.isLoading = true;
    this.studentService.delete(this.deleteStudentId).subscribe(res => {
      this.messagesService.handlerSuccess(res['message']);
      this.dismissModal();
      this.isLoading = false;
    }, error => {
      this.messagesService.handlerError(error.error);
    });
  }

  dismissModal() {
    this.modalRef.hide();
  }
}
