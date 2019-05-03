import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-addthemesection',
  templateUrl: './addthemesection.component.html',
  styleUrls: ['./addthemesection.component.css']
})

export class AddthemesectionComponent implements OnInit {
  id; HeaderName; HeaderImage; HeaderColor; HeaderId; title; btntitle; HeadImg;
  formData = {
    home_header: '',
    background_image: '',
    background_color: '',
  }
  color2;
  constructor(public router: Router, public mainSer: MainService, private route: ActivatedRoute) {
    this.id = localStorage.getItem('userId');
    this.route.queryParams.subscribe(params => {
      this.HeaderName = params['home_header'];
      this.HeaderImage = params['background_image'];
      this.HeaderColor = params['background_color'];
      this.HeaderId = params['_id']
    });
    if (this.HeaderId === '' || this.HeaderId === undefined) {
      this.title = 'Add Theme Section';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Theme Section';
      this.btntitle = 'UPDATE';
      this.getthemeSection();
      this.HeadImg = this.HeaderImage;
    }
  }
  ngOnInit() {

  }

  strImage: any;
  themesection() {
    this.router.navigate(['/themesection']);
  }
  colorChange(color: string) {
    this.color2 = color;
  }
  // add theme section
  addThemesection() {
    let params = {
      home_header: this.formData.home_header,
      background_image: this.strImage,
      background_color: this.color2,
      doctor_id: localStorage.userId,
    }
    this.mainSer.createThemeSection(params).subscribe(res => {
      if (res.status === 200) {
        swal(res.json().message, " ", "success");
      } else {
        swal(res.json().message, " ", "error");
      }
      this.router.navigate(['/themesection']);
    })
  }
  // add theme section
  // update theme section
  updateThemesection() {
    let params = {
      home_header: this.formData.home_header,
      background_image: this.strImage,
      background_color: this.color2,
      doctor_id: localStorage.userId,
    }
    this.mainSer.updatethemeSectionById(this.HeaderId, params).subscribe(res => {
      if (res.status === 200) {
        swal(res.json().message, " ", "success");
      } else {
        swal(res.json().message, " ", "error");
      }
      this.router.navigate(['/themesection']);
    })
  }
  // update theme section
  // theme section get by id
  getthemeSection() {
    this.mainSer.getThemeSectionList(this.id).subscribe(res => {
      this.formData = res.json().header_data[0];
      this.color2 = this.formData.background_color;
    });
  }
  // theme section get by id
  // image upload
  image;
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.strImage = this.image.split(',')[1];
    }
    myReader.readAsDataURL(file);
  }
  // image up load

}
