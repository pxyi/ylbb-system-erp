import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { AnalysisComponent } from './analysis.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: { title: '经营分析' },
    component: AnalysisComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
