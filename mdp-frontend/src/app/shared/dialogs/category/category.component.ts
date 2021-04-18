import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../../../shared/service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryData } from '../../../interfaces/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public form: FormGroup;
  public title = this.data.category
    ? 'Actualizar Categoria'
    : 'Agregar nueva Categoria';
  public api_url = this.data.category
    ? '/api/v1/category/'
    : '/api/v1/category/add';
  constructor(
    public dialogRef: MatDialogRef<CategoryComponent>,
    private service: Service,
    @Inject(MAT_DIALOG_DATA) public data: categoryData,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      category_cod: new FormControl(this.data.category.category_cod, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      category_desc: new FormControl(this.data.category.category_desc, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      category_name: new FormControl(this.data.category.category_name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
    });
  }

  public submit(formValue: any) {
    if (this.form.valid) {
      this.executeSubmit(formValue);
    }
  }

  private executeSubmit(formValue: any) {
    const { _id } = this.data.category;
    if (_id) {
      formValue['updated_at'] = new Date();
      this.service.put(`${this.api_url}/${_id}`, formValue).subscribe(
        (res) => {
          this.dialogRef.close(res);
        },
        (err) => {
          const error = err.error.error;
          if (error.codeName === 'DuplicateKey') {
            this._snackBar.open(
              'Ya existe un producto con ese código',
              'Lo sentimos',
              {
                duration: 4000,
              }
            );
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
