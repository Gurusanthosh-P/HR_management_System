import { Injectable } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner:NgxSpinnerService) { }

  loadingShow()
  {
    this.spinner.show()
  }
  loadingHide(){
    this.spinner.hide()
  }
}
