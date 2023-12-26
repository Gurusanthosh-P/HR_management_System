import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { HomeComponent } from '../home/home.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';





@NgModule({
  declarations: [
    HomeComponent,
    UserDetailsComponent,
    NotfoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    MenuModule,
    ScrollTopModule,
    InputTextModule,
    NgxSpinnerModule,

  ]
})
export class SharedModule { }
