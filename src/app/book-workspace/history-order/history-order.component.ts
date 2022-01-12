import { Component, OnInit } from '@angular/core';
import { CachingService } from 'src/app/shared/caching.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
  cartHistory: any[];
  constructor(private _cachingService: CachingService) { }

  ngOnInit(): void {
    this.cartHistory = this._cachingService.localStorage.get('cartHistory') || [];
  }

  reOrder(item: any) {}

}
