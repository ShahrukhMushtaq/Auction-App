import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
    private ps: ProductService
  ) {
    this.createform();
  }

  createform() {
    this.productForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required],
      productImage: [null, Validators.required],
      endDate: [null, Validators.required],
      endTime: [null, Validators.required],
      bidAmount: [null, Validators.required]
    });
  }

  onChange(ev) {
    if (ev.target.files.length > 0) {
      let file = ev.target.files[0];
      this.productForm.get('productImage').setValue(file);
    }
  }
  private prepareSave(): any {
    let input = new FormData();
    input.append('title', this.productForm.get('title').value);
    input.append('description', this.productForm.get('description').value);
    input.append('category', this.productForm.get('category').value);
    input.append('productImage', this.productForm.get('productImage').value);
    input.append('endDate', this.productForm.get('endDate').value);
    input.append('endTime', this.productForm.get('endTime').value);
    input.append('bidAmount', this.productForm.get('bidAmount').value);
    return input;
  }

  onSubmit() {
    const form = this.prepareSave();
    console.log(form);
    this.ps.addAuction(form , "addauction").subscribe(data => {console.log(data)});

  }


  ngOnInit() {
  }


  get title() {
    return this.productForm.get('title');
  }
  get description() {
    return this.productForm.get('description');
  }
  get category() {
    return this.productForm.get('category');
  }
  get productImage() {
    return this.productForm.get('productImage');
  }
  get endDate() {
    return this.productForm.get('endDate');
  }
  get endTime() {
    return this.productForm.get('endTime');
  }
  get bidAmount() {
    return this.productForm.get('bidAmount');
  }

}
