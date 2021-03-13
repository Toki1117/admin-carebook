import { ApiResponse } from './../../core/models/api-response.model';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { map } from 'rxjs/operators';
import { MedicalSpecialty } from '../models/med-specialty.model';

@Injectable()
export class MedSpecialtiesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<MedicalSpecialty[]> {
    return this.http.get<MedicalSpecialty[]>(API_URL.medSpecialty.main);
  }

  getSpecialtyById(id: string) {
    return this.http.get<MedicalSpecialty>(API_URL.medSpecialty.byId(id));
  }

  createSpecialty(
    specialty: MedicalSpecialty
  ): Observable<ApiResponse<MedicalSpecialty>> {
    return this.http
      .post<MedicalSpecialty>(API_URL.medSpecialty.create, specialty)
      .pipe(map((data) => ({ data, message: 'Guardado exitoso' })));
  }

  updateSpecialty(
    specialty: MedicalSpecialty,
    id: string
  ): Observable<ApiResponse<MedicalSpecialty>> {
    return this.http
      .put<MedicalSpecialty>(API_URL.medSpecialty.update(id), specialty)
      .pipe(map((data) => ({ data, message: 'Actualización exitosa' })));
  }

  deleteSpecialty(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<MedicalSpecialty>(API_URL.medSpecialty.delete(id))
      .pipe(map((data) => ({ data, message: 'Borrado exitoso' })));
  }
}
