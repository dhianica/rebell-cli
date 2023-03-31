"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const scripts = () => `

class ClassNameController {
  
  private ClassName = [{
    ClassNameID: 1,
    ClassName_Name: 'ClassName 1'
  }, {
    ClassNameID: 2,
    ClassNameName: 'ClassName 2'
  }]

  @Get('/')
  public async getAllClassName(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        response.json({
          detail: this.ClassName
        })
      } catch (error: any) {
        next(error)
      }
    })
  }

  @Get(':id')
  public async getClassNameByID(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>  {
    return new Promise<void>(async () => {
      try {
        const { id } = request.params
        if (!isNumber(id))
          throw customError({
            message: EErrorMessage.INVALID_DATA,
            errorPath: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + getMethodName(new Error()),
            errorCode: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + generateCode(4)
          })

        const result = this.ClassName.find(x => x.ClassNameID === parseInt(id, 10))
        response.json({
          message: ESuccessMessage.FOUND,
          detail: result
        })
      } catch (error: any) {
        next(error)
      }
    })
  }
}
  
export default new ClassNameController();`;
const makeRequest = (name) => {
    // console.log("Model name: ", name)
    if (!name) {
        console.log('name is undefined');
        return;
    }
    const importLib = [];
    const file = path_1.default.join(`src/app/${name}`, `${name}.controller.ts`);
    if (!fs_extra_1.default.existsSync(file))
        fs_extra_1.default.ensureFile(file, (errEnsure) => {
            if (errEnsure) {
                console.log('\x1b[31m', 'errEnsure', errEnsure, '\x1b[0m');
                return;
            }
            // add path tree
            importLib.push(`import type { Request, Response, NextFunction }  from 'express';`);
            importLib.push(`import { customError } from '../../core/error';`);
            importLib.push(`import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from '../../core/enum'`);
            importLib.push(`import { generateCode, getMethodName, isNumber } from '../../utils/index.util'`);
            importLib.push(`import { Get, Post } from '../../core/decorator'`);
            // change class name from default script
            const content = scripts().replace(/ClassName/g, capitalizeFirstLetter(name));
            // adding import packages on top of line
            const lines = content.split('\n');
            lines[0] = importLib.join('\n') + lines[0];
            const updatedContent = lines.join('\n');
            fs_extra_1.default.writeFile(file, updatedContent, (errWrite) => {
                if (errWrite) {
                    console.log('\x1b[31m', 'errWrite', errWrite, '\x1b[0m');
                    return;
                }
                console.log('\x1b[32m', `Controller created: ${file}`, '\x1b[0m');
            });
        });
    else
        console.log('\x1b[31m', `Controller already exists: ${file}`, '\x1b[0m');
};
exports.default = makeRequest;
