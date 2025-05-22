export default {
  flags: [
    'nodejs_compat',
    'nodejs_compat_populate_process_env'
  ],
  async fetch(request, env, ctx) {
    // Completely bypass any authentication
    const url = new URL(request.url);
    
    // Set headers to bypass authentication
    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);
    
    // Add headers to explicitly disable authentication
    newResponse.headers.set('CF-Access-Control', 'off');
    newResponse.headers.set('CF-Access-Enable', 'false');
    newResponse.headers.delete('CF-Access-Client-ID');
    newResponse.headers.delete('CF-Access-Client-Secret');
    
    return newResponse;
  }
}
