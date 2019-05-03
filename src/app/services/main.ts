import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppSettings } from '../config';
import { Router } from '@angular/router';

@Injectable()
export class MainService {
    constructor(private http: Http, private _router: Router) { }
    msg;
    //checking url after login
    checkCredentials() {
        if (localStorage.getItem("userName") !== null) {
            this._router.navigate(['/sidemenu']);
        }
    }
    deleteIt(url) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
        });
        return this.http.delete(AppSettings.baseUrl + url, { headers: headers });
    }
    postInputParams(params, url) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }
    //put with params
    putInputParams(url, params) {
        const headers = new Headers({
            'Content-Type': "application/json",
        });
        return this.http.put(AppSettings.baseUrl + url, params, { headers: headers });
    }
    postInputJsonParams(params, url) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }


    getInputParamsWithToken(url) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
        });
        return this.http.get(AppSettings.baseUrl + url, { headers: headers });
    }


    //login
    login(params): Observable<any> {
        return this.postInputParams(params, 'admin/admin/login');
    }

    //get users
    getUsers(): Observable<any> {
        return this.getInputParamsWithToken('user/usersdata');
    }
    deleteSection(id): Observable<any> {
        return this.deleteIt('contents/home/' + id);
    }
    // home section
    CreateHomeSection(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/home')
    }

    getHomeSection(): Observable<any> {
        return this.getInputParamsWithToken('contents/home/all');
    }
    updateHomeSection(id, params): Observable<any> {
        return this.putInputParams('contents/home/' + id, params)
    }
    // sub section 
    createSubSection(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/sub_content');
    }
    getById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/home/' + id);
    }
    deleteSubsection(id): Observable<any> {
        return this.deleteIt('contents/sub_content/' + id);
    }
    // by Id
    getSubSectionById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/sub_content/' + id + '/all');
    }
    updateSubSection(id, params): Observable<any> {
        return this.putInputParams('contents/sub_content/' + id, params)
    }
    getsubById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/sub_content/' + id);
    }

    // 
    createMainContent(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/section');
    }
    deleteContentById(id): Observable<any> {
        return this.deleteIt('contents/section/' + id);
    }
    getContetById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/section/final/' + id);
    }
    updateMainContentById(id, params): Observable<any> {
        return this.putInputParams('contents/section/' + id, params)
    }
    // get final content
    getfinalcontentList(): Observable<any> {
        return this.getInputParamsWithToken('contents/section/all')
    }
    // header get put and delete
    createThemeSection(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/header')
    }
    getThemeSectionList(id): Observable<any> {
        return this.getInputParamsWithToken('contents/header/doctor/' + id)
    }
    deleteThemeSection(id): Observable<any> {
        return this.deleteIt('contents/header/' + id);
    }
    updatethemeSectionById(id, params): Observable<any> {
        return this.putInputParams('contents/header/' + id, params)
    }
    availableTimings(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/doctor_availability')
    }
    unavailableDates(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/doctor_unavailable')
    }
    // get available dates by Id
    getAvailableDatesById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/doctor_availability/doctor/' + id)
    }
    // get unavailable dates by id
    getUnavailableDatesById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/doctor_unavailable/doctor/' + id)
    }
    deleteunavailableDateById(id): Observable<any> {
        return this.deleteIt('contents/doctor_unavailable/' + id);
    }
    // get appointment bookings
    getAppoinmentsById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/slot/users/appointments/' + id)
    }
    cancelappointment(id, params): Observable<any> {
        return this.putInputParams('contents/slot/' + id, params)
    }
    // add products
    addProductsList(params): Observable<any> {
        return this.postInputJsonParams(params, 'contents/products')
    }
    getProductsById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/products/all-products/' + id)
    }
    deleteProductById(id): Observable<any> {
        return this.deleteIt('contents/products/' + id)
    }
    getProductsDataById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/products/' + id)
    }
    updateproduct(id, params): Observable<any> {
        return this.putInputParams('contents/products/' + id, params)
    }
    // add products
    UpdateTreatment(id, params): Observable<any> {
        return this.putInputParams('contents/section/' + id, params)
    }
    //main category questionnarie 
    addQuestionCat(params) {
        return this.postInputJsonParams(params, 'contents/categories/')
    }
    getQuestionCat(): Observable<any> {
        return this.getInputParamsWithToken('contents/categories/all')
    }
    getQuestionCatDataById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/categories/category_id/' + id)
    }
    updateQuestionCat(id, params) {
        return this.putInputParams('contents/categories/' + id, params)
    }
    deleteQueCat(id): Observable<any> {
        return this.deleteIt('contents/categories/' + id)
    }
    // sub category questionnarie
    addQuestionSubCat(params) {
        return this.postInputJsonParams(params, 'contents/sub_categories/')
    }
    deleteQueSubCat(id): Observable<any> {
        return this.deleteIt('contents/sub_categories/' + id)
    }
    getQuestionSubCatDataById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/sub_categories/subcategory_id/' + id)
    }
    updateSubCat(id, params) {
        return this.putInputParams('contents/sub_categories/' + id, params)
    }
    // description
    addDescription(params) {
        return this.postInputJsonParams(params, 'contents/home_categories')
    }
    getDescription(): Observable<any> {
        return this.getInputParamsWithToken('contents/home_categories/description')
    }
    deleteDescription(id): Observable<any> {
        return this.deleteIt('contents/home_categories/' + id)
    }
    updateDescription(id, params) {
        return this.putInputParams('contents/home_categories/' + id, params)
    }
    getDescriptionById(id): Observable<any> {
        return this.getInputParamsWithToken('contents/home_categories/description_id/' + id)
    }
}
