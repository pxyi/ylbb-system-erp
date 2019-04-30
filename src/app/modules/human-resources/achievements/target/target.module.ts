import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgRelaxModule } from 'src/app/ng-relax/ng-relax.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { TargetComponent } from './target.component';
import { UpdateComponent } from './update/update.component';
import { SettingComponent } from './update/setting/setting.component';
import { ExcitationComponent } from './update/excitation/excitation.component';
import { SopComponent } from './update/sop/sop.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';

@NgModule({
  declarations: [TargetComponent, UpdateComponent, SettingComponent, ExcitationComponent, SopComponent],
  imports: [
    CommonModule,
    NgRelaxModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [ AuthGuardService ],
        component: TargetComponent,
      }
    ])
  ],
  entryComponents: [UpdateComponent]
})
export class TargetModule { }