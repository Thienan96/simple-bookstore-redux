import { Injectable } from '@angular/core';

@Injectable()
export class CachingService {
  public cachers: { [index: number]: ICacher };

  get localStorage(): ICacher {
    return this.cachers[CacherType.LocalStorage];
  }

  constructor() {
    this.cachers = {};
    this.cachers[CacherType.LocalStorage] = new LocalStorage(
      window.localStorage
    );
  }
  //#endregion
}


const enum CacherType {
  LocalStorage,
  SessionStorage,
  CacheStorageCore,
  CookieStorageCore
}

class LocalStorage implements ICacher {
  constructor(private readonly storage: Storage) { }

  get isAvailable(): boolean {
    return !!this.storage;
  }

  public get<TModel>(key: string): TModel | null {
    const data = this.storage.getItem(key);
    if (data) {
      const model = JSON.parse(data);
      return model as TModel;
    }
    return null;
  }

  public store(key: string, value: any): void {
    const strData: string = JSON.stringify(value);
    this.storage.setItem(key, strData);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public removeAll(): void {
    this.storage.clear();
  }
}

interface ICacher {
  isAvailable: boolean;
  /**
   * Get data from storage
   * @param key Cache key
   * @returns {TModel}
   */
  get(key: string): any;
  /**
   * Store cache by key
   * @param key Key value
   * @param value Value object
   */
  store(key: string, value: any): void;
  /**
   * Remove cache by key
   * @param key Key
   */
  remove(key: string): void;
  /**
   * Remove all
   */
  removeAll(): void;
}
