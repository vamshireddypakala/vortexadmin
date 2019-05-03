import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-bookingmanagement',
  templateUrl: './bookingmanagement.component.html',
  styleUrls: ['./bookingmanagement.component.css']
})
export class BookingmanagementComponent implements OnInit {
  page;
  id;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.page = this.route.snapshot.data[0]['page'];
    this.id = localStorage.getItem('userId');
    if (this.page === 'AvailableTimings') {
      this.showAvailableTimings = true;
      this.showUnavailableTimings = false;
      this.getAvailabeDates();
    } else if (this.page === 'UnvailableDates') {
      this.showAvailableTimings = false;
      this.showUnavailableTimings = true;
      this.getUnavailableDates();
    }
  }
  showAvailableTimings = false;
  showUnavailableTimings = true;
  ngOnInit() {

  }
  editAvailableTimings() {
    this.router.navigate(['/TimeManagement']);
  }
  availableData = [];
  getAvailabeDates() {
    this.mainSer.getAvailableDatesById(this.id).subscribe(res => {
      this.availableData = res.json().response;
    });
  }
  //unavailable dates get by id 
  unavailableData = [];
  getUnavailableDates() {
    this.mainSer.getUnavailableDatesById(this.id).subscribe(res => {
      this.unavailableData = res.json().response;
    });
  }

  deleteunavailableDate(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteunavailableDateById(id).subscribe(res => {
          this.getUnavailableDates();
          if (res.json().status === 200) {
            swal(res.json().message, " ", "success");
          } else {
            swal(res.json().message, " ", "success");
          }
        })
      }
    })



  }
}
