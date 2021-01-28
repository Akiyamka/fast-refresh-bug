const erase = path => {
  const expression = '^' + path;
  return { [expression]: '' }
};

export function setProxies(rules = []) {
  return rules.reduce((proxies, rule) => {
    proxies[rule.from] = {
      target: rule.to,
      pathRewrite: erase(rule.from),
      secure: false,
      changeOrigin: true
    }

    if (rule.debug) {
      proxies[rule.from].logLevel = 'debug';
    }

    return proxies;
  }, {});
}