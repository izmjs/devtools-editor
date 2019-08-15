import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterDesignerContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: RouterDesignerContainerComponent,
    data: { title: 'app.route-designer.main.title' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteDesignerRoutingModule {}
