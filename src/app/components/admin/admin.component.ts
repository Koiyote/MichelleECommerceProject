import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
        product: this.fb.group({
          sku: new FormControl('', [Validators.required]),
          name: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          unitPrice: new FormControl('', [Validators.required]),
          imageUrl: new FormControl('', [Validators.required]),
          active: new FormControl('', [Validators.required]),
          unitsInStock: new FormControl('', [Validators.required]),
          productCategory: new FormControl(this.productCategory, [Validators.required])

    })});

  }

  get sku(){ return this.productForm.get('product.sku')!;}
  get name(){return this.productForm.get('product.name')!;}
  get description(){return this.productForm.get('product.description')!;}
  get unitPrice(){return this.productForm.get('product.unitPrice')!;}

  get imageUrl(){return this.productForm.get('product.imageUrl')!;}
  get active(){return this.productForm.get('product.active')!;}

  get unitInStock(){return this.productForm.get('product.unitsInStock')!}

  ngOnInit(): void {
    this.getProductCategory();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const product = this.productForm.controls['product'].value;


      this.productService.createProduct(product).subscribe(result => {
        alert("Product successfully entered!")
        alert(Product);
        this.resetForm();
      });
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
    this.productForm.valid;
  }

  private getProductCategory():void {
    this.productService.getProductCategories().subscribe(data => {
      this.productCategory = data;
    })
  }

}









