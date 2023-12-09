/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ApigeeTemplatePlugin, PlugInResult, proxyEndpoint, FlowRunPoint } from 'apigee-templater-module';
export declare class APIKeyConfig {
    type: string;
    name: string;
    flowRunPoints: FlowRunPoint[];
    continueOnError: boolean;
}
/**
 * Plugin class for handling API Key template requests
 * @date 2/14/2022 - 8:08:34 AM
 *
 * @export
 * @class AuthApiKeyPlugin
 * @typedef {AuthApiKeyPlugin}
 * @implements {ApigeeTemplatePlugin}
 */
export declare class AuthApiKeyPlugin implements ApigeeTemplatePlugin {
    apikey_snippet: string;
    removekey_snippet: string;
    apikey_template: HandlebarsTemplateDelegate<any>;
    removekey_template: HandlebarsTemplateDelegate<any>;
    /**
     * Applies the template for this plugin
     * @date 2/14/2022 - 8:09:38 AM
     *
     * @param {proxyEndpoint} inputConfig
     * @param {Map<string, any>} processingVars
     * @return {Promise<PlugInResult>} Result of the plugin templating
     */
    applyTemplate(inputConfig: proxyEndpoint, additionalData?: any): Promise<PlugInResult>;
}
