import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {VirtualScrollDirective} from './virtual-scroll.directive';
import {VirtualScrollComponent} from './virtual-scroll.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, VirtualScrollComponent,VirtualScrollDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
