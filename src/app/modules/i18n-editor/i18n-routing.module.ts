import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { I18NContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: I18NContainerComponent,
    data: { title: 'app.i18n.main.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18NRoutingModule {}
