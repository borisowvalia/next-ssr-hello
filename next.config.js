/** @type {import('next').NextConfig} */
module.exports = {
  // Activator's Builder template (runtime/templates/Dockerfile.ssr_next) runs
  // `node server.js` from /app — that file only exists when `output: standalone`
  // is set, so this is the contract between fixture and template.
  output: 'standalone',
  reactStrictMode: true,
};
// supersede-test B 17:48:01
// supersede-test C 18:04:33
