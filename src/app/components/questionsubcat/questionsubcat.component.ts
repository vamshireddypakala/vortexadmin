import { Component, OnInit } from '@angular/core';
import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
import { AppSettings } from '../../config';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
@Component({
  selector: 'app-questionsubcat',
  templateUrl: './questionsubcat.component.html',
  styleUrls: ['./questionsubcat.component.css']
})
export class QuestionsubcatComponent implements OnInit {

  constructor(public router: Router, public mainSer: MainService) { }

  ngOnInit() {
    this.getQueSubCatList()
  }
  addQueSubCat() {
    this.router.navigate(['/addquestionsubcategory']);
  }

  editQueSubCat(subId, sub_category_name, category_name, catId) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'subId': subId,
        'sub_category_name': sub_category_name,
        'category_name': category_name,
        'catId': catId,
      }
    }
    this.router.navigate(['/addquestionsubcategory'], navigationExtras);
  }
  QueSubCatData = [];
  QueSubArray = [];
  getQueSubCatList() {
    this.QueSubArray = [];
    this.mainSer.getQuestionCat().subscribe(res => {
      this.QueSubCatData = res.json().response;
      for (var i = 0; i < this.QueSubCatData.length; i++) {
        for (var j = 0; j < this.QueSubCatData[i].sub_category.length; j++) {
          this.QueSubCatData[i].sub_category[j].subId = this.QueSubCatData[i].sub_category[j]._id;
          this.QueSubCatData[i].sub_category[j].catId = this.QueSubCatData[i].sub_category[j].category_id;
          this.QueSubCatData[i].sub_category[j].sub_category_name = this.QueSubCatData[i].sub_category[j].sub_category_name;
          this.QueSubCatData[i].sub_category[j].created_on = this.QueSubCatData[i].sub_category[j].created_on;
          this.QueSubCatData[i].sub_category[j].category_name = this.QueSubCatData[i].category_name;
          this.QueSubArray.push(this.QueSubCatData[i].sub_category[j]);
        }
      }
    });
  }
  delete(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteQueSubCat(id).subscribe(res => {

          if (res.json().status === "200") {
            swal(res.json().message, " ", "success");
            this.getQueSubCatList();
          } else {
            swal(res.json().message, " ", "error");
          }
        })
      }
    })
  }

}
