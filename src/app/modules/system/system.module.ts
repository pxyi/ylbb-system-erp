import { ErrorComponent } from './error/error.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';
import { ClauseComponent } from './clause/clause.component';
import { HelpComponent } from './help/help.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'changelog',
    data: { title: '更新日志' },
    component: ChangelogComponent
  },
  {
    path: 'clause',
    data: { title: '条款' },
    component: ClauseComponent
  },
  {
    path: 'help',
    data: { title: '帮助' },
    component: HelpComponent
  },
  {
    path: 'error/:type',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangelogComponent, ClauseComponent, HelpComponent, ErrorComponent]
})
export class SystemModule { }
