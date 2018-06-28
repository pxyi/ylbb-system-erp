import { ErrorComponent } from './error/error.component';
import { SystemRoutingModule } from './system-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';
import { ClauseComponent } from './clause/clause.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SystemRoutingModule
  ],
  declarations: [ChangelogComponent, ClauseComponent, HelpComponent, ErrorComponent]
})
export class SystemModule { }
