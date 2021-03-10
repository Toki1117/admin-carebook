import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
	ITableColumn,
	ITableData,
} from 'src/app/shared/full-table/full-table.interface';
import { MedSpecialtiesService } from '../../services/med-specialties.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
	columns: ITableColumn[] = [];
	data$: Observable<ITableData<any>> = new BehaviorSubject<ITableData<any>>({
		data: [],
		loading: true,
	});
	constructor(private medSpecialyService: MedSpecialtiesService) {}

	ngOnInit(): void {
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
		this.data$ = this.medSpecialyService
			.getAll()
			.pipe(map((x) => ({ data: x, loading: false })));
		//.subscribe((x) => console.log(x));
	}
}
