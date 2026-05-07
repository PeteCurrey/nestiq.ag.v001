import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/beta/', '/agent-dashboard-preview/'],
    },
    sitemap: 'https://nestiq.avorria.com/sitemap.xml',
  }
}
