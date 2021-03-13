import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchiveType } from '../models/archive-type';
import { API_URL } from 'src/app/shared/utils/api-urls';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ArchiveTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ArchiveType[]> {
    return this.http.get<ArchiveType[]>(API_URL.archiveType.main)
  }

  getArchiveTypeById(id: string) {
    return this.http.get<ArchiveType>(API_URL.archiveType.byId(id))
  }

  createArchiveType (archiveType: ArchiveType): Observable<ApiResponse<ArchiveType>> {
    return this.http
      .post<ArchiveType>(API_URL.archiveType.create, archiveType)
      .pipe(map((data) => ({ data, message: 'Guardado exitoso' })));
  }

  updateArchiveType (
    archiveType: ArchiveType, id: string): Observable<ApiResponse<ArchiveType>>  {
    return this.http
      .patch<ArchiveType>(API_URL.archiveType.update(id), archiveType)
      .pipe(map((data) => ({ data, message: 'Actualización exitosa' })));
  }

  deleteArchiveType (id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<ArchiveType>(API_URL.archiveType.delete(id))
      .pipe(map((data) => ({ data, message: 'Borrado exitoso' })));
  }
}
