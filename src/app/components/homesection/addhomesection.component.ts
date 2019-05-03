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
  selector: 'app-addhomesection',
  templateUrl: './addhomesection.component.html',
  styleUrls: ['./addhomesection.component.css']
})
export class AddhomesectionComponent implements OnInit {
  strImage: any;
  submitted = false;
  id;
  homeSecName;
  homeSecImage;
  // addHomesection: boolean;
  HomeName;
  HomeImg;
  Image;
  Link;
  HomeSecName;
  HomeSec;
  title;
  btntitle;
  HomeImage;
  addHomeSectionForm: FormGroup;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['_id'];
      this.homeSecName = params['content_name'];
      this.homeSecImage = params['content_image'];
    });
    if (this.id === '' || this.id === undefined) {
      this.title = 'Add Home Section';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Home Section';
      this.btntitle = 'UPDATE';
      this.getHomeSectionById();
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.addHomeSectionForm = this.formBuilder.group({
      content_name: ['', Validators.required],
      content_text: 'hi',
      link: 'hi',
    });
  }
  // colorChange(e) {
  // }
  get f() { return this.addHomeSectionForm.controls; }
  addHomesection() {
    this.addHomeSectionForm.value.content_image = this.strImage
    this.submitted = true;
    if (this.addHomeSectionForm.value.content_image === '' || this.addHomeSectionForm.value.content_image === null || this.addHomeSectionForm.value.content_image === undefined) {
      swal("Missing required fields", " ", "error");
    }
    if (this.addHomeSectionForm.invalid) {
      return;
    }
    if (this.id === undefined || this.id === '') {
      this.mainSer.CreateHomeSection(this.addHomeSectionForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/Homesection']);
      })
    }
    else {
      this.mainSer.updateHomeSection(this.id, this.addHomeSectionForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/Homesection']);
      })
    }
  }

  homesection() {
    this.router.navigate(['/Homesection']);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }
  image;
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.strImage = this.image.split(',')[1];
    }
    myReader.readAsDataURL(file);
  }
  addHomeFormdata;
  getHomeSectionById() {
    this.mainSer.getById(this.id).subscribe(res => {
      this.addHomeFormdata = res.json();
      this.addHomeSectionForm = this.formBuilder.group({
        content_name: [this.addHomeFormdata.content_name, Validators.required],
        content_text: [this.addHomeFormdata.content_text, Validators.required],
        content_image: [this.addHomeFormdata.content_image, [Validators.required]]
      });
    })
  }
}
