import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

// 公開する記事を新しい順に。下書きは開発中 (astro dev) と、SHOW_DRAFTS=1 のビルドだけで出す
export async function getArticles(): Promise<Article[]> {
  const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';
  const articles = await getCollection('articles', (article) => showDrafts || !article.data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 一覧のカードと前後の記事に出す手牌と場況。何切るの問題はその問題、読み物は card (無ければ出さない)
export function getArticleHand(
  article: Article,
): { situation: string; hand: string; draw?: string } | undefined {
  return article.data.question ?? article.data.card;
}

// 「2026年10月10日」
export function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 一覧の短い日付「2026.10.10」
export function formatShortDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}
