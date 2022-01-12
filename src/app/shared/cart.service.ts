import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBook, ICart } from '../book-workspace/shared/book.model';
import { CachingService } from './caching.service';

@Injectable({ providedIn: 'root' })
export class CartService {
    itemsOnCart = new BehaviorSubject(0);
    constructor(private _cachingService: CachingService) {
        const cartStored = this._cachingService.localStorage.get('Cart') as ICart || { Items: [] };
        this.itemsOnCart.next(cartStored.Items?.length | 0);
    }

    addToCart(item: IBook, amount: number) {
        const cartStored = this._cachingService.localStorage.get('Cart') as ICart || { Items: [] };
        if (cartStored.Items.findIndex(i => i.Item.id === item.id) !== -1) { // can not add item to cart if it is existed
            window.alert('Item is existed in cart, please check shopping cart')
        } else {
            cartStored.Items.push({ Item: item, Amount: amount });
            this.itemsOnCart.next(cartStored.Items.length);
            this._cachingService.localStorage.store('Cart', cartStored);
        }
    }

    removeToCart(item: IBook) {
        let cartStored = this._cachingService.localStorage.get('Cart') as ICart || { Items: [] };
        this.itemsOnCart.next(cartStored.Items.length);
        cartStored = {
            ...cartStored,
            Items: cartStored.Items.filter(i => i.Item.id !== item.id)
        }
        this.itemsOnCart.next(cartStored.Items.length);
        this._cachingService.localStorage.store('Cart', cartStored);
    }

    updateAmount(item: IBook, newAmount: number) {
        let cartStored = this._cachingService.localStorage.get('Cart') as ICart || { Items: [] };
        cartStored = {
            ...cartStored,
            Items: cartStored.Items.map(i => {
                if (i.Item.id === item.id) {
                    i.Amount = newAmount;
                }
                return i;
            })
        }
        this._cachingService.localStorage.store('Cart', cartStored);
    }

    clearCart() {
        this._cachingService.localStorage.store('Cart', { Items: [] });
        this.itemsOnCart.next(0);
    }



    getCart(): ICart {
        return this._cachingService.localStorage.get('Cart');
    }

}
