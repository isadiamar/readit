import {NgModule} from "@angular/core";

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "./material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],

  entryComponents: []
})
export class SharedModule {

}
