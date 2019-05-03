import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  id;
  constructor(public router: Router, public mainSer: MainService) {
    this.id = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.getproducts();
  }
  addProducts() {
    this.router.navigate(['/addProducts']);
  }
  editEommerce(product_name, product_image, _id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'product_name': product_name,
        'product_image': product_image,
        '_id': _id
      }
    }
    this.router.navigate(['/addProducts'], navigationExtras);
  }
  productsData = [];
  getproducts() {
    this.mainSer.getProductsById(this.id).subscribe(res => {
      this.productsData = res.json().response
    })
  }
  deleteProduct(id) {
    swal("Do you want to delete?", "", "", {
      buttons: ["Cancel!", "Okay!"],
    }).then((value) => {
      if (value === true) {
        this.mainSer.deleteProductById(id).subscribe(res => {
          this.getproducts();
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
