// Absolute site origin without a trailing slash; VERCEL_URL has no protocol
export function siteURL(): string {
  return (process.env.SITE_URL || `https://${process.env.VERCEL_URL}`).replace(/\/+$/, '');
}
