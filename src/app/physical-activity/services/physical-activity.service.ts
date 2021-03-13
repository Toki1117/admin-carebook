import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { PhysicalActivity } from '../models/physical-activity';
import { API_URL } from 'src/app/shared/utils/api-urls';

@Injectable()
export class PhysicalActivityService {

  constructor(private http: HttpClient, private ls: StorageService) { }

  getPhysicalActivitys() {
    return this.http.get<PhysicalActivity>(API_URL.physicalActivity.main)
  }

  getPhysicalActivityById(id: string) {
    return this.http.get<PhysicalActivity>(API_URL.physicalActivity.byId(id))
  }

  createPhysicalActivity (physicalActivity: PhysicalActivity) {
    
    return this.http.post<PhysicalActivity>(API_URL.physicalActivity.create, physicalActivity)
  }

  updatePhysicalActivity (physicalActivity: PhysicalActivity, id: string) {
    
    return this.http.put<PhysicalActivity>(API_URL.physicalActivity.update(id), physicalActivity)
  }

  deletePhysicalActivity (id: string) {
    return this.http.delete<PhysicalActivity>(API_URL.physicalActivity.delete(id))
  }
}
