import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { BehaviorSubject, Observable, from, iif } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { FormFieldCreatorModel } from 'src/app/shared/form-builder-helper/form-builder-helper.interface';
import { ITableColumn, ITableAction, ITableHeaderButton, ITableData, ITableRowClick } from 'src/app/shared/full-table/full-table.interface';
import { PhysicalActivity } from '../../models/physical-activity';
import { PhysicalActivityService } from '../../services/physical-activity.service';

@Component({
  selector: 'app-physical-activity',
  templateUrl: './physical-activity.component.html',
  styleUrls: ['./physical-activity.component.scss']
})
export class PhysicalActivityComponent implements OnInit {
  selectedItem: PhysicalActivity = null;
  sidebarTitles;
  columns: ITableColumn[] = [];
  actions: ITableAction[] = [];
  buttons: ITableHeaderButton[] = [];
  showSidebar = false;
  data: ITableData<PhysicalActivity> = {
    data: [],
    loading: true,
  };
  formModel: FormFieldCreatorModel[] = [];
  titleSidebar = '';
  specialtyList = new BehaviorSubject<Select2Data>([]);

  constructor(
    private physActService: PhysicalActivityService,
    private modal: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setValues();
    this.loadData();
    this.sidebarTitles = {
      add: 'Agrega un nuevo Tipo de Actividad Física',
      edit: 'Editar Tipo de Actividad Física',
    };
    this.titleSidebar = this.sidebarTitles.add;
  }

  loadData() {
    this.physActService.getPhysicalActivitys().subscribe((data) => {
      this.data = { data, loading: false };
      this.setForm();
    });
  }

  onTableEventHandler(event: ITableRowClick<PhysicalActivity>) {
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

  promptDelete(item: PhysicalActivity): Observable<any> {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      size: 'sm',
      centered: true,
    });
    const component: ConfirmDialogComponent = modalRef.componentInstance;
    component.text = `Quiere eliminar <b>${item.intensity}</b> para siempre?`;
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
    this.physActService.deletePhysicalActivity(id).subscribe((res) => {
      this.alertService.show({ text: res.message, type: 'success' });
      this.loadData();
    });
  }

  setValues() {
    this.columns = [
      {
        field: 'intensity',
        header: 'Intensidad',
        clickable: true,
        ngStyle: { cursor: 'pointer' },
      },
      {
        field: 'description',
        header: 'Descripcion',
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

  setForm(model?: PhysicalActivity) {
    this.formModel = [
      {
        name: 'intensity',
        label: 'Intensidad',
        validators: [Validators.required],
        value: model?.intensity || '',
      },
      {
        name: 'description',
        label: 'Descripción',
        isTextarea: true,
        value: model?.description || '',
      },
    ];
  }

  submit(event) {
    iif(
      () => !!this.selectedItem,
      this.physActService.updatePhysicalActivity(
        event,
        this.selectedItem?.idType
      ),
      this.physActService.createPhysicalActivity(event)
    ).subscribe((res) => {
      this.alertService.show({ text: res.message, type: 'success' });
      this.onSidebarHide();
      this.loadData();
    });
  }

  onRowClick(event: ITableRowClick<PhysicalActivity>) {
    if (event.type === this.columns[0].field) {
      this.editAction(event.data);
    }
  }

  editAction(data: PhysicalActivity) {
    this.selectedItem = data;
    this.titleSidebar = this.sidebarTitles.edit;
    this.setForm(data);
    this.showSidebar = true;
  }
}
