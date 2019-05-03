import { Component } from '@angular/core';
import { MainService } from './services/main';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MessagingService } from "./services/msgnotification";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MainService, MessagingService]
})
export class AppComponent {
  title = 'app';

  constructor(db: AngularFireDatabase) {


  }
}
