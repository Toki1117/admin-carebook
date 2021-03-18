import { Component, OnInit } from '@angular/core';
import { ArchiveType } from '../../models/archive-type';
import {
  ITableAction,
  ITableColumn,
  ITableHeaderButton,
  ITableData,
  ITableRowClick,
} from 'src/app/shared/full-table/full-table.interface';
import { FormFieldCreatorModel } from 'src/app/shared/form-builder-helper/form-builder-helper.interface';
import { BehaviorSubject, from, Observable, iif } from 'rxjs';
import { Select2Data } from 'ng-select2-component';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchiveTypeService } from '../../services/archive-type.service';
import { orderBy } from 'lodash';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  selectedItem: ArchiveType = null;
  sidebarTitles;
  columns: ITableColumn[] = [];
  actions: ITableAction[] = [];
  buttons: ITableHeaderButton[] = [];
  showSidebar = false;
  data: ITableData<ArchiveType> = {
    data: [],
    loading: true,
  };
  formModel: FormFieldCreatorModel[] = [];
  titleSidebar = 'Agrega un nuevo Tipo  de Documento';
  archiveList = new BehaviorSubject<Select2Data>([]);
  constructor(
    private archiveTypeService: ArchiveTypeService,
    private modal: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setValues();
    this.loadData();
    this.sidebarTitles = {
      add: 'Agrega un nuevo Tipo  de Documento',
      edit: 'Editar Tipo de Documento',
    };
  }

  loadData() {
    this.archiveTypeService.getAll().subscribe((data) => {
      this.data = { data, loading: false };
      this.setForm();
    });
  }

  onTableEventHandler(event: ITableRowClick<ArchiveType>) {
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

  promptDelete(item: ArchiveType): Observable<ArchiveType> {
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
          this.removeOne(item.idType);
        }
      })
    );
  }

  removeOne(id: string) {
    this.archiveTypeService.deleteArchiveType(id).subscribe((res) => {
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

  setForm(model?: ArchiveType) {
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
      this.archiveTypeService.updateArchiveType(
        event,
        this.selectedItem?.idType
      ),
      this.archiveTypeService.createArchiveType(event)
    ).subscribe((res) => {
      this.alertService.show({ text: res.message, type: 'success' });
      this.onSidebarHide();
      this.loadData();
    });
  }

  onRowClick(event: ITableRowClick<ArchiveType>) {
    if (event.type === this.columns[0].field) {
      this.editAction(event.data);
    }
  }

  editAction(data: ArchiveType) {
    this.selectedItem = data;
    this.titleSidebar = this.sidebarTitles.edit;
    this.setForm(data);
    this.showSidebar = true;
  }
}
