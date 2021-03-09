import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
  
	setItem(item: any, name: string) {
		localStorage.setItem(name, JSON.stringify(item));
	}

	getItem(name: string): string | null {
		return JSON.parse(localStorage.getItem(name));
	}

	clearStorage() {
		localStorage.clear();
	}

	removeItem(name: string) {
		localStorage.removeItem(name);
	}
}
