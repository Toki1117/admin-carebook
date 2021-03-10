import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {
	ITableAction,
	ITableColumn,
	ITableData,
	ITableHeaderButton,
	ITableRowClick,
} from 'src/app/shared/full-table/full-table.interface';
import { MedSpecialtiesService } from '../../services/med-specialties.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
	columns: ITableColumn[] = [];
	actions: ITableAction[] = [];
	buttons: ITableHeaderButton[] = [];
	showSidebar = false;
	data$: Observable<ITableData<any>> = new BehaviorSubject<ITableData<any>>({
		data: [],
		loading: true,
	});
	constructor(private medSpecialyService: MedSpecialtiesService,  private modal: NgbModal) {}

	ngOnInit(): void {
		this.setValues();
		this.data$ = this.medSpecialyService
			.getAll()
			.pipe(map((x) => ({ data: x, loading: false })));
		//.subscribe((x) => console.log(x));
	}

	onTableEventHandler(event: ITableRowClick<any>) {
		console.log(event);
		
		switch (event.type) {
		  case this.actions[0].label: {
			// edit
			this.showSidebar = true;
			break;
		  }
		  case this.actions[1].label: {
			// delete
			this.promptDelete(event.data).subscribe();
			break;
		  }
		  default:
			// add
			this.showSidebar = true;
		}
	  }

	  promptDelete(item: any): Observable<any> {
		const modalRef = this.modal.open(ConfirmDialogComponent, {
		  size: 'sm',
		  centered: true,
		});
		const component: ConfirmDialogComponent = modalRef.componentInstance;
		component.text = `Quiere remover <b>${item.name}</b> para siempre?`;
		component.icon = 'mdi mdi-alert-circle-outline';
		return from(modalRef.result).pipe(
		  tap((result) => {
			if (result === 'confirm') {
			  this.removeOne(item.idMedicalSpecialty);
			}
		  })
		);
	  }

	  removeOne(id) {}

	  setValues() {
		this.columns = [
			{
				field: 'name',
				header: 'Nombre',
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
		}
	  }
}
