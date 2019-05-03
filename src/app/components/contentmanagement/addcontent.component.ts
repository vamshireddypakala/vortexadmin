import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';

@Component({
  selector: 'app-addcontent',
  templateUrl: './addcontent.component.html',
  styleUrls: ['./addcontent.component.css']
})
export class AddcontentComponent implements OnInit {
  ckeditorContent;
  encodeData;
  title;
  btntitle;
  text;
  subSecData = [];
  subData = [];
  ckeText;
  sub_content_id;
  strImage: any;
  subSecArr = [];
  subSectionData = [];
  addContentForm: FormGroup;
  addMainContentForm: FormGroup; id; subSec; homeSecName; subImg; link; SubSecId; section_id; contentLink; ContentImage; ContentText; decodeData; SectionName; FinalImage; ContentName; SubContentName; contentId;

  marked;
  theCheckbox;

  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['section_id'],
        this.SectionName = params['section_name'],
        this.contentLink = params['link'],
        this.ContentImage = params['section_image'],
        this.ContentText = params['section_text'],
        this.ContentName = params['content_name'],
        this.SubContentName = params['sub_content_name']
    })
    if (this.id === '' || this.id === undefined) {
      this.title = 'Add Final Content';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Final Content';
      this.btntitle = 'UPDATE';
      this.getContentById();
      this.FinalImage = this.ContentImage;
    }
    this.getSubSectionList();
  }
  homeSecId;
  ngOnInit() {
    // this.getDropDownList();
    window.scrollTo(0, 0);
    this.getSubSectionList();

  }
  // create

  formData = {
    section_name: '',
    link: '',
  }
  addContect() {
    this.encodeData = this.ckeditorContent;
    let params = {
      content_id: this.contentId,
      sub_content_id: this.SubSectionId,
      section_name: this.formData.section_name,
      section_image: this.strImage,
      section_text: this.encodeData,
      link: this.formData.link,
    }
    if (!this.SubSectionId) {
      delete params.sub_content_id
    }
    this.mainSer.createMainContent(params).subscribe(res => {
      if (res.json().message === "Please provide content_id") {
        swal("Please provide Home section name", " ", "error");
      } else if (res.json().message === "Already added for this  sub-content") {
        swal(res.json().message, " ", "warning");
      } else if (res.json().message === "Please provide section_id") {
        swal("Please provide sub section name", " ", "error");
      }
      else if (res.json().message === "Please provide section_name") {
        swal("Please provide content name", " ", "error");
      }
      else if (res.json().message === "Please provide link") {
        swal(res.json().message, " ", "error");
      }
      else if (res.json().message === "Please provide section_image") {
        swal("Please provide content image", " ", "error");
      }
      else if (res.json().message === "Please provide section_text") {
        swal("Please provide Content", " ", "error");
      }

      else {
        swal(res.json().message, " ", "success");
        this.router.navigate(['/ContentManagement']);
      }
    })
  }

  updateContent() {
    this.encodeData = this.ckeditorContent;
    let params = {
      content_id: this.contentId,
      sub_content_id: this.SubSectionId,
      section_name: this.formData.section_name,
      section_image: this.strImage,
      section_text: this.encodeData,
      link: this.formData.link,
    }
    this.mainSer.updateMainContentById(this.id, params).subscribe(res => {
      if (res.status === 200) {
        swal(res.json().message, " ", "success");
      } else {
        swal(res.json().message, " ", "error");
      }
      this.router.navigate(['/ContentManagement']);
    })

  }
  // sub section change
  SubSectionId;
  changeSub(name) {
    for (var i = 0; i < this.subSectionData.length; i++) {
      for (var j = 0; j < this.subSectionData[i].sub_content.length; j++) {
        if (name === this.subSectionData[i].sub_content[j].sub_content_name) {
          this.SubSectionId = this.subSectionData[i].sub_content[j]._id;
        }
      }
    }
  }
  // sub section change

  // home section change 
  sub_content_name1;
  changeCat(name) {
    this.subSecArr = [];
    for (var i = 0; i < this.subSectionData.length; i++) {
      if (name === this.subSectionData[i].content_name) {
        this.contentId = this.subSectionData[i]._id;
        for (var j = 0; j < this.subSectionData[i].sub_content.length; j++) {
          this.subSectionData[i].sub_content[j].sub_content_name1 = this.subSectionData[i].sub_content[j].sub_content_name;
          this.subSecArr.push(this.subSectionData[i].sub_content[j]);
        }
      }
    }
  }

  contentmanagement() {
    this.router.navigate(['/ContentManagement']);
  }
  // get List 

  getSubSectionList() {
    this.subSecArr = [];
    this.mainSer.getHomeSection().subscribe(res => {
      this.subSectionData = res.json().response;
      for (var i = 0; i < this.subSectionData.length; i++) {
        for (var j = 0; j < this.subSectionData[i].sub_content.length; j++) {
          this.subSectionData[i].sub_content[j].content_id = this.subSectionData[i]._id;
          this.subSectionData[i].sub_content[j].content_name = this.subSectionData[i].content_name;
          this.subSectionData[i].sub_content[j].sub_content_name = this.subSectionData[i].sub_content[j].sub_content_name;
          this.subSectionData[i].sub_content[j].link = this.subSectionData[i].sub_content[j].link;
          this.subSectionData[i].sub_content[j].sub_id = this.subSectionData[i].sub_content[j]._id;
          this.subSectionData[i].sub_content[j].sub_content_image = this.subSectionData[i].sub_content[j].sub_content_image;
          if (this.ContentName === this.subSectionData[i].content_name) {
            this.subSecArr.push(this.subSectionData[i].sub_content[j]);
          }
        }
      }
    });
  }
  // get List

  // get by id
  contentData = [];
  MainContent;
  getContentById() {

    this.mainSer.getContetById(this.id).subscribe(res => {
      this.formData = res.json();
      this.MainContent = res.json().section_text;
      this.theCheckbox = res.json().treatment;
      this.marked = res.json().treatment;
      this.decodeData = this.MainContent;
      this.ckeditorContent = this.decodeData;
    })

  }
  // get by id
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
