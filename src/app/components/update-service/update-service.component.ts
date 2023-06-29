import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { globalUrl } from 'src/app/globalUrl';
import { Constants } from '../Model/constants.model';
// import { ToastrService } from 'ngx-toastr';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit {

  tableName: any;
  apiName: any;
  auditLogs: any[] = [];
  abcd: any;

  constructor(private toastr: ToastrService, private service: SharedServiceService, private formBuilder: FormBuilder, private router: ActivatedRoute, private routing: Router) {

  }
  ngOnInit(): void {
    this.tableName = this.router.snapshot.queryParams.tableName
    this.apiName = this.router.snapshot.queryParams.serviceType
    console.log("insdeeee OnInit tableName", this.router.snapshot.queryParams.tableName);
    console.log("insdeeee OnInit serviceType ", this.router.snapshot.queryParams.serviceType);
    this.service.getDataByTableName(globalUrl.getDataByTableNameUrl, this.router.snapshot.queryParams.tableName, this.router.snapshot.queryParams.serviceType).subscribe((result) => {
      this.updateForm(result);
    })
  }

  form = this.formBuilder.group({
    tableName: ['', Validators.required],
    serviceType: ['', Validators.required],
    sourceurl: ['', Validators.required],
    targetheaders: ['', Validators.required],
    connectiontimeout: ['', Validators.required],
    readtimeout: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  });


  onSubmit(form: any) {
    console.log("form ---------", form);
    const payload = this.form.value;
    console.log("formData===>", payload);
    if (this.form.valid) {
      this.service.updateService(globalUrl.updateServiceUrl, payload).subscribe(
        (result) => {
          // this.form.patchValue(result);
          console.log("this is updateed", result);
          if (payload.tableName != null && payload.serviceType != null) {
            this.toastr.success('Service updated Successfully', '', {
              timeOut: 2000,
            });
            this.routing.navigate(['/dashboard']);
          }
        }, (error: any) => {
          console.error("Error in login:", error);
          this.toastr.error('Please Enter tableName or serviceType', '', {
            timeOut: 2000,
          });
        });

    } else {
      console.log("errrrrrrrrr");
      this.toastr.error('Please enter all required fields', '', {
        timeOut: 2000,
      });
    }
  }

  protected updateForm(result: Constants): void {
    console.log("result tableName", result.tableName);
    this.form.patchValue({
      tableName: this.tableName,
      serviceType: this.apiName,
      sourceurl: result.sourceurl,
      connectiontimeout: result.connectiontimeout,
      readtimeout: result.readtimeout,
      targetheaders: result.targetheaders
    });
  }

  clearForm() {
    this.routing.navigate(['/dashboard']);
  }


}
