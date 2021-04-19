import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../../../shared/service';
import { Category } from '../../../interfaces/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { productData } from '../../../interfaces/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public form: FormGroup;
  public categories: Category[] = [];
  public category_api_url = '/api/v1/category/';
  public statuses = [
    { text: 'Activo', value: true },
    { text: 'Inactivo', value: false },
  ];
  public title = this.data.product
    ? 'Actualizar Producto'
    : 'Agregar nuevo Producto';
  public api_url = this.data.product
    ? '/api/v1/product/'
    : '/api/v1/product/add';
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    private service: Service,
    @Inject(MAT_DIALOG_DATA) public data: productData,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      product_cod: new FormControl(this.data.product.product_cod, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      name: new FormControl(this.data.product.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      product_desc: new FormControl(this.data.product.product_desc, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      category: new FormControl(
        this.data.product.category ? this.data.product.category._id : '',
        [Validators.required]
      ),
      price: new FormControl(this.data.product.price, [
        Validators.required,
        Validators.pattern('^[+-]?\\d+(\\.\\d+)?$'),
      ]),
      status: new FormControl(this.data.product.status, [Validators.required]),
    });
    this.getCategories();
  }

  public getCategories() {
    this.service.get(`${this.category_api_url}`).subscribe((res) => {
      this.categories = res;
    });
  }

  public submit(formValue: any) {
    if (this.form.valid) {
      this.executeSubmit(formValue);
    }
  }

  private executeSubmit(formValue: any) {
    const { _id } = this.data.product;
    if (_id) {
      formValue['updated_at'] = new Date();
      this.service.put(`${this.api_url}/${_id}`, formValue).subscribe(
        (res) => {
          this.dialogRef.close(res);
        },
        (err) => {
          const error = err.error.error;
          if (error.codeName === 'DuplicateKey')  {
            this._snackBar.open('Ya existe un producto con ese código', 'Lo sentimos', {
              duration: 4000,
            });
          }
        }
      );
      return;
    }
    this.service.post(this.api_url, formValue).subscribe(
      (res) => {
        this.dialogRef.close(res);
      },
      (err) => {
        this._snackBar.open(err.error.error, 'Lo sentimos', {
          duration: 4000,
        });
      }
    );
  }

  public hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
