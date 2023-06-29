import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { globalUrl } from 'src/app/globalUrl';
import { SharedServiceService } from '../services/shared-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationError = false;
  showModal = false;
  showModalForgotPass = false;
  ispasswordGenerated: boolean = false;
  isuserNameGenerated: boolean = false;
  isemailGenerated: boolean = false;
  iscontacttGenerated: boolean = false;
  iscnfpasswordGenerated: boolean = false;
  ispassGenerated: boolean = false;
  hide = true;
  hide1 = true;


  selected = 'option2';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,}$')]],
    password: [null, [Validators.required]],

  });

  //Modal SignUp

  signUpForm = this.fb.group({
    uname: [null, [Validators.required]],
    name: [null, [Validators.required]],
    pass: [null, [Validators.required, this.passwordValidator]],
    cnfpassword: ['', [Validators.required, this.passwordValidator, Validators.minLength(5)]],
    email: [null, [Validators.email]],
    contact: [null, [Validators.required]],
    // cnfpassword: [null, [Validators.required]]
  }, { validator: this.passwordMatchValidator });


  forgotOTPForm = this.fb.group({
    emailOTP: [null, [Validators.email]],
  });

  constructor(private fb: FormBuilder, private router: Router, private service: SharedServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  // login method working
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    console.log("valueeee", value);

    if (value === null) {
      return null; // Skip validation if value is null
    }
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSmallLetter = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const hasMinimumLength = value.length >= 6;
    if (
      hasCapitalLetter &&
      hasSmallLetter &&
      hasNumber &&
      hasSpecialCharacter &&
      hasMinimumLength
    ) {
      return null; // password is valid
    }

    return { invalidPassword: true }; // password is invalid
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('pass');
    const confirmPassword = control.get('cnfpassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  Logging() {
    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      // userconsent: this.loginForm?.get('consent')?.value ? "yes" : "no", // Capture the value of the consent checkbox
    }
    console.log("payload data check here", payload.username, payload.password);
    console.log("this.loginForm.value", this.loginForm.value);
    this.service.signIn(globalUrl.signIn, payload).subscribe(
      (res: any) => {
        console.log("token login call::::", res);

        localStorage.setItem('authenticationToken', res.token);
        sessionStorage.setItem('authGaurd', res.token);
        console.log("token===>", res.token);

        this.toastr.success('Login  Successfully', '', {
          timeOut: 2000,
        });

        this.router.navigate(['/mainDashboard']);

      },
      (error: any) => {
        console.error("Error in login:", error);
        this.toastr.error('Invalid username and password', '', {
          timeOut: 2000,
        });
        this.router.navigate(['/login']);
      }
    );

  }

  loginCancel() {
    this.loginForm.reset();
    this.signUpForm.reset();
    this.forgotOTPForm.reset();
    this.showModal = false;
    this.showModalForgotPass = false;
  }

  closeModal() {
    this.showModal = false;
    this.showModalForgotPass = false;
    this.signUpForm.reset();
  }
  openModal() {
    this.showModal = true;
  }

  openModalForgot() {
    this.showModalForgotPass = true;
  }

  onSignUp() {
    console.log("this isss singUpForm data===>", this.signUpForm.value.uname);

    const name = this.signUpForm.value.name;
    const username = this.signUpForm.value.uname;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.pass;
    const cnfpassword = this.signUpForm.value.cnfpassword;
    const contact_no = this.signUpForm.value.contact;

    console.log("this username password singUpForm data===>", username, password, cnfpassword, name, email, contact_no);
    // Create the payload object with the correct structure
    const payload = {
      name: name,
      username: username,
      email: email,
      password: password,
      contact_no: contact_no
    };

    console.log("payload is here===>", payload);
    console.log("this isss singUpForm data===>", this.signUpForm.value.uname);

    if (cnfpassword == password) {
      this.service.signUp(payload).subscribe(
        (res: any) => {
          console.log("insertUserData login call::::", res);

          this.toastr.success('Register successfully', '', {
            timeOut: 2000,
          });
          this.showModal = false;
          this.signUpForm.reset();
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error("Error in login:", error);
          this.toastr.error('Unable to Register', 'Error', {
            timeOut: 2000,
          });
          this.router.navigate(['/login']);
        }
      );
      console.log("insideeee if");

    } else {
      console.log("elseeee invalide password");
      this.toastr.error('Passwords do not match', 'Error', {
        timeOut: 2000,
      });

    }

  }

  sendOTPPassword() {
    console.log("API call for OTP send here");
    this.router.navigate(['/forgotpassword']);
  }

  forgotPassword() {
    console.log("forgot password");
    this.router.navigate(['/forgotpassword']);
  }
  cancel() {
    this.showModal = false;
    this.signUpForm.reset();
    this.router.navigate(['/login']);
  }
}
