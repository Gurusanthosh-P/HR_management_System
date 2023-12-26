import { HttpClient } from '@angular/common/http';
import { Component,OnInit ,NgZone, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { api } from 'src/app/API/api';
import { User } from 'src/app/interface/interface';
import { message } from 'src/app/messages/message';
import { navbar } from 'src/app/navbar assets/navbar';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{

  getUserDetails:User[]=[]
  showUserDetails:User[]=[]
  username:string=''
  deleteUrl:string=''
  APIError:string=''
  normalDate:any
  @Output() normalDateEvent = new EventEmitter<any>();

  constructor(
    private activateRouter:ActivatedRoute,
    private http:HttpClient,
    private router:Router,
    private messageService:MessageService,
    private loader:LoaderService){}

  ngOnInit(): void {
    this.getCardUserName()
    this.getandShowUserDetails()
    this.loader.loadingShow()
  }

  getCardUserName(){
    this.activateRouter.queryParams.subscribe((data:any)=>{
      this.username=data['name']      
    })
  }

  epochToNormalTime(date:number):any{
      const epochTime = new Date(date)
      this.normalDate = moment(epochTime).format("DD/MM/YYYY ")
      this.normalDateEvent.emit(this.normalDate)      
      return this.normalDate     
  }

  getandShowUserDetails(){
    this.http.get<User[]>(api.userApi)?.subscribe(
      (response:User[])=>{
        this.loader.loadingHide()
        this.getUserDetails = response
        
        this.showUserDetails=this.getUserDetails.filter((item:User)=>{
          return item.name===this.username
        })             
      },
      (error:any)=>{
        this.APIError=error.name
        Swal.fire(message.Error,error.name,'error')
        this.loader.loadingHide()
      })
  }

  accept(userid:any){    
    const updateUserUrl = `${api.userApi}/${userid}`;
    const updatedStatusData = { status: navbar.approved };    
    this.http.put<User[]>(updateUserUrl,updatedStatusData).subscribe(
      (response:User[])=>{
        this.router.navigate([navbar.homeUrl],
          {
          queryParams:{
            name:navbar.request,
            result:navbar.approved
          }
        })
      },
      (error:any)=>{
        this.APIError = error.name
        Swal.fire(message.Error,error.name,'error')
          this.router.navigate([''])
       
      }
    )
  }


  reject(userid:any){
    const updateUserUrl = `${api.userApi}/${userid}`;
    const updatedStatusData = { status: 'denied' };    
    this.http.put<User[]>(updateUserUrl,updatedStatusData).subscribe(
      (response:User[])=>{
        this.router.navigate([navbar.homeUrl],{
          queryParams:{
            name:'request',
            result:'denied'
          }
        })
      },
      (error:any)=>{
        this.APIError = error.name
        Swal.fire(message.Error,error.name,'error')
        this.router.navigate([''])
      }
    )
      
  }

}
