import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { BehaviorSubject, from, iif, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { FormFieldCreatorModel } from 'src/app/shared/form-builder-helper/form-builder-helper.interface';
import {
  ITableAction,
  ITableColumn,
  ITableData,
  ITableHeaderButton,
  ITableRowClick,
} from 'src/app/shared/full-table/full-table.interface';
import { MedicalSpecialty } from '../../models/med-specialty.model';
import { MedSpecialtiesService } from '../../services/med-specialties.service';
import { orderBy } from 'lodash';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  selectedItem: MedicalSpecialty = null;
  sidebarTitles;
  columns: ITableColumn[] = [];
  actions: ITableAction[] = [];
  buttons: ITableHeaderButton[] = [];
  showSidebar = false;
  data: ITableData<MedicalSpecialty> = {
    data: [],
    loading: true,
  };
  formModel: FormFieldCreatorModel[] = [];
  titleSidebar = 'Agrega una nueva Especialidad Médica';
  specialtyList = new BehaviorSubject<Select2Data>([]);

  constructor(
    private medSpecialyService: MedSpecialtiesService,
    private modal: NgbModal,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.setValues();
    this.loadData();
    this.sidebarTitles = {
      add: 'Agrega una nueva Especialidad Médica',
      edit: 'Editar Especialidad Médica',
    };
  }

  loadData() {
    this.medSpecialyService
      .getAll()
      .pipe(map((ms) => this.transformData(ms)))
      .subscribe((data) => {
        this.data = { data, loading: false };
        this.setForm();
      });
  }

  transformData(data: MedicalSpecialty[]) {
    const selectData: Select2Data = [];
    const tableData = data.map((ms) => {
      selectData.push({ label: ms.name, value: ms.idMedicalSpecialty });
      const item = {
        ...ms,
        parent: ms.idParent
          ? data.find((item) => item.idMedicalSpecialty === ms.idParent).name
          : 'NA',
      };
      return item;
    });

    this.specialtyList.next(orderBy(selectData, 'name'));
    return tableData;
  }

  onTableEventHandler(event: ITableRowClick<MedicalSpecialty>) {
    switch (event.type) {
      case this.actions[0].label: {
        // edit
        this.editAction(event.data);
        break;
      }
      /* case this.actions[1].label: {
        // delete
        this.promptDelete(event.data).subscribe();
        break;
      } */
      default:
        // add
        this.titleSidebar = this.sidebarTitles.add;
        this.showSidebar = true;
    }
  }

  promptDelete(item: any): Observable<any> {
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
          this.removeOne(item.idMedicalSpecialty);
        }
      })
    );
  }

  removeOne(id: string) {
    this.medSpecialyService.deleteSpecialty(id).subscribe((res) => {
      this.alertService.show({text: res.message, type: 'success'});
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
      {
        field: 'description',
        header: 'Descripcion',
      },
      {
        field: 'parent',
        header: 'Especialidad Padre',
      },
    ];
    this.actions = [
      {
        icon: 'mdi mdi-table-edit',
        label: 'Editar',
        sidebarAction: true,
      },
      /* {
				icon: 'mdi mdi-delete',
				label: 'Borrar',
				sidebarAction: true,
			}, */
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

  setForm(model?: MedicalSpecialty) {
    this.formModel = [
      {
        name: 'name',
        label: 'Nombre',
        validators: [Validators.required],
        value: model?.name || '',
      },
      {
        name: 'description',
        label: 'Descripción',
        isTextarea: true,
        value: model?.description || '',
      },
      {
        name: 'idParent',
        label: 'Especialidad Padre',
        isSelect: true,
        selectValues: () => this.specialtyList.asObservable(),
        value: model?.idParent || null,
      },
    ];
  }

  submit(event) {
    iif(
      () => !!this.selectedItem,
      this.medSpecialyService.updateSpecialty(
        event,
        this.selectedItem?.idMedicalSpecialty
      ),
      this.medSpecialyService.createSpecialty(event)
    ).subscribe((res) => {
      this.alertService.show({text: res.message, type: 'success'});
      this.onSidebarHide();
      this.loadData();
    });
  }

  onRowClick(event: ITableRowClick<MedicalSpecialty>) {
    if (event.type === this.columns[0].field) {
      this.editAction(event.data);
    }
  }

  editAction(data: MedicalSpecialty) {
    this.selectedItem = data;
    this.titleSidebar = this.sidebarTitles.edit;
    this.setForm(data);
    this.showSidebar = true;
  }
}
