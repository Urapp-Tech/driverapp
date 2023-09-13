import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

type StoreKey = 'USER';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private readonly storage: Storage) {
    this.storage.create();
  }
  async set(key: StoreKey, value: any): Promise<any> {
    return await this.storage.set(key, value);
  }
  async get(key: StoreKey): Promise<any> {
    return await this.storage.get(key);
  }
  async remove(key: StoreKey): Promise<any> {
    return await this.storage.remove(key);
  }
  async clear(): Promise<void> {
    return await this.storage.clear();
  }
}
