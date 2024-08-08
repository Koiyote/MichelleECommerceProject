import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ProductCategory} from "../../common/product-category";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  productForm: FormGroup;
  productCategory: ProductCategory[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      unitPrice: ['', Validators.required],
      imageUrl: [''],
      active: [true],
      unitsInStock: ['', Validators.required],
      productCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {


    this.getProductCategory();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.createProduct(product).subscribe(result => {
        console.log('Product created successfully');
        this.resetForm();
      });
    }
  }

  private resetForm() {
    this.productForm.reset({
      sku: '',
      name: '',
      description: '',
      unitPrice: '',
      imageUrl: '',
      active: true,
      unitsInStock: '',
      productCategory: ''
    });
  }

  private getProductCategory():void {
    this.productService.getProductCategories().subscribe(data => {
      this.productCategory = data;
    })
  }

}









