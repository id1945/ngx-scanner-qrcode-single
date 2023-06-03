import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SafePipe } from './safe.pipe';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeSingleModule } from 'ngx-scanner-qrcode-single';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxScannerQrcodeSingleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
