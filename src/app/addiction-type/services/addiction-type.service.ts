import { Injectable } from '@angular/core';
import { AddictionType } from '../models/addiction-type';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { API_URL } from 'src/app/shared/utils/api-urls';

@Injectable()
export class AddictionTypeService {

  constructor(private http: HttpClient, private ls: StorageService) { }

  getAddictionTypes() {
    return this.http.get<AddictionType>(API_URL.addictionType.main)
  }

  getAddictionTypebyId(id: string) {
    return this.http.get<AddictionType>(API_URL.addictionType.byId(id))
  }

  createAddictionType (addictionType: AddictionType) {
    const {name} = addictionType
    return this.http.post<AddictionType>(API_URL.addictionType.create, name)
  }

  updateAddictionType (addictionType: AddictionType, id: string) {
    const {name} = addictionType
    return this.http.put<AddictionType>(API_URL.addictionType.update(id), name)
  }

  deleteAddictionType (id: string) {
    return this.http.delete<AddictionType>(API_URL.addictionType.delete(id))
  }
}
