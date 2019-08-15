import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from './modules/toolbar/toolbar.module';
import { ConfigEditorModule } from './modules/config-editor/config-editor.module';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,
    SocketIoModule.forRoot({ options: {}, url: '' }),

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,
    ToolbarModule,
    ConfigEditorModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
