import { IRouteProvider } from '@blocks-framework/core';

export class RouteProvider extends IRouteProvider {
  public getRoutes(): any[] {
    return [
      {
        path: 'login',
        uniqueKey: 'login',
        //layout: "layout",
        meta: '',
        name: 'custom-login',
        component: () => import('./../views/sys/login/Login.vue'),
      },
      {
        path: 'dashboard',
        uniqueKey: 'dashboard',
        layout: 'layout',
        meta: {
          title: '首页',
        },
        component: () => import('./../views/sys/analysis/index.vue'),
      },
      // {
      //       path: 'masterdata/layoutdemo',
      //       uniqueKey: "layoutdemo",
      //       layout: "layout",
      //       component: () => import('./src/views/masterdata/layoutdemo.bl'),
      //   },
      //   {
      //       path: 'masterdata/add',
      //       uniqueKey: "MasterDataAdd",
      //       layout: "layout",
      //       component: () => import('./src/views/masterdata/add.bl'),
      //   }
    ];
  }
}
