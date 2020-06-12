import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'i18n-editor',
    loadChildren: () =>
      import('./modules/i18n-editor/i18n-editor.module').then(
        m => m.I18nEditorModule
      )
  },
  {
    path: 'route-designer',
    loadChildren: () =>
      import('./modules/route-designer/route-designer.module').then(
        m => m.RouteDesignerModule
      )
  },
  {
    path: 'model-designer',
    loadChildren: () =>
      import('./modules/model-designer/model-designer.module').then(
        m => m.ModelDesignerModule
      )
  },
  {
    path: 'api-designer',
    loadChildren: () =>
      import('./modules/api-designer/api-designer.module').then(
        m => m.ApiDesignerModule
      )
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        m => m.HomeModule
      )
  },
  {
    path: 'manifest-editor',
    loadChildren: () =>
      import('./modules/manifest-editor/manifest-editor.module').then(
        m => m.ManifestEditorModule
      )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
