const Types = {
  ILoginService: 'ILoginService',
  INavigationService: 'INavigationService',
};

export interface uiLoaderParams {
  provide: any;
  routes: any[];
  menus: any[];
}

export interface IloginInfo {
  account: string;
  password: string;
}

export interface ILoginService {
  login(loginInfo: IloginInfo): any;
  logout(): any;
}

export interface INavigationService {
  getNavigations(roleId): any;
  getRoutes(): any[];
}

export { Types };
