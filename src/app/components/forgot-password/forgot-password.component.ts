import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  OTPForm = this.fb.group({

    otp: [null, [Validators.required]],
    pass: [null, [Validators.required]],
    cnfpassword: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }


}
