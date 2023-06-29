import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
    // this.loginCheckMethod();
  }
  
  ngDoCheck() {
    this.loginCheckMethod();
  }
  loginCheck : boolean = false;

  logout() {
    // Clear localStorage
    localStorage.clear();
  }

  loginCheckMethod(){
    const token = localStorage.getItem('authenticationToken');
    if(token != null){
      this.loginCheck  = true;
    }else {
      this.loginCheck = false;
    }
   
  }

}
