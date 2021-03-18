import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoaderService {
  private loadingStatus$ = new BehaviorSubject(false);

  get status(): Observable<boolean> {
    return this.loadingStatus$.asObservable();
  }

  setStatus(status: boolean) {
    if (this.loadingStatus$.value !== status) {
      this.loadingStatus$.next(status);
    }
  }
}
