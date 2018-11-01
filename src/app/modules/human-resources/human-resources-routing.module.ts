import { DetailComponent } from './wage/detail/detail.component';
import { InquireComponent } from './wage/inquire/inquire.component';
import { AdjustmentComponent } from './wage/adjustment/adjustment.component';
import { DeductionComponent } from './achievements/deduction/deduction.component';
import { StaffComponent } from './staff/staff.component';
import { DepartmentComponent } from './department/department.component';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionSalaryComponent } from './position-salary/position-salary.component';
import { CheckworkComponent } from './achievements/checkwork/checkwork.component';
import { ExtractComponent } from './achievements/extract/extract.component';
import { StatisticsComponent } from './achievements/statistics/statistics.component';
import { CommissionComponent } from './achievements/commission/commission.component';
import { SatisfactionComponent } from './achievements/satisfaction/satisfaction.component';
import { AssessmentComponent } from './wage/assessment/assessment.component';

const routes: Routes = [
  {
    path: 'positionsalary',
    data: { title: '职位与薪酬管理' },
    component: PositionSalaryComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'department',
    data: { title: '部门管理' },
    component: DepartmentComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'staff',
    data: { title: '员工管理' },
    component: StaffComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'achievements',
    data: { title: '绩效管理' },
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'checkwork',
        data: { title: '考勤情况' },
        component: CheckworkComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'deduction',
        data: { title: '扣分管理' },
        component: DeductionComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'extract',
        data: { title: '提成明细' },
        component: ExtractComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'statistics',
        data: { title: '提成统计' },
        component: StatisticsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'satisfaction',
        data: { title: '满意度管理' },
        component: SatisfactionComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'commission',
        data: { title: '提成阶梯管理' },
        component: CommissionComponent,
        canActivate: [ AuthGuardService ],
      },
    ]
  },
  {
    path: 'wage',
    data: { title: '工资管理' },
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'assessment',
        data: { title: '考核项目配置' },
        component: AssessmentComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'adjustment',
        data: { title: '单月手动调整' },
        component: AdjustmentComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'inquire',
        data: { title: '单月工资查询' },
        component: InquireComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'detail',
        data: { title: '单月工资明细查询' },
        component: DetailComponent,
        canActivate: [ AuthGuardService ],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
