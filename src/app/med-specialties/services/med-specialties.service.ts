import { API_URL } from 'src/app/shared/utils/api-urls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedSpecialtiesService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(API_URL.medSpecialty.main);
  }
}
