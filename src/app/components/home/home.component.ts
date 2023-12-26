import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { api } from 'src/app/API/api';
import { LoaderService } from 'src/app/services/loader.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { message } from 'src/app/messages/message';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/interface/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{

  userDataArray : User[]=[]
  APIError:string=''
  lists: MenuItem[] | undefined;
  nameArr:any[]=[];
  ageArr:any[]=[];
  dateArr:any[]=[];
  apiDataArr:any[]=[]
  showArr:any[]=[]
  toast:any
  receivedNormalDate:any
  normalDate: any;

  constructor(
    private http:HttpClient,
    private router:Router,
    private loader:LoaderService,
    private activateRoute:ActivatedRoute,
    private messageService:MessageService,
    private userdetailsComponent:UserDetailsComponent,
    private toastService:ToastService
  ){}

  ngOnInit(): void {
    this.getListName()
    this.sorting()
    this.loader.loadingShow()
    // this.getNormalDate()
  }

  // getNormalDate(){
  //     this.userdetailsComponent.normalDateEvent.subscribe((data:any)=>{
  //       console.log(data);
  //       console.log('hello');
  //     })
  // }

  epochToNormalTime(date:number):any{
    const epochTime = new Date(date)
    this.normalDate = moment(epochTime).format("DD/MM/YYYY ")
    return this.normalDate     
}

  getListName(){
    this.activateRoute.queryParams.subscribe((response)=>{
        this.showUserDetails(response['name'])
        this.toast = response['result']
        return this.toast
    })
  }


  showUserDetails(listName:any){
    if(listName){
      this.http.get<User[]>(api.userApi)?.subscribe(
        (response:User[])=>{
          this.loader.loadingHide()        
          this.userDataArray = response.filter((element:User)=>{
            return element.status === listName
          })
          if(this.toast=='approved')
          {
            this.toastService.acceptToast()
          }
          else if(this.toast=='denied')
          {
            this.toastService.deniedToast()
          }
        },
        (error:any)=>{
          // this.APIError = error.name
          Swal.fire(message.Error,error.name,'error')
          this.loader.loadingHide()
          
        })
    }
    else if(listName=='')
    {
      this.http.get<User[]>(api.userApi)?.subscribe(
        (response:User[])=>{
          this.loader.loadingHide()        
          this.userDataArray = response.filter((element:User)=>{
            return element.status === 'request'
          })
        },
        (error:any)=>{
          // this.APIError = error.name
          Swal.fire(message.Error,error.name,'error')
          this.loader.loadingHide()
          
        })
    }
    
  }

  showDescription(username:string){
    this.router.navigate(['userdetails'],{
      queryParams:{
        id:1,
        name:username
      }
    })
  }


  sorting(){
    this.lists = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Name',
                  // icon: 'pi pi-user',
                  command: () => {
                    this.sortByName()
  
                  }
              },
              {
                  label: 'Age',
                  // icon: 'pi pi-at',
                  command: () => {
                    this.sortByAge()

                  }
              },
              {
                label: 'Date',
                // icon: 'pi pi-at',
                command: () => {
                  this.sortByappliedDate()
                }
            }
          ]
      },
  ];
  }

  sortByName(){    
    this.nameArr = this.userDataArray.sort((a:any,b:any)=>{
      const nameA = a.name.toUpperCase(); 
      const nameB = b.name.toUpperCase();
    
      return nameA.localeCompare(nameB); 
    })
    this.giveToUserArr(this.nameArr)
  }

  sortByAge(){
    this.ageArr = this.userDataArray.sort((a:any,b:any)=>{
      return a.age-b.age
    })
    this.giveToUserArr(this.ageArr)
  }

  sortByappliedDate(){
    this.dateArr = this.userDataArray.sort((a:any,b:any)=>{
      return a.date-b.date
    })
    this.giveToUserArr(this.dateArr)
  }

  giveToUserArr(arr:any){
    this.userDataArray = arr    
  }

}
