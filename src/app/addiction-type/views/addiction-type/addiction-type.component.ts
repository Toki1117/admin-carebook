import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { BehaviorSubject, from, iif } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { FormFieldCreatorModel } from 'src/app/shared/form-builder-helper/form-builder-helper.interface';
import { ITableColumn, ITableAction, ITableHeaderButton, ITableData, ITableRowClick } from 'src/app/shared/full-table/full-table.interface';
import { AddictionTypeService } from '../../services/addiction-type.service';
import { AddictionType } from '../../models/addiction-type';

@Component({
  selector: 'app-addiction-type',
  templateUrl: './addiction-type.component.html',
  styleUrls: ['./addiction-type.component.scss']
})
export class AddictionTypeComponent implements OnInit {
  selectedItem: AddictionType = null;
  sidebarTitles;
  columns: ITableColumn[] = [];
  actions: ITableAction[] = [];
  buttons: ITableHeaderButton[] = [];
  showSidebar = false;
  data: ITableData<AddictionType> = {
    data: [],
    loading: true,
  };
  formModel: FormFieldCreatorModel[] = [];
  titleSidebar;
  specialtyList = new BehaviorSubject<Select2Data>([]);

  constructor(
    private addictTypeservice: AddictionTypeService,
    private modal: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setValues();
    this.loadData();
    this.sidebarTitles = {
      add: 'Agrega un nuevo Tipo de Adicción',
      edit: 'Editar Tipo de Adicción',
    };
    this.titleSidebar = this.sidebarTitles.add;
  }

  loadData() {
    this.addictTypeservice.getAddictionTypes()
      .subscribe((data) => {
        this.data = { data, loading: false };
        this.setForm();
      });
  }

  onTableEventHandler(event: ITableRowClick<AddictionType>) {
    switch (event.type) {
      case this.actions[0].label: {
        // edit
        this.editAction(event.data);
        break;
      }
      case this.actions[1].label: {
        // delete
        this.promptDelete(event.data).subscribe();
        break;
      }
      default:
        // add
        this.titleSidebar = this.sidebarTitles.add;
        this.showSidebar = true;
    }
  }

  promptDelete(item: AddictionType) {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      size: 'sm',
      centered: true,
    });
    const component: ConfirmDialogComponent = modalRef.componentInstance;
    component.text = `Quiere eliminar <b>${item.name}</b> para siempre?`;
    component.icon = 'mdi mdi-alert-circle-outline';
    return from(modalRef.result).pipe(
      tap((result) => {
        if (result === 'confirm') {
          this.removeOne(item.idAddiction);
        }
      })
    );
  }

  removeOne(id: string) {
    this.addictTypeservice.deleteAddictionType(id).subscribe((res) => {
      this.alertService.show({ text: res.message, type: 'success' });
      this.loadData();
    });
  }

  setValues() {
    this.columns = [
      {
        field: 'name',
        header: 'Nombre',
        clickable: true,
        ngStyle: { cursor: 'pointer' },
      },
    ];
    this.actions = [
      {
        icon: 'mdi mdi-table-edit',
        label: 'Editar',
        sidebarAction: true,
      },
      {
				icon: 'mdi mdi-delete',
				label: 'Borrar',
				sidebarAction: true,
			},
    ];
    this.buttons = [
      {
        text: 'Agregar Nuevo',
        icon: 'mdi mdi-plus',
        ngClass: 'btn-primary',
      },
    ];
  }

  onSidebarHide() {
    if (this.showSidebar) {
      this.showSidebar = false;
      this.selectedItem = null;
    }
  }

  setForm(model?: AddictionType) {
    this.formModel = [
      {
        name: 'name',
        label: 'Nombre',
        validators: [Validators.required, Validators.maxLength(255)],
        value: model?.name || '',
      },
    ];
  }

  submit(event) {
    iif(
      () => !!this.selectedItem,
      this.addictTypeservice.updateAddictionType(
        event,
        this.selectedItem?.idAddiction
      ),
      this.addictTypeservice.createAddictionType(event)
    ).subscribe((res) => {
      this.alertService.show({ text: res.message, type: 'success' });
      this.onSidebarHide();
      this.loadData();
    });
  }

  onRowClick(event: ITableRowClick<AddictionType>) {
    if (event.type === this.columns[0].field) {
      this.editAction(event.data);
    }
  }

  editAction(data: AddictionType) {
    this.selectedItem = data;
    this.titleSidebar = this.sidebarTitles.edit;
    this.setForm(data);
    this.showSidebar = true;
  }
}
