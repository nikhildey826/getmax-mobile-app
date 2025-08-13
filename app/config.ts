import Constants from 'expo-constants';

type Environment = 'development' | 'production';

export const getApiConfig = () => {
  const env = Constants.expoConfig?.extra?.env as Environment || 'development';
  return {
    baseUrl: Constants.expoConfig?.extra?.api[env],
    env
  };
};