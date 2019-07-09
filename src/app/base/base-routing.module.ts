import { BaseComponent } from './base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../ng-relax/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'index',
        data: { title: '首页', noReuse: true },
        loadChildren: 'src/app/modules/index/index.module#IndexModule'
      },
      {
        path: 'password',
        data: { title: '修改密码', noReuse: true },
        loadChildren: 'src/app/modules/password/password.module#PasswordModule'
      },
      {
        path: 'appointment',
        data: { noReuse: true },
        children: [
          {
            path: 'list',
            data: { title: '预约列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/appointment/list/list.module#ListModule'
          },
          {
            path: 'setting',
            data: { title: '预约设置' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/appointment/setting/setting.module#SettingModule'
          },
          {
            path: 'swimmer',
            data: { title: '泳师设置' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/appointment/swimmer/swimmer.module#SwimmerModule'
          },
        ]
      },
      {
        path: 'visit',
        data: { noReuse: true },
        children: [
          {
            path: 'clue',
            data: { title: '线索回访' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/visit/clue/clue.module#ClueModule'
          },
          {
            path: 'nocard',
            data: { title: '未办卡回访' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/visit/nocard/nocard.module#NocardModule'
          },
          {
            path: 'member',
            data: { title: '会员回访' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/visit/member/member.module#MemberModule'
          }
        ]
      },
      {
        path: 'customer',
        data: { noReuse: true },
        children: [
          {
            path: 'list',
            data: { title: '客户列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/customer/list/list.module#ListModule'
          },
          {
            path: 'paycard',
            data: { title: '刷卡消费' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/customer/paycard/paycard.module#PaycardModule'
          },
          {
            path: 'nointention',
            data: { title: '无意向客户' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/customer/nointention/nointention.module#NointentionModule'
          },
          {
            path: 'interaction',
            data: { title: '用户互动' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/customer/interaction/interaction.module#InteractionModule'
          }
        ]
      },
      {
        path: 'member',
        data: { noReuse: true },
        children: [
          {
            path: 'list',
            data: { title: '会员卡列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/list/list.module#ListModule'
          },
          {
            path: 'changelog',
            data: { title: '卡变更日志' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/change-log/change-log.module#ChangeLogModule'
          },
          {
            path: 'patchlog',
            data: { title: '补卡日志' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/patch-log/patch-log.module#PatchLogModule'
          },
          {
            path: 'cardtype',
            data: { title: '卡类型管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/card-type/card-type.module#CardTypeModule'
          },
          {
            path: 'cardbusiness',
            data: { title: '卡类型管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/card-business/card-business.module#CardBusinessModule'
          },
          {
            path: 'integrallist',
            data: { title: '会员积分列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/integral/integral.module#IntegralModule'
          },
          {
            path: 'integralchange',
            data: { title: '积分变更日志' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/integral-change/integral-change.module#IntegralChangeModule'
          },
          {
            path: 'integralexchange',
            data: { title: '积分兑换日志' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/member/integral-exchange/integral-exchange.module#IntegralExchangeModule'
          },
        ]
      },
      {
        path: 'consumption',
        data: { noReuse: true },
        children: [
          {
            path: 'order',
            data: { title: '订单列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/order/order.module#OrderModule'
          },
          {
            path: 'revokelist',
            data: { title: '订单撤销列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/revoke-list/revoke-list.module#RevokeListModule'
          },
          {
            path: 'list',
            data: { title: '消费列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/list/list.module#ListModule'
          },
          {
            path: 'revokelog',
            data: { title: '撤销记录' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/revoke-log/revoke-log.module#RevokeLogModule'
          },
          {
            path: 'shortmsg',
            data: { title: '短信记录' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/shortmsg/shortmsg.module#ShortmsgModule'
          },
          {
            path: 'satisfactionlog',
            data: { title: '满意度记录' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/satisfaction-log/satisfaction-log.module#SatisfactionLogModule'
          },
          {
            path: 'curriculum',
            data: { title: '会员课程进度' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/curriculum/curriculum.module#CurriculumModule'
          },
          {
            path: 'welfare',
            data: { title: '福利消费列表' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/consumption/welfare/welfare.module#WelfareModule'
          },
        ]
      },
      {
        path: 'message',
        data: { noReuse: true },
        children: [
          {
            path: 'sendout',
            data: { title: '短信发送' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/message/sendout/sendout.module#SendoutModule'
          },
          {
            path: 'template',
            data: { title: '模板配置' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/message/template/template.module#TemplateModule'
          },
          {
            path: 'sendlog',
            data: { title: '发送日志' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/message/sendlog/sendlog.module#SendlogModule'
          },
        ]
      },
      {
        path: 'management',
        data: { noReuse: true },
        children: [
          {
            path: 'analysis',
            data: { title: '经营分析' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/management/analysis/analysis.module#AnalysisModule'
          },
          {
            path: 'statistic',
            data: { title: '数据概况' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/management/statistic/statistic.module#StatisticModule'
          },
        ]
      },
      {
        path: 'humanresources',
        data: { noReuse: true },
        children: [
          {
            path: 'position',
            data: { title: '职位管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/human-resources/position/position.module#PositionModule'
          },
          {
            path: 'department',
            data: { title: '部门管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/human-resources/department/department.module#DepartmentModule'
          },
          {
            path: 'staff',
            data: { title: '员工管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/human-resources/staff/staff.module#StaffModule'
          },
          {
            path: 'achievements',
            data: { noReuse: true },
            children: [
              {
                path: 'checkwork',
                data: { title: '考勤情况' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/checkwork/checkwork.module#CheckworkModule'
              },
              {
                path: 'deduction',
                data: { title: '扣分管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/deduction/deduction.module#DeductionModule'
              },
              {
                path: 'extract',
                data: { title: '提成明细' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/extract/extract.module#ExtractModule'
              },
              {
                path: 'statistics',
                data: { title: '提成统计' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/statistics/statistics.module#StatisticsModule'
              },
              {
                path: 'target',
                data: { title: '业绩目标' },
                loadChildren: 'src/app/modules/human-resources/achievements/target/target.module#TargetModule'
              },
              {
                path: 'satisfaction',
                data: { title: '满意度管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/satisfaction/satisfaction.module#SatisfactionModule'
              },
              {
                path: 'commission',
                data: { title: '提成阶梯管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/achievements/commission/commission.module#CommissionModule'
              }
            ]
          },
          {
            path: 'wage',
            data: { noReuse: true },
            children: [
              {
                path: 'assessment',
                data: { title: '考核项目配置' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/wage/assessment/assessment.module#AssessmentModule'
              },
              {
                path: 'adjustment',
                data: { title: '单月手动调整' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/wage/adjustment/adjustment.module#AdjustmentModule'
              },
              {
                path: 'inquire',
                data: { title: '单月工资查询' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/human-resources/wage/inquire/inquire.module#InquireModule'
              }
            ]
          }
        ]
      },
      {
        path: 'marketing',
        data: { noReuse: true },
        children: [
          {
            path: 'activity',
            data: { title: '营销管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/marketing/activity/activity.module#ActivityModule'
          },
          {
            path: 'list',
            data: { title: '我的活动' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/marketing/list/list.module#ListModule'
          },
          {
            path: 'writeoff',
            data: { title: '核销管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/marketing/writeoff/writeoff.module#WriteoffModule'
          },
          {
            path: 'promotion',
            data: { title: '门店推广' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/marketing/promotion/promotion.module#PromotionModule'
          },
        ]
      },
      {
        path: 'configuration',
        data: { noReuse: true },
        children: [
          {
            path: 'base',
            data: { title: '基础设置' },
            loadChildren: 'src/app/modules/configuration/base/base.module#BaseModule'
          },
          {
            path: 'swimming',
            data: { title: '泳圈管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/configuration/swimming/swimming.module#SwimmingModule'
          },
          {
            path: 'community',
            data: { title: '社区管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/configuration/community/community.module#CommunityModule'
          },
          {
            path: 'store',
            data: { title: '门店管理' },
            canLoad: [ AuthGuardService ],
            loadChildren: 'src/app/modules/configuration/store/store.module#StoreModule'
          },
          {
            path: 'payment',
            data: { noReuse: true },
            children: [
              {
                path: 'pay',
                data: { title: '在线充值' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/payment/pay/pay.module#PayModule'
              },
              {
                path: 'record',
                data: { title: '充值记录' },
                canLoad: [AuthGuardService],
                loadChildren: 'src/app/modules/configuration/payment/record/record.module#RecordModule'
              }
            ]
          },
          {
            path: 'commodity',
            data: { noReuse: true },
            children: [
              {
                path: 'list',
                data: { title: '商品管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/commodity/list/list.module#ListModule'
              },
              {
                path: 'stock',
                data: { title: '库存管理' },
                canLoad: [AuthGuardService],
                loadChildren: 'src/app/modules/configuration/commodity/stock/stock.module#StockModule'
              }
            ]
          },
          {
            path: 'account',
            data: { noReuse: true },
            children: [
              {
                path: 'number',
                data: { title: '账号管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/account/number/number.module#NumberModule'
              },
              {
                path: 'role',
                data: { title: '角色管理' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/account/role/role.module#RoleModule'
              },
              {
                path: 'loginlog',
                data: { title: '登录日志' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/account/log/log.module#LogModule'
              },
              {
                path: 'payapply',
                data: { title: '支付申请' },
                canLoad: [ AuthGuardService ],
                loadChildren: 'src/app/modules/configuration/pay-apply/pay-apply.module#PayApplyModule'
              }
            ]
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
