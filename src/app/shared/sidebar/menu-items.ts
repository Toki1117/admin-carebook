import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
	{
		path: '/dashboard',
		title: 'Dashboard',
		icon: 'mdi mdi-gauge',
		class: '',
		extralink: false,
		submenu: [],
	},
	{
		path: '',
		title: 'Mantenimiento',
		icon: 'mdi mdi-dots-horizontal',
		class: 'nav-small-cap',
		extralink: true,
		submenu: [],
	},
	{
		path: '/physical-activities-types',
		title: 'Tipos de Actividad Física',
		icon: 'mdi mdi-arrange-bring-to-front',
		class: '',
		extralink: false,
		submenu: [],
	},
	{
		path: '/medical-specialties',
		title: 'Especialidades Médicas',
		icon: 'mdi mdi-blur-radial',
		class: '',
		extralink: false,
		submenu: [],
	},
	{
		path: '/addiction-types',
		title: 'Tipos de Adicción',
		icon: 'mdi mdi-backburger',
		class: '',
		extralink: false,
		submenu: [],
	},
	{
		path: '/archive-types',
		title: 'Tipos de Documento',
		icon: 'fa fa-archive',
		class: '',
		extralink: false,
		submenu: [],
	},
	/* {
    path: "/component/toast",
    title: "Toast",
    icon: "mdi mdi-alert",
    class: "",
    extralink: false,
    submenu: [],
  }, */
];
