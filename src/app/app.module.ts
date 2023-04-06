import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OrderService} from './service/order.service';
import {OrdersComponent} from './composents/order/orders.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoodsComponent} from './composents/goods/goods.component';
import {GoodsService} from './service/goods.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    GoodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatTabsModule
  ],
  providers: [
    OrderService,
    GoodsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
