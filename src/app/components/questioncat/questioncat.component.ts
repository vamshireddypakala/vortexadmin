import { Component, OnInit } from '@angular/core';
import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
import { AppSettings } from '../../config';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
@Component({
  selector: 'app-questioncat',
  templateUrl: './questioncat.component.html',
  styleUrls: ['./questioncat.component.css']
})
export class QuestioncatComponent implements OnInit {

  constructor(public router: Router, public mainSer: MainService) { }

  ngOnInit() {
    this.getqueCatList();
  }
  addcatSection() {
    this.router.navigate(['/addquestioncategory']);
  }
  queCatData = [];
  getqueCatList() {
    this.mainSer.getQuestionCat().subscribe(res => {
      this.queCatData = res.json().response;
    });
  }

  editqueCatSection(id, category_name) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        '_id': id,
        'category_name': category_name,
      }
    }
    this.router.navigate(['/addquestioncategory'], navigationExtras);
  }
  delete(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteQueCat(id).subscribe(res => {
          this.getqueCatList();
          if (res.json().status === 200) {
            swal(res.json().message, " ", "success");
          } else {
            swal(res.json().message, " ", "success");
          }
        })
      }
    })
  }


}
