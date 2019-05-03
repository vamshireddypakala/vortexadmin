import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main';
@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
  strImage: any;
  id; productImage; productName;
  FinalImage;
  title;
  constructor(public router: Router, private formBuilder: FormBuilder, public mainSer: MainService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['_id'],
        this.productName = params['product_name'],
        this.productImage = params['product_image']
    })
    if (this.id === '' || this.id === undefined) {
      this.title = 'Add Product';
    } else {
      this.title = 'Edit Product';
      this.FinalImage = this.productImage;
      this.getproducts();
    }
  }

  ngOnInit() {

  }
  formData = {
    product_name: '',
    description: '',
    sku: '',
    product_price: ''
  }
  // add product
  addProduct() {


    let params = {
      product_name: this.formData.product_name,
      description: this.formData.description,
      sku: this.formData.sku,
      product_price: this.formData.product_price,
      product_image: this.strImage,
    }
    if (this.formData.product_name === '' || this.formData.product_name === undefined || this.formData.product_name === null || this.formData.description === ''
      || this.formData.description === undefined || this.formData.description === null || this.formData.sku === '' || this.formData.sku === undefined || this.formData.sku === null || this.formData.product_price === '' || this.formData.product_price === undefined || this.formData.product_price === null || this.strImage === '' || this.strImage === undefined || this.strImage === null) {
      swal("Missing required fields", " ", "error");
    }
    this.mainSer.addProductsList(params).subscribe(res => {
      this.router.navigate(['/Ecommerce']);
      if (res.json().status === 200) {
        swal(res.json().message, " ", "success");

      } else {
        swal(res.json().message, " ", "success");
      }
    })
  }
  // add product
  // edit product
  editProduct() {
    let params = {
      product_name: this.formData.product_name,
      description: this.formData.description,
      sku: this.formData.sku,
      product_price: this.formData.product_price,
      product_image: this.strImage,
    }
    this.mainSer.updateproduct(this.id, params).subscribe(res => {
      this.router.navigate(['/Ecommerce']);
      if (res.json().status === 200) {
        swal(res.json().message, " ", "success");

      } else {
        swal(res.json().message, " ", "success");
      }
    })
  }

  // edit product
  // get productdata by id
  productDetails = [];
  getproducts() {
    this.mainSer.getProductsDataById(this.id).subscribe(res => {
      this.productDetails = res.json();
      this.formData = this.productDetails[0];
    })
  }

  // get productdata by id
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
