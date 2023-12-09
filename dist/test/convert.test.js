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
import { ApigeeTemplater } from 'apigee-templater-module';
import { AuthApiKeyPlugin } from '../src';
import fs from 'fs';
import { expect } from 'chai';
import { describe } from 'mocha';
import { Extract } from 'unzipper';
console.log('starting');
const apigeeTemplater = new ApigeeTemplater();
// Set override our own plugins here
apigeeTemplater.setPluginInProfile("default", new AuthApiKeyPlugin());
describe('Generate simple normal JSON 1 proxy with customized api key plugin', () => {
    return it('should produce a valid proxy bundle', () => {
        const input = fs.readFileSync('./test/data/input1.json', 'utf-8');
        return apigeeTemplater.generateProxyFromString(input, 'test/proxies').then((response) => {
            var _a;
            expect(response.success).to.equal(true);
            expect(response.duration).to.greaterThan(0);
            expect(fs.existsSync(response.localPath)).to.equal(true);
            return fs.createReadStream(response.localPath).pipe(Extract({ path: "test/proxies/" + ((_a = response.template) === null || _a === void 0 ? void 0 : _a.name) })).promise().then((result) => {
                expect(fs.existsSync("./test/proxies/testproxy/apiproxy/proxies/default.xml")).to.equal(true);
                let proxyFileText = fs.readFileSync("./test/proxies/testproxy/apiproxy/proxies/default.xml", 'utf-8');
                expect(proxyFileText).to.contain('<Name>VA-VerifyKey</Name>');
                expect(fs.existsSync("./test/proxies/testproxy/apiproxy/policies/VA-VerifyKey.xml")).to.equal(true);
                let policyFileText = fs.readFileSync("./test/proxies/testproxy/apiproxy/policies/VA-VerifyKey.xml", 'utf-8');
                expect(policyFileText).to.contain('<APIKey ref="request.queryparam.apikey"/>');
                expect(fs.existsSync("./test/proxies/testproxy/apiproxy/targets/default.xml")).to.equal(true);
            });
        });
    });
});
