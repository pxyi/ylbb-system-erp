import { DeductionComponent } from './achievements/deduction/deduction.component';
import { StaffComponent } from './staff/staff.component';
import { DepartmentComponent } from './department/department.component';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionSalaryComponent } from './position-salary/position-salary.component';
import { CheckworkComponent } from './achievements/checkwork/checkwork.component';
import { ExtractComponent } from './achievements/extract/extract.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
