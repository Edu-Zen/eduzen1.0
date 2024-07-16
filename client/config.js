import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

const getEnvVars = () => {
  if (__DEV__) {
    const { manifest } = Constants;
    if (manifest && manifest.debuggerHost) {
      return {
        apiUrl: `http://${manifest.debuggerHost.split(':').shift()}:5000`,
      };
    }
    return { apiUrl: 'http://192.168.1.28:5000' }; // Fallback for local dev
  } else {
    return { apiUrl: 'https://your-production-api-url.com' };
  }
};

export default getEnvVars;
