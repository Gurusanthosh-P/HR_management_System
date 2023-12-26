import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {component:HomeComponent,path:'home'},
  {component:DashboardComponent,path:''},
  {component:UserDetailsComponent,path:'userdetails'},
  {component:NotfoundComponent,path:'**'},
  // {redirectTo:'dashboard',path:'',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
