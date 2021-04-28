import { Bootstrapper } from '@blocks-framework/core';

const tsContext = import.meta.globEager('./**/modules/**/startup/*.ts');
const cacheKey = Object.keys(tsContext);

// debugger
//let tsContext = require.context("./modules/", true, /\/startup\/.+(.ts)$/);

//InjectCore.Conainter = Bootstrapper.iocManager.getContainer();
//globalIocManager.register(c => c.bind(Types.IBootstrapper).toConstantValue(Bootstrapper));

const context = (s) => {
  return tsContext[s];
};
context.keys = () => cacheKey;
Bootstrapper.PlugInSources.push(context);

//window.VUE_APP_BASE_URL = process.env.VUE_APP_ENV === 'pro' ? process.env.VUE_APP_BASE_URL : undefined;

document.onreadystatechange = () => {
  if (document.readyState == 'complete') {
    Bootstrapper.initialize();
  }
};
