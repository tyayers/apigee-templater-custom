#!/usr/bin/env node
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

import { ApigeeTemplater } from 'apigee-templater-module'
import { cli } from 'apigee-templater'
// Import customized AuthApiKeyPlugin
import { AuthApiKeyPlugin } from '../dist/lib/auth.apikey.plugin.js';

process.removeAllListeners('warning');

let apigeeTemplater = new ApigeeTemplater();

// Set override our own plugins here
apigeeTemplater.setPluginInProfile("default", new AuthApiKeyPlugin());

const myCli = new cli(apigeeTemplater);

myCli.process(process.argv);