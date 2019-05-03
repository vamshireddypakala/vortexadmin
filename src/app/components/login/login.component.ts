import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../config';
import { MainService } from '../../services/main';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserType;
  Ecommerce: boolean = false;
  Bookings: boolean = false;
  AvailableTimings: boolean = false;
  UnvailableDates: boolean = false;
  TimeManagement: boolean = false;
  content: boolean = false;
  constructor(public mainSer: MainService, public router: Router) { }
  formData = {
    email: '',
    password: ''
  }
  errmsg;
  showEye = true;

  ngOnInit() {

  }

  hidePassword() {
    this.showEye = !this.showEye;
  }
  showPassword() {
    this.showEye = false;
  }

  login() {
    var validData = true;
    if (this.formData.email === '' || this.formData.email === undefined || this.formData.email === null || this.formData.password === ''
      || this.formData.password === undefined || this.formData.password === null) {
      validData = false;
      swal("Missing required fields", " ", "error");
    }
    if (validData) {
      var inData = 'email=' + this.formData.email + "&password=" + this.formData.password
      this.mainSer.login(inData).subscribe(res => {
        if (res.json().status === 400) {
          swal(res.json().massage, " ", "error");
        }
        swal("Login Successfully", " ", "success");
        // this.UserType = localStorage.getItem('userType');
        // if (this.UserType === "doctor") {
        //   // alert("hi")
        //   this.Ecommerce = this.Bookings = this.AvailableTimings = this.UnvailableDates = this.TimeManagement = this.content = true;
        //   this.router.navigate(['/Homesection']);
        // }
        // else if (this.UserType === "clinic") {
        //   alert(this.UserType)
        //   this.Ecommerce = this.Bookings = this.AvailableTimings = this.UnvailableDates = this.TimeManagement = this.content = false;
        //   this.router.navigate(['/Ecommerce']);
        // }
        this.router.navigate(['/Ecommerce']);
        localStorage.setItem('userName', (res.json().result.fullname));
        localStorage.setItem('userId', (res.json().result._id));
        localStorage.setItem('token', (res.json().result.token));
        localStorage.setItem('image', (res.json().result.profile));
        localStorage.setItem('path', (res.json().result.profilepath));
        localStorage.setItem('userType', (res.json().result.userType));
      }, err => {
        swal(err.json().err_field, " ", "error");
        console.log(err);
      });
    }
  }

}
