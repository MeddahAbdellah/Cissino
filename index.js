#! /usr/bin/env node
const { program } = require('commander');
const create = require('./commands/create');

program
  .command('create <project_name>')
  .description('Create a cissino project')
  .action(create);

program.parse();