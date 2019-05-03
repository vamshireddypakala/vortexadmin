import { Component, OnInit } from '@angular/core';
import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
import { AppSettings } from '../../config';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-homesection',
  templateUrl: './homesection.component.html',
  styleUrls: ['./homesection.component.css']
})
export class HomesectionComponent implements OnInit {

  constructor(public router: Router, public mainSer: MainService) { }
  HomeData = [];
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getHomeSectionList();
  }
  addHomeSection() {
    this.router.navigate(['/addHomeSection']);
  }


  getHomeSectionList() {
    this.mainSer.getHomeSection().subscribe(res => {
      this.HomeData = res.json().response;
    });
  }
  editHomeSection(id, content_name, content_image) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        '_id': id,
        'content_name': content_name,
        'content_image': content_image,
      }
    }
    this.router.navigate(['/addHomeSection'], navigationExtras);
  }
  delete(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteSection(id).subscribe(res => {
          this.getHomeSectionList();
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
