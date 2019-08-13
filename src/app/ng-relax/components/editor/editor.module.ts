import { QuillModule } from 'ngx-quill';
import { EditorComponent } from './editor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
