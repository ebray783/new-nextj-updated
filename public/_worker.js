export default {
  flags: [
    'nodejs_compat',
    'nodejs_compat_populate_process_env'
  ],
  async fetch(request, env, ctx) {
    // Disable authentication on all requests
    return env.ASSETS.fetch(request);
  }
}
