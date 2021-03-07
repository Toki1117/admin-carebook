import { Routes } from '@angular/router';

import { CardsComponent } from './card/card.component';
import { ToastComponent } from './toast/toast.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'card',
				component: CardsComponent,
				data: {
					title: 'Cards',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
			{
				path: 'toast',
				component: ToastComponent,
				data: {
					title: 'Toast',
				}
			}
		]
	}
];
