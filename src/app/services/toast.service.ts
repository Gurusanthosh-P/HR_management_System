import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService:MessageService) { }

  acceptToast(){
    setTimeout(()=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume Accepted' });
    },1000)
  }

  deniedToast(){
    setTimeout(()=>{
      this.messageService.add({ severity: 'error', summary: 'Reject', detail: 'Resume Rejected' });
    },1000)
  }
}
