import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

type Key = 'USER';

function addKeyPrefix(key: string) {
  const prefix = 'DRIVER_APP';
  return `${prefix}_${key}`;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private readonly storage: Storage) {
    this.storage.create();
  }

  async clear() {
    await this.storage.clear();
  }

  async get<T>(key: Key): Promise<Awaited<T> | null> {
    const newKey = addKeyPrefix(key);
    try {
      return await this.storage.get(newKey);
    } catch {
      await this.storage.remove(newKey);
      return null;
    }
  }

  async remove(key: Key) {
    const newKey = addKeyPrefix(key);
    await this.storage.remove(newKey);
  }

  async set<T>(key: Key, value: T) {
    const newKey = addKeyPrefix(key);
    await this.storage.set(newKey, value);
  }
}
