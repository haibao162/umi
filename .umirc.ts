import { API_URL_DEFINE, OSS_URL_DEFINE } from './define';
import { defineConfig } from '@umijs/max';
import pxtorem from 'postcss-pxtorem';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: ' ',
  },
  define: {
    API_URL: API_URL_DEFINE,
    OSS_URL: OSS_URL_DEFINE,
  },
  routes: [
    {
      path: '/',
      redirect: '/plant',

    },
    // {
    //   name: '首页',
    //   path: '/home',
    //   component: './Home',
    // },
    {
      name: '树木介绍',
      path: '/plant',
      component: './plant',
      layout: false,
    },
    {
      name: '树木介绍',
      path: '/add_plant',
      component: './add_plant',
      layout: false,
    }
  ],
  npmClient: 'npm',
  // extraPostCSSPlugins: [
  //   pxtorem({
  //     rootValue: 37.5,
  //     propList: [
  //       '*',
  //       '!border',
  //       '!border-top',
  //       '!border-right',
  //       '!border-bottom',
  //       '!border-left',
  //       '!border-width',
  //     ],
  //   }),
  // ],
  proxy:
  {
    '/api': {
      target: 'https://pet.wq-info.com/',
      changeOrigin: true,
      secure: false, // 如果是https接口，需配置这个参数
    },
    '/prod-api': {
      target: 'https://admin.yaojunzhiku.com/',
      changeOrigin: true,
      secure: false, // 如果是https接口，需配置这个参数
    },
  },
});

