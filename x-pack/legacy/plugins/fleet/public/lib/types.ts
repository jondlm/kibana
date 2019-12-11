/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { IModule, IScope } from 'angular';
import { AxiosRequestConfig } from 'axios';
import { FrameworkAdapter } from './adapters/framework/adapter_types';
import { AgentsLib } from './agent';
import { PoliciesLib } from './policy';
import { ElasticsearchLib } from './elasticsearch';
import { FrameworkLib } from './framework';
import { EnrollmentApiKeyLib } from './enrollment_api_key';

export interface FrontendLibs {
  elasticsearch: ElasticsearchLib;
  framework: FrameworkLib;
  agents: AgentsLib;
  policies: PoliciesLib;
  enrollmentApiKeys: EnrollmentApiKeyLib;
}

export type FramworkAdapterConstructable = new (uiModule: IModule) => FrameworkAdapter;

// FIXME: replace AxiosRequestConfig with something more defined
export type RequestConfig = AxiosRequestConfig;

export interface ApiAdapter {
  kbnVersion: string;

  get<T>(url: string, config?: RequestConfig | undefined): Promise<T>;
  post(url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<object>;
  delete(url: string, config?: RequestConfig | undefined): Promise<object>;
  put(url: string, data?: any, config?: RequestConfig | undefined): Promise<object>;
}

export interface UiKibanaAdapterScope extends IScope {
  breadcrumbs: any[];
  topNavMenu: any[];
}

export interface KibanaUIConfig {
  get(key: string): any;
  set(key: string, value: any): Promise<boolean>;
}

export interface KibanaAdapterServiceRefs {
  config: KibanaUIConfig;
  rootScope: IScope;
}

export type BufferedKibanaServiceCall<ServiceRefs> = (serviceRefs: ServiceRefs) => void;

export interface Chrome {
  setRootTemplate(template: string): void;
}