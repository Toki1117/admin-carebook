import { NgModule } from '@angular/core';

import { FullTableComponent } from './full-table.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RatingComponent } from './components/rating/rating.component';
import { SharedModule } from '../shared.module';
import { AvatarImageModule } from '../avatar-image/avatar-image.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AvatarImageModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [FullTableComponent, RatingComponent],
  declarations: [FullTableComponent, RatingComponent],
  providers: [DecimalPipe],
})
export class FullTableModule {}
