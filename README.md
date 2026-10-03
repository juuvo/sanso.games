# sanso.games

サンソー (麻雀の牌効率・何切るの練習アプリ) のサイト。Astro で静的な HTML を作り、Cloudflare Pages で公開する。

- ページ: トップ (`src/pages/index.astro`)、記事 (`/articles`)、利用規約・プライバシーポリシー・サポート、404、RSS (`/rss.xml`)、サイトマップ (`/sitemap-index.xml`)
- 出すのは静的な HTML と CSS だけ。スクリプトもページの中の `<style>`・`style=""` も使わない (`public/_headers` の CSP が `script-src 'none'`・`style-src 'self'`)。見た目は `public/styles.css`
- URL は `.html` の無い形 (`/terms`)。アプリと App Store に載せているので変えない

## 手元で見る

```sh
npm install
npm run dev        # http://localhost:4321 (下書きの記事も出る)
npm run build      # dist/ に出力 (下書きは出ない。出すときは SHOW_DRAFTS=1)
```

## 記事を書く

`src/content/articles/<URL にする名前>.mdx` を置く。ファイル名がそのまま `/articles/<名前>` になる。

```mdx
---
title: テンパイの辺張と嵌張、どちらで待つ？
description: 一覧と検索の説明 (一行)
date: 2026-10-10
tags: [何切る, 待ちの形]
question:                 # 何切るの問題 (無い記事は書かない)
  situation: 東場・親・6巡目・ドラ 二索
  hand: 123m567p234s689s1z
  draw: 1z
  prompt: 6索と 9索のどちらを切りますか？
draft: true               # 下書き (公開するときに消す)
---

本文 (問題がある記事では「答えを見る」の中に入る)

<Hand tiles="68s" size="small" />
```

- 牌の書き方: 数字の後ろに `m` 萬子・`p` 筒子・`s` 索子・`z` 字牌 (1 東・2 南・3 西・4 北・5 白・6 發・7 中)。`0` は赤5
- 期待値の表は Markdown の表で書く (2 列目から右寄せ)

## Cloudflare Pages の設定

- Framework preset: Astro / Build command: `npm run build` / Build output directory: `dist`
- Node.js は `.node-version` (22)
