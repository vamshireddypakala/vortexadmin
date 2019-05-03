import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import swal from 'sweetalert';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ngx-ckeditor';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DataTableModule } from "angular-6-datatable";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { routing } from './app.routing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/login/forgot.password';
//side menus
import { LogNavComponent } from './components/sidenav/logo.nav';
import { ProfileNavComponent } from './components/sidenav/profile.nav';


import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { SafePipeModule } from 'safe-pipe';
//users
import { UsersComponent } from './components/users/users.component';
import { AddUsersComponent } from './components/users/add.user';
import { ChatUserComponent } from './components/users/chat.user';
import { HomesectionComponent } from './components/homesection/homesection.component';
import { SubsectionComponent } from './components/subsection/subsection.component';
import { AddhomesectionComponent } from './components/homesection/addhomesection.component';
import { AddsubsectionComponent } from './components/subsection/addsubsection.component';
import { ContentmanagementComponent } from './components/contentmanagement/contentmanagement.component';
import { AddcontentComponent } from './components/contentmanagement/addcontent.component';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { SrcComponent } from './src/src.component';
import { ThemesectionComponent } from './components/themesection/themesection.component';
import { AddthemesectionComponent } from './components/themesection/addthemesection.component';
import { BookingmanagementComponent } from './components/bookingmanagement/bookingmanagement.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ManagebookingsComponent } from './components/bookingmanagement/managebookings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { AddproductsComponent } from './components/ecommerce/addproducts.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { AddquestionsComponent } from './components/questionnaire/addquestions.component';
import { QuestioncatComponent } from './components/questioncat/questioncat.component';
import { QuestionsubcatComponent } from './components/questionsubcat/questionsubcat.component';
import { AddquecatComponent } from './components/questioncat/addquecat.component';
import { AddquesubcatComponent } from './components/questionsubcat/addquesubcat.component';
import { DescriptionComponent } from './components/description/description.component';
import { AdddescriptionComponent } from './components/description/adddescription.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


var firebaseConfig = {
  apiKey: "AIzaSyBqD8dqah_rTBsK_rZnYnyN56FG3gUiIZQ",
  authDomain: "vortex-35279.firebaseapp.com",
  databaseURL: "https://vortex-35279.firebaseio.com",
  projectId: "vortex-35279",
  storageBucket: "vortex-35279.appspot.com",
  messagingSenderId: "848092951090"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LogNavComponent,
    ProfileNavComponent,
    UsersComponent,
    AddUsersComponent,
    ChatUserComponent,
    HomesectionComponent,
    SubsectionComponent,
    AddhomesectionComponent,
    AddsubsectionComponent,
    ContentmanagementComponent,
    AddcontentComponent,
    SrcComponent,
    ThemesectionComponent,
    AddthemesectionComponent,
    BookingmanagementComponent,
    ManagebookingsComponent,
    BookingsComponent,
    EcommerceComponent,
    AddproductsComponent,
    QuestionnaireComponent,
    AddquestionsComponent,
    QuestioncatComponent,
    QuestionsubcatComponent,
    AddquecatComponent,
    AddquesubcatComponent,
    DescriptionComponent,
    AdddescriptionComponent
  ],
  imports: [
    BrowserModule,
    DateInputsModule,
    IntlModule,
    HttpClientModule,
    HttpModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    Ng2SearchPipeModule,
    TooltipModule.forRoot(),
    MatTableModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    DataTableModule,
    MyDatePickerModule,
    NgxTTitanColorPickerModule,

    SafePipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'users', component: UsersComponent, data: [{ page: 'users' }] },
      { path: 'chatUser/:id/:name', component: ChatUserComponent, data: [{ page: 'chatusers' }] },
      { path: 'addusers/:id', component: AddUsersComponent, data: [{ page: 'addusers' }] },
      { path: 'themesection', component: ThemesectionComponent, data: [{ page: 'themesection' }] },
      { path: 'addthemesection', component: AddthemesectionComponent, data: [{ page: 'addthemesection' }] },
      { path: 'Homesection', component: HomesectionComponent, data: [{ page: 'Homesection' }] },
      { path: 'addHomeSection', component: AddhomesectionComponent, data: [{ page: 'addHomeSection' }] },
      { path: 'Subsection', component: SubsectionComponent, data: [{ page: 'Subsection' }] },
      { path: 'addSubsection', component: AddsubsectionComponent, data: [{ page: 'addSubsection' }] },
      { path: 'ContentManagement', component: ContentmanagementComponent, data: [{ page: 'ContentManagement' }] },
      { path: 'addContentManagement', component: AddcontentComponent, data: [{ page: 'addContentManagement' }] },
      { path: 'TimeManagement', component: ManagebookingsComponent, data: [{ page: 'TimeManagement' }] },
      { path: 'AvailableTimings', component: BookingmanagementComponent, data: [{ page: 'AvailableTimings' }] },
      { path: 'UnvailableDates', component: BookingmanagementComponent, data: [{ page: 'UnvailableDates' }] },
      { path: 'Bookings', component: BookingsComponent, data: [{ page: 'Bookings' }] },
      { path: 'Ecommerce', component: EcommerceComponent, data: [{ page: 'Ecommerce' }] },
      { path: 'addProducts', component: AddproductsComponent, data: [{ page: 'addProducts' }] },
      { path: 'questionnaire', component: QuestionnaireComponent, data: [{ page: 'questionnaire' }] },
      { path: 'questioncategory', component: QuestioncatComponent, data: [{ page: 'questioncategory' }] },
      { path: 'addquestioncategory', component: AddquecatComponent, data: [{ page: 'addquestioncategory' }] },
      { path: 'questionsubcategory', component: QuestionsubcatComponent, data: [{ page: 'questionsubcategory' }] },
      { path: 'addquestionsubcategory', component: AddquesubcatComponent, data: [{ page: 'addquestionsubcategory' }] },
      { path: 'description', component: DescriptionComponent, data: [{ page: 'description' }] },
      { path: 'adddescription', component: AdddescriptionComponent, data: [{ page: 'adddescription' }] },
    ], { useHash: true })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  exports: [BrowserModule, TranslateModule]
})
export class AppModule { }
