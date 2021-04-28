import { INavigationService } from '../../../types';
import { inject, Types, IRouteManager } from '@blocks-framework/core';
// import { request, METHOD } from "@antd/utils/request";

export class DefaultNavigationService implements INavigationService {
  constructor(@inject(Types.IRouteManager) routeManager: IRouteManager) {
    this.routeManager = routeManager;
  }
  routeManager: IRouteManager;
  defaultNavigation = [
    {
      name: '实时监控',
      children: [
        {
          path: '/layout/custommodule/dashboard',
          name: '抄表信息',
        },
        {
          path: '/layout/custommodule/dashboard',
          name: '报警信息',
        },
      ],
    },
    {
      name: '能耗统计',
      path: '/layout/custommodule/dashboard',
    },
    {
      name: '图表统计',
      path: '/layout/custommodule/dashboard',
    },
    {
      name: '报表统计',
      path: '/layout/custommodule/dashboard',
    },
    {
      name: '节能率统计',
      path: '/layout/custommodule/dashboard',
    },
  ];
  getRoutes() {
    return this.routeManager.getRoute();
  }

  async getNavigations() {
    return this.defaultNavigation;
  }
  getChildren(item, newItem, list) {
    const newRouter = newItem;
    const childMenus = list.filter((n) => n.pId == item.id);
    if (childMenus.length > 0) {
      for (const j in childMenus) {
        const m = childMenus[j];
        const childModel = {
          path: '',
          name: m.name,
          uid: '',
          children: [],
          meta: {},
        };
        if (m.actionUrl != '') {
          childModel.path = 'parent2/' + m.url;
          childModel.meta = {
            page: {
              actionUrl: m.actionUrl,
            },
          };
          childModel.uid = 'iframelink';
        } else {
          childModel.path = 'parent1/' + m.url;
          childModel.uid = 'ar';
        }
        newRouter.children.push(childModel);
        this.getChildren(m, newRouter.children[j], list);
      }
    }
    return newRouter;
  }
}
