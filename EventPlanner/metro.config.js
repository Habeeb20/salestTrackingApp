const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable CSS for NativeWind
  isCSSEnabled: true,
});

// Add support for NativeWind's CSS transformation
config.transformer.unstable_allowRequireContext = true;
config.resolver.sourceExts.push('css');

module.exports = config;