import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Customer } from '../../services/customerClass';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
    selector: 'chat-users',
    templateUrl: './chat.user.html',
    styleUrls: ['./users.component.css']
})
export class ChatUserComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(public route: ActivatedRoute, private db: AngularFireDatabase, public router: Router) {
        this.route.params.subscribe((params: Params) => {
            this.userId = params['id'];
            this.userName = params['name'];
        });

        this.customersRef = db.list(this.userId);
    }

    ngOnInit() {
        this.getChatList();
    }

    customers: any;
    userId;
    userName;
    customersRef: AngularFireList<Customer> = null;

    //get chat list
    getList(): AngularFireList<Customer> {
        return this.customersRef;
    }

    //sendMessage
    sendMessage(customer: Customer): void {
        this.customersRef.push(customer);
    }

    getChatList() {
        // Use snapshotChanges().map() to store the key
        this.getList().snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        ).subscribe(customers => {
            this.customers = customers;
        });
    }

    //create
    customer: Customer = new Customer();
    submitted = false;

    save() {

    }

    onSubmit() {
        if (this.customer.message === '' || this.customer.message === undefined) {
            return;
        }
        this.customer.usertype = 'doctor';
        this.customer.userName = JSON.parse(localStorage.userName);
        this.sendMessage(this.customer);
        this.customer = new Customer();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    back() {
        this.router.navigate(['/users']);
    }

    login() {
        swal("login", "", "success");
    }

}