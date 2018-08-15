import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { NgRelaxModule } from '../../ng-relax/ng-relax.module';
import { SettingComponent } from './setting/setting.component';
import { SwimmingCircleComponent } from './swimming-circle/swimming-circle.component';
import { CommunityComponent } from './community/community.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    NgRelaxModule
  ],
  declarations: [SettingComponent, SwimmingCircleComponent, CommunityComponent, KnowledgeComponent]
})
export class ConfigurationModule { }
