import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-themesection',
  templateUrl: './themesection.component.html',
  styleUrls: ['./themesection.component.css']
})
export class ThemesectionComponent implements OnInit {
  id;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService) {
    this.id = localStorage.getItem('userId');

  }
  themeList = [];
  ngOnInit() {
    this.getthemeSection();
  }
  addthemeSection() {
    this.router.navigate(['/addthemesection']);
  }

  getthemeSection() {
    this.mainSer.getThemeSectionList(this.id).subscribe(res => {
      this.themeList = res.json().header_data;
    });
  }

  editThemeSection(home_header, background_image, background_color, _id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'home_header': home_header,
        'background_image': background_image,
        'background_color': background_color,
        '_id': _id
      }
    }
    this.router.navigate(['/addthemesection'], navigationExtras);
  }
  deleteTheme(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteThemeSection(id).subscribe(res => {
          this.getthemeSection();
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
