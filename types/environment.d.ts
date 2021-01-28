declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: 'development' | 'production';
      UNFOLDED_URL: string;
      UNFOLDED_UUID: string;
      MOCK_SDK: boolean;
      layers: {
        [key: string]: { id: string }
      };
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

