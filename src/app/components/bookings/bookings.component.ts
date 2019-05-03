import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.id = localStorage.getItem('userId');
  }
  id;
  ngOnInit() {
    this.getAppointments();
  }
  appointmentListdata = [];
  appArr = [];
  getAppointments() {
    this.mainSer.getAppoinmentsById(this.id).subscribe(res => {
      this.appointmentListdata = res.json().appointments
      for (var i = 0; i < this.appointmentListdata.length; i++) {
        // for (var j = 0; j < this.appointmentListdata[i].patient_data.length; j++) {
        this.appointmentListdata[i].fullname = this.appointmentListdata[i].patient_data[0].fullname;
      }
      // }
      // this.appArr.push(this.appointmentListdata[i].patient_data[j]);
      console.log(this.appointmentListdata);
    });
  }

  cancelAppointment(id) {
    let params = {
      available: 'false'
    }
    swal("Do you want to Cancel the Appointment?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.cancelappointment(id, params).subscribe(res => {
          if (res.status === 200) {
            swal(res.json().message, " ", "success");
            this.getAppointments();
          } else {
            swal(res.json().message, " ", "error");
          }
        })
      }
    })
  }
}
