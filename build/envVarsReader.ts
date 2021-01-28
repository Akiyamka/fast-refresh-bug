import yenv from 'yenv';

function printErrorReason(e) {
  if (e.name === 'YAMLException') {
    return `Config parsing error: ${e.reason}`
  } else {
    return e;
  }
}

const cache = (function () {
  const hashFn = (opt) => {
    const buff = Buffer.from(JSON.stringify(opt), 'utf-8');
    const base64 = buff.toString('base64');
    return base64;
  };
  const cachedEnv = {};

  return {
    get: (file, config) => {
      const hash = hashFn({ ...config, file });
      cachedEnv[hash];
    },
    set: (file, config, payload) => {
      const hash = hashFn({ ...config, file });
      cachedEnv[hash] = payload;
    },
  }
})();

function readEnv(file, yEnvOptions) {
  const cached = cache.get(file, yEnvOptions);
  if (cached !== undefined) return cached;
  const vars = yenv(file, yEnvOptions);
  cache.set(file, yEnvOptions, vars)
  return vars;
}

export function readEnvVariables(yEnvOptions: yenv.IYenvOpts<any> = { strict: false }) {
  try {
    const { runtime, ...buildtime } = readEnv('env.yml', yEnvOptions);
    return { runtime, buildtime }
  } catch(e) {
    console.log(`[ENV] 'env.yml' read failed`);
    console.log('[ENV] Reason of error', printErrorReason(e));
    console.log(`[ENV] Switch to 'env.default.yml`);

    try {
      const { runtime, ...buildtime } = readEnv('env.default.yml', yEnvOptions);
      return { runtime, buildtime }
    } catch(e) {
      console.log(`[ENV] 'env.default.yml'`);
      console.log('[ENV] Reason of error', printErrorReason(e));
      throw '[ENV] Env variables missing';
    }
  }
}

export function flatEnv(val, acc = {}, path = ['process', 'env']) {
  if (typeof val === 'object') {
    Object.entries(val).forEach(([k, v]) => {
      flatEnv(v, acc, [...path, k]);
    });
    return acc;
  } else {
    acc[path.join('.')] = JSON.stringify(val);
    return acc;
   }
}