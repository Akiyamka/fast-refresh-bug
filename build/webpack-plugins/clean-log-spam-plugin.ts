/**
 * @param {Object} child
 * @param {string} child.name
 * @returns {boolean}
 */
export class CleanLogSpamPlugin {
  pluginNameSubstring: string;

  constructor(pluginNameSubstring) {
    this.pluginNameSubstring = pluginNameSubstring;
  }

  shouldShow(child) {
    return !child.name.includes(this.pluginNameSubstring);
  }

  apply(compiler) {
    compiler.hooks.done.tap("HelloWorld", (stats) => {
      if (Array.isArray(stats.compilation.children)) {
        stats.compilation.children = stats.compilation.children.filter(child => this.shouldShow(child));
      }
    })
  }
}
