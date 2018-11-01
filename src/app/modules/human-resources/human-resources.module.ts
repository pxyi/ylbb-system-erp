import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { PositionSalaryComponent } from './position-salary/position-salary.component';
import { DepartmentComponent } from './department/department.component';
import { StaffComponent } from './staff/staff.component';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { UpdateComponent } from './staff/update/update.component';
import { UploadComponent } from './staff/upload/upload.component';
import { CheckworkComponent } from './achievements/checkwork/checkwork.component';
import { CheckworkUpdateComponent } from './achievements/checkwork/checkwork-update/checkwork-update.component';
import { DeductionComponent } from './achievements/deduction/deduction.component';
import { DeductionUpdateComponent } from './achievements/deduction/deduction-update/deduction-update.component';
import { ExtractComponent } from './achievements/extract/extract.component';
import { StatisticsComponent } from './achievements/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    HumanResourcesRoutingModule,
    NgRelaxModule
  ],
  declarations: [PositionSalaryComponent, DepartmentComponent, StaffComponent, UpdateComponent, UploadComponent, CheckworkComponent, CheckworkUpdateComponent, DeductionComponent, DeductionUpdateComponent, ExtractComponent, StatisticsComponent],
  entryComponents: [UpdateComponent, UploadComponent, CheckworkUpdateComponent, DeductionUpdateComponent]
})
export class HumanResourcesModule { }
