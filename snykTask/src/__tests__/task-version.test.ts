/*
 * Copyright 2022 Snyk Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

test('ensure we can read the version from the task.json file', () => {
  const mockFn = jest.fn().mockReturnValue(`{
        "id": "some-id",
        "name": "SnykSecurityScan",
        "friendlyName": "Snyk Security Scan",
        "description": "Azure Pipelines Task for Snyk",
        "helpMarkDown": "",
        "category": "Utility",
        "author": "Snyk",
        "version": {
          "Major": 1,
          "Minor": 2,
          "Patch": 3
        },
        "instanceNameFormat": "Snyk scan for open source vulnerabilities"
    }`);

  jest.doMock('fs', () => {
    return {
      readFileSync: mockFn,
    };
  });

  const taskVersionModule = require('../task-version');
  const v: string = taskVersionModule.getTaskVersion('./snykTask/task.json');
  expect(v).toBe('1.2.3');
  expect(mockFn).toHaveBeenCalledTimes(1);
});
