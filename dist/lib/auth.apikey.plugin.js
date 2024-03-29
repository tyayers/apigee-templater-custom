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
import Handlebars from 'handlebars';
import { PlugInResult, authTypes, RunPoint } from 'apigee-templater-module';
export class APIKeyConfig {
    constructor() {
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "flowRunPoints", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "continueOnError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
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
export class AuthApiKeyPlugin {
    constructor() {
        Object.defineProperty(this, "apikey_snippet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <VerifyAPIKey async="false" continueOnError="false" enabled="true" name="VA-VerifyKey">
      <DisplayName>VA-VerifyKey</DisplayName>
      <APIKey ref="request.header.x-api-key"/>
  </VerifyAPIKey>`
        });
        Object.defineProperty(this, "removekey_snippet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <AssignMessage async="false" continueOnError="false" enabled="true" name="AM-RemoveApiKey">
      <DisplayName>AM-RemoveKey</DisplayName>
      <Remove>
          <Headers>
              <Header name="x-api-key"/>
          </Headers>
      </Remove>
      <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
      <AssignTo createNew="false" transport="http" type="request"/>
  </AssignMessage>`
        });
        Object.defineProperty(this, "apikey_template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Handlebars.compile(this.apikey_snippet)
        });
        Object.defineProperty(this, "removekey_template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Handlebars.compile(this.removekey_snippet)
        });
    }
    /**
     * Applies the template for this plugin
     * @date 2/14/2022 - 8:09:38 AM
     *
     * @param {proxyEndpoint} inputConfig
     * @param {Map<string, any>} processingVars
     * @return {Promise<PlugInResult>} Result of the plugin templating
     */
    applyTemplate(inputConfig, additionalData) {
        return new Promise((resolve) => {
            const fileResult = new PlugInResult(this.constructor.name);
            if (inputConfig.auth && inputConfig.auth.filter(e => e.type === authTypes.apikey).length > 0) {
                fileResult.files = [
                    {
                        policyConfig: {
                            name: 'VA-VerifyKey',
                            flowRunPoints: [{
                                    name: 'preRequest',
                                    flowCondition: '',
                                    stepCondition: '',
                                    runPoints: [RunPoint.preRequest]
                                }]
                        },
                        path: '/policies/VA-VerifyKey.xml',
                        contents: this.apikey_template({})
                    },
                    {
                        policyConfig: {
                            name: 'AM-RemoveApiKey',
                            flowRunPoints: [{
                                    name: 'default',
                                    flowCondition: '',
                                    stepCondition: '',
                                    runPoints: [RunPoint.preRequest]
                                }]
                        },
                        path: '/policies/AM-RemoveApiKey.xml',
                        contents: this.removekey_template({})
                    }
                ];
            }
            resolve(fileResult);
        });
    }
}
