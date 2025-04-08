export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: [
    'pages/index/index',
    'pages/assessment/index',
    'pages/testing/index',
    'pages/result/index',
    'pages/history/index',
    'pages/failed-items/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '儿童发育评估',
    navigationBarTextStyle: 'black'
  }
})
