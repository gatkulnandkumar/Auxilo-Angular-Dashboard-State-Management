import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
// import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from '../services/shared-service.service';
import { Constants } from '../Model/constants.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { GetAllConstants, ServiceLogState } from 'src/app/store/auxilo.state';
// import { GetAllConstants, ServiceLogState } from '../store/auxilo.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  key: any[] = [];
  key2: any[] = [];
  cards: any[] = [];
  parentCards: any[] = [];
  searchText: any;
  data: any;
  filteredData: any[] = [];
  filteredParentCards: any[] = [];
  originalData: any[] = [];
  searchPerformed: boolean = false;
  constantLoadedSub: Subscription | any;

  // parentSerach: boolean = false;


  constructor(private store: Store, private location: Location, private http: HttpClient, private service: SharedServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }
  // this.cards = [
  //   {
  //     "tableName": "pff_constant",
  //     "serviceType": "createFinance",
  //     "data": {
  //       "sourceUrl":"https://localhost:8080"
  //     }
  //   },
  //   {
  //     "tableName": "pff1_constant",
  //     "serviceType": "getdocument",
  //     "data": {}
  //   }
  // ]

  // getDetails() {
  //   console.log("Into the getv method");
  //   return this.service.getData().subscribe(data => {
  //     console.log("data element==>",data);

  //     for (let parentName in data) {
  //       if (data.hasOwnProperty(parentName)) {
  //         let childObjects = data[parentName];
  //         for (let childName in childObjects) {
  //           if (childObjects.hasOwnProperty(childName)) {
  //             let childObject = childObjects[childName];
  //             let card = {
  //               // parent: parentName,
  //               child: childName,
  //               data: childObject
  //             };
  //             this.cards.push(card);

  //             var constant = parentName;

  //             let parentCard = {
  //               parent: parentName,
  //             }

  //             this.parentCards.push(parentCard)
  //           }
  //         }
  //       }
  //     }
  //     console.log("data==>", data);
  //     console.log("API data here ssssss: ", this.cards);

  //     console.log("API data here ssssss: ", this.cards);

  //   });

  // }
  public loading = false;

  // Working code getDetails()

  // getDetails() {
  //   console.log("Into the loading..... method");
  //   this.loading = true;
  //   console.log("this.loading = true;", this.loading = true);

  //   return this.service.getData().subscribe(data => {
  //     console.log("data element==>", data);

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
  //             console.log("this.loading = false;this.loading = false;", this.loading = false);

  //             if (!this.parentCards.includes(parentName)) {
  //               this.parentCards.push(parentName);
  //             }

  //           }
  //         }
  //       }
  //     }

  //     if (this.searchText) {
  //       this.filteredParentCards = this.parentCards.filter((parentC: string) =>
  //         parentC.toLowerCase().includes(this.searchText.trim().toLowerCase())
  //       );
  //     } else {
  //       this.filteredParentCards = this.parentCards;
  //     }

  //     console.log("data==>", data);
  //     console.log("API data here ssssss: ", this.cards);
  //     console.log("API data here parentCards: ", this.parentCards);  
  //   });

  // }

  @Select(ServiceLogState.getConstantLogs) constantLogs$: Observable<any[]> | undefined;

  @Select(ServiceLogState.getConstantLogloaded) constantLogsLoaded$: Observable<boolean> | any;

  // private unsubscribe$ = new Subject<void>();

  getDetails() {
    this.loading = true;
    this.constantLoadedSub = this.constantLogsLoaded$.subscribe((loadedconstantlog: any) => {
      if (!loadedconstantlog) {
        this.store.dispatch(new GetAllConstants());
      }
      if (this.constantLogs$) {
        this.constantLogs$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
          console.log("Constant logs12--=====>", data);
          this.cards = [];    //  clear the existing cards array
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
                  console.log("this.loading = false;this.loading = false;", this.loading = false);


                  // if(constant == parentName ){

                  // }
                  if (!this.parentCards.includes(parentName)) {
                    this.parentCards.push(parentName);
                  }

                  // let parentCard = {
                  //   parent: parentName,
                  // }

                  // this.parentCards.push(parentCard)
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
    this.router.navigate(['/test'], {
      queryParams: {
        tableName: card.parent,
        serviceType: card.child
      }
    });
  }

  logout(): void {
    this.service.logout();
  }

  applyFilter() {
    // const filterValue = this.searchText.trim().toLowerCase();
    // this.filteredData = this.cards.filter((item: { child: string }) =>
    //   item.child.toLowerCase().includes(filterValue)
    // );

    // const filterParent = this.searchText.trim().toLowerCase();
    // this.filteredParentCards = this.parentCards.filter((parentC: string) =>
    // parentC.toLowerCase().includes(filterParent)
    // );

    if (this.searchText) {
      const filterValue = this.searchText.trim().toLowerCase();
      console.log("filterValueeee applyFilter", filterValue);

      this.filteredData = this.cards.filter((item: { child: string }) =>
        item.child.toLowerCase().includes(filterValue)
      );

      console.log("child this.filteredData", this.filteredData);

      // this.filteredParentCards = this.parentCards.filter((parentC: string) =>
      //   parentC.toLowerCase().includes(filterValue)
      // );

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

  ngOnDestroy() {
    this.constantLoadedSub.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }




}
