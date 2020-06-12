import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMainContainer } from './containers/main';

const routes: Routes = [
  {
    path: '',
    component: HomeMainContainer,
    data: { title: 'app.home.main.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
