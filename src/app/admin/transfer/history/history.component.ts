


import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  // ...
} from '@angular/animations';

import { TransferService } from '../transfer.service';
import { Transfer } from '../transfer.model';


export interface DialogData {
  animal: string;
}

@Component({
  selector: 'transfer-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '100ms',
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            ),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ opacity: 1 }),
            stagger(
              '100ms',
              animate(
                '500ms ease-out',
                style({ opacity: 0, transform: 'translateY(-15px)' })
              )
            ),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class TransferHistoryComponent {
  accounts$: Observable<Transfer[]>;
  animal: string | undefined;


  constructor(service: TransferService, public dialog: MatDialog) {
    this.accounts$ = service.getTransfer();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignDialog, {
      width: '250px',
      data: { animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


@Component({
  selector: 'sign-dialog',
  templateUrl: 'SignDialog.html',
})
export class SignDialog {
  constructor(
    public dialogRef: MatDialogRef<SignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
