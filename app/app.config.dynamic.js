let customConfig = {}

try {
  // eslint-disable-next-line no-undef
  customConfig = require(`./src/resources/app.json`)
} catch (e) {
  console.log('Failed to load custom config')
}

export default ({ config }) => ({
  ...config,
  ...customConfig,
  extra: {
    ...config.extra,
    ...customConfig.extra,
    eas: {
      projectId: "0cec3098-4500-490f-a523-dd9f3d9059ed"
    }
  }
})
