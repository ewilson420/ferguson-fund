import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkComponent } from './network/network/network.component';
import { TopicDetailComponent } from './network/network/topic-detail/topic-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkComponent,
    children: [
      {
        path: ':nodeId',
        component: TopicDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
