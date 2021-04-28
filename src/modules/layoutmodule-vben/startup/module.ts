import { BlocksModule } from '@blocks-framework/core';
import { uiLoader } from '../main';
import { Types, INavigationService, ILoginService, uiLoaderParams } from '../../../types';

export class LayoutModule extends BlocksModule {
  constructor() {
    super();
  }
  public readonly moduleName: string = 'LayoutModule';

  async preInitialize() {}

  async initialize() {
    const navService = this.iocManager.get<INavigationService>(Types.INavigationService);
    const loadParams: uiLoaderParams = {
      routes: navService.getRoutes(),
      provide: {
        loginService: this.iocManager.get<ILoginService>(Types.ILoginService),
        navigationService: navService,
      },
      menus: navService.getNavigations(),
    };

    await uiLoader(loadParams);
    //Vue.prototype.$msg = Vue.prototype.$ionic.toastController
  }
}
