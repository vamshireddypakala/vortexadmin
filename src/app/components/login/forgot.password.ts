import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot.password.html',
    styleUrls: ['./login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    email;

    submit() {
        if (this.email === '' || this.email === undefined || this.email === null) {
            swal("Missing required fields", " ", "error");
        }
    }
}
