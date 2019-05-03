import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
	selector: 'app-contentmanagement',
	templateUrl: './contentmanagement.component.html',
	styleUrls: ['./contentmanagement.component.css']
})
export class ContentmanagementComponent implements OnInit {
	decodeData;
	constructor(public router: Router, public mainSer: MainService) { }

	ngOnInit() {
		window.scrollTo(0, 0);
		this.getFinalcontent();
		// this.getHomeSectionList();

	}

	addcontent(section_id, section_name, link, section_image, section_text, content_name, sub_content_name, homeSecId, subImg) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				'section_id': section_id,
				'section_name': section_name,
				'link': link,
				'section_image': section_image,
				'section_text': section_text,
				'content_name': content_name,
				'sub_content_name': sub_content_name,
				'content_id': homeSecId,
				'sub_content_image': subImg,
			}
		}
		this.router.navigate(['/addContentManagement'], navigationExtras);
	}
	deleteContent(id) {

		swal("Do you want to delete?", "", "", {
			buttons: ["Cancel!", "Okay!"],
		}).then((value) => {
			if (value === true) {
				this.mainSer.deleteContentById(id).subscribe(res => {
					if (res.json().status === "200") {
						swal(res.json().message, " ", "success");
						this.getFinalcontent();
					} else {
						swal(res.json().message, " ", "error");
					}

				});
			}
		})
	}
	FinalSectionData = [];
	FinalArr = [];
	getFinalcontent() {
		this.mainSer.getfinalcontentList().subscribe(res => {
			this.FinalSectionData = res.json().final_content;
			for (var i = 0; i < this.FinalSectionData.length; i++) {
				this.FinalSectionData[i].section_name = this.FinalSectionData[i].section_name;
				this.FinalSectionData[i].link = this.FinalSectionData[i].link;
				this.FinalSectionData[i].decodeData = this.FinalSectionData[i].section_text;
				this.FinalSectionData[i].section_image = this.FinalSectionData[i].section_image;
				this.FinalSectionData[i].section_id = this.FinalSectionData[i]._id;
				for (var j = 0; j < this.FinalSectionData[i].sub_content.length; j++) {
					this.FinalSectionData[i].sub_content_name = this.FinalSectionData[i].sub_content[j].sub_content_name;
				}
				for (var k = 0; k < this.FinalSectionData[i].home_content.length; k++) {
					this.FinalSectionData[i].content_name = this.FinalSectionData[i].home_content[k].content_name;

				}
			}


		});
	}

}
