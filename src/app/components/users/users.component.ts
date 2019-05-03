import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../config';
import { map } from 'rxjs/operators';
import { MainService } from '../../services/main';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../services/customerClass';
import * as _ from 'underscore';
// import { MessagingService } from "../../services/msgnotification";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public mainSer: MainService, public route: ActivatedRoute, private db: AngularFireDatabase) {


  }

  ngOnInit() {
    this.getUsersList();
    const userId = 'user001';
    // this.messagingService.getPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage


  }
  usersData = [];
  userList = [];
  customers: any;
  userId;
  customersRef: AngularFireList<Customer> = null;
  sub;
  message;
  data = [];
  getUsersList() {
    this.mainSer.getUsers().subscribe(response => {
      this.usersData = response.json().result;
      this.data = _.filter(this.usersData, function (obj) {
        return obj.userType === 'user';
      });

      this.userList = this.data.reverse();

    });
  }

}
