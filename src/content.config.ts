import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 記事 (牌効率・何切るの解説)。src/content/articles の Markdown / MDX。ファイル名が URL になる (/articles/<ファイル名>)。
// 何切るの問題は手牌とドラだけで出し、河と巡目に左右されない局面にする (数字も河は空として計算し、1〜12巡目で答えが変わらない
// ことを確かめる。2026-10-04 のユーザーの決め)
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // 一覧の一行と、検索・リンクのカードの説明
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]), // 種類。ページには出さない (一覧を分けるときに使う)
    // 何切るの問題 (あれば、本文の前に出して、本文は「答えを見る」でたたむ)
    question: z
      .object({
        situation: z.string(), // 「東場・親・ドラ 中」
        doraIndicator: z.string().optional(), // ドラ表示牌 (Hand の書き方。牌の絵で出す)
        hand: z.string(), // 手牌 13 枚 (Hand の書き方)
        draw: z.string().optional(), // ツモ牌
        prompt: z.string(), // 「何を切りますか？」
      })
      .optional(),
    draft: z.boolean().default(false), // 下書き (本番のビルドに出さない)
  }),
});

export const collections = { articles };
