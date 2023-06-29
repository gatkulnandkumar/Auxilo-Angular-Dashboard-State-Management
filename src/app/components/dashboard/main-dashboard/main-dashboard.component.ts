import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openEndpoint(){
    this.router.navigate(['/dashboard']);
  }
  openServiceLog(){
    this.router.navigate(['/logs-dashboard']);
  }
}
