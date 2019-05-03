import { Component, OnInit } from '@angular/core';
import { NgxTTitanColorPickerModule } from 'ngx-ttitan-color-picker';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
import { AppSettings } from '../../config';
import { switchAll } from 'rxjs/operators';
import swal from 'sweetalert';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-addsubsection',
  templateUrl: './addsubsection.component.html',
  styleUrls: ['./addsubsection.component.css']
})
export class AddsubsectionComponent implements OnInit {
  strImage: any;
  submitted = false;
  addSubSectionForm: FormGroup;
  title; btntitle;
  id; subSec; homeSecId; subImg; link; homeId; homeSecName; SubSecName; SubSecImage; SubImg; SubId;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.SubId = params['sub_id'];
      this.SubSecName = params['sub_content_name'];
      this.homeSecName = params['content_name'];
      this.SubSecImage = params['sub_content_image'];
      this.id = params['content_id'];
    });
    if (this.SubId === '' || this.SubId === undefined) {
      this.title = 'Add Sub Section';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Sub Section';
      this.btntitle = 'UPDATE';
      this.getSubSectionDataById();
      this.SubImg = this.SubSecImage;
    }
  }
  HomeData = [];
  HomeData1 = [];
  ngOnInit() {
    window.scrollTo(0, 0);
    this.addSubSectionForm = this.formBuilder.group({
      sub_content_name: ['', Validators.required],
      sub_content_text: 'hi',
      link: 'hi',
    });
    this.getHomeSectionList();
  }
  content_name1;
  getHomeSectionList() {
    this.mainSer.getHomeSection().subscribe(res => {
      this.HomeData1 = res.json().response;
      for (var i = 0; i < this.HomeData1.length; i++) {
        for (var j = 0; j < this.HomeData1[i].sub_content.length; j++) {
          if (this.id === this.HomeData1[i].sub_content[j].content_id) {
            this.HomeData1[i].content_name = this.HomeData1[i].content_name;
          }
        }
      }
    });
  }
  subsection() {
    this.router.navigate(['/Subsection']);
  }
  get f() { return this.addSubSectionForm.controls; }
  addSubSec() {
    this.addSubSectionForm.value.content_id = this.contentId;
    this.addSubSectionForm.value.sub_content_image = this.strImage;
    this.submitted = true;
    if (this.addSubSectionForm.invalid) {
      return;
    }
    if (this.SubId === undefined || this.SubId === '' || this.SubId === null) {
      this.mainSer.createSubSection(this.addSubSectionForm.value).subscribe(res => {
        this.router.navigate(['/Subsection']);
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        } else {
          swal(res.json().message, " ", "error");
        }
      })
    } else {
      this.mainSer.updateSubSection(this.SubId, this.addSubSectionForm.value).subscribe(res => {
        if (res.status === 200) {
          swal(res.json().message, " ", "success");
        }
        this.router.navigate(['/Subsection']);
      })
    }


  }
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
  contentId;
  changeCat(name) {
    // this.homeSecId = id;
    for (var i = 0; i < this.HomeData1.length; i++) {
      // for (var j = 0; j < this.HomeData1[i].sub_content.length; j++) {
      if (name === this.HomeData1[i].content_name) {
        this.contentId = this.HomeData1[i]._id;
      }
      // }

    }
  }
  addSubHomeFormdata;
  getSubSectionDataById() {
    this.mainSer.getsubById(this.SubId).subscribe(res => {
      this.addSubHomeFormdata = res.json();
      this.addSubSectionForm = this.formBuilder.group({
        sub_content_name: [this.addSubHomeFormdata.sub_content_name, Validators.required],
        sub_content_text: [this.addSubHomeFormdata.sub_content_text, Validators.required]
      });
    })
  }
}

