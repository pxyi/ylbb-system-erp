import { StaffComponent } from './staff/staff.component';
import { DepartmentComponent } from './department/department.component';
import { AuthGuardService } from './../../ng-relax/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionSalaryComponent } from './position-salary/position-salary.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule { }
