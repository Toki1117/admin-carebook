import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ArchiveType } from '../models/archive-type';
import { API_URL } from 'src/app/shared/utils/api-urls';

@Injectable()
export class ArchiveTypeService {

  constructor(private http: HttpClient, private ls: StorageService) { }

  getArchiveTypes() {
    return this.http.get<ArchiveType>(API_URL.archiveType.main)
  }

  getArchiveTypeById(id: string) {
    return this.http.get<ArchiveType>(API_URL.archiveType.byId(id))
  }

  createArchiveType (archiveType: ArchiveType) {
    const {name} = archiveType
    return this.http.post<ArchiveType>(API_URL.archiveType.create, name)
  }

  updateArchiveType (archiveType: ArchiveType, id: string) {
    const {name} = archiveType
    return this.http.put<ArchiveType>(API_URL.archiveType.update(id), name)
  }

  deleteArchiveType (id: string) {
    return this.http.delete<ArchiveType>(API_URL.archiveType.delete(id))
  }
}
