import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatahtmlComponent } from './updatahtml.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EditorModule } from 'src/app/ng-relax/components/editor/editor.module';

@NgModule({
  declarations: [ UpdatahtmlComponent ],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    EditorModule
  ],
  entryComponents: [UpdatahtmlComponent]
})
export class UpdatahtmlModule { }
