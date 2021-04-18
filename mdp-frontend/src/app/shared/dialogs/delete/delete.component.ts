import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../../../shared/service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogData } from '../../../interfaces/deleteDialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: Service,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  public async deleteStudent() {
    this.service
      .delete(`${this.data.api_url}/${this.data.id}`)
      .subscribe((res) => {
        this._snackBar.open('Se eliminó correctamente', 'Eliminado', {
          duration: 6000,
        });
        this.dialogRef.close(res);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
