import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-addquesubcat',
  templateUrl: './addquesubcat.component.html',
  styleUrls: ['./addquesubcat.component.css']
})
export class AddquesubcatComponent implements OnInit {

  submitted = false;
  addQueSubCatForm: FormGroup;
  title; btntitle;
  id; QueCatName; QuesubCatName; SubSecImage; QuesubCatId; QueCatById;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.QuesubCatId = params['subId'];
      this.QuesubCatName = params['sub_category_name'];
      this.QueCatName = params['category_name'];
      this.QueCatById = params['catId'];
    });
    if (this.QuesubCatId === '' || this.QuesubCatId === undefined) {
      this.title = 'Add Questionnaire Subcategory';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Questionnaire Subcategory';
      this.btntitle = 'UPDATE';
      this.getQueSubCatDataById();
    }
  }
  HomeData = [];
  QueCatData1 = [];
  ngOnInit() {
    window.scrollTo(0, 0);
    this.addQueSubCatForm = this.formBuilder.group({
      sub_category_name: ['', Validators.required],
    });
    this.getQueCatList();
  }
  content_name1;
  getQueCatList() {
    this.mainSer.getQuestionCat().subscribe(res => {
      this.QueCatData1 = res.json().response;
      console.log(this.QueCatData1)
      for (var i = 0; i < this.QueCatData1.length; i++) {
        for (var j = 0; j < this.QueCatData1[i].sub_category.length; j++) {
          if (this.id === this.QueCatData1[i].sub_category[j].category_id) {
            this.QueCatData1[i].category_name = this.QueCatData1[i].category_name;
          }
        }
      }
    });
  }
  subsection() {
    this.router.navigate(['/questionsubcategory']);
  }
  get f() { return this.addQueSubCatForm.controls; }
  addQueSubCat() {
    this.addQueSubCatForm.value.category_id = this.QueCatId;
    this.submitted = true;
    if (this.addQueSubCatForm.invalid) {
      return;
    }
    if (this.QuesubCatId === undefined || this.QuesubCatId === '' || this.QuesubCatId === null) {
      this.mainSer.addQuestionSubCat(this.addQueSubCatForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
          this.router.navigate(['/questionsubcategory']);
        } else {
          swal(res.json().message, " ", "error");
        }
      })
    } else {
      this.mainSer.updateSubCat(this.QuesubCatId, this.addQueSubCatForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/questionsubcategory']);
      })
    }
  }

  QueCatId;
  changeCat(name) {
    // this.homeSecId = id;
    for (var i = 0; i < this.QueCatData1.length; i++) {
      // for (var j = 0; j < this.HomeData1[i].sub_content.length; j++) {
      if (name === this.QueCatData1[i].category_name) {
        this.QueCatId = this.QueCatData1[i]._id;
      }
      // }

    }
  }
  addQueSubCatFormdata;
  getQueSubCatDataById() {
    this.mainSer.getQuestionSubCatDataById(this.QuesubCatId).subscribe(res => {
      this.addQueSubCatFormdata = res.json().response[0];
      this.addQueSubCatForm = this.formBuilder.group({
        sub_category_name: [this.addQueSubCatFormdata.sub_category_name, Validators.required]
      });
    })
  }
}
