import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nestiq.co.uk'

  // Standard Pages
  const routes = [
    '',
    '/search',
    '/buy',
    '/rent',
    '/agents',
    '/market-data',
    '/valuation',
    '/pricing',
    '/new-homes',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // Location Pages (Top 50)
  const topCities = ['london', 'manchester', 'leeds', 'birmingham', 'sheffield', 'bristol', 'glasgow', 'liverpool']
  const locationRoutes = topCities.map(city => ({
    url: `${baseUrl}/properties-for-sale/${city}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [...routes, ...locationRoutes]
}
