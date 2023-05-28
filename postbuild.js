#! /usr/bin/env node

/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = require('fs');
const path = require('path');

const { listFiles } = require('@labset/fs-directory');

const modulesPath = path.resolve(process.cwd(), 'modules');
const distPath = path.resolve(process.cwd(), 'dist');

listFiles(modulesPath, {
    fileFilter: (file) => file.name.endsWith('.css'),
    directoryFilter: () => true,
}).map((file) => {
    const dest = file.replaceAll(modulesPath, distPath);
    fs.copyFileSync(file, dest);
});
