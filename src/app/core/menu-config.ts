export const MenuConfig = [
  {
    title : '首页',
    brief : '首页',
    key   : '/home/index',
    icon  : 'home',
    disabled: true,
    isLeaf: true
  },
  {
    title : '预约管理',
    brief : '预约',
    key   : '/home/appointment',
    icon  : 'calendar',
    children : [
      {
        title : '预约列表',
        key   : '/home/appointment/list',
        isLeaf: true
      },
      {
        title : '预约设置',
        key   : '/home/appointment/setting',
        isLeaf: true
      },
      {
        title : '泳师设置',
        key   : '/home/appointment/swimmer',
        isLeaf: true
      }
    ]
  },
  {
    title : '回访管理',
    brief : '回访',
    key   : '/home/visit',
    icon  : 'customer-service',
    children : [
      {
        title : '线索回访',
        key   : '/home/visit/clue',
        isLeaf: true
      },
      {
        title : '未办卡回访',
        key   : '/home/visit/nocard',
        isLeaf: true
      },
      {
        title : '会员回访',
        key   : '/home/visit/member',
        isLeaf: true
      }
    ]
  },
  {
    title : '客户管理',
    brief : '客户',
    key   : '/home/customer',
    icon  : 'team',
    children : [
      {
        title : '客户列表',
        key   : '/home/customer/list',
        isLeaf: true
      },
      {
        title : '刷卡消费',
        key   : '/home/customer/paycard',
        isLeaf: true
      },
      {
        title : '无意向客户',
        key   : '/home/customer/nointention',
        isLeaf: true
      },
      {
        title : '用户互动',
        key   : '/home/customer/interaction',
        isLeaf: true
      },
    ]
  },
  {
    title : '会员卡管理',
    brief : '会员',
    key   : '/home/member',
    icon  : 'credit-card',
    children : [
      {
        title : '会员卡列表',
        key   : '/home/member/list',
        isLeaf: true
      },
      {
        title : '卡变更日志',
        key   : '/home/member/changelog',
        isLeaf: true
      },
      {
        title : '补卡日志',
        key   : '/home/member/patchlog',
        isLeaf: true
      },
      {
        title : '卡类型管理',
        key   : '/home/member/cardtype',
        isLeaf: true
      },
      {
        title : '卡业务管理',
        key   : '/home/member/cardbusiness',
        isLeaf: true
      },
      {
        title : '会员积分列表',
        key   : '/home/member/integrallist',
        isLeaf: true
      },
      {
        title : '积分变更',
        key   : '/home/member/integralchange',
        isLeaf: true
      },
      {
        title : '积分兑换',
        key   : '/home/member/integralexchange',
        isLeaf: true
      }
    ]
  },
  {
    title : '消费管理',
    brief : '消费',
    key   : '/home/consumption',
    icon  : 'red-envelope',
    children : [
      {
        title : '订单列表',
        key   : '/home/consumption/order',
        isLeaf: true
      },
      {
        title : '订单撤销列表',
        key   : '/home/consumption/revokelist',
        isLeaf: true
      },
      {
        title : '消费列表',
        key   : '/home/consumption/list',
        isLeaf: true
      },
      {
        title : '撤销记录',
        key   : '/home/consumption/revokelog',
        isLeaf: true
      },
      {
        title : '短信记录',
        key   : '/home/consumption/shortmsg',
        isLeaf: true
      },
      {
        title : '满意度记录',
        key   : '/home/consumption/satisfactionlog',
        isLeaf: true
      },
      {
        title : '会员课程进度',
        key   : '/home/consumption/curriculum',
        isLeaf: true
      },
      {
        title : '福利消费列表',
        key   : '/home/consumption/welfare',
        isLeaf: true
      }
    ]
  },
  {
    title : '经营分析',
    brief : '经营',
    key   : '/home/analysis/list',
    icon  : 'area-chart',
    isLeaf: true
  },
  {
    title : '消息管理',
    brief : '消息',
    key   : '/home/message',
    icon  : 'message',
    children : [
      {
        title : '短信发送',
        key   : '/home/message/sendout',
        isLeaf: true
      },
      {
        title : '模板配置',
        key   : '/home/message/template',
        isLeaf: true
      },
      {
        title : '发送日志',
        key   : '/home/message/sendlog',
        isLeaf: true
      }
    ]
  },
  {
    title : '人力资源',
    brief : '人力',
    key   : '/home/humanresources',
    icon  : 'idcard',
    children: [
      {
        title : '职位管理',
        key   : '/home/humanresources/position',
        isLeaf: true
      },
      {
        title : '部门管理',
        key   : '/home/humanresources/department',
        isLeaf: true
      },
      {
        title : '员工管理',
        key   : '/home/humanresources/staff',
        isLeaf: true
      },
      {
        title : '考勤情况',
        key   : '/home/humanresources/achievements/checkwork',
        isLeaf: true
      },
      {
        title : '扣分管理',
        key   : '/home/humanresources/achievements/deduction',
        isLeaf: true
      },
      {
        title : '提成明细',
        key   : '/home/humanresources/achievements/extract',
        isLeaf: true
      },
      {
        title : '提成统计',
        key   : '/home/humanresources/achievements/statistics',
        isLeaf: true
      },
      {
        title : '业绩目标',
        key   : '/home/humanresources/achievements/target',
        isLeaf: true
      },
      {
        title : '满意度管理',
        key   : '/home/humanresources/achievements/satisfaction',
        isLeaf: true
      },
      {
        title : '提成阶梯管理',
        key   : '/home/humanresources/achievements/commission',
        isLeaf: true
      },
      {
        title : '考核项目配置',
        key   : '/home/humanresources/wage/assessment',
        isLeaf: true
      },
      {
        title : '单月手动调整',
        key   : '/home/humanresources/wage/adjustment',
        isLeaf: true
      },
      {
        title : '单月工资查询',
        key   : '/home/humanresources/wage/inquire',
        isLeaf: true
      }
    ]
  },
  {
    title : '营销推广',
    brief : '推广',
    key   : '/home/marketing',
    icon  : 'rocket',
    children : [ 
      {
        title : '营销管理',
        key   : '/home/marketing/activity',
        isLeaf: true
      },
      {
        title : '我的活动',
        key   : '/home/marketing/list',
        isLeaf: true
      }, 
      { 
        title : '核销管理',
        key   : '/home/marketing/writeoff',
        isLeaf: true
      },
      {
        title : '门店推广',
        key   : '/home/marketing/promotion',
        isLeaf: true
      }
    ]
  },
  {
    title : '设置',
    brief : '设置',
    key   : '/home/configuration',
    icon  : 'setting',
    children: [
      {
        title : '基础设置',
        key   : '/home/configuration/base',
        isLeaf: true
      },
      {
        title : '泳圈管理',
        key   : '/home/configuration/swimming',
        isLeaf: true
      },
      {
        title : '社区管理',
        key   : '/home/configuration/community',
        isLeaf: true
      },
      {
        title : '门店信息',
        key   : '/home/configuration/store',
        isLeaf: true
      },
      {
        title : '在线充值',
        key   : '/home/configuration/payment/pay',
        isLeaf: true
      },
      {
        title : '充值记录',
        key   : '/home/configuration/payment/record',
        isLeaf: true
      },
      {
        title : '商品列表',
        key   : '/home/configuration/commodity/list',
        isLeaf: true
      },
      {
        title : '库存管理',
        key   : '/home/configuration/commodity/stock',
        isLeaf: true
      },
      {
        title : '账号管理',
        key   : '/home/configuration/account/number',
        isLeaf: true
      },
      {
        title : '角色管理',
        key   : '/home/configuration/account/role',
        isLeaf: true
      },
      {
        title : '登录日志',
        key   : '/home/configuration/account/loginlog',
        isLeaf: true
      },
      {
        title : '支付申请',
        key   : '/home/configuration/account/payapply',
        isLeaf: true
      }
    ]
  }
];