// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  urlSystem: 'http://10.1.27.141:10402/system',
  //urlSystem: 'http://localhost:10402/system',
  urlAdvice: 'http://10.1.27.141:10405/advise',
  // urlAdvice: 'http://localhost:10405/advise',
  urlAmend: 'http://10.1.27.141:10407/amend',
  //urlAmend: 'http://localhost:10407/amend',
  urlLog: 'http://10.1.27.141:10322/logging',
  urlPresentDoc: 'http://10.1.27.141:10408/present',
  //urlPresentDoc: 'http://localhost:10408/present',
  urlMessage: 'http://10.1.27.141:10409/message',
  //urlMessage: 'http://localhost:10409/message',
  urlEvaluate: 'http://10.1.27.141:10411/evaluate',
  // urlEvaluate: 'http://localhost:10411/evaluate',
  urlTracing: 'http://10.1.27.141:10414/tracing',
  //urlTracing: 'http://localhost:10414/tracing',
  urlConsult: 'http://10.1.27.141:10416/consult',
  // urlConsult: 'http://localhost:10416/consult',
  //urlApiFile: 'http://10.1.27.141:10415/api-file',
  // urlApiFile: 'http://localhost:10415/lc-api-file',
  urlApiFile: 'https://devpayment.mbbank.com.vn/api-file',
  urlAdmin: 'http://10.1.27.141:10401/admin',
  // urlAdmin: 'http://localhost:10401/admin',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
