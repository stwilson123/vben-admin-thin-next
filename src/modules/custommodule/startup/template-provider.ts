import { ITemplateProvider, TemplateResult } from '@blocks-framework/core';
import { LAYOUT } from '/@/router/constant';
export class LayoutTemplateProvider extends ITemplateProvider {
  public getTemplate(): TemplateResult[] {
    return [
      {
        name: 'layout',
        path: '/layout',
        //component: layout,
        component: LAYOUT,
        meta: {
          isTemplate: true,
        },
      },
    ];
  }
}
