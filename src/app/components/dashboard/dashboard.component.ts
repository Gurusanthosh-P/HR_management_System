import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navbar } from 'src/app/navbar assets/navbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  nav:any[]=[];
  url:string=navbar.homeUrl

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }


  home(){
    this.router.navigate([this.url],
    {
      queryParams:{
        name:navbar.request
      }
    })
  }

  approvedList(){
    this.router.navigate([this.url],
    {
      queryParams:{
        name:navbar.approved
      }
    })
  }

  rejectList(){
    this.router.navigate([this.url],
    {
      queryParams:{
        name:navbar.denied
      }
    })
  }

}
