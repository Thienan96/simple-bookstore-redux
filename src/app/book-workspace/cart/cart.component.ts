import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CachingService } from 'src/app/shared/caching.service';
import { CartService } from 'src/app/shared/cart.service';
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
  form: FormGroup;
  initUserInfor: any;
  constructor(public dialog: MatDialog,
    private _cartService: CartService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cachingService: CachingService) { }

  ngOnInit(): void {
    this.initUserInfor = this._cachingService.localStorage.get('userInfor');
    this.factorForMotorBike = this.computeFactor('Motorbike');
    this.factorForTrain = this.computeFactor('Train');
    this.factorForAirCraft = this.computeFactor('AirCraft');
    this._activatedRoute.queryParams.subscribe(
      param => {
        if (param['cartid']) {
          const cartHistory = <Array<any>>this._cachingService.localStorage.get(`cartHistory${this.initUserInfor.Id || this.initUserInfor.id}`);
          const reOrderCart = cartHistory.find(c => c.id == param['cartid']);
          this.cart = <ICart>reOrderCart.cart;
          this.chooseDelivery(reOrderCart.deliveryBy);
          this.initUserInfor = {...this.initUserInfor, ...reOrderCart.user};
        } else {
          this.cart = this.getCart();
          this.chooseDelivery('Motorbike');
        }
        this.initForm(this.initUserInfor);
      })
  }

  initForm(userInfor: any) {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.form = this._fb.group({
      Id: [userInfor.id || userInfor.Id],
      Username: [userInfor?.name || userInfor?.Username, Validators.required],
      Email: [userInfor?.email || userInfor?.Email, [Validators.required, Validators.pattern(emailregex)]],
      Phone: [userInfor.Phone || '', Validators.required],
      Address: [userInfor.Address || '', Validators.required],
    });
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
    return this._cartService.getCart();
  }

  add(item: IItem) {
    item.Amount += 1;
    const index = this.cart.Items.findIndex(i => i.Item.id === item.Item.id);
    this.cart.Items[index] = item;
    this._cartService.updateAmount(item.Item, item.Amount);
    this.computeTotal();
  }

  remove(item: IItem) {
    if (item.Amount > 1) {
      item.Amount -= 1;
      const index = this.cart.Items.findIndex(i => i.Item.id === item.Item.id);
      this.cart.Items[index] = item;
      this._cartService.updateAmount(item.Item, item.Amount);
      this.computeTotal();
    }
  }

  clear(item: IItem) {
    this._cartService.removeToCart(item.Item);
    this.cart = {
      ...this.cart,
      Items: this.cart.Items.filter(i => i.Item.id !== item.Item.id)
    }
    this.computeTotal();
  }

  computeTotal() {
    this.total = 0;
    this.cart.Items.forEach(i => {
      this.total += i.Amount * 25;
    });
    if (this.total) {
      this.total += this.deliveryCost;
    }
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
    this.form.markAllAsTouched();
    if (this.form.invalid || this.cart.Items.length === 0) return;
    const cartHistory = this._cachingService.localStorage.get(`cartHistory${this.initUserInfor.Id}`) || [];
    this._cachingService.localStorage.store(`cartHistory${this.initUserInfor.Id}`, [...cartHistory, {
      id: Math.floor(Math.random() * 100) + 1,
      cart: this.cart,
      user: this.form.value,
      date: new Date(),
      deliveryBy: this.deliveryBy,
      total: this.total
    }]);
    this._snackBar.open('Your order is processing', '', { duration: 2000 })
    this._router.navigate(['/']);
    this._cartService.clearCart();
  }
}
