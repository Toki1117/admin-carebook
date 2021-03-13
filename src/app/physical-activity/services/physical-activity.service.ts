import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhysicalActivity } from '../models/physical-activity';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable()
export class PhysicalActivityService {
  constructor(private http: HttpClient) {}

  getPhysicalActivitys() {
    return this.http.get<PhysicalActivity[]>(API_URL.physicalActivity.main);
  }

  getPhysicalActivityById(id: string): Observable<PhysicalActivity> {
    return this.http.get<PhysicalActivity>(API_URL.physicalActivity.byId(id));
  }

  createPhysicalActivity(
    physicalActivity: PhysicalActivity
  ): Observable<ApiResponse<PhysicalActivity>> {
    return this.http
      .post<PhysicalActivity>(API_URL.physicalActivity.create, physicalActivity)
      .pipe(map((data) => ({ data, message: 'Guardado exitoso' })));
  }

  updatePhysicalActivity(
    physicalActivity: PhysicalActivity,
    id: string
  ): Observable<ApiResponse<PhysicalActivity>> {
    return this.http
      .patch<PhysicalActivity>(
        API_URL.physicalActivity.update(id),
        physicalActivity
      )
      .pipe(map((data) => ({ data, message: 'Actualización exitosa' })));
  }

  deletePhysicalActivity(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<PhysicalActivity>(API_URL.physicalActivity.delete(id))
      .pipe(map((data) => ({ data, message: 'Borrado exitoso' })));
  }
}
