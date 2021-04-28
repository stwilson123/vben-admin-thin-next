import { BlocksModule, injectable, decorateIfNoExist } from '@blocks-framework/core';
import { Types, INavigationService, ILoginService } from '../../../types';
import { DefaultNavigationService } from '../services/defaultNavigationService';
import { DefaultLoginService } from '../services/defaultLoginService';

export class Custommodule extends BlocksModule {
  constructor() {
    super();
  }
  public readonly moduleName: string = 'custommodule';

  async preInitialize() {
    this.iocManager.register((c) => {
      c.bind<ILoginService>(Types.ILoginService).to(DefaultLoginService).inTransientScope();
      decorateIfNoExist(injectable(), DefaultLoginService);
    });

    this.iocManager.register((c) => {
      c.bind<INavigationService>(Types.INavigationService)
        .to(DefaultNavigationService)
        .inTransientScope();
      decorateIfNoExist(injectable(), DefaultNavigationService);
    });
  }

  async initialize() {}
}
