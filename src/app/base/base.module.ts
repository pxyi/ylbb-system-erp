import { AppReuseStrategy } from './../core/app-reuse-strategy';
import { NgRelaxModule } from './../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MemberComponent } from './header/member/member.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [BaseComponent, ContentComponent, HeaderComponent, MenuComponent, FooterComponent, MemberComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    NgRelaxModule,
    NgZorroAntdModule
  ],
  entryComponents: [MemberComponent],
  providers: [AppReuseStrategy]
})
export class BaseModule { }
