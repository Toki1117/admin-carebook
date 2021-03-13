import { Component, TemplateRef } from '@angular/core';

import { ToastService } from './toast.service';


@Component({
  selector: 'app-toasts',
  templateUrl: './toast-container.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast:{title:string}) { 
    debugger;
    return toast.title;
   }
}
