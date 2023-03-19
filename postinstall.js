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
    const target = path.resolve(__dirname, 'node_modules', '@types', dir);
    if (fs.existsSync(target)) {
        fs.rmSync(target, {
            recursive: true,
        });
    }
}
