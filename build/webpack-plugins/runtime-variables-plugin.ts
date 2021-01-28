import { Compilation } from 'webpack';

export interface RuntimeVariablesPluginSettings {
  variables: any,
  fileName?: string,
  filePath?: string
}
export class RuntimeVariablesPlugin {
  settings: RuntimeVariablesPluginSettings
  constructor({ fileName = 'config.json', filePath, variables }: RuntimeVariablesPluginSettings) {
    this.settings = {
      fileName,
      variables,
      filePath
    };
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('RuntimeVariablesPlugin', (compilation: Compilation, done) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RuntimeVariablesPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS, 
          additionalAssets: true
        },
        (assets) => {
          const file = (this.settings.filePath || compilation.outputOptions.path) + '/' + this.settings.fileName;
          const source = JSON.stringify(this.settings.variables);
          compilation.emitAsset(file, {
            source: () => source,
            size: () => source.length,
            map: () => ({}),
            sourceAndMap: () => ({ source, map: {}}),
            updateHash: () => {},
            buffer: () => Buffer.from(source, 'utf-8'),
          })
        }
      );
  
      done();
    })
  }
}