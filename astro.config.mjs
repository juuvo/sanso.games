// sanso.games (Cloudflare Pages)。出力は静的な HTML だけで、スクリプトは出さない (public/_headers の CSP は script-src 'none')
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sanso.games',
  // /terms のような .html の無い URL (アプリと App Store に載せている) をそのまま使う。Cloudflare Pages は terms.html を
  // /terms で返す
  trailingSlash: 'never',
  build: {
    format: 'file',
    // CSP の style-src 'self' で、ページの中の <style> は使えないので、CSS は必ずファイルにする
    inlineStylesheets: 'never',
  },
  integrations: [mdx(), sitemap()],
});
