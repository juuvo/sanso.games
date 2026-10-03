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
title: 東を重ねた 6巡目、何を切る？
description: 一覧と検索の説明 (一行)
date: 2026-10-10
tags: [何切る, 待ちの形]
question:                 # 何切るの問題 (無い記事は書かない)
  situation: 東場・親・6巡目・ドラ 二索
  doraIndicator: 1s       # ドラ表示牌 (牌の絵で出す。省略可)
  hand: 123m567p234s689s1z
  draw: 1z
  prompt: 東をツモりました。何を切りますか？
draft: true               # 下書き (公開するときに消す)
---

本文 (問題がある記事では「答えを見る」の中に入る)

<Hand tiles="68s" size="small" />
```

- 牌の書き方: 数字の後ろに `m` 萬子・`p` 筒子・`s` 索子・`z` 字牌 (1 東・2 南・3 西・4 北・5 白・6 發・7 中)。`0` は赤5
- 期待値の表は Markdown の表で書く (2 列目から右寄せ)
- 数字はアプリの評価エンジン (Rust、`npm run build:native` で作る照合用 CLI) で計算する。問題文や題・説明で答えを透かさない
- 何切るの問題は手牌・ドラ・巡目だけで出す。河に左右されないように、数字も河は空 (見えている牌は手牌とドラ表示牌だけ) で計算する
- 「これが正解」と言い切るのは、最善が 2 番目よりはっきり上の問題だけ。僅差の形は、問題にせず「こういう判断もある」という読み物にする
- 記事の項目 (src/content.config.ts) を変えたら、`npm run dev` を止めて `.astro` と `node_modules/.astro` を消してから起動し直す

## Cloudflare Pages の設定

- Framework preset: Astro / Build command: `npm run build` / Build output directory: `dist`
- Node.js は `.node-version` (22)
