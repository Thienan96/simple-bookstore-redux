import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CachingService } from 'src/app/shared/caching.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ICart, IItem } from '../shared/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: ICart;
  total: number;
  constForMotorbike = 5;
  constForTrain = 10;
  constForAircraft = 20;
  factorForMotorBike: number;
  factorForTrain: number;
  factorForAirCraft: number;
  deliveryCost: number;
  deliveryBy: string = 'Motorbike';

  constructor(private cachingService: CachingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cart = this.getCart();
    if (this.cart) {
      this.factorForMotorBike = this.computeFactor('Motorbike');
      this.factorForTrain = this.computeFactor('Train');
      this.factorForAirCraft = this.computeFactor('AirCraft');
      this.chooseDelivery('Motorbike');
    }
  }

  computeFactor(x: 'Motorbike' | 'Train' | 'AirCraft') {
    var d = new Date();
    var m = d.getMonth();
    let factor = 1;
    if (m === 8) {
      switch (x) {
        case 'Motorbike':
          factor = 1.5;
          break;
        case 'Train':
          factor = 1.8;
          break;
        case 'AirCraft':
          factor = 2;
          break;
      }
    } else {
      if (m >= 5 && m <= 7) {
        switch (x) {
          case 'Motorbike':
            factor = 0.5;
            break;
          case 'Train':
          case 'AirCraft':
            factor = 0.8;
            break;
          default:
            break;
        }
      }
    }
    return factor;
  }



  getCart(): ICart {
    return this.cachingService.localStorage.get('Cart');
  }

  add(item: IItem) {
    item.Amount += 1;
    const index = this.cart.Items.findIndex(i => i.Item.id === item.Item.id);
    this.cart.Items[index] = item;
    this.computeTotal();
  }

  remove(item: IItem) {
    if (item.Amount > 1) {
      item.Amount -= 1;
      const index = this.cart.Items.findIndex(i => i.Item.id === item.Item.id);
      this.cart.Items[index] = item;
      this.computeTotal();
    }
  }

  computeTotal() {
    this.total = 0;
    this.cart.Items.forEach(i => {
      this.total += i.Amount * 25
    });
    this.total += this.deliveryCost;
  }

  chooseDelivery(event: string) {
    this.deliveryBy = event;
    switch (this.deliveryBy) {
      case 'Motorbike':
        this.deliveryCost = this.constForMotorbike * this.factorForMotorBike;
        break;
      case 'Train':
        this.deliveryCost = this.constForTrain * this.factorForTrain;
        break;
      case 'Aircraft':
        this.deliveryCost = this.constForAircraft * this.factorForAirCraft;
        break;
    }
    this.computeTotal();
  }

  checkOut() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      height: 'auto',
      data: { TotalPrice: this.total, deliveryBy: this.deliveryBy },
      disableClose: true
    });
  }
}
