module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@api': './src/api',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@theme': './src/theme',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
