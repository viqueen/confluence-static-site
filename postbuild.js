#! /usr/bin/env node

const { listFiles } = require('fs-directory');
const path = require('path');
const fs = require('fs');

const modulesPath = path.resolve(process.cwd(), 'modules');
const distPath = path.resolve(process.cwd(), 'dist');

listFiles(modulesPath, {
    fileFilter: (file) => file.name.endsWith('.css'),
    directoryFilter: () => true,
}).map((file) => {
    const dest = file.replaceAll(modulesPath, distPath);
    fs.copyFileSync(file, dest);
});
