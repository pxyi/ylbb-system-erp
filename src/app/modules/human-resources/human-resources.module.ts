import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { PositionSalaryComponent } from './position-salary/position-salary.component';
import { DepartmentComponent } from './department/department.component';
import { StaffComponent } from './staff/staff.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';

@NgModule({
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    NgRelaxModule
  ],
  declarations: [PositionSalaryComponent, DepartmentComponent, StaffComponent]
})
export class HumanResourcesModule { }
