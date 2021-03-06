import {
  _generate, _generateTest, ensureModuleNameProvided, ensureModuleExists,
  removeFile, getOutputPath, getTestOutputPath, updateIndexFile
} from './utils';

import {generateStorybook, destroyStorybook} from './storybook';

export function generateComponent(name, options, config) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  _generate('component', moduleName, entityName, options, config);
  _generateTest('component', moduleName, entityName, config);
  if (config.storybook) {
    generateStorybook(name, options, config);
  }
}

export function destroyComponent(name) {
  let [moduleName, entityName] = name.split(':');

  ensureModuleNameProvided(name);
  ensureModuleExists(moduleName);

  removeFile(getOutputPath('component', entityName, moduleName));
  destroyStorybook(name);
  removeFile(getTestOutputPath('component', entityName, moduleName));
}
