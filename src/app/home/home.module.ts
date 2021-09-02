import { UserDetailsComponent } from './details/user-details.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, UserDetailsComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
