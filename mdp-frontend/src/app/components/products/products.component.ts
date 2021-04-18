import { Component, OnInit } from '@angular/core';
import { Service } from '../../shared/service';
import { Product } from '../../interfaces/product';
import { DeleteComponent } from '../../shared/dialogs/delete/delete.component';
import { ProductComponent } from '../../shared/dialogs/product/product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public api_url: string = '/api/v1/product/';
  public products: Product[] = [];
  public title = 'Eliminar Producto';
  public delete_message = '¿Seguro que quieres eliminar este producto?';
  constructor(public service: Service, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.service.get(`${this.api_url}`).subscribe((res) => {
      this.products = res;
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
      if (result) this.getProducts();
    });
  }

  public newProduct() {
    const dialogRef = this.dialog.open(ProductComponent, {
      disableClose: true,
      width: '70%',
      data: {
        product: '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getProducts();
    });
  }

  public updateCategory(product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      disableClose: true,
      width: '70%',
      data: {
        product: product,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getProducts();
    });
  }
}
