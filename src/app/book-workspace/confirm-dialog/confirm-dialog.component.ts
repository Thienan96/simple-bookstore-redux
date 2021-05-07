import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CachingService } from 'src/app/shared/caching.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  total: number;
  deliveryBy: 'Motorbike' | 'Train' | 'AirCraft';
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private cachingService: CachingService) {
    this.total = data.TotalPrice;
    this.deliveryBy = data.deliveryBy;
  }

  ngOnInit(): void {
  }

  onOk() {
    this.dialogRef.close();
    this.router.navigate(['/']);
    this.cachingService.localStorage.removeAll();
  }

}
