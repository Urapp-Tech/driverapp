import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { APP_CONFIG_TOKEN_INJECTION } from './app-config.provider';

const IONIC_ROUTING_STRATEGY_TOKEN_INJECTION: Provider = {
  provide: RouteReuseStrategy,
  useClass: IonicRouteStrategy,
};

const AUTHENTICATION_INTERCEPTOR_TOKEN_INJECTION: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 400,
    }),
  ],
  providers: [
    IONIC_ROUTING_STRATEGY_TOKEN_INJECTION,
    AUTHENTICATION_INTERCEPTOR_TOKEN_INJECTION,
    APP_CONFIG_TOKEN_INJECTION,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
