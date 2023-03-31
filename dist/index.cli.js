#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const controller_cli_1 = __importDefault(require("./controller.cli"));
// import makeService from "./service.cli";
const test_cli_1 = __importDefault(require("./test.cli"));
commander_1.program
    .command('make:controller <name>')
    .action((name) => {
    (0, controller_cli_1.default)(name);
});
commander_1.program
    .command('make:test <name>')
    .action((name) => {
    (0, controller_cli_1.default)(name);
});
// program
//     .command('make:services <name>')
//     .action((name) => {
//         makeController(name)
//     });
commander_1.program
    .command('make:resource <name>')
    .action((name) => {
    (0, controller_cli_1.default)(name);
    (0, test_cli_1.default)(name);
});
commander_1.program
    .command('version')
    .action(() => {
    console.log('1.0.0');
});
commander_1.program.parse(process.argv);
