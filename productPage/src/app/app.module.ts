import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from '@angular/common/http';
import  {  CommonModule  }  from  "@angular/common" ;

const routes: Routes = [
  { path: 'product/:page_id', component: ProductComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
