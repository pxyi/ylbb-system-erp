import { ErrorComponent } from './error/error.component';
import { HelpComponent } from './help/help.component';
import { ClauseComponent } from './clause/clause.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule { }