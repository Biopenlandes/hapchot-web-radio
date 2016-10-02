import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HangoutsGridComponent } from './hangouts-grid/hangouts-grid.component';
import { HangoutComponent } from './hangout/hangout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HangoutsGridComponent, HangoutComponent]
})
export class HangoutsModule { }
