import { Component, OnInit } from '@angular/core';
import { Service } from '../../shared/service';
import { Category } from '../../interfaces/category';
import { DeleteComponent } from '../../shared/dialogs/delete/delete.component';
import { CategoryComponent } from '../../shared/dialogs/category/category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public api_url: string = '/api/v1/category/';
  public categories: Category[] = [];
  public title = 'Eliminar Categoría';
  public delete_message = '¿Seguro que quieres eliminar esta categoria?';
  constructor(public service: Service, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.service.get(`${this.api_url}`).subscribe((res) => {
      this.categories = res;
    });
  }

  public delete(id: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      disableClose: true,
      width: '400px',
      data: {
        id: id,
        title: this.title,
        delete_message: this.delete_message,
        api_url: this.api_url,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getCategories();
    });
  }

  public newCategory() {
    const dialogRef = this.dialog.open(CategoryComponent, {
      disableClose: true,
      width: '50%',
      data: {
        category: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getCategories();
    });
  }

  public updateCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryComponent, {
      disableClose: true,
      width: '50%',
      data: {
        category: category,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getCategories();
    });
  }
}
