import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main';
import swal from 'sweetalert';
@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.css']
})
export class SubsectionComponent implements OnInit {
  constructor(public router: Router, public mainSer: MainService) {
    this.getSubSectionList();
  }
  ngOnInit() {
    window.scrollTo(0, 0);

  }
  addSubsection(sub_id, sub_content_name, content_name, sub_content_image, content_id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'sub_id': sub_id,
        'sub_content_name': sub_content_name,
        'content_name': content_name,
        'sub_content_image': sub_content_image,
        'content_id': content_id,
      }
    }
    this.router.navigate(['/addSubsection'], navigationExtras);
  }
  subSectionData = [];
  subSecArr = [];
  getSubSectionList() {
    this.subSecArr = [];
    this.mainSer.getHomeSection().subscribe(res => {
      this.subSectionData = res.json().response;
      for (var i = 0; i < this.subSectionData.length; i++) {
        for (var j = 0; j < this.subSectionData[i].sub_content.length; j++) {
          this.subSectionData[i].sub_content[j].content_name = this.subSectionData[i].content_name;
          this.subSectionData[i].sub_content[j].content_id = this.subSectionData[i].sub_content[j].content_id;
          this.subSectionData[i].sub_content[j].sub_content_name = this.subSectionData[i].sub_content[j].sub_content_name;
          this.subSectionData[i].sub_content[j].link = this.subSectionData[i].sub_content[j].link;
          this.subSectionData[i].sub_content[j].sub_id = this.subSectionData[i].sub_content[j]._id;
          this.subSectionData[i].sub_content[j].sub_content_image = this.subSectionData[i].sub_content[j].sub_content_image;
          this.subSecArr.push(this.subSectionData[i].sub_content[j]);
        }
      }
    });
  }
  delete(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteSubsection(id).subscribe(res => {
          if (res.json().status === "200") {
            swal(res.json().message, " ", "success");

            this.getSubSectionList();

          } else {
            swal(res.json().message, " ", "error");
          }
        })
      }
    })
  }

}
