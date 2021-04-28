import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, Router } from 'vue-router';
import { basicRoutes, LoginRoute } from './routes';
import { REDIRECT_NAME } from './constant';

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME, 'custom-login'];

// app router
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(routes: any[], app: App<Element>) {
  window.tttt = router;
  if (routes) {
    addRoute(router, routes);
  }
  app.use(router);
}

function addRoute(sysRouter: Router, routes: any[]) {
  if (sysRouter && routes) {
    for (const route of routes) {
      sysRouter.addRoute(route);
      // debugger
      // if (route.children)
      //   addRoute(sysRouter, route.children);
    }
  }
}
//export default router;

export { router };
