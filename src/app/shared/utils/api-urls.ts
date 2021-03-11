import { environment } from "src/environments/environment"

const baseUrl = environment.baseUrl;
export const API_URL = {
    authentication: {
        login: `${baseUrl}/manager/signin`,
        refresh: `${baseUrl}/refresh`
    },
    addictionType: {
        byId: (id: string) => `${baseUrl}/addiction_types/${id}`,
        create: `${baseUrl}/addiction_types/create`,
		delete: (id: string) =>
			`${baseUrl}/addiction_types/delete/${id}`,
		update: (id: string) =>
			`${baseUrl}/addiction_types/update/${id}`,
        main: `${baseUrl}/addiction_types`,
    },
    physicalActivity: {
        byId: (id: string) => `${baseUrl}/physical_activities/${id}`,
        create: `${baseUrl}/physical_activities/create`,
		delete: (id: string) =>
			`${baseUrl}/physical_activities/delete/${id}`,
		update: (id: string) =>
			`${baseUrl}/physical_activities/update/${id}`,
        main: `${baseUrl}/physical_activities`,
    },
    archiveType: {
        byId: (id: string) => `${baseUrl}/archive_types/${id}`,
        create: `${baseUrl}/archive_types/create`,
		delete: (id: string) =>
			`${baseUrl}/archive_types/delete/${id}`,
		update: (id: string) =>
			`${baseUrl}/archive_types/update/${id}`,
        main: `${baseUrl}/archive_types`,
    },
    personalBackRecType: {
        byId: (id: string) => `${baseUrl}/personal_background_type/${id}`,
        create: `${baseUrl}/personal_background_type/create`,
		delete: (id: string) =>
			`${baseUrl}/personal_background_type/delete/${id}`,
		update: (id: string) =>
			`${baseUrl}/personal_background_type/update/${id}`,
        main: `${baseUrl}/personal_background_type`,
    },

}