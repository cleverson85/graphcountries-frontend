import { NgModule } from '@angular/core';

import { MenuListComponent } from './menu-list.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MenuListComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    MenuListComponent
  ],
  bootstrap: [
    MenuListComponent
  ],
})
export class MenuListModule { }
