import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { AppRoutingModule } from '../app-routing.module';
import { TopicDetailComponent } from './network/topic-detail/topic-detail.component';



@NgModule({
  declarations: [
    NetworkComponent,
    TopicDetailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class NetworkModule { }
