export const MenuConfig = [
  {
    title : '首页',
    key   : '/home',
    icon  : 'anticon-home',
    isLeaf: true
  },
  {
    title : '客户管理',
    key   : '/home/customer',
    icon  : 'anticon-team',
    children : [
      {
        title : '潜在客户',
        key   : '/home/customer/potentail',
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
    title : '推广活动',
    key   : '/home/marketing',
    icon  : 'anticon-area-chart',
    children: [
      {
        title : '活动',
        key   : '/home/marketing/activity',
        isLeaf: true
      },
      {
        title: '数据',
        key: '/home/marketing/data',
        isLeaf: true
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
    title : '用户互动',
    key   : '/home/interaction',
    icon  : 'anticon-profile',
    isLeaf: true
  },
];