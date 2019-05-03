import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../config';
import { MainService } from '../../services/main';

@Component({
    selector: 'profile-nav',
    templateUrl: './profile.nav.html',
    styleUrls: ['./profile.nav.css']
})
export class ProfileNavComponent implements OnInit {
    pageNav; UserType;
    Ecommerce: boolean = true;
    Bookings: boolean = true;
    AvailableTimings: boolean = true;
    UnvailableDates: boolean = true;
    TimeManagement: boolean = true;
    content: boolean = true;
    questionnaire: boolean = true;
    constructor(private route: ActivatedRoute, public router: Router, public mainSer: MainService) {
        this.pageNav = this.route.snapshot.data[0]['page'];


    }
    ngOnInit() {
        this.userName = (localStorage.userName);
        this.userImage = (localStorage.path) + (localStorage.image);
        if ((localStorage.image) === '' || (localStorage.image) === null || (localStorage.image) === undefined) {
            this.defaultImg = true;
        } else {
            this.defaultImg = false;
        }
    }

    userName;
    userImage;
    defaultImg: boolean;
    logout() {
        localStorage.removeItem('userType');
        localStorage.clear();
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        localStorage.removeItem('image');
        localStorage.removeItem('path');
        localStorage.removeItem('userType');
        this.router.navigate(['/']);
        // this.mainSer.stopCahtData();
    }

}