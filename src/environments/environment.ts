// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '0.0.0',
  //domain: 'http://qnewbss.beibeiyue.cn/new_bss',
  domain: 'http://192.168.1.112:8888',

  domainWs: 'ws://101.200.177.83:8008/new_bss',
  domainPay: 'https://tpay.beibeiyue.com/pay',
  domainOss: 'https://oss.beibeiyue.com',
  domainEs: 'http://es.beibeiyue.com'
  // domain: 'https://erpserver.baobaoyouyong.com',
  // domainWs: 'wss://erpserver.baobaoyouyong.com',

  // domainPay: 'https://pay.haochengzhang.com/pay',
  // domainOss: 'https://oss.haochengzhang.com',
  // domainEs: 'https://es.haochengzhang.com'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
