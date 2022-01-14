import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CachingService } from 'src/app/shared/caching.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
  cartHistory: any[];
  constructor(private _cachingService: CachingService, private _router: Router) { }

  ngOnInit(): void {
    const userInfor = this._cachingService.localStorage.get('userInfor');
    this.cartHistory = this._cachingService.localStorage.get(`cartHistory${userInfor.Id}`) || [];
  }

  reOrder(item: any) {
    this._router.navigate(['/shopping-cart'], { queryParams: { cartid: item.id } });
  }

}
