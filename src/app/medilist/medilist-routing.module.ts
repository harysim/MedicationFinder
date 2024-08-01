import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedilistPage } from './medilist.page';

const routes: Routes = [
  {
    path: '',
    component: MedilistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedilistPageRoutingModule {}
