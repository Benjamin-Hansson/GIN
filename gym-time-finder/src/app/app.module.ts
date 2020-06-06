import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
