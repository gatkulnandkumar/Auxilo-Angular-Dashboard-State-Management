import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';
import { SharedServiceService } from '../services/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { Location } from '@angular/common';
import { globalUrl } from 'src/app/globalUrl';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {
  form!: FormGroup;
  serviceType: any;
  tableName: any;
  formData: any;

  formControls: any;
  auditLogs: any[] = [];

  //   formData: any = {
  //     "parent": "pff1_api_constant3",
  //     "child": "fakeStoreApi",
  //     "data": {
  //         "sourceurl": "https://fakestoreapi.com/products/categories",
  //         "connectiontimeout": "10000000",
  //         "targetheaders": "{\"Content-Type\":\"application/json\", \"SERVICENAME\":\"fakeStoreApi\"}",
  //         "queryParam": "https://fakestoreapi.com/products/categories",
  //         "readtimeout": "100000"
  //     }
  // }

  dynamicFields: { key: string, value: string }[] = [];

  constructor(private location: Location, private MatDialog: MatDialog, private service: SharedServiceService, private router: ActivatedRoute, private toastr: ToastrService, private routing: Router) { }

  // ngOnInit() {
  //   this.createForm();
  //   this.tableName = this.router.snapshot.queryParams.tableName
  //   this.serviceType = this.router.snapshot.queryParams.serviceType
  //   console.log("this.serviceType",this.serviceType);
  //   this.formData = this.service.getDataByTableName(this.tableName, this.serviceType);
  //   console.log("this.formData",this.formData);    
  // }

  async ngOnInit() {
    this.form = new FormGroup({});

    this.tableName = this.router.snapshot.queryParams.tableName;
    this.serviceType = this.router.snapshot.queryParams.serviceType;
    console.log("this.serviceType", this.serviceType);

    await this.getFormData();
    await this.createForm();

    // this.auditLogs = [ 

    //   {table_name: 1, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 2, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 3, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 4, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 5, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 6, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 7, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 8, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 9, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 10, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
    //   {table_name: 11, service_type : 'Hydrogen', key: 1.0079, old_value: 'H',new_value : 'dsada', updated_by : 'dsadad',updated_date : 'updated_date' },
      
    // ]

    
    

    // getAllAuditLogs() {
    //   console.log("getServiceLog API call==>");
    //   this.service.getServiceLogByTableName(this.tableName, this.serviceType).subscribe((res: any) => {
    //   console.log("getServiceLogData::::", res);
    //   this.auditLogs = res;
    //   console.log("API response from server====>",this.auditLogs);
      
    //   setTimeout(() => {
    //     $('#datatableexample').DataTable({
    //       pagingType: 'full_numbers',
    //       pageLength: 5,
    //       processing: true,
    //       lengthMenu: [5, 10, 25,50,100],
    //       order: [[0, 'desc']] 
    //     });
    //   }, 1);
  
    //   });
    // }

    this.service.getAuditLogs(globalUrl.fetchallAuditLogUrl,this.router.snapshot.queryParams.tableName, this.router.snapshot.queryParams.serviceType).subscribe((result : any) => {
    console.log("resullttttttt",result);
    this.auditLogs = result;

    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25,50,100],
        order: [[6, 'desc']] 
      });
    }, 1);     
    })

  }

  // createForm() {
  //   return new Promise<void>((resolve) => {
  //     if (this.formData) {
  //       console.log("inside if newww logic");
  //       const fieldSequence = Object.keys(this.formData); // Use the keys from the formData object

  //       fieldSequence.forEach((key) => {
  //         this.form.addControl(key, new FormControl(''));
  //       });
  //     }

  //     resolve();
  //     this.form.patchValue(this.formData)
  //   }); 
  // }
  regexPatterns: { [key: string]: RegExp } = {
    connectiontimeout: /^(?!\s)\d+(?<!\s)$/,
    readtimeout: /^(?!\s)\d+(?<!\s)$/,
    // queryParam : /^(?! )(?=.*[a-zA-Z])[^\s0-9][^\s]*[^\s0-9]\/?$/

    queryParam: /^(?! )(?=.*[a-zA-Z])[^\s0-9][^\s]*[^\s0-9]\/?$/

    // Add more key-regex pairs as needed
  };

  createForm() {
    return new Promise<void>((resolve) => {
      if (this.formData) {
        const fieldSequence = Object.keys(this.formData);

        fieldSequence.forEach((key) => {
          const regexPattern = this.regexPatterns[key];
          const control = new FormControl(this.formData[key], Validators.pattern(regexPattern));
          this.form.addControl(key, control);
        });
      }

      resolve();
    });
  }


  onSubmit(form: any) {
    const formData = this.form.value;
    console.log("form ---------", form);

    console.log("formData===>", formData);

    this.formControls = this.form.controls;

    // Check for null or empty values in form fields
    let hasEmptyFields = false;
    Object.keys(this.formControls).forEach((key) => {
      if (!this.formControls[key].value) {
        hasEmptyFields = true;
        this.formControls[key].markAsTouched();
      }
    });

    var payload = {
      "table_name": this.tableName,
      "service_type": this.serviceType,
      "otherData": this.form.value
    }

    console.log("this.payload====>", payload);

    if (this.form.valid && !hasEmptyFields) {
      this.service.updateService(globalUrl.updateServiceUrl,payload).subscribe(
        (result) => {

          console.log("formData=====>", formData);
          console.log("this is updateed", result);

          this.toastr.success('Service updated Successfully', '', {
            timeOut: 2000,
          });
          this.routing.navigate(['/dashboard']);
        }, (error: any) => {
          console.error("Error in login:", error);
          this.toastr.error('Unable to update', '', {
            timeOut: 2000,
          });
        });
    } else {
      // Display error messages for invalid or empty fields
      this.toastr.error('Please enter all required fields', '', {
        timeOut: 2000,
      });
    }
  }

  getFormData() {
    return new Promise<void>((resolve, reject) => {
      this.service.getDataByTableName(globalUrl.getDataByTableNameUrl,this.tableName, this.serviceType)
        .subscribe(
          (data: any) => {
            this.formData = data;
            console.log("this.getFormData", this.formData);
            resolve();
          },
          (error: any) => {
            console.error("Error fetching form data:", error);
            reject(error);
          }
        );
    });
  }

  clearForm() {
    this.routing.navigate(['/dashboard']);
  }

  goBack(): void {
    this.location.back();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.MatDialog.open(ModalComponent, {
      width: '300px',
      data: obj
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.event == 'update') {
        this.onSubmit(this.form);
      }

    });
  }

  isInvalid(key: string): boolean {
    const control = this.form.get(key);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  matcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return control.invalid && (control.dirty || control.touched);
    }
  };

}