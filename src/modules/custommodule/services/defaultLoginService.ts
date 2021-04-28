import { ILoginService, IloginInfo } from '../../../types';
import { defHttp } from '/@/utils/http/axios';
export class DefaultLoginService implements ILoginService {
  async login(loginInfo: IloginInfo): Promise<any> {
    const result = await defHttp.post({
      url: '/api/login/LoginHaddler',
      data: {
        account: loginInfo.account,
        pwd: loginInfo.password,
        isAutoLogin: false,
      },
    });
    if (result.data.code !== 100) {
      // return Promise.reject(new Error(result.data.msg))
      throw new Error(result.data.msg);
    }

    return result.data;
  }
  logout() {
    throw new Error('Method not implemented.');
  }
}
