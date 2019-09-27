import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Action } from '../../models/action.model';
import { ActionsService } from '../../services/actions.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.componet.scss']
})
export class ActionsComponent {
  public params: any;
  @ViewChild('template') public templateRef: TemplateRef<any>;
  public actions: Action[] = [];

  constructor (
    private actionsService: ActionsService
  ) { }

  agInit(params: any) {
    this.params = params;

    this.actions = [
      { name: 'fa fa-pencil btn btn-outline-primary', type: 'edit', params: {
        id: this.params.data._id
      }},
      { name: 'fa fa-trash-o btn btn-outline-danger', type: 'openConfirmationModal', params: {
        template: this.templateRef,
        id: this.params.data._id
      }}
    ];
  }

  public handleAction(action: Action): void {
    this[action.type]({...action.params});
  }

  edit(params): void {
    this.actionsService.edit(params.id);
  }

  openConfirmationModal(params): void {
    this.actionsService.openConfirmationModal(params.template, params.id);
  }

  confirmDelete(): void {
    this.actionsService.confirmDelete();
  }

  dismissModal() {
    this.actionsService.dismissModal();
  }
}
