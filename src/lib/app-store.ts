// App Store へのリンク。置き場所ごとに目印 (キャンペーントークン ct) を付け、App Store Connect の「キャンペーン」で、
// 目印ごとの商品ページの表示数と初回ダウンロード数を見る (2026-10-04 のユーザーの指示「記事からアプリDLまで繋がったか、を
// 計れるようにしたい」)。目印は 30 文字まで
const APP_URL = 'https://apps.apple.com/jp/app/id6817753196';
// プロバイダトークン (pt)。アプリの公開から 24 時間たつと、App Store Connect の アプリ → アナリティクス → キャンペーン で
// キャンペーンリンクを作ると出る (どのキャンペーンでも同じ値)。空の間は目印を付けない (付けても数えられない)
const PROVIDER_TOKEN = '';

export type AppStoreCampaign = 'lp-hero' | 'lp-cta' | `article-${string}`;

export function getAppStoreUrl(campaign: AppStoreCampaign): string {
  if (!PROVIDER_TOKEN) return APP_URL;
  const params = new URLSearchParams({ pt: PROVIDER_TOKEN, ct: campaign.slice(0, 30), mt: '8' });
  return `${APP_URL}?${params}`;
}
