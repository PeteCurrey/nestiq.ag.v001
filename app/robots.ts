import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/agent/', '/account/', '/api/'],
    },
    sitemap: 'https://nestiq.avorria.com/sitemap.xml',
  }
}
