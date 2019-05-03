import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-adddescription',
  templateUrl: './adddescription.component.html',
  styleUrls: ['./adddescription.component.css']
})
export class AdddescriptionComponent implements OnInit {
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
  addMainContentForm: FormGroup; id; link; ContentName; catId; description;
  catNmae; subCatName;
  marked; logo; decodeData;
  theCheckbox; heading; FinalImage;
  desImage; subId; cateId; descriptionId;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['description_id'],
        this.catNmae = params['category_name'],
        this.subCatName = params['sub_category_name'],
        this.logo = params['logo'],
        this.heading = params['heading'],
        this.description = params['description'],
        this.link = params['link']
    })
    if (this.id === '' || this.id === undefined) {
      this.title = 'Add Description Content';
      this.btntitle = 'ADD';
    } else {
      this.title = 'Edit Description Content';
      this.btntitle = 'UPDATE';
      this.FinalImage = this.logo;
      this.getDescriptionDetailsById();
    }

  }
  homeSecId;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getSubSectionList();
  }
  // create

  formData = {
    heading: '',
    link: '',
  }
  addContect() {
    this.encodeData = this.ckeditorContent;
    let params = {
      category_id: this.catId,
      sub_category_id: this.SubcatId,
      logo: this.strImage,
      heading: this.formData.heading,
      description: this.encodeData,
      link: this.formData.link,
    }
    // if (!this.SubSectionId) {
    //   delete params.sub_content_id
    // }
    this.mainSer.addDescription(params).subscribe(res => {
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
        this.router.navigate(['/description']);
      }
    })
  }

  updateContent() {
    this.encodeData = this.ckeditorContent;
    let params = {
      category_id: this.catId,
      sub_category_id: this.SubcatId,
      logo: this.strImage,
      heading: this.formData.heading,
      description: this.encodeData,
      link: this.formData.link,
    }
    this.mainSer.updateDescription(this.id, params).subscribe(res => {
      if (res.status === 200) {
        swal(res.json().message, " ", "success");
      } else {
        swal(res.json().message, " ", "error");
      }
      this.router.navigate(['/description']);
    })

  }
  // sub section change
  SubcatId;
  changeSub(name) {
    for (var i = 0; i < this.subSectionData.length; i++) {
      for (var j = 0; j < this.subSectionData[i].sub_category.length; j++) {
        if (name === this.subSectionData[i].sub_category[j].sub_category_name) {
          this.SubcatId = this.subSectionData[i].sub_category[j]._id;
        }
      }
    }
  }
  // sub section change

  // home section change 
  sub_category1;
  changeCat(name) {
    this.subSecArr = [];
    for (var i = 0; i < this.subSectionData.length; i++) {
      if (name === this.subSectionData[i].category_name) {
        this.catId = this.subSectionData[i]._id;
        for (var j = 0; j < this.subSectionData[i].sub_category.length; j++) {
          this.subSectionData[i].sub_category[j].sub_category1 = this.subSectionData[i].sub_category[j].sub_category_name;
          this.subSecArr.push(this.subSectionData[i].sub_category[j]);
        }
      }
    }
  }

  contentmanagement() {
    this.router.navigate(['/description']);
  }
  // get List 

  getSubSectionList() {
    this.subSecArr = [];
    this.mainSer.getQuestionCat().subscribe(res => {
      this.subSectionData = res.json().response;
      for (var i = 0; i < this.subSectionData.length; i++) {
        for (var j = 0; j < this.subSectionData[i].sub_category.length; j++) {
          this.subSectionData[i].sub_category[j].category_id = this.subSectionData[i]._id;
          this.subSectionData[i].sub_category[j].category_name = this.subSectionData[i].category_name;
          this.subSectionData[i].sub_category[j].sub_category_name = this.subSectionData[i].sub_category[j].sub_category_name;
          this.subSectionData[i].sub_category[j].sub_id = this.subSectionData[i].sub_category[j]._id;
          if (this.ContentName === this.subSectionData[i].category_name) {
            this.subSecArr.push(this.subSectionData[i].sub_category_name[j]);
          }
        }
      }
    });
  }
  // get List

  // get by id
  contentData = [];
  MainContent;
  getDescriptionDetailsById() {
    this.mainSer.getDescriptionById(this.id).subscribe(res => {
      this.formData = res.json().response[0];
      this.MainContent = res.json().description;
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
