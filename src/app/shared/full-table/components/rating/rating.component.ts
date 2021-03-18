import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() ratingValue: 0 | 1 | 2 | 3 | 4 | 5 = 0;
  ratingStars: number[];

  ngOnInit(): void {
    this.ratingStars = Array(this.ratingValue).fill(1);
    if (this.ratingStars.length < 5) {
      const missingStars = 5 - this.ratingValue;
      for (let i = 0; i < missingStars; i++) {
        this.ratingStars.push(0);
      }
    }
  }
}
