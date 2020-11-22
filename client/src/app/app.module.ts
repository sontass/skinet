import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './Home/Home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass: ErrorInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
