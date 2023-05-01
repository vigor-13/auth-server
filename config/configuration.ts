import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

// dev | prod
const YAML_CONFIG_FILENAME = `config.${process.env.NODE_ENV}.yaml`;

export const loadYaml = () => {
  return yaml.load(
    fs.readFileSync(path.join(__dirname, YAML_CONFIG_FILENAME), 'utf-8'),
  ) as Record<string, any>;
};
