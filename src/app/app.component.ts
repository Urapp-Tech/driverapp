import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { StorageService } from './services/storage.service';
import { GetSystemConfigResponse } from './types/app.types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly appService: AppService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getSystemConfig();
  }

  getSystemConfig() {
    const handleResponse = (response: GetSystemConfigResponse) => {
      if (response.success) {
        this.storageService.set('SYSTEM_CONFIG_DATA', response.data);
      }
    };

    const handleError = (error: any) => {
      console.error('error :>> ', error);
    };

    this.appService.getSystemConfig().subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
