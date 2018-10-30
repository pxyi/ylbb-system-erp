import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuardService } from 'src/app/ng-relax/services/auth-guard.service';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: 'list',
    data: { title: '商品列表' },
    component: ListComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'stock',
    data: { title: '库存管理' },
    component: StockComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }
