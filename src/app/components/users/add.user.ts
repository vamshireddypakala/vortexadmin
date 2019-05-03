import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
import { MainService } from '../../services/main';

@Component({
    selector: 'add-users',
    templateUrl: './add.user.html',
    styleUrls: ['./users.component.css']
})
export class AddUsersComponent implements OnInit {

    constructor(private route: ActivatedRoute, public mainser: MainService) {
        this.route.params.subscribe((params: Params) => {
            this.userId = params['id'];
        });


    }
    userId;
    userImages = [];
    imagePath;
    userDetails = {
        date: '',
        profile: '',
        userImage: [],
        gender: '',
        dateofbirth: ''
    };

    userImage;
    defaultImg: boolean;
    fullimage;
    showFullImg = false;
    selectedImg;
    date;
    profileImage;
    profileImagePath;

    ngOnInit() {
        // this.mainser.viewUserData(this.userId).subscribe(res => {
        //     this.profileImagePath = res.json().profilepath;
        //     this.imagePath = res.json().path;
        //     this.userDetails = res.json().result;

        //     this.date = new Date(this.userDetails.date).getDate() + '/' + new Date(this.userDetails.date).getMonth() + '/' + new Date(this.userDetails.date).getFullYear();
        //     this.profileImage = this.profileImagePath + this.userDetails.profile;
        //     if (this.userDetails.profile === '' || this.userDetails.profile === undefined || this.userDetails.profile === null) {
        //         this.defaultImg = true;
        //     } else {
        //         this.defaultImg = false;
        //     }
        // })
    }

    showFullImage(image, index) {
        this.selectedImg = index;
        this.showFullImg = true;
        this.fullimage = image;
    }

}
