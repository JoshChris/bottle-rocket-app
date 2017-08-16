import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } 			from './app.component';
import { GetJsonService }          	from './get-json.service';
import { RestaurantListComponent } 	from './restaurant-list/restaurant-list.component';
import { RestaurantMapComponent } 	from './restaurant-map/restaurant-map.component';
import { SlugPipe }       from './slug';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppRoutingModule }     from './app-routing.module';
import { StickyScrollDirective } from './sticky-scroll.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantMapComponent,
    StickyScrollDirective,
    SlugPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqTT2_2p5vSVXaX6Ft39CkCS47u_LCLl0'
    }),
    ScrollToModule.forRoot()
  ],
  providers: [GetJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
