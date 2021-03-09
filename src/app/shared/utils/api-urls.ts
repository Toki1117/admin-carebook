import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;
export const API_URL = {
	authentication: {
		login: `${baseUrl}/manager/signin`,
		refresh: `${baseUrl}/refresh`,
	},
	medSpecialty: {
		byId: (id: string) => `${baseUrl}/medical_specialties/${id}`,
		create: `${baseUrl}/medical_specialties/create`,
		delete: (id: string) =>
			`${baseUrl}/medical_specialties/delete/${id}`,
		update: (id: string) =>
			`${baseUrl}/medical_specialties/update/${id}`,
		main: `${baseUrl}/medical_specialties`,
	},
};
