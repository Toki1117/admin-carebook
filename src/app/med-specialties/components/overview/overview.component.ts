import { Component, OnInit } from '@angular/core';
import { MedSpecialtiesService } from '../../services/med-specialties.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private medSpecialyService: MedSpecialtiesService)  { }

  ngOnInit(): void {
    this.medSpecialyService.getAll().subscribe((x) => console.log(x));
  }

}
