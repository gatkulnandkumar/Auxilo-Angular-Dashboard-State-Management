import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Users } from '../Model/users.model';
import { Constants } from '../Model/constants.model';
import { Logs } from '../Model/logs.model';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://192.168.11.21:9999/api/auth";
  // tokenUrl = "http://192.168.11.21:8086/token";
  // getAllConstantsUrl = "http://192.168.11.21:9999/api/test";
  // getByIDUrl = "http://192.168.11.21:9999/api/test/fetchAllConstants";
  // updateDataUrl = "http://192.168.11.21:9999/api/test";
  // getServiceLogUrl = "http://192.168.11.21:9999/api/test/fetchallServiceLog";
  // getServiceLogByDateRangeUrl = "http://localhost:9999/api/test/fetchServiceLogByDateRange";
  // getAuditLog = "http://localhost:9999/api/test/fetchallAuditLog";



  signUp(formData: any): Observable<Users[]> {
    console.log("inside insertTemplate call");
    return this.http.post<Users[]>(this.baseUrl + "/signup", formData);
  }

  // login API call
  public signIn(url: string, payload: any) {
    console.log("inside signIn", url);
    return this.http.post(url, payload);
  }

  // This is all Service endpoint configurations API call.

  //fetch all data in service endpoint configuration dashboard
  public getData(url: string): Observable<any> {
    console.log("inside getData", url);
    return this.http.get<any[]>(url);
  }

  //fetch table and serviceType data in service endpoint configuration
  public getDataByTableName(url: string, tableName: any, serviceType: any): Observable<Constants> {
    console.log("inside getDataByTableName", url);
    return this.http.get<Constants>(url + "/" + tableName + "/" + serviceType);
  }

  // update service data in service endpoint configuration
  public updateService(url: string, formData: any): Observable<any> {
    console.log("inside update call", url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(url, formData, { headers })
  }

  // Audit logs below in update page
  getAuditLogs(url: string, tableName: any, serviceType: any): Observable<Constants> {
    console.log("inside getAuditLogs call",url);
    return this.http.get<Constants>(url + "/" + tableName + "/" + serviceType);
  }

  // This all are Service logs APIS call

  // Fetch all service logs dashboard
  getServiceLog(url: string): Observable<any[]> {
    console.log("inside getData call");
    return this.http.get<any[]>(url);
  }

  //fetch table and serviceType data in serivce logs
  getServiceLogByTableName(url: string, tableName: any, serviceType: any): Observable<Logs[]> {
    console.log("inside getServiceLogByTableName call", url);
    return this.http.get<Logs[]>(url + "/" + tableName + "/" + serviceType);
  }

  //filter in service logs
  getServiceLogByDateRange(url: string, tableName: any, serviceType: any, fromDate: any, toDate: any) {
    console.log("inside getServiceLogByDateRange call", url);
    return this.http.get<any>(url + "/" + tableName + "/" + serviceType + "/" + fromDate + "/" + toDate);
  }

  // Logout 
  logout() {
    // Clear localStorage
    localStorage.clear();
  }

}
