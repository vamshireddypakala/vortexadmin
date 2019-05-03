import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  decodeData;
  constructor(public router: Router, public mainSer: MainService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getDescriptioncontent();
    // this.getHomeSectionList();
  }
  addcontent(description_id,category_name, sub_category_name, description,logo,  heading,link ) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'description_id': description_id,
        'category_name': category_name,
        'sub_category_name': sub_category_name,
        'description': description,
        'logo': logo,
        'heading': heading,
        'link': link,
      

      }
    }
    this.router.navigate(['/adddescription'], navigationExtras);
  }
  deleteContent(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteDescription(id).subscribe(res => {
          if (res.json().status === "200") {
            swal(res.json().message, " ", "success");
            this.getDescriptioncontent();
          } else {
            swal(res.json().message, " ", "error");
          }
        });
      }
    })
  }
  DescriptionData = [];
  getDescriptioncontent() {
    this.mainSer.getDescription().subscribe(res => {
      this.DescriptionData = res.json().response;
      for (var i = 0; i < this.DescriptionData.length; i++) {
        this.DescriptionData[i].description = this.DescriptionData[i].description;
        this.DescriptionData[i].heading = this.DescriptionData[i].heading;
        this.DescriptionData[i].link = this.DescriptionData[i].link;
        this.DescriptionData[i].decodeData = this.DescriptionData[i].description;
        this.DescriptionData[i].logo = this.DescriptionData[i].logo;
        this.DescriptionData[i].description_id = this.DescriptionData[i]._id;
        for (var k = 0; k < this.DescriptionData[i].category_id.length; k++) {
          this.DescriptionData[i].category_name = this.DescriptionData[i].category_id[k].category_name;
        }
        for (var j = 0; j < this.DescriptionData[i].sub_category_id.length; j++) {
          this.DescriptionData[i].sub_category_name = this.DescriptionData[i].sub_category_id[j].sub_category_name;
        }
        console.log(this.DescriptionData)
      }
    });
  }
  // getDescriptioncontent() {
  //   this.mainSer.getDescription().subscribe(res => {
  //     this.DescriptionData = res.json().response;
  //     for (var i = 0; i < this.DescriptionData.length; i++) {
  //       for (var j = 0; j < this.DescriptionData[i].sub_category_id.length; j++) {
  //         for (var k = 0; k < this.DescriptionData[i].category_id.length; k++) {
  //           this.DescriptionData[i].sub_category_name = this.DescriptionData[i].sub_category_id[j].sub_category_name;
  //           this.DescriptionData[i].sub_id = this.DescriptionData[i].sub_category_id[j]._id;
  //           this.DescriptionData[i].description = this.DescriptionData[i].description;
  //           this.DescriptionData[i].heading = this.DescriptionData[i].heading;
  //           this.DescriptionData[i].link = this.DescriptionData[i].link;
  //           this.DescriptionData[i].decodeData = this.DescriptionData[i].description;
  //           this.DescriptionData[i].logo = this.DescriptionData[i].logo;
  //           this.DescriptionData[i].description_id = this.DescriptionData[i]._id;
  //           this.DescriptionData[i].category_name = this.DescriptionData[i].category_id[k].category_name;
  //           this.DescriptionData[i].category_id = this.DescriptionData[i].category_id[k]._id;
  //         }

  //       }
  //     }
  //     console.log(this.DescriptionData)
  //   });
  // }
}
