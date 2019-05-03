import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-managebookings',
  templateUrl: './managebookings.component.html',
  styleUrls: ['./managebookings.component.css']
})
export class ManagebookingsComponent implements OnInit {
  public selectedMoment = [];
  id;
  public value: Date = new Date();
  myDateOptions1: any;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.id = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.myDateOptions1 = {
      dateFormat: 'dd/mm/yyyy'
    }
    this.getAvailabeDates();
  }
  formData = {
    fromTime: '',
    toTime: ''
  }
  unavailableData = {
    date: ''
  }
  onDateChanged(data) {
    this.unavailableData.date = data.formatted;

  }
  onFromTimeChange(time) {
    var newTime = new Date(time)
    this.formData.fromTime = newTime.getHours() + ':' + newTime.getMinutes();
  }
  onTimeChange(time) {
    var newTime = new Date(time)
    this.formData.toTime = newTime.getHours() + ':' + newTime.getMinutes();
  }
  SubmitAppointmentDates() {
    let params = {
      doctor_id: localStorage.userId,
      start_slot: this.formData.fromTime,
      end_slot: this.formData.toTime
    }
    this.mainSer.availableTimings(params).subscribe(res => {
      if (res.status === 200) {
        swal(res.json().message, " ", "success");
      } else {
        swal(res.json().message, " ", "error");
      }
    })
  }
  availableData = [];
  getAvailabeDates() {
    this.mainSer.getAvailableDatesById(this.id).subscribe(res => {
      this.formData = res.json().response;
    });
  }
  SubmitunavailableDates() {
    let params = {
      doctor_id: localStorage.userId,
      date: this.unavailableData.date
    }
    this.mainSer.unavailableDates(params).subscribe(res => {
      console.log(typeof res.json().status);
      if (res.json().status == 200) {
        swal(res.json().message, " ", "success");
      } else if (res.json().status == 400) {
        swal(res.json().message, " ", "error");

      }
    });
  }
}
