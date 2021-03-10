import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { map } from 'rxjs/operators';

@Injectable()
export class MedSpecialtiesService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<[]>(API_URL.medSpecialty.main);
  }
}
