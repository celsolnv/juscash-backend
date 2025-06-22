// eslint-disable-next-line max-classes-per-file
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';

abstract class ITemplateProvider {
  abstract parse(templatePath: string, variables: any): Promise<string>;
}

class HandlebarsProvider implements ITemplateProvider {
  async parse(templatePath: string, variables: any): Promise<string> {
    const templateFileContent = readFileSync(templatePath).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const template = templateParse(variables);
    return template;
  }
}

export { HandlebarsProvider, ITemplateProvider };
