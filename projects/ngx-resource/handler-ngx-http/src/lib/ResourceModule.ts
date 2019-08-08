import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceHandler, ResourceModule as ResourceModuleCore } from '@ngx-resource/core';
import { ResourceHandlerHttpClient } from './ResourceHandlerHttpClient';

export interface IResourceModuleConfig {
  handler?: Provider;
}

@NgModule()
export class ResourceModule extends ResourceModuleCore {

  /**
   * For root
   */
  static forRoot(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return ResourceModuleCore.forRoot({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
    });
  }

  /**
   * For child
   */
  static forChild(config: IResourceModuleConfig = {}): ModuleWithProviders {
    return ResourceModuleCore.forChild({
      handler: config.handler || {provide: ResourceHandler, useClass: ResourceHandlerHttpClient, deps: [HttpClient]}
    });
  }
}
