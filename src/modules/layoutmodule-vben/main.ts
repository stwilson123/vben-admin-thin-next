import '/@/design/index.less';
import 'virtual:windi.css';

import { createApp } from 'vue';
import App from './App.vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { setupRouter, router } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';
import { setupErrorHandle } from '/@/logics/error-handle';
import { setupGlobDirectives } from '/@/directives';
import { setupI18n } from '/@/locales/setupI18n';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { uiLoaderParams } from './../../types';
import { extendsMenus } from '/@/router/menus';
// Register icon Sprite
import 'vite-plugin-svg-icons/register';

// Do not introduce` on-demand in local development?
// In the local development for on-demand introduction, the number of browser requests will increase by about 20%.
// Which may slow down the browser refresh.
// Therefore, all are introduced in local development, and only introduced on demand in the production environment
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

const uiLoader = async (uiLoaderParams: uiLoaderParams) => {
  const app = createApp(App);
  if (uiLoaderParams.provide) {
    const provide = uiLoaderParams.provide;
    for (const key in provide) {
      if (Object.prototype.hasOwnProperty.call(provide, key)) {
        app.provide(key, provide[key]);
      }
    }
  }
  extendsMenus.splice(0, 0, ...(await uiLoaderParams.menus));

  // Configure vuex store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Register global components
  registerGlobComp(app);

  // Multilingual configuration
  await setupI18n(app);

  // Configure routing
  setupRouter(uiLoaderParams.routes, app);

  // router-guard
  setupRouterGuard(uiLoaderParams.routes);

  // Register global directive
  setupGlobDirectives(app);

  // Configure global error handling
  setupErrorHandle(app);

  // Mount when the route is ready
  // https://next.router.vuejs.org/api/#isready
  await router.isReady();

  app.mount('#app', true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
};

export { uiLoader };
