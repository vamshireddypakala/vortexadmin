import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs'
import * as firebase from 'firebase';

@Injectable()
export class MessagingService {

    currentMessage = new BehaviorSubject(null);
    messaging = firebase.messaging()
    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    ) {

    }

    updateToken(token) {
        this.afAuth.authState.take(1).subscribe(user => {
            if (!user) return;

            const data = { [user.uid]: token }
            this.db.object('fcmTokens/').update(data)
        })
    }

    getPermission() {
        this.messaging.requestPermission()
            .then(() => {
                console.log('Notification permission granted.');
                return this.messaging.getToken()
            })
            .then(token => {
                console.log(token)
                this.updateToken(token)
            })
            .catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.messaging.onMessage((payload) => {
            console.log("Message received. ", payload);
            this.currentMessage.next(payload)
        });

    }
}