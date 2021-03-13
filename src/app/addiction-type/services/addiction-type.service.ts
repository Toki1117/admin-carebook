import { Injectable } from '@angular/core';
import { AddictionType } from '../models/addiction-type';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable()
export class AddictionTypeService {
  constructor(private http: HttpClient) {}

  getAddictionTypes() {
    return this.http.get<AddictionType[]>(API_URL.addictionType.main);
  }

  getAddictionTypeById(id: string) {
    return this.http.get<AddictionType>(API_URL.addictionType.byId(id));
  }

  createAddictionType(
    addictionType: AddictionType
  ): Observable<ApiResponse<AddictionType>> {
    return this.http
      .post<AddictionType>(API_URL.addictionType.create, addictionType)
      .pipe(map((data) => ({ data, message: 'Guardado exitoso' })));
  }

  updateAddictionType(
    addictionType: AddictionType,
    id: string
  ): Observable<ApiResponse<AddictionType>> {
    return this.http
      .put<AddictionType>(API_URL.addictionType.update(id), addictionType)
      .pipe(map((data) => ({ data, message: 'Actualización exitosa' })));
  }

  deleteAddictionType(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<AddictionType>(API_URL.addictionType.delete(id))
      .pipe(map((data) => ({ data, message: 'Borrado exitoso' })));
  }
}
