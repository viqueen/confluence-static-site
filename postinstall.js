#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

const deleteMe = [
    'prosemirror-model',
    'prosemirror-state',
    'prosemirror-transform',
    'prosemirror-view',
];
for (const dir of deleteMe) {
    fs.rmdirSync(path.resolve(__dirname, 'node_modules', '@types', dir), {
        recursive: true,
    });
}
