import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { SharedServiceService } from '../../services/shared-service.service';
import { Select, Store } from '@ngxs/store';
import { Logs } from '../../Model/logs.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { ServiceLogState } from 'src/app/store/auxilo.state';
import { GetAllService } from 'src/app/store/auxilo.action';


@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent implements OnInit, OnDestroy {

  cards: any[] = [];
  parentCards: any[] = [];
  searchText: any;
  data: any;
  filteredData: any[] = [];
  filteredParentCards: any[] = [];
  originalData: any[] = [];
  searchPerformed: boolean = false;


  logsArray: Logs[] = [];
  serviceLogSub: Subscription | any;

  public loading = false;

  @Select(ServiceLogState.getServiceLog) serviceLogs$: Observable<any[]> | undefined;
  @Select(ServiceLogState.getServiceLogLoded) serviceLogsLoded$: Observable<boolean> | any;

  constructor(private store: Store, private location: Location, private service: SharedServiceService, private router: Router) { }

  ngOnInit(): void {

    this.getDetails();
    this.originalData = this.cards;
  }
  //  cards = [
  //       {
  //         "tableName": "pff_constant",
  //         "serviceType": "createFinance", 
  //       },
  //       {
  //         "tableName": "pff1_constant",
  //         "serviceType": "getdocument",
  //       }
  //     ]

  // openData(index: number) {
  //   const card = this.cards[index];
  //   console.log("element", card);

  // }

  // WORKING FINAL
  // getDetails() {
  //   console.log("Into the getv method");
  //   this.loading = true;

  //   return this.service.getServiceLog().subscribe(data => {
  //     for (let parentName in data) {
  //       if (data.hasOwnProperty(parentName)) {
  //         let childObjects = data[parentName];
  //         for (let childName in childObjects) {
  //           if (childObjects.hasOwnProperty(childName)) {
  //             let childObject = childObjects[childName];
  //             let card = {
  //               parent: parentName,
  //               child: childName,
  //               data: childObject
  //             };
  //             this.cards.push(card);
  //             this.loading = false;

  //           }
  //         }
  //       }
  //     }

  //     console.log("data==>", data);
  //     console.log("API data here ssssss: ", this.cards);
  //   });

  // }  

  getDetails() {
    this.loading = true;
    this.serviceLogSub = this.serviceLogsLoded$.subscribe((loadedServiceLogs: any) => {
      console.log("loadedServiceLogsloadedServiceLogs before", loadedServiceLogs);

      if (!loadedServiceLogs) {
        this.store.dispatch(new GetAllService());
      }
      if (this.serviceLogs$) {
        this.serviceLogs$.subscribe((data) => {
          console.log("service logs after ngxs--=====>", data);
          for (let parentName in data) {
            if (data.hasOwnProperty(parentName)) {
              let childObjects = data[parentName];
              for (let childName in childObjects) {
                if (childObjects.hasOwnProperty(childName)) {
                  let childObject = childObjects[childName];
                  let card = {
                    parent: parentName,
                    child: childName,
                    data: childObject
                  };
                  this.cards.push(card);
                  this.loading = false;

                  if (!this.parentCards.includes(parentName)) {
                    this.parentCards.push(parentName);
                  }
                }
              }
            }
          }

          if (this.searchText) {
            this.filteredParentCards = this.parentCards.filter((parentC: string) =>
              parentC.toLowerCase().includes(this.searchText.trim().toLowerCase())
            );
          } else {
            this.filteredParentCards = this.parentCards;
          }

        });
      }

    })
  }

  openData(index: number) {
    const filteredCards = this.searchText ? this.filteredData : this.cards;
    const card = filteredCards[index];
    console.log("element", card);
    this.router.navigate(['/serviceLog'], {
      queryParams: {
        tableName: card.parent,
        serviceType: card.child
      }
    });
  }

  applyFilter() {
    // const filterValue = this.searchText.trim().toLowerCase();
    // this.filteredData = this.cards.filter((item: { child: string }) =>
    //   item.child.toLowerCase().includes(filterValue)
    // );
    // console.log("filterValue=======", this.filteredData);
    // this.searchPerformed = true;
    // console.log("filterValue length=======", this.filteredData.length);

    if (this.searchText) {
      const filterValue = this.searchText.trim().toLowerCase();
      console.log("filterValueeee applyFilter", filterValue);

      this.filteredData = this.cards.filter((item: { child: string }) =>
        item.child.toLowerCase().includes(filterValue)
      );
      console.log("child this.filteredData", this.filteredData);
      this.filteredParentCards = this.parentCards.filter((parentC: string) =>
        this.filteredData.some((card: { parent: string }) =>
          card.parent === parentC
        )
      );
      console.log("filteredParentCards this.filteredParentCards", this.filteredParentCards);
    } else {
      this.filteredData = [];
      this.filteredParentCards = this.parentCards;
    }
    console.log("filterValue=======", this.filteredData);
    this.searchPerformed = true;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.serviceLogSub.unsubscribe();
  }
}
