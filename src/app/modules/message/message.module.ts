import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { SendoutComponent } from './sendout/sendout.component';
import { TemplateComponent } from './template/template.component';
import { SendlogComponent } from './sendlog/sendlog.component';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    NgRelaxModule
  ],
  declarations: [SendoutComponent, TemplateComponent, SendlogComponent]
})
export class MessageModule { }
