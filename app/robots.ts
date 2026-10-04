import { siteURL } from 'app/lib/siteURL';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /p/<uuid> serves unpublished previews; /ghost redirects to the CMS admin
      disallow: ['/p/', '/ghost']
    },
    sitemap: `${siteURL()}/sitemap.xml`
  };
}
