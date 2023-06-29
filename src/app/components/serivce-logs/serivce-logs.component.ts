import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Column, GridOption } from 'angular-slickgrid';
import { SharedServiceService } from '../services/shared-service.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ServiceLogState } from 'src/app/store/auxilo.state';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Location } from '@angular/common';
import { GetAllService, GetAllServiceLogs } from 'src/app/store/auxilo.action';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { globalUrl } from 'src/app/globalUrl';

@Component({
  selector: 'app-serivce-logs',
  templateUrl: './serivce-logs.component.html',
  styleUrls: ['./serivce-logs.component.css']
})
export class SerivceLogsComponent implements OnInit {

  serviceLogs: any[] = [];
  data: any;
  constructor(private fb: FormBuilder, private exportAsService: ExportAsService, private location: Location, private store: Store, private clipboard: Clipboard, private service: SharedServiceService, private http: HttpClient, private router: ActivatedRoute, private routing: Router) {

  }
  serviceLogSub: Subscription | any;
  // @Select(ServiceLogState.getServiceLogs) serviceLogSelect$: Observable<any[]> | undefined;
  // @Select(ServiceLogState.getServiceLogsLoded) serviceLogsSelectLoded$: Observable<boolean> | any;

  tableName: undefined;
  serviceType: undefined;
  showFilterForm = false;
  showFilterBox = false;
  fromDate: Date = null!;
  toDate: Date = null!;
  filteredServiceLogs: any[] = [];
  isFilterApplied: boolean = false;
  public daterange: any = {};

  ngOnInit(): void {
  
    this.tableName = this.router.snapshot.queryParams.tableName
    this.serviceType = this.router.snapshot.queryParams.serviceType
    this.fromDate = this.router.snapshot.queryParams.fromDate
    this.toDate = this.router.snapshot.queryParams.toDate
    console.log("insdeeee OnInit tableName", this.router.snapshot.queryParams.tableName);
    console.log("insdeeee OnInit serviceType ", this.router.snapshot.queryParams.serviceType);
    this.getAllServiceData();
  }

  closeModal() {
    this.showFilterBox = false;
  }
  openModal() {
    this.showFilterForm = true;
  }

  filter() {
    // Format fromDate and toDate
    const formattedFromDate = this.formatDate(this.fromDate);
    const formattedToDate = this.formatDate(this.toDate);
    console.log('From Date:', formattedFromDate);
    console.log('To Date:', formattedToDate);
    if(formattedFromDate && formattedToDate ){
      this.service.getServiceLogByDateRange(globalUrl.getServiceLogFilterUrl,this.tableName, this.serviceType, formattedFromDate, formattedToDate)
      .subscribe((res: any) => {
        console.log("Filter response:", res);
        this.filteredServiceLogs = res;
        console.log("this.filteredServiceLogs", this.filteredServiceLogs);
      });
        // Destroy the DataTable instance
        const dataTable = $('.datatableexample').DataTable();
        dataTable.destroy();
        setTimeout(() => {
          // Recreate the DataTable after a short delay
          $('.datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25, 50, 100],
            order: [[0, 'desc']],
            data: this.filteredServiceLogs, // Pass the filtered logs as data
            columns: [
              { data: 'id' },
              { data: 'clientid' },
              { data: 'username' },
              { data: 'requestdata' },
              { data: 'updatedtime' },
              { data: 'createdtime' },
              { data: 'responsedata' },
              { data: 'transactionid' }
            ],
            scrollX: true,
            scrollCollapse: true
          });
        }, 100);

        this.isFilterApplied = true;

    }else{
      this.filteredServiceLogs = this.serviceLogs;
      // Destroy the DataTable instance
      const dataTable = $('.datatableexample').DataTable();
      dataTable.destroy();
  
      setTimeout(() => {
        // Recreate the DataTable after a short delay
        $('.datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25, 50, 100],
          order: [[0, 'desc']],
          data: this.filteredServiceLogs, // Pass the serviceLogs as data
          columns: [
            { data: 'id' },
            { data: 'clientid' },
            { data: 'username' },
            { data: 'requestdata' },
            { data: 'updatedtime' },
            { data: 'createdtime' },
            { data: 'responsedata' },
            { data: 'transactionid' }
          ],
          scrollX: true,
          scrollCollapse: true
        });
      }, 100);
  
      this.isFilterApplied = false;
    }
  }
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'MM-DD-YYYY' },
    alwaysShowCalendars: false,
  };

  resetFilter(): void {
    this.fromDate = null!;
    this.toDate = null!;
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  filterToggle($event: Event) {
    this.showFilterBox = !this.showFilterBox;
    console.log("filteeeeeeeer");
    $event.preventDefault();
    $event.stopPropagation();  // <- that will stop propagation on lower layers
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  copyColumnData(data: string) {
    this.clipboard.copy(data);
  }
  getAllServiceData() {
    //   this.serviceLogSub = this.serviceLogsSelectLoded$.subscribe((loadedServiceLogs: any) => {
    //   console.log("serviceccccce logss before", loadedServiceLogs);
    //   if (!loadedServiceLogs) {
    //     this.store.dispatch(new GetAllServiceLogs(this.tableName,this.serviceType));
    //   }

    //   if (this.serviceLogSelect$) {
    //     this.serviceLogSelect$.subscribe((data) => {
    //       console.log("service logs after ngxs--=====>", data);
    //       this.serviceLogs = data;
    //       console.log("API response from server====>", this.serviceLogs);

    //       setTimeout(() => {
    //         $('#datatableexample').DataTable({
    //           pagingType: 'full_numbers',
    //           pageLength: 5,
    //           processing: true,
    //           lengthMenu: [5, 10, 25, 50, 100],
    //           order: [[0, 'desc']]
    //         });
    //       }, 1);
    //     });
    //   }
    // });

    console.log("getServiceLog API call==>");
    this.service.getServiceLogByTableName(globalUrl.fetchallServiceLogUrl,this.tableName, this.serviceType).subscribe((res: any) => {
      console.log("getServiceLogData::::", res);
      this.serviceLogs = res;
      console.log("API response from server====>", this.serviceLogs);
      this.filteredServiceLogs = [...this.serviceLogs];
      console.log("loggsssssss filterrrr getAll", this.filteredServiceLogs);

      setTimeout(() => {
        $('.datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25, 50, 100],
          order: [[4, 'desc']]
        });
      }, 1);

    });
  }

  exportToExcel(): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById('datatableexample'));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // XLSX.writeFile(workbook, 'data.xlsx');

    //  Set the value of serviceType in a cell
    // const cellRef = 'A1';
    // const cell = worksheet[cellRef];
    // if (!cell) {
    //   worksheet[cellRef] = {};
    // }
    // worksheet[cellRef].v = this.serviceType;
    // Save the workbook
    XLSX.writeFile(workbook, `data_${this.serviceType}.xlsx`);
  }

  // exportToExcel(): void {
  //   // Get the datatable data
  //   const table = $('#datatableexample').DataTable();
  //   const data = table.data().toArray();

  //   // Create a new workbook and worksheet
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet('Sheet1');

  //   // Add data to the worksheet
  //   worksheet.addRows(data);

  //   // Apply cell styling (optional)
  //   const headerRow = worksheet.getRow(1);
  //   headerRow.font = { bold: true };

  //   // Generate a unique file name
  //   const timestamp = new Date().getTime();
  //   const fileName = `data_${this.serviceType}_${timestamp}.xlsx`;

  //   // Save the workbook as an Excel file
  //   workbook.xlsx.writeFile(fileName)
  //     .then(() => {
  //       console.log('File saved successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error exporting:', error);
  //     });
  // }

  goBack(): void {
    this.location.back();
  }

}
