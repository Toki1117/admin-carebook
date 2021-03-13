import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
export const API_URL = {
  addictionType: {
    byId: (id: string) => `${baseUrl}/addiction_types/${id}`,
    create: `${baseUrl}/addiction_types/create`,
    delete: (id: string) => `${baseUrl}/addiction_types/delete/${id}`,
    update: (id: string) => `${baseUrl}/addiction_types/update/${id}`,
    main: `${baseUrl}/addiction_types`,
  },
  archiveType: {
    byId: (id: string) => `${baseUrl}/archive_types/${id}`,
    create: `${baseUrl}/archive_types/create`,
    delete: (id: string) => `${baseUrl}/archive_types/delete/${id}`,
    update: (id: string) => `${baseUrl}/archive_types/update/${id}`,
    main: `${baseUrl}/archive_types`,
  },
  authentication: {
    login: `${baseUrl}/manager/signin`,
    refresh: `${baseUrl}/refresh`,
  },
  medSpecialty: {
    byId: (id: string) => `${baseUrl}/medical_specialties/${id}`,
    create: `${baseUrl}/medical_specialties/create`,
    delete: (id: string) => `${baseUrl}/medical_specialties/delete/${id}`,
    update: (id: string) => `${baseUrl}/medical_specialties/update/${id}`,
    main: `${baseUrl}/medical_specialties`,
  },
  physicalActivity: {
    byId: (id: string) => `${baseUrl}/physical_activities/${id}`,
    create: `${baseUrl}/physical_activities/create`,
    delete: (id: string) => `${baseUrl}/physical_activities/delete/${id}`,
    update: (id: string) => `${baseUrl}/physical_activities/update/${id}`,
    main: `${baseUrl}/physical_activities`,
  },
};
