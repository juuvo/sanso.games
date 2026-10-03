// 記事の RSS (/rss.xml)
import rss from '@astrojs/rss';

import { getArticles } from '../lib/articles';

export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: 'サンソーの記事',
    description: '牌効率と何切るの考え方を、和了率と打点の期待値で解説します。',
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: `/articles/${article.id}`,
    })),
    customData: '<language>ja</language>',
  });
}
