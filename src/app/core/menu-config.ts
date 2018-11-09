export const MenuConfig = [
  {
    title : '首页',
    key   : '/home',
    icon  : 'anticon-home',
    disabled: true,
    isLeaf: true
  },
  {
    title : '客户管理',
    key   : '/home/customer',
    icon  : 'anticon-team',
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
        title : '潜在客户',
        key   : '/home/customer/potential',
        isLeaf: true
      },
      {
        title : '无意向客户',
        key   : '/home/customer/nointention',
        isLeaf: true
      }
    ]
  },
  {
    title : '会员卡管理',
    key   : '/home/membercard',
    icon  : 'anticon-credit-card',
    children : [
      {
        title : '会员卡列表',
        key   : '/home/membercard/list',
        isLeaf: true
      },
      {
        title : '卡变更日志',
        key   : '/home/membercard/changelog',
        isLeaf: true
      },
      {
        title : '补卡日志',
        key   : '/home/membercard/patchlog',
        isLeaf: true
      },
      {
        title : '卡类型管理',
        key   : '/home/membercard/cardtype',
        isLeaf: true
      },
      {
        title : '卡业务管理',
        key   : '/home/membercard/cardbusiness',
        isLeaf: true
      }
    ]
  },
  {
    title : '预约管理',
    key   : '/home/appointment',
    icon  : 'anticon-calendar',
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
    title : '消费管理',
    key   : '/home/consumption',
    icon  : 'anticon-red-envelope',
    children : [
      {
        title : '消费列表',
        key   : '/home/consumption/list',
        isLeaf: true
      },
      {
        title : '消费撤销记录',
        key   : '/home/consumption/revoke',
        isLeaf: true
      },
      {
        title : '消费短信记录',
        key   : '/home/consumption/shortmsg',
        isLeaf: true
      },
      {
        title : '满意度修改记录',
        key   : '/home/consumption/satisfaction',
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
    title : '回访管理',
    key   : '/home/visit',
    icon  : 'anticon-form',
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
    title : '积分管理',
    key   : '/home/integral',
    icon  : 'anticon-gift',
    children : [
      {
        title : '会员积分列表',
        key   : '/home/integral/list',
        isLeaf: true
      },
      {
        title : '积分变更日志',
        key   : '/home/integral/change',
        isLeaf: true
      },
      {
        title : '积分兑换日志',
        key   : '/home/integral/exchange',
        isLeaf: true
      }
    ]
  },
  {
    title : '消息管理',
    key   : '/home/message',
    icon  : 'anticon-message',
    children : [
      {
        title : '短信发送',
        key   : '/home/message/sendout',
        isLeaf: true
      },
      {
        title : '短信模板配置',
        key   : '/home/message/template',
        isLeaf: true
      },
      {
        title : '短信发送日志',
        key   : '/home/message/sendlog',
        isLeaf: true
      }
    ]
  },
  {
    title : '推广活动',
    key   : '/home/marketing',
    icon  : 'anticon-rocket',
    isLeaf: true
  },
  {
    title : '基础资料',
    key   : '/home/configuration',
    icon  : 'anticon-tool',
    children: [
      {
        title : '基础设置',
        key   : '/home/configuration/setting',
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
      }
    ]
  },
  {
    title : '商品管理',
    key   : '/home/commodity',
    icon  : 'anticon-tool',
    children: [
      {
        title : '商品列表',
        key   : '/home/commodity/list',
        isLeaf: true
      },
      {
        title : '库存管理',
        key   : '/home/commodity/stock',
        isLeaf: true
      }
    ]
  },
  {
    title : '经营分析',
    key   : '/home/analysis',
    icon  : 'anticon-area-chart',
    isLeaf: true
  },
  {
    title : '全国通卡',
    key   : '/home/passcard',
    icon  : 'anticon-idcard',
    isLeaf: true
  },
  {
    title : '微信小程序',
    key   : '/home/wechat',
    icon  : 'anticon-wechat',
    isLeaf: true
  },
  {
    title : '充值中心',
    key   : '/home/paymen',
    icon  : 'anticon-pay-circle',
    children: [
      {
        title : '在线充值',
        key   : '/home/payment',
        isLeaf: true
      },
      {
        title : '充值记录',
        key   : '/home/payment/record',
        isLeaf: true
      }
    ]
  },
  {
    title : '人力资源',
    key   : '/home/humanresources',
    icon  : 'anticon-idcard',
    children: [
      {
        title : '职位与薪酬管理',
        key   : '/home/humanresources/positionsalary',
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
        title : '绩效管理',
        key   : '/home/humanresources/achievements',
        children: [
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
            title : '满意度管理',
            key   : '/home/humanresources/achievements/satisfaction',
            isLeaf: true
          },
          {
            title : '提成阶梯管理',
            key   : '/home/humanresources/achievements/commission',
            isLeaf: true
          },
        ],
      },
      {
        title : '工资管理',
        key   : '/home/humanresources/wage',
        children: [
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
          },
          {
            title : '单月工资明细查询',
            key   : '/home/humanresources/wage/detail',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    title : '账户管理',
    key   : '/home/account',
    icon  : 'anticon-usergroup-add',
    children: [
      {
        title : '账号管理',
        key   : '/home/account/account',
        isLeaf: true
      },
      {
        title : '角色管理',
        key   : '/home/account/role',
        isLeaf: true
      },
      {
        title : '登录日志',
        key   : '/home/account/loginlog',
        isLeaf: true
      }
    ]
  },
  {
    title : '用户互动',
    key   : '/home/interaction',
    icon  : 'anticon-profile',
    isLeaf: true
  },
  {
    title : '核销管理',
    key   : '/home/writeoff',
    icon  : 'anticon-scissor',
    isLeaf: true
  },
];