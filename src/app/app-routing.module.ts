import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'i18n-editor',
    loadChildren: 'app/modules/i18n-editor/i18n-editor.module#I18nEditorModule'
  },
  {
    path: 'route-designer',
    loadChildren:
      'app/modules/route-designer/route-designer.module#RouteDesignerModule'
  },
  {
    path: 'model-designer',
    loadChildren:
      'app/modules/model-designer/model-designer.module#ModelDesignerModule'
  },
  {
    path: 'api-designer',
    loadChildren:
      'app/modules/api-designer/api-designer.module#ApiDesignerModule'
  },
  {
    path: 'manifest-editor',
    loadChildren:
      'app/modules/manifest-editor/manifest-editor.module#ManifestEditorModule'
  },
  {
    path: '**',
    redirectTo: 'about'
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
