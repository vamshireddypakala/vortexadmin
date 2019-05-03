import { Component, OnInit } from '@angular/core';
import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../config';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
@Component({
  selector: 'app-addquecat',
  templateUrl: './addquecat.component.html',
  styleUrls: ['./addquecat.component.css']
})
export class AddquecatComponent implements OnInit {
  strImage: any;
  submitted = false;
  id;
  // addHomesection: boolean;
  title;
  btntitle;
  queCatName;
  addcatForm: FormGroup;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['_id'];
      this.queCatName = params['category_name'];
    });

    if (this.id === '' || this.id === undefined) {
      this.title = 'Add Questionnaire Category';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Questionnaire Category';
      this.btntitle = 'UPDATE';
      this.getCatQueById();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.addcatForm = this.formBuilder.group({
      category_name: ['', Validators.required]
    });
  }
  // colorChange(e) {
  // }
  get f() { return this.addcatForm.controls; }
  addcatsection() {
    this.submitted = true;
    if (this.addcatForm.invalid) {
      return;
    }
    if (this.id === undefined || this.id === '') {
      this.mainSer.addQuestionCat(this.addcatForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/questioncategory']);
      })
    }
    else {
      this.mainSer.updateQuestionCat(this.id, this.addcatForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/questioncategory']);
      })
    }
  }

  homesection() {
    this.router.navigate(['/questioncategory']);
  }



  addHomeFormdata;
  getCatQueById() {
    this.mainSer.getQuestionCatDataById(this.id).subscribe(res => {
      this.addHomeFormdata = res.json().response[0];
      this.addcatForm = this.formBuilder.group({
        category_name: [this.addHomeFormdata.category_name, Validators.required],
      });
    })
  }
}
