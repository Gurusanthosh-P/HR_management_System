import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { navbar } from 'src/app/navbar assets/navbar';
import { api } from './API/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'HR_management_System';

  nav:any[]=[];
  url:string=navbar.homeUrl



  constructor(
    private router:Router,
    private messageService:MessageService,
    private http:HttpClient){}


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
